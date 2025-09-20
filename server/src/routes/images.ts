import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import { getDatabase } from '../database/connection';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../../data/images');
    // Ensure directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with original extension
    const ext = path.extname(file.originalname);
    const filename = `${uuidv4()}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow only image files
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

// POST /api/properties/:id/images - Upload property images
router.post(
  '/properties/:id/images',
  upload.array('images', 10),
  (req, res) => {
    try {
      const db = getDatabase();
      const { id } = req.params;
      const files = req.files as Express.Multer.File[];

      if (!files || files.length === 0) {
        return res.status(400).json({ error: 'No images provided' });
      }

      // Check if property exists
      const checkStmt = db.prepare('SELECT id FROM properties WHERE id = ?');
      const property = checkStmt.get(id);

      if (!property) {
        return res.status(404).json({ error: 'Property not found' });
      }

      // Insert image records
      const insertStmt = db.prepare(`
      INSERT INTO property_images (property_id, filename, original_name, is_cover)
      VALUES (?, ?, ?, ?)
    `);

      const images = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const isCover = i === 0; // First image is cover by default

        const result = insertStmt.run(
          id,
          file.filename,
          file.originalname,
          isCover
        );

        images.push({
          id: result.lastInsertRowid,
          propertyId: parseInt(id),
          filename: file.filename,
          originalName: file.originalname,
          isCover,
        });
      }

      res.status(201).json({ images });
    } catch (error) {
      console.error('Error uploading images:', error);
      res.status(500).json({ error: 'Failed to upload images' });
    }
  }
);

// GET /api/images/:filename - Serve image file
router.get('/:filename', (req, res) => {
  try {
    const { filename } = req.params;
    const imagePath = path.join(__dirname, '../../../data/images', filename);

    // Check if file exists
    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Set appropriate headers
    const ext = path.extname(filename).toLowerCase();
    const mimeTypes: { [key: string]: string } = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
    };

    const mimeType = mimeTypes[ext] || 'application/octet-stream';
    res.setHeader('Content-Type', mimeType);
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year

    // Stream the file
    const fileStream = fs.createReadStream(imagePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error('Error serving image:', error);
    res.status(500).json({ error: 'Failed to serve image' });
  }
});

// DELETE /api/images/:id - Delete image
router.delete('/:id', (req, res) => {
  try {
    const db = getDatabase();
    const { id } = req.params;

    // Get image info before deletion
    const imageStmt = db.prepare(`
      SELECT filename, property_id, is_cover
      FROM property_images
      WHERE id = ?
    `);
    const image = imageStmt.get(id) as any;

    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Delete from database
    const deleteStmt = db.prepare('DELETE FROM property_images WHERE id = ?');
    deleteStmt.run(id);

    // Delete file from filesystem
    const imagePath = path.join(
      __dirname,
      '../../../data/images',
      image.filename
    );
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // If this was the cover image, set a new cover image
    if (image.is_cover) {
      const newCoverStmt = db.prepare(`
        SELECT id FROM property_images
        WHERE property_id = ? AND id != ?
        ORDER BY created_at ASC
        LIMIT 1
      `);
      const newCover = newCoverStmt.get(image.property_id, id) as any;

      if (newCover) {
        const updateCoverStmt = db.prepare(`
          UPDATE property_images SET is_cover = 1 WHERE id = ?
        `);
        updateCoverStmt.run(newCover.id);
      }
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

// PUT /api/images/:id/cover - Set as cover image
router.put('/:id/cover', (req, res) => {
  try {
    const db = getDatabase();
    const { id } = req.params;

    // Get image info
    const imageStmt = db.prepare(`
      SELECT property_id, is_cover
      FROM property_images
      WHERE id = ?
    `);
    const image = imageStmt.get(id) as any;

    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Remove cover status from all other images of this property
    const removeCoverStmt = db.prepare(`
      UPDATE property_images SET is_cover = 0 WHERE property_id = ?
    `);
    removeCoverStmt.run(image.property_id);

    // Set this image as cover
    const setCoverStmt = db.prepare(`
      UPDATE property_images SET is_cover = 1 WHERE id = ?
    `);
    setCoverStmt.run(id);

    res.json({ message: 'Cover image updated successfully' });
  } catch (error) {
    console.error('Error setting cover image:', error);
    res.status(500).json({ error: 'Failed to set cover image' });
  }
});

export default router;
