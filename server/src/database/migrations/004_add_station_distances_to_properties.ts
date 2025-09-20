import { Migration } from './index';

export const addStationDistancesToProperties: Migration = {
  id: '004_add_station_distances_to_properties',
  up: (db) => {
    // Add fields to store nearest station information
    db.exec(`
      ALTER TABLE properties ADD COLUMN nearest_station_id TEXT
    `);

    db.exec(`
      ALTER TABLE properties ADD COLUMN nearest_station_distance REAL
    `);

    db.exec(`
      ALTER TABLE properties ADD COLUMN nearest_station_walking_time INTEGER
    `);

    db.exec(`
      ALTER TABLE properties ADD COLUMN all_stations_within_1km TEXT
    `);

    // Create index for station queries
    db.exec(
      'CREATE INDEX idx_properties_nearest_station ON properties(nearest_station_id)'
    );
  },
  down: (db) => {
    // Note: SQLite doesn't support DROP COLUMN, so we'd need to recreate the table
    // For now, we'll leave the columns in place
    console.log(
      'Warning: Cannot drop columns in SQLite. Columns remain in database.'
    );
  },
};
