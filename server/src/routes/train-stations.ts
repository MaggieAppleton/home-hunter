import { Router } from 'express';
import { getDatabase } from '../database/connection';

const router = Router();

// Get all train stations
router.get('/', (req, res) => {
  try {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM train_stations ORDER BY name');
    const stations = stmt.all();

    // Parse JSON fields for each station
    const stationsWithParsedData = stations.map((station: any) => ({
      ...station,
      lines: JSON.parse(station.lines),
      networks: station.networks ? JSON.parse(station.networks) : [],
      allTypes: station.all_types ? JSON.parse(station.all_types) : [],
    }));

    res.json(stationsWithParsedData);
  } catch (error) {
    console.error('Error fetching train stations:', error);
    res.status(500).json({ error: 'Failed to fetch train stations' });
  }
});

// Get stations by type
router.get('/type/:type', (req, res) => {
  try {
    const { type } = req.params;
    const db = getDatabase();
    const stmt = db.prepare(
      'SELECT * FROM train_stations WHERE type = ? ORDER BY name'
    );
    const stations = stmt.all(type);

    // Parse JSON fields for each station
    const stationsWithParsedData = stations.map((station: any) => ({
      ...station,
      lines: JSON.parse(station.lines),
      networks: station.networks ? JSON.parse(station.networks) : [],
      allTypes: station.all_types ? JSON.parse(station.all_types) : [],
    }));

    res.json(stationsWithParsedData);
  } catch (error) {
    console.error('Error fetching train stations by type:', error);
    res.status(500).json({ error: 'Failed to fetch train stations' });
  }
});

// Get stations within radius of a point
router.get('/nearby', (req, res) => {
  try {
    const { lat, lng, radius = 1000 } = req.query;

    if (!lat || !lng) {
      return res
        .status(400)
        .json({ error: 'Latitude and longitude are required' });
    }

    const db = getDatabase();

    // Using Haversine formula to find stations within radius (in meters)
    const stmt = db.prepare(`
      SELECT *,
        (6371000 * acos(
          cos(radians(?)) * cos(radians(lat)) * 
          cos(radians(lng) - radians(?)) + 
          sin(radians(?)) * sin(radians(lat))
        )) AS distance
      FROM train_stations
      WHERE distance <= ?
      ORDER BY distance
    `);

    const stations = stmt.all(lat, lng, lat, radius);

    // Parse JSON fields for each station
    const stationsWithParsedData = stations.map((station: any) => ({
      ...station,
      lines: JSON.parse(station.lines),
      networks: station.networks ? JSON.parse(station.networks) : [],
      allTypes: station.all_types ? JSON.parse(station.all_types) : [],
      distance: Math.round(station.distance), // Round to nearest meter
    }));

    res.json(stationsWithParsedData);
  } catch (error) {
    console.error('Error fetching nearby train stations:', error);
    res.status(500).json({ error: 'Failed to fetch nearby train stations' });
  }
});

export default router;
