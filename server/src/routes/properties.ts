import express from 'express';
import { getDatabase } from '../database/connection';
import {
  calculateNearbyStations,
  calculateNearbySchools,
} from '../utils/distance';

const router = express.Router();

function normalizeNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function validateLatLng(lat: unknown, lng: unknown): string | null {
  const nlat = normalizeNumber(lat);
  const nlng = normalizeNumber(lng);
  if (nlat === null && nlng === null) return null; // both absent -> ok
  if (nlat === null || nlng === null)
    return 'Latitude and longitude must both be provided as numbers';
  if (nlat < -90 || nlat > 90) return 'Latitude must be between -90 and 90';
  if (nlng < -180 || nlng > 180)
    return 'Longitude must be between -180 and 180';
  return null;
}

/**
 * Validate and optionally clamp coordinates to valid ranges
 * @param lat - Latitude value
 * @param lng - Longitude value
 * @param clamp - Whether to clamp out-of-bounds values instead of rejecting them
 * @returns Object with validation result and potentially clamped coordinates
 */
function validateAndClampLatLng(
  lat: unknown,
  lng: unknown,
  clamp: boolean = false
): { error: string | null; lat: number | null; lng: number | null } {
  const nlat = normalizeNumber(lat);
  const nlng = normalizeNumber(lng);

  if (nlat === null && nlng === null) {
    return { error: null, lat: null, lng: null }; // both absent -> ok
  }

  if (nlat === null || nlng === null) {
    return {
      error: 'Latitude and longitude must both be provided as numbers',
      lat: null,
      lng: null,
    };
  }

  let finalLat = nlat;
  let finalLng = nlng;
  let error: string | null = null;

  // Check latitude bounds
  if (nlat < -90 || nlat > 90) {
    if (clamp) {
      finalLat = Math.max(-90, Math.min(90, nlat));
      error = `Latitude clamped from ${nlat} to ${finalLat}`;
    } else {
      return {
        error: 'Latitude must be between -90 and 90',
        lat: null,
        lng: null,
      };
    }
  }

  // Check longitude bounds
  if (nlng < -180 || nlng > 180) {
    if (clamp) {
      finalLng = Math.max(-180, Math.min(180, nlng));
      error = error
        ? `${error}; Longitude clamped from ${nlng} to ${finalLng}`
        : `Longitude clamped from ${nlng} to ${finalLng}`;
    } else {
      return {
        error: 'Longitude must be between -180 and 180',
        lat: null,
        lng: null,
      };
    }
  }

  // Additional validation for South London area (optional bounds check)
  const southLondonBounds = {
    minLat: 51.3, // Rough southern boundary
    maxLat: 51.6, // Rough northern boundary
    minLng: -0.3, // Rough western boundary
    maxLng: 0.1, // Rough eastern boundary
  };

  if (
    finalLat < southLondonBounds.minLat ||
    finalLat > southLondonBounds.maxLat ||
    finalLng < southLondonBounds.minLng ||
    finalLng > southLondonBounds.maxLng
  ) {
    // For South London context, we'll warn but not reject coordinates outside the area
    // This allows for properties that might be just outside the defined bounds
    console.warn(
      `Property coordinates (${finalLat}, ${finalLng}) are outside typical South London bounds`
    );
  }

  return { error, lat: finalLat, lng: finalLng };
}

/**
 * Calculate time on market in months
 */
function calculateTimeOnMarket(firstListedDate: string | null): number | null {
  if (!firstListedDate) return null;

  const firstListed = new Date(firstListedDate);
  const now = new Date();
  const diffTime = now.getTime() - firstListed.getTime();
  const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30)); // Approximate months

  return Math.max(0, diffMonths);
}

/**
 * Update nearby stations and schools for a property
 */
