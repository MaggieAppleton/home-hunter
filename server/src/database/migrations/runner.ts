import { runMigrations } from './index';
import { createPropertiesTable } from './001_create_properties_table';
import { createPropertyImagesTable } from './002_create_property_images_table';
import { createTrainStationsTable } from './003_create_train_stations_table';
import { addStationDistancesToProperties } from './004_add_station_distances_to_properties';
import { addMultiTypeFieldsToStations } from './006_add_multi_type_fields_to_stations';
import { removeFeaturesColumn } from './007_remove_features_column';

// Define all migrations in order
const migrations = [
  createPropertiesTable,
  createPropertyImagesTable,
  createTrainStationsTable,
  addStationDistancesToProperties,
  addMultiTypeFieldsToStations,
  removeFeaturesColumn,
];

// Run migrations if this file is executed directly
if (require.main === module) {
  try {
    runMigrations(migrations);
    console.log('Migration runner completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration runner failed:', error);
    process.exit(1);
  }
}

export { migrations };
