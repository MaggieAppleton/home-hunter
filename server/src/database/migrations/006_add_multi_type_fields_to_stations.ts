import { Migration } from './index';

export const addMultiTypeFieldsToStations: Migration = {
  id: '006_add_multi_type_fields_to_stations',
  up: (db) => {
    // Add new columns for multi-type station support
    db.exec('ALTER TABLE train_stations ADD COLUMN networks TEXT'); // JSON array as string
    db.exec('ALTER TABLE train_stations ADD COLUMN all_types TEXT'); // JSON array as string
  },
  down: (db) => {
    // SQLite doesn't support DROP COLUMN, so we'd need to recreate the table
    // For now, we'll just leave the columns in place
    console.log(
      'Note: SQLite does not support DROP COLUMN. Columns will remain.'
    );
  },
};
