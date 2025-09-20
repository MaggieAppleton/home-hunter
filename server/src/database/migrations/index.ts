import { getDatabase } from '../connection';

export interface Migration {
  id: string;
  up: (db: any) => void;
  down?: (db: any) => void;
}

// Initialize migrations table if it doesn't exist
function initializeMigrationsTable(db: any) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS migrations (
      id TEXT PRIMARY KEY,
      applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

// Check if a migration has been applied
function isMigrationApplied(db: any, migrationId: string): boolean {
  const stmt = db.prepare('SELECT id FROM migrations WHERE id = ?');
  const result = stmt.get(migrationId);
  return !!result;
}

// Mark migration as applied
function markMigrationApplied(db: any, migrationId: string) {
  const stmt = db.prepare('INSERT INTO migrations (id) VALUES (?)');
  stmt.run(migrationId);
}

// Run all pending migrations
export function runMigrations(migrations: Migration[]) {
  const db = getDatabase();

  initializeMigrationsTable(db);

  const pendingMigrations = migrations.filter(
    (migration) => !isMigrationApplied(db, migration.id)
  );

  if (pendingMigrations.length === 0) {
    console.log('No pending migrations');
    return;
  }

  console.log(`Running ${pendingMigrations.length} pending migrations...`);

  for (const migration of pendingMigrations) {
    try {
      console.log(`Applying migration: ${migration.id}`);
      migration.up(db);
      markMigrationApplied(db, migration.id);
      console.log(`✓ Migration ${migration.id} applied successfully`);
    } catch (error) {
      console.error(`✗ Failed to apply migration ${migration.id}:`, error);
      throw error;
    }
  }

  console.log('All migrations completed successfully');
}

// Get list of applied migrations
export function getAppliedMigrations(): string[] {
  const db = getDatabase();
  const stmt = db.prepare('SELECT id FROM migrations ORDER BY applied_at');
  const rows = stmt.all();
  return rows.map((row: any) => row.id);
}
