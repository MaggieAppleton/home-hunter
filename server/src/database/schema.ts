import { getDatabase } from './connection';

/**
 * Create all database tables from scratch
 */
export function createDatabaseSchema() {
  const db = getDatabase();

  // Create properties table
  db.exec(`
    CREATE TABLE IF NOT EXISTS properties (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price INTEGER, -- Store in pence for accuracy
      square_feet REAL,
      bedrooms INTEGER,
      bathrooms REAL,
      status TEXT DEFAULT 'Not contacted',
      link TEXT,
      agency TEXT,
      gps_lat REAL,
      gps_lng REAL,
      map_reference TEXT,
      cover_image TEXT, -- filename
      notes TEXT,
      
      -- New fields
      first_listed_date DATE, -- When property was first listed (e.g., 2025-06-01)
      time_on_market_months INTEGER, -- Calculated field: months on market
      
      -- Nearby stations (calculated automatically - within 1km)
      nearby_stations TEXT, -- JSON array of stations with distances
      
      -- Nearby schools (calculated automatically - within 2km) 
      nearby_schools TEXT, -- JSON array of schools with distances
      
      -- Timestamps
      date_added DATETIME DEFAULT CURRENT_TIMESTAMP,
      date_viewed DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create property images table
  db.exec(`
    CREATE TABLE IF NOT EXISTS property_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      property_id INTEGER,
      filename TEXT NOT NULL,
      original_name TEXT,
      is_cover BOOLEAN DEFAULT FALSE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (property_id) REFERENCES properties (id) ON DELETE CASCADE
    )
  `);

  // Create train stations table
  db.exec(`
    CREATE TABLE IF NOT EXISTS train_stations (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      lat REAL NOT NULL,
      lng REAL NOT NULL,
      lines TEXT NOT NULL, -- JSON array as string
      type TEXT NOT NULL, -- 'tube', 'overground', 'national_rail', 'tram'
      zone INTEGER,
      networks TEXT, -- JSON array as string
      all_types TEXT, -- JSON array as string
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create schools table (for future implementation)
  db.exec(`
    CREATE TABLE IF NOT EXISTS schools (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      lat REAL NOT NULL,
      lng REAL NOT NULL,
      ofsted_rating TEXT, -- 'Outstanding', 'Good', 'Requires Improvement', 'Inadequate'
      school_type TEXT NOT NULL, -- 'primary', 'secondary'
      performance_percentage REAL, -- % of students performing at grade level
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create indexes for common queries
  db.exec('CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status)');
  db.exec('CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price)');
  db.exec('CREATE INDEX IF NOT EXISTS idx_properties_bedrooms ON properties(bedrooms)');
  db.exec('CREATE INDEX IF NOT EXISTS idx_properties_gps ON properties(gps_lat, gps_lng)');
  db.exec(
    'CREATE INDEX IF NOT EXISTS idx_properties_first_listed ON properties(first_listed_date)'
  );

  db.exec(
    'CREATE INDEX IF NOT EXISTS idx_property_images_property_id ON property_images(property_id)'
  );
  db.exec(
    'CREATE INDEX IF NOT EXISTS idx_property_images_cover ON property_images(property_id, is_cover)'
  );

  db.exec('CREATE INDEX IF NOT EXISTS idx_train_stations_type ON train_stations(type)');
  db.exec('CREATE INDEX IF NOT EXISTS idx_train_stations_zone ON train_stations(zone)');
  db.exec(
    'CREATE INDEX IF NOT EXISTS idx_train_stations_location ON train_stations(lat, lng)'
  );

  db.exec('CREATE INDEX IF NOT EXISTS idx_schools_type ON schools(school_type)');
  db.exec('CREATE INDEX IF NOT EXISTS idx_schools_rating ON schools(ofsted_rating)');
  db.exec('CREATE INDEX IF NOT EXISTS idx_schools_location ON schools(lat, lng)');

  console.log('✓ Database schema created successfully');
}

/**
 * Drop all tables (for development/testing)
 */
export function dropDatabaseSchema() {
  const db = getDatabase();

  db.exec('DROP TABLE IF EXISTS property_images');
  db.exec('DROP TABLE IF EXISTS properties');
  db.exec('DROP TABLE IF EXISTS train_stations');
  db.exec('DROP TABLE IF EXISTS schools');

  console.log('✓ Database schema dropped');
}

// Run schema creation if this file is executed directly
if (require.main === module) {
  try {
    createDatabaseSchema();
    console.log('Database setup completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Database setup failed:', error);
    process.exit(1);
  }
}
