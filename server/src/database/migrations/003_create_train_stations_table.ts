import { Migration } from './index';

export const createTrainStationsTable: Migration = {
  id: '003_create_train_stations_table',
  up: (db) => {
    db.exec(`
      CREATE TABLE train_stations (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL,
        lines TEXT NOT NULL, -- JSON array as string
        type TEXT NOT NULL, -- 'tube', 'overground', 'national_rail', 'tram'
        zone INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create indexes for common queries
    db.exec('CREATE INDEX idx_train_stations_type ON train_stations(type)');
    db.exec('CREATE INDEX idx_train_stations_zone ON train_stations(zone)');
    db.exec(
      'CREATE INDEX idx_train_stations_location ON train_stations(lat, lng)'
    );
  },
  down: (db) => {
    db.exec('DROP TABLE IF EXISTS train_stations');
  },
};
