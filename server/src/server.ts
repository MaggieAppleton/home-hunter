import express from 'express';
import cors from 'cors';
import { runMigrations } from './database/migrations/index';
import { seedDatabase } from './database/seed';
import propertiesRouter from './routes/properties';
import imagesRouter from './routes/images';
import trainStationsRouter from './routes/train-stations';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/properties', propertiesRouter);
app.use('/api/train-stations', trainStationsRouter);
app.use('/api', imagesRouter);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Property Tracker API is running',
    timestamp: new Date().toISOString(),
  });
});

// Initialize database and run migrations
try {
  runMigrations(require('./database/migrations/runner').migrations);
  seedDatabase();
  console.log('Database initialized successfully');
} catch (error) {
  console.error('Failed to initialize database:', error);
  process.exit(1);
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
