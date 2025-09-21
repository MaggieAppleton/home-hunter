import { Migration } from './index';

export const removeFeaturesColumn: Migration = {
  id: '007_remove_features_column',
  up: (db) => {
    // SQLite doesn't support DROP COLUMN directly, so we need to recreate the table
    db.exec(`
      CREATE TABLE properties_new (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price INTEGER, -- Store in pence for accuracy
        square_feet REAL,
        bedrooms INTEGER,
        bathrooms REAL,
        status TEXT DEFAULT 'Not contacted',
        train_station TEXT,
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

    // Copy data from old table to new table (excluding features column)
    db.exec(`
      INSERT INTO properties_new (
        id, name, price, square_feet, bedrooms, bathrooms, status,
        train_station, link, agency, gps_lat, gps_lng, map_reference,
        cover_image, notes, date_added, date_viewed, created_at, updated_at
      )
      SELECT 
        id, name, price, square_feet, bedrooms, bathrooms, status,
        train_station, link, agency, gps_lat, gps_lng, map_reference,
        cover_image, notes, date_added, date_viewed, created_at, updated_at
      FROM properties
    `);

    // Drop the old table
    db.exec('DROP TABLE properties');

    // Rename the new table
    db.exec('ALTER TABLE properties_new RENAME TO properties');

    // Recreate indexes
    db.exec('CREATE INDEX idx_properties_status ON properties(status)');
    db.exec('CREATE INDEX idx_properties_price ON properties(price)');
    db.exec('CREATE INDEX idx_properties_bedrooms ON properties(bedrooms)');
    db.exec(
      'CREATE INDEX idx_properties_train_station ON properties(train_station)'
    );
    db.exec('CREATE INDEX idx_properties_gps ON properties(gps_lat, gps_lng)');
  },
  down: (db) => {
    // Recreate the table with features column for rollback
    db.exec(`
      CREATE TABLE properties_old (
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

    // Copy data back (features will be NULL)
    db.exec(`
      INSERT INTO properties_old (
        id, name, price, square_feet, bedrooms, bathrooms, status,
        train_station, features, link, agency, gps_lat, gps_lng, map_reference,
        cover_image, notes, date_added, date_viewed, created_at, updated_at
      )
      SELECT 
        id, name, price, square_feet, bedrooms, bathrooms, status,
        train_station, NULL, link, agency, gps_lat, gps_lng, map_reference,
        cover_image, notes, date_added, date_viewed, created_at, updated_at
      FROM properties
    `);

    // Drop current table and rename
    db.exec('DROP TABLE properties');
    db.exec('ALTER TABLE properties_old RENAME TO properties');

    // Recreate indexes
    db.exec('CREATE INDEX idx_properties_status ON properties(status)');
    db.exec('CREATE INDEX idx_properties_price ON properties(price)');
    db.exec('CREATE INDEX idx_properties_bedrooms ON properties(bedrooms)');
    db.exec(
      'CREATE INDEX idx_properties_train_station ON properties(train_station)'
    );
    db.exec('CREATE INDEX idx_properties_gps ON properties(gps_lat, gps_lng)');
  },
};
