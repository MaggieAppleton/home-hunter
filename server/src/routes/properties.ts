import express from 'express';
import { getDatabase } from '../database/connection';

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
        trainStation: property.train_station,
        features: property.features ? JSON.parse(property.features) : [],
        link: property.link,
        agency: property.agency,
        gpsLat: property.gps_lat,
        gpsLng: property.gps_lng,
        mapReference: property.map_reference,
        coverImage: property.cover_image_filename,
        notes: property.notes,
        dateAdded: property.date_added,
        dateViewed: property.date_viewed,
        createdAt: property.created_at,
        updatedAt: property.updated_at,
        images,
        // Station distance fields
        nearestStationId: property.nearest_station_id,
        nearestStationDistance: property.nearest_station_distance,
        nearestStationWalkingTime: property.nearest_station_walking_time,
        allStationsWithin1km: property.all_stations_within_1km
          ? JSON.parse(property.all_stations_within_1km)
          : [],
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
      trainStation: property.train_station,
      features: property.features ? JSON.parse(property.features) : [],
      link: property.link,
      agency: property.agency,
      gpsLat: property.gps_lat,
      gpsLng: property.gps_lng,
      mapReference: property.map_reference,
      coverImage: property.cover_image_filename,
      notes: property.notes,
      dateAdded: property.date_added,
      dateViewed: property.date_viewed,
      createdAt: property.created_at,
      updatedAt: property.updated_at,
      images,
      // Station distance fields
      nearestStationId: property.nearest_station_id,
      nearestStationDistance: property.nearest_station_distance,
      nearestStationWalkingTime: property.nearest_station_walking_time,
      allStationsWithin1km: property.all_stations_within_1km
        ? JSON.parse(property.all_stations_within_1km)
        : [],
    };

    res.json(result);
  } catch (error) {
    console.error('Error fetching property:', error);
    res.status(500).json({ error: 'Failed to fetch property' });
  }
});

// POST /api/properties - Create new property
router.post('/', (req, res) => {
  try {
    const db = getDatabase();
    const {
      name,
      price,
      squareFeet,
      bedrooms,
      bathrooms,
      status,
      trainStation,
      features,
      link,
      agency,
      gpsLat,
      gpsLng,
      mapReference,
      notes,
      dateViewed,
    } = req.body;

    // Validate required fields
    if (!name) {
      return res.status(400).json({ error: 'Property name is required' });
    }

    // Validate coordinates if provided
    {
      const coordError = validateLatLng(gpsLat, gpsLng);
      if (coordError) {
        return res.status(400).json({ error: coordError });
      }
    }

    const insertStmt = db.prepare(`
      INSERT INTO properties (
        name, price, square_feet, bedrooms, bathrooms, status,
        train_station, features, link, agency, gps_lat, gps_lng,
        map_reference, notes, date_viewed, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `);

    const result = insertStmt.run(
      name,
      price || null,
      squareFeet || null,
      bedrooms || null,
      bathrooms || null,
      status || 'Not contacted',
      trainStation || null,
      features ? JSON.stringify(features) : null,
      link || null,
      agency || null,
      normalizeNumber(gpsLat) ?? null,
      normalizeNumber(gpsLng) ?? null,
      mapReference || null,
      notes || null,
      dateViewed || null
    );

    // Return the created property
    const newPropertyStmt = db.prepare(`
      SELECT * FROM properties WHERE id = ?
    `);

    const newProperty = newPropertyStmt.get(result.lastInsertRowid) as any;

    res.status(201).json({
      id: newProperty.id,
      name: newProperty.name,
      price: newProperty.price,
      squareFeet: newProperty.square_feet,
      bedrooms: newProperty.bedrooms,
      bathrooms: newProperty.bathrooms,
      status: newProperty.status,
      trainStation: newProperty.train_station,
      features: newProperty.features ? JSON.parse(newProperty.features) : [],
      link: newProperty.link,
      agency: newProperty.agency,
      gpsLat: newProperty.gps_lat,
      gpsLng: newProperty.gps_lng,
      mapReference: newProperty.map_reference,
      notes: newProperty.notes,
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
router.put('/:id', (req, res) => {
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
      trainStation,
      features,
      link,
      agency,
      gpsLat,
      gpsLng,
      mapReference,
      notes,
      dateViewed,
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
    const effTrainStation = trainStation ?? existing.train_station;
    const effFeatures =
      features !== undefined
        ? features
          ? JSON.stringify(features)
          : null
        : existing.features; // keep existing JSON string
    const effLink = link ?? existing.link;
    const effAgency = agency ?? existing.agency;
    const effGpsLat = normalizeNumber(gpsLat) ?? existing.gps_lat;
    const effGpsLng = normalizeNumber(gpsLng) ?? existing.gps_lng;
    const effMapReference = mapReference ?? existing.map_reference;
    const effNotes = notes ?? existing.notes;
    const effDateViewed = dateViewed ?? existing.date_viewed;

    // Validate required fields after merging
    if (!effName) {
      return res.status(400).json({ error: 'Property name is required' });
    }

    // Validate coordinates after merging
    {
      const coordError = validateLatLng(effGpsLat, effGpsLng);
      if (coordError) {
        return res.status(400).json({ error: coordError });
      }
    }

    const updateStmt = db.prepare(`
      UPDATE properties SET
        name = ?, price = ?, square_feet = ?, bedrooms = ?, bathrooms = ?, status = ?,
        train_station = ?, features = ?, link = ?, agency = ?, gps_lat = ?, gps_lng = ?,
        map_reference = ?, notes = ?, date_viewed = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    updateStmt.run(
      effName,
      effPrice || null,
      effSquareFeet || null,
      effBedrooms || null,
      effBathrooms || null,
      effStatus,
      effTrainStation || null,
      effFeatures,
      effLink || null,
      effAgency || null,
      effGpsLat ?? null,
      effGpsLng ?? null,
      effMapReference || null,
      effNotes || null,
      effDateViewed || null,
      id
    );

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
      trainStation: updatedProperty.train_station,
      features: updatedProperty.features
        ? JSON.parse(updatedProperty.features)
        : [],
      link: updatedProperty.link,
      agency: updatedProperty.agency,
      gpsLat: updatedProperty.gps_lat,
      gpsLng: updatedProperty.gps_lng,
      mapReference: updatedProperty.map_reference,
      coverImage: updatedProperty.cover_image_filename,
      notes: updatedProperty.notes,
      dateAdded: updatedProperty.date_added,
      dateViewed: updatedProperty.date_viewed,
      createdAt: updatedProperty.created_at,
      updatedAt: updatedProperty.updated_at,
      images,
      // Station distance fields
      nearestStationId: updatedProperty.nearest_station_id,
      nearestStationDistance: updatedProperty.nearest_station_distance,
      nearestStationWalkingTime: updatedProperty.nearest_station_walking_time,
      allStationsWithin1km: updatedProperty.all_stations_within_1km
        ? JSON.parse(updatedProperty.all_stations_within_1km)
        : [],
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
