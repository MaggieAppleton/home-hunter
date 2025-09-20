import { getDatabase } from './connection';
import { seedTrainStations } from './seed-stations';

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
      train_station, features, link, agency, gps_lat, gps_lng, 
      map_reference, notes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const exampleProperty = {
    name: '2 Bedroom Flat, Clapham Common',
    price: 650000, // £650,000 in pence
    square_feet: 850,
    bedrooms: 2,
    bathrooms: 1,
    status: 'Not contacted',
    train_station: 'Clapham Common',
    features: JSON.stringify(['Garden', 'Balcony', 'Period features']),
    link: 'https://example.com/property/123',
    agency: 'Foxtons',
    gps_lat: 51.4618,
    gps_lng: -0.1385,
    map_reference: 'TQ 295 770',
    notes:
      'Beautiful period conversion with original features. Close to Clapham Common station.',
  };

  try {
    insertStmt.run(
      exampleProperty.name,
      exampleProperty.price,
      exampleProperty.square_feet,
      exampleProperty.bedrooms,
      exampleProperty.bathrooms,
      exampleProperty.status,
      exampleProperty.train_station,
      exampleProperty.features,
      exampleProperty.link,
      exampleProperty.agency,
      exampleProperty.gps_lat,
      exampleProperty.gps_lng,
      exampleProperty.map_reference,
      exampleProperty.notes
    );

    console.log('✓ Example property seeded successfully');
  } catch (error) {
    console.error('✗ Failed to seed example property:', error);
    throw error;
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
