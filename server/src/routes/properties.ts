import express from 'express';
import { getDatabase } from '../database/connection';

const router = express.Router();

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

    const properties = stmt.all().map((property: any) => ({
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
    }));

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
      gpsLat || null,
      gpsLng || null,
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

    // Check if property exists
    const checkStmt = db.prepare('SELECT id FROM properties WHERE id = ?');
    const existing = checkStmt.get(id);

    if (!existing) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Validate required fields
    if (!name) {
      return res.status(400).json({ error: 'Property name is required' });
    }

    const updateStmt = db.prepare(`
      UPDATE properties SET
        name = ?, price = ?, square_feet = ?, bedrooms = ?, bathrooms = ?, status = ?,
        train_station = ?, features = ?, link = ?, agency = ?, gps_lat = ?, gps_lng = ?,
        map_reference = ?, notes = ?, date_viewed = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    updateStmt.run(
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
      gpsLat || null,
      gpsLng || null,
      mapReference || null,
      notes || null,
      dateViewed || null,
      id
    );

    // Return updated property
    const updatedPropertyStmt = db.prepare(`
      SELECT 
        p.*,
        pi.filename as cover_image_filename
      FROM properties p
      LEFT JOIN property_images pi ON p.id = pi.property_id AND pi.is_cover = 1
      WHERE p.id = ?
    `);

    const updatedProperty = updatedPropertyStmt.get(id) as any;

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
