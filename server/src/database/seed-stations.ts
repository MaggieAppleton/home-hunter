import { getDatabase } from './connection';
import { southLondonStations } from '../data/south_london_stations_fixed';

export function seedTrainStations() {
  const db = getDatabase();

  console.log('Seeding train stations...');

  // Clear existing stations
  db.exec('DELETE FROM train_stations');

  // Insert all stations
  const insertStmt = db.prepare(`
    INSERT INTO train_stations (id, name, lat, lng, lines, type, zone, networks, all_types)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  let count = 0;
  for (const station of southLondonStations) {
    insertStmt.run(
      station.id,
      station.name,
      station.lat,
      station.lng,
      JSON.stringify(station.lines),
      station.type,
      station.zone || null,
      JSON.stringify(station.networks || []),
      JSON.stringify((station as any).allTypes || [])
    );
    count++;
  }

  console.log(`✓ Seeded ${count} train stations`);
}

// Run seeding if this file is executed directly
if (require.main === module) {
  try {
    seedTrainStations();
    console.log('Station seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Station seeding failed:', error);
    process.exit(1);
  }
}
