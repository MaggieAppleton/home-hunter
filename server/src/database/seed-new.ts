import { getDatabase } from './connection';
import { seedTrainStations } from './seed-stations';
import { calculateNearbyStations } from '../utils/distance';

export function seedDatabase() {
  const db = getDatabase();

  // Seed train stations (always refresh)
  seedTrainStations();

  // Check if we already have properties
  const countStmt = db.prepare('SELECT COUNT(*) as count FROM properties');
  const { count } = countStmt.get() as { count: number };

  if (count > 0) {
    console.log(`Database already has ${count} properties, skipping seed`);
    return;
  }

  // Insert example property
  const insertStmt = db.prepare(`
    INSERT INTO properties (
      name, price, square_feet, bedrooms, bathrooms, status, 
      link, agency, gps_lat, gps_lng, map_reference, notes,
      first_listed_date, time_on_market_months
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const exampleProperty = {
    name: '2 Bedroom Flat, Clapham Common',
    price: 650000, // £650,000 in pence
    square_feet: 850,
    bedrooms: 2,
    bathrooms: 1,
    status: 'Not contacted',
    link: 'https://example.com/property/123',
    agency: 'Foxtons',
    gps_lat: 51.4618,
    gps_lng: -0.1385,
    map_reference: 'TQ 295 770',
    notes:
      'Beautiful period conversion with original features. Close to Clapham Common station.',
    first_listed_date: '2024-10-01', // October 2024
    time_on_market_months: 2, // 2 months on market
  };

  try {
    const result = insertStmt.run(
      exampleProperty.name,
      exampleProperty.price,
      exampleProperty.square_feet,
      exampleProperty.bedrooms,
      exampleProperty.bathrooms,
      exampleProperty.status,
      exampleProperty.link,
      exampleProperty.agency,
      exampleProperty.gps_lat,
      exampleProperty.gps_lng,
      exampleProperty.map_reference,
      exampleProperty.notes,
      exampleProperty.first_listed_date,
      exampleProperty.time_on_market_months
    );

    // Calculate nearby stations for the example property
    const propertyId = Number(result.lastInsertRowid);
    updatePropertyNearbyStations(
      propertyId,
      exampleProperty.gps_lat,
      exampleProperty.gps_lng
    );

    console.log('✓ Example property seeded successfully');
  } catch (error) {
    console.error('✗ Failed to seed example property:', error);
    throw error;
  }
}

/**
 * Update nearby stations for a property
 */
export function updatePropertyNearbyStations(
  propertyId: number,
  lat: number,
  lng: number
) {
  const db = getDatabase();

  try {
    // Get all train stations
    const stationsStmt = db.prepare(`
      SELECT id, name, lat, lng, lines, type, zone, networks, all_types
      FROM train_stations
    `);
    const stations = stationsStmt.all().map((station: any) => ({
      ...station,
      lines: JSON.parse(station.lines),
      networks: station.networks ? JSON.parse(station.networks) : [],
      allTypes: station.all_types ? JSON.parse(station.all_types) : [],
    }));

    // Calculate nearby stations
    const nearbyStations = calculateNearbyStations(lat, lng, stations, 1000); // 1km radius

    // Update property with nearby stations
    const updateStmt = db.prepare(`
      UPDATE properties 
      SET nearby_stations = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    updateStmt.run(JSON.stringify(nearbyStations), propertyId);

    console.log(
      `✓ Updated nearby stations for property ${propertyId}: ${nearbyStations.length} stations found`
    );
  } catch (error) {
    console.error(
      `✗ Failed to update nearby stations for property ${propertyId}:`,
      error
    );
  }
}

// Run seed if this file is executed directly
if (require.main === module) {
  try {
    seedDatabase();
    console.log('Seed completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}