async function updatePropertyNearbyData(
  propertyId: number,
  lat: number,
  lng: number
) {
  const db = getDatabase();

  try {
    // Get all train stations
    const stationsStmt = db.prepare(`
      SELECT id, name, lat, lng, lines, type, zone, networks, all_types
      FROM train_stations
    `);
    const stations = stationsStmt.all().map((station: any) => ({
      ...station,
      lines: JSON.parse(station.lines),
      networks: station.networks ? JSON.parse(station.networks) : [],
      allTypes: station.all_types ? JSON.parse(station.all_types) : [],
    }));

    // Calculate nearby stations (within 1km)
    const nearbyStations = calculateNearbyStations(lat, lng, stations, 1000);

    // Get all schools (when available)
    const schoolsStmt = db.prepare(`
      SELECT id, name, lat, lng, ofsted_rating, school_type, performance_percentage
      FROM schools
    `);
    const schools = schoolsStmt.all() as Array<{
      id: string;
      name: string;
      lat: number;
      lng: number;
      ofsted_rating: string;
      school_type: string;
      performance_percentage: number;
    }>;

    // Calculate nearby schools (within 2km)
    const nearbySchools =
      schools.length > 0
        ? calculateNearbySchools(
            lat,
            lng,
            schools.map((s) => ({
              id: s.id,
              name: s.name,
              lat: s.lat,
              lng: s.lng,
              ofstedRating: s.ofsted_rating,
              schoolType: s.school_type,
              performancePercentage: s.performance_percentage,
            })),
            2000
          )
        : [];

    // Update property with nearby data
    const updateStmt = db.prepare(`
      UPDATE properties 
      SET nearby_stations = ?, nearby_schools = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    updateStmt.run(
      JSON.stringify(nearbyStations),
      JSON.stringify(nearbySchools),
      propertyId
    );

    console.log(
      `✓ Updated nearby data for property ${propertyId}: ${nearbyStations.length} stations, ${nearbySchools.length} schools`
    );
  } catch (error) {
    console.error(
      `✗ Failed to update nearby data for property ${propertyId}:`,
      error
    );
  }
}

// GET /api/properties - List all properties
router.get('/', (req, res) => {
  try {
    const db = getDatabase();
    const stmt = db.prepare(`
      SELECT 
        p.*,
        pi.filename as cover_image_filename
      FROM properties p
      LEFT JOIN property_images pi ON p.id = pi.property_id AND pi.is_cover = 1
      ORDER BY p.created_at DESC
    `);

    const properties = stmt.all().map((property: any) => {
      // Get all images for this property
      const imagesStmt = db.prepare(`
        SELECT id, filename, original_name, is_cover, created_at
        FROM property_images
        WHERE property_id = ?
        ORDER BY is_cover DESC, created_at ASC
      `);

      const images = imagesStmt.all(property.id).map((img: any) => ({
        id: img.id,
        filename: img.filename,
        originalName: img.original_name,
        isCover: Boolean(img.is_cover),
        createdAt: img.created_at,
      }));

      return {
        id: property.id,
        name: property.name,
        price: property.price,
        squareFeet: property.square_feet,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        status: property.status,
        link: property.link,
        agency: property.agency,
        gpsLat: property.gps_lat,
        gpsLng: property.gps_lng,
        mapReference: property.map_reference,
        coverImage: property.cover_image_filename,
        notes: property.notes,
        firstListedDate: property.first_listed_date,
        timeOnMarketMonths: property.time_on_market_months,
        nearbyStations: property.nearby_stations
          ? JSON.parse(property.nearby_stations)
          : [],
        nearbySchools: property.nearby_schools
          ? JSON.parse(property.nearby_schools)
          : [],
        dateAdded: property.date_added,
        dateViewed: property.date_viewed,
        createdAt: property.created_at,
        updatedAt: property.updated_at,
        images,
      };
    });

    res.json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

// GET /api/properties/:id - Get single property
router.get('/:id', (req, res) => {
  try {
    const db = getDatabase();
    const { id } = req.params;

    // Get property with cover image
    const propertyStmt = db.prepare(`
      SELECT 
        p.*,
        pi.filename as cover_image_filename
      FROM properties p
      LEFT JOIN property_images pi ON p.id = pi.property_id AND pi.is_cover = 1
      WHERE p.id = ?
    `);

    const property = propertyStmt.get(id) as any;

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Get all images for this property
    const imagesStmt = db.prepare(`
      SELECT id, filename, original_name, is_cover, created_at
      FROM property_images
      WHERE property_id = ?
      ORDER BY is_cover DESC, created_at ASC
    `);

    const images = imagesStmt.all(id).map((img: any) => ({
      id: img.id,
      filename: img.filename,
      originalName: img.original_name,
      isCover: Boolean(img.is_cover),
      createdAt: img.created_at,
    }));

    const result = {
      id: property.id,
      name: property.name,
      price: property.price,
      squareFeet: property.square_feet,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      status: property.status,
      link: property.link,
      agency: property.agency,
      gpsLat: property.gps_lat,
      gpsLng: property.gps_lng,
      mapReference: property.map_reference,
      coverImage: property.cover_image_filename,
      notes: property.notes,
      firstListedDate: property.first_listed_date,
      timeOnMarketMonths: property.time_on_market_months,
      nearbyStations: property.nearby_stations
        ? JSON.parse(property.nearby_stations)
        : [],
      nearbySchools: property.nearby_schools
        ? JSON.parse(property.nearby_schools)
        : [],
      dateAdded: property.date_added,
      dateViewed: property.date_viewed,
      createdAt: property.created_at,
      updatedAt: property.updated_at,
      images,
    };

    res.json(result);
  } catch (error) {
    console.error('Error fetching property:', error);
    res.status(500).json({ error: 'Failed to fetch property' });
  }
});

// POST /api/properties - Create new property
router.post('/', async (req, res) => {
  try {
    const db = getDatabase();
    const {
      name,
      price,
      squareFeet,
      bedrooms,
      bathrooms,
      status,
      link,
      agency,
      gpsLat,
      gpsLng,
      mapReference,
      notes,
      dateViewed,
      firstListedDate,
    } = req.body;

    // Validate required fields
    if (!name) {
      return res.status(400).json({ error: 'Property name is required' });
    }

    // Validate coordinates if provided (with clamping enabled for robustness)
    const coordValidation = validateAndClampLatLng(gpsLat, gpsLng, true);
    if (coordValidation.error && !coordValidation.error.includes('clamped')) {
      return res.status(400).json({ error: coordValidation.error });
    }

    // Use clamped coordinates if validation passed
    const finalGpsLat = coordValidation.lat;
    const finalGpsLng = coordValidation.lng;

    // Calculate time on market
    const timeOnMarketMonths = calculateTimeOnMarket(firstListedDate);

    const insertStmt = db.prepare(`
      INSERT INTO properties (
        name, price, square_feet, bedrooms, bathrooms, status,
        link, agency, gps_lat, gps_lng, map_reference, notes, 
        date_viewed, first_listed_date, time_on_market_months, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `);

    const result = insertStmt.run(
      name,
      price || null,
      squareFeet || null,
      bedrooms || null,
      bathrooms || null,
      status || 'Not contacted',
      link || null,
      agency || null,
      finalGpsLat ?? null,
      finalGpsLng ?? null,
      mapReference || null,
      notes || null,
      dateViewed || null,
      firstListedDate || null,
      timeOnMarketMonths
    );

    const propertyId = Number(result.lastInsertRowid);

    // Calculate nearby stations and schools if coordinates are provided
    if (finalGpsLat && finalGpsLng) {
      await updatePropertyNearbyData(
        propertyId,
        Number(finalGpsLat),
        Number(finalGpsLng)
      );
    }

    // Return the created property
    const newPropertyStmt = db.prepare(`
      SELECT * FROM properties WHERE id = ?
    `);

    const newProperty = newPropertyStmt.get(propertyId) as any;

    res.status(201).json({
      id: newProperty.id,
      name: newProperty.name,
      price: newProperty.price,
      squareFeet: newProperty.square_feet,
      bedrooms: newProperty.bedrooms,
      bathrooms: newProperty.bathrooms,
      status: newProperty.status,
      link: newProperty.link,
      agency: newProperty.agency,
      gpsLat: newProperty.gps_lat,
      gpsLng: newProperty.gps_lng,
      mapReference: newProperty.map_reference,
      notes: newProperty.notes,
      firstListedDate: newProperty.first_listed_date,
      timeOnMarketMonths: newProperty.time_on_market_months,
      nearbyStations: newProperty.nearby_stations
        ? JSON.parse(newProperty.nearby_stations)
        : [],
      nearbySchools: newProperty.nearby_schools
        ? JSON.parse(newProperty.nearby_schools)
        : [],
      dateAdded: newProperty.date_added,
      dateViewed: newProperty.date_viewed,
      createdAt: newProperty.created_at,
      updatedAt: newProperty.updated_at,
      images: [],
    });
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({ error: 'Failed to create property' });
  }
});

// PUT /api/properties/:id - Update property
router.put('/:id', async (req, res) => {
  try {
    const db = getDatabase();
    const { id } = req.params;
    const {
      name,
      price,
      squareFeet,
      bedrooms,
      bathrooms,
      status,
      link,
      agency,
      gpsLat,
      gpsLng,
      mapReference,
      notes,
      dateViewed,
      firstListedDate,
    } = req.body;

    // Load existing property to support partial updates
    const existingStmt = db.prepare('SELECT * FROM properties WHERE id = ?');
    const existing = existingStmt.get(id) as any;

    if (!existing) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Compute effective values (fallback to existing when undefined)
    const effName = name ?? existing.name;
    const effPrice = price ?? existing.price;
    const effSquareFeet = squareFeet ?? existing.square_feet;
    const effBedrooms = bedrooms ?? existing.bedrooms;
    const effBathrooms = bathrooms ?? existing.bathrooms;
    const effStatus = status ?? existing.status ?? 'Not contacted';
    const effLink = link ?? existing.link;
    const effAgency = agency ?? existing.agency;
    const effMapReference = mapReference ?? existing.map_reference;
    const effNotes = notes ?? existing.notes;
    const effDateViewed = dateViewed ?? existing.date_viewed;
    const effFirstListedDate = firstListedDate ?? existing.first_listed_date;

    // Handle coordinates with validation and clamping
    const rawGpsLat = gpsLat ?? existing.gps_lat;
    const rawGpsLng = gpsLng ?? existing.gps_lng;
    const coordValidation = validateAndClampLatLng(rawGpsLat, rawGpsLng, true);
    if (coordValidation.error && !coordValidation.error.includes('clamped')) {
      return res.status(400).json({ error: coordValidation.error });
    }
    const effGpsLat = coordValidation.lat;
    const effGpsLng = coordValidation.lng;

    // Calculate time on market
    const timeOnMarketMonths = calculateTimeOnMarket(effFirstListedDate);

    // Validate required fields after merging
    if (!effName) {
      return res.status(400).json({ error: 'Property name is required' });
    }

    const updateStmt = db.prepare(`
      UPDATE properties SET
        name = ?, price = ?, square_feet = ?, bedrooms = ?, bathrooms = ?, status = ?,
        link = ?, agency = ?, gps_lat = ?, gps_lng = ?,
        map_reference = ?, notes = ?, date_viewed = ?, first_listed_date = ?,
        time_on_market_months = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    updateStmt.run(
      effName,
      effPrice || null,
      effSquareFeet || null,
      effBedrooms || null,
      effBathrooms || null,
      effStatus,
      effLink || null,
      effAgency || null,
      effGpsLat ?? null,
      effGpsLng ?? null,
      effMapReference || null,
      effNotes || null,
      effDateViewed || null,
      effFirstListedDate || null,
      timeOnMarketMonths,
      id
    );

    // Update nearby stations and schools if coordinates are provided
    if (effGpsLat && effGpsLng) {
      await updatePropertyNearbyData(
        Number(id),
        Number(effGpsLat),
        Number(effGpsLng)
      );
    }

    // Return updated property with all images
    const updatedPropertyStmt = db.prepare(`
      SELECT 
        p.*,
        pi.filename as cover_image_filename
      FROM properties p
      LEFT JOIN property_images pi ON p.id = pi.property_id AND pi.is_cover = 1
      WHERE p.id = ?
    `);

    const updatedProperty = updatedPropertyStmt.get(id) as any;

    // Get all images for this property
    const imagesStmt = db.prepare(`
      SELECT id, filename, original_name, is_cover, created_at
      FROM property_images
      WHERE property_id = ?
      ORDER BY is_cover DESC, created_at ASC
    `);

    const images = imagesStmt.all(id).map((img: any) => ({
      id: img.id,
      filename: img.filename,
      originalName: img.original_name,
      isCover: Boolean(img.is_cover),
      createdAt: img.created_at,
    }));

    res.json({
      id: updatedProperty.id,
      name: updatedProperty.name,
      price: updatedProperty.price,
      squareFeet: updatedProperty.square_feet,
      bedrooms: updatedProperty.bedrooms,
      bathrooms: updatedProperty.bathrooms,
      status: updatedProperty.status,
      link: updatedProperty.link,
      agency: updatedProperty.agency,
      gpsLat: updatedProperty.gps_lat,
      gpsLng: updatedProperty.gps_lng,
      mapReference: updatedProperty.map_reference,
      coverImage: updatedProperty.cover_image_filename,
      notes: updatedProperty.notes,
      firstListedDate: updatedProperty.first_listed_date,
      timeOnMarketMonths: updatedProperty.time_on_market_months,
      nearbyStations: updatedProperty.nearby_stations
        ? JSON.parse(updatedProperty.nearby_stations)
        : [],
      nearbySchools: updatedProperty.nearby_schools
        ? JSON.parse(updatedProperty.nearby_schools)
        : [],
      dateAdded: updatedProperty.date_added,
      dateViewed: updatedProperty.date_viewed,
      createdAt: updatedProperty.created_at,
      updatedAt: updatedProperty.updated_at,
      images,
    });
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({ error: 'Failed to update property' });
  }
});

// DELETE /api/properties/:id - Delete property
router.delete('/:id', (req, res) => {
  try {
    const db = getDatabase();
    const { id } = req.params;

    // Check if property exists
    const checkStmt = db.prepare('SELECT id FROM properties WHERE id = ?');
    const existing = checkStmt.get(id);

    if (!existing) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Delete property (images will be deleted by CASCADE)
    const deleteStmt = db.prepare('DELETE FROM properties WHERE id = ?');
    deleteStmt.run(id);

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ error: 'Failed to delete property' });
  }
});

export default router;
