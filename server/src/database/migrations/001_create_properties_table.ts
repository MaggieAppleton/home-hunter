import { Migration } from './index';

export const createPropertiesTable: Migration = {
  id: '001_create_properties_table',
  up: (db) => {
    db.exec(`
      CREATE TABLE properties (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price INTEGER, -- Store in pence for accuracy
        square_feet REAL,
        bedrooms INTEGER,
        bathrooms REAL,
        status TEXT DEFAULT 'Not contacted',
        train_station TEXT,
        features TEXT, -- JSON array as string
        link TEXT,
        agency TEXT,
        gps_lat REAL,
        gps_lng REAL,
        map_reference TEXT,
        cover_image TEXT, -- filename
        notes TEXT,
        date_added DATETIME DEFAULT CURRENT_TIMESTAMP,
        date_viewed DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create indexes for common queries
    db.exec('CREATE INDEX idx_properties_status ON properties(status)');
    db.exec('CREATE INDEX idx_properties_price ON properties(price)');
    db.exec('CREATE INDEX idx_properties_bedrooms ON properties(bedrooms)');
    db.exec(
      'CREATE INDEX idx_properties_train_station ON properties(train_station)'
    );
    db.exec('CREATE INDEX idx_properties_gps ON properties(gps_lat, gps_lng)');
  },
  down: (db) => {
    db.exec('DROP TABLE IF EXISTS properties');
  },
};
