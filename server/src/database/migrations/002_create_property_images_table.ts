import { Migration } from './index';

export const createPropertyImagesTable: Migration = {
  id: '002_create_property_images_table',
  up: (db) => {
    db.exec(`
      CREATE TABLE property_images (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        property_id INTEGER,
        filename TEXT NOT NULL,
        original_name TEXT,
        is_cover BOOLEAN DEFAULT FALSE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (property_id) REFERENCES properties (id) ON DELETE CASCADE
      )
    `);

    // Create indexes for common queries
    db.exec(
      'CREATE INDEX idx_property_images_property_id ON property_images(property_id)'
    );
    db.exec(
      'CREATE INDEX idx_property_images_cover ON property_images(property_id, is_cover)'
    );
  },
  down: (db) => {
    db.exec('DROP TABLE IF EXISTS property_images');
  },
};
