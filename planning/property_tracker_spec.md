# South London Property Tracker - Technical Specification

## Overview
A local web application for tracking properties during house hunting in South London. The app will display properties on an interactive map with table views and data management capabilities.

## Technical Stack
- **Frontend**: React with TypeScript
- **Mapping**: Leaflet.js with OpenStreetMap tiles (free alternative to Google Maps)
- **Data Storage**: SQLite with better-sqlite3 (for robust local storage)
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Local Server**: Node.js/Express for API endpoints

## Core Features

### 1. Interactive Map View
- **Base Map**: OpenStreetMap tiles via Leaflet.js
- **Property Markers**: Custom pins showing property status (Available, Under Offer, Sold, etc.)
- **Marker Colors**: 
  - Gray: Not contacted
  - Orange: Contacted
  - Blue: Viewing booked
  - Green: Viewed
  - Red: Sold
- **Marker Popups**: Display key info (address, price, bedrooms, status)
- **Property Images**: Show cover image in popup
- **Train Stations**: Display train station markers (data from TFL API or static dataset)
- **Clustering**: Group nearby properties when zoomed out

### 2. Property Data Table
- **Sortable Columns**: All property fields
- **Filtering**: By status, price range, bedrooms, area
- **Search**: Text search across all fields
- **Inline Editing**: Quick edits without opening forms
- **Image Thumbnails**: Show property cover images
- **Export**: Export filtered data as CSV

### 3. Add/Edit Properties
- **Form Fields**:
  - Name/Address (required)
  - Price (£, with formatting)
  - GPS Coordinates (with map picker)
  - Square Feet
  - Bedrooms, Bathrooms
  - Status (dropdown)
  - Train Station (nearest, auto-suggest)
  - Features (tags/chips)
  - Agency
  - Property Link (URL)
  - Map Reference
  - Images (multiple upload with cover selection)
  - Notes (freeform text)
  - Date Added (auto-generated)
  - Date Viewed (optional)

### 4. Data Management
- **Storage**: SQLite database (`properties.db`)
- **Backup**: Export/import JSON functionality
- **Images**: Store in local `images/` folder within the repository
- **Validation**: Required fields, coordinate validation, price formatting

## Database Schema

### Properties Table
```sql
CREATE TABLE properties (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  price INTEGER, -- Store in pence for accuracy
  square_feet REAL,
  bedrooms INTEGER,
  bathrooms REAL,
  status TEXT DEFAULT 'Not contacted',
  train_station TEXT,
  features TEXT, -- JSON array as string
  link TEXT,
  agency TEXT,
  gps_lat REAL,
  gps_lng REAL,
  map_reference TEXT,
  cover_image TEXT, -- filename
  notes TEXT,
  date_added DATETIME DEFAULT CURRENT_TIMESTAMP,
  date_viewed DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Images Table
```sql
CREATE TABLE property_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  property_id INTEGER,
  filename TEXT NOT NULL,
  original_name TEXT,
  is_cover BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (property_id) REFERENCES properties (id) ON DELETE CASCADE
);
```

## API Endpoints

### Properties
- `GET /api/properties` - List all properties
- `POST /api/properties` - Create new property
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property
- `GET /api/properties/:id` - Get single property

### Images
- `POST /api/properties/:id/images` - Upload property images
- `DELETE /api/images/:id` - Delete image
- `PUT /api/images/:id/cover` - Set as cover image
- `GET /api/images/:filename` - Serve image file

### Data Management
- `GET /api/export` - Export all data as JSON
- `POST /api/import` - Import JSON data

## File Structure
```
property-tracker/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Map/
│   │   │   │   ├── PropertyMap.tsx
│   │   │   │   ├── PropertyMarker.tsx
│   │   │   │   └── MarkerPopup.tsx
│   │   │   ├── Table/
│   │   │   │   ├── PropertyTable.tsx
│   │   │   │   └── TableFilters.tsx
│   │   │   ├── Forms/
│   │   │   │   ├── PropertyForm.tsx
│   │   │   │   └── ImageUpload.tsx
│   │   │   └── Layout/
│   │   │       ├── Header.tsx
│   │   │       └── Navigation.tsx
│   │   ├── hooks/
│   │   │   ├── useProperties.ts
│   │   │   └── useMap.ts
│   │   ├── types/
│   │   │   └── property.ts
│   │   ├── utils/
│   │   │   ├── api.ts
│   │   │   └── formatting.ts
│   │   └── App.tsx
│   ├── public/
│   └── package.json
├── server/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── properties.ts
│   │   │   └── images.ts
│   │   ├── database/
│   │   │   ├── connection.ts
│   │   │   └── migrations/
│   │   ├── middleware/
│   │   └── server.ts
│   └── package.json
├── data/
│   ├── properties.db
│   └── images/
└── README.md
```

## TypeScript Types

```typescript
interface Property {
  id?: number;
  name: string;
  price?: number;
  squareFeet?: number;
  bedrooms?: number;
  bathrooms?: number;
  status: 'Not contacted' | 'Contacted' | 'Viewing booked' | 'Viewed' | 'Sold';
  trainStation?: string;
  features: string[];
  link?: string;
  agency?: string;
  gpsLat?: number;
  gpsLng?: number;
  mapReference?: string;
  coverImage?: string;
  notes?: string;
  dateAdded: Date;
  dateViewed?: Date;
  images: PropertyImage[];
}

interface PropertyImage {
  id: number;
  propertyId: number;
  filename: string;
  originalName: string;
  isCover: boolean;
}
```

## Key Features for South London Context

### Train Station Integration
- Load South London train stations (Overground, National Rail, Tube)
- Calculate walking time to nearest station
- Filter properties by maximum travel time to central London

### Area-Specific Features
- Borough boundaries overlay
- School catchment areas (if relevant)
- Local amenities (parks, shops, gyms)

## Development Phases

### Phase 1: Core Functionality
1. Basic map with property markers
2. SQLite database setup
3. Property CRUD operations
4. Simple table view

### Phase 2: Enhanced Features
1. Image upload and management
2. Advanced filtering and search
3. Train station data integration
4. Import existing Airtable data

### Phase 3: Polish
1. Responsive design
2. Error handling and validation

## Migration from Airtable
- Create import script to convert CSV export to SQLite
- Map existing fields to new schema
- Handle any missing GPS coordinates (geocoding)
- Preserve any existing images

## Deployment
- Runs locally via `npm run dev`
- Single command to start both client and server
- Data persists in local SQLite file
- Images stored in local filesystem

This spec provides a robust foundation for your property tracking needs while being realistic to implement as a local application.