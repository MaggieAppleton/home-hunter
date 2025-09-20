import { runMigrations } from './index';
import { createPropertiesTable } from './001_create_properties_table';
import { createPropertyImagesTable } from './002_create_property_images_table';

// Define all migrations in order
const migrations = [createPropertiesTable, createPropertyImagesTable];

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
