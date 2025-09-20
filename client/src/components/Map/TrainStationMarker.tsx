import { Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';

export interface TrainStation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  lines: string[];
  type: 'tube' | 'overground' | 'national_rail' | 'tram';
  zone?: number;
  distance?: number;
  networks?: string[];
  allTypes?: string[]; // For multi-type stations
}

// Create custom icons for different station types
const createStationIcon = (station: TrainStation) => {
  const colors = {
    tube: '#0099CC', // Bright blue for Tube
    overground: '#EE7C0E', // Orange for Overground
    national_rail: '#DC143C', // Red for National Rail
    tram: '#00B274', // Green for Tram
  };

  // Check if this station has multi-type information
  let types: string[] = [];

  if (station.allTypes && station.allTypes.length > 0) {
    // Use the allTypes array if available (from fixed data)
    types = station.allTypes;
  } else {
    // Fallback to determining types from lines or station type
    const stationTypes = station.lines.reduce((types, line) => {
      if (
        line.includes('Northern') ||
        line.includes('Bakerloo') ||
        line.includes('Jubilee') ||
        line.includes('Victoria')
      ) {
        types.add('tube');
      } else if (line.includes('Overground')) {
        types.add('overground');
      } else if (
        line.includes('Southern') ||
        line.includes('Southeastern') ||
        line.includes('Thameslink')
      ) {
        types.add('national_rail');
      }
      return types;
    }, new Set<string>());

    // If we can't determine types from lines, use the station type
    if (stationTypes.size === 0) {
      stationTypes.add(station.type);
    }

    types = Array.from(stationTypes);
  }

  // Create icon based on number of types
  if (types.length === 1) {
    // Single type - show one circle
    const color = colors[types[0] as keyof typeof colors] || '#666666';
    return new Icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(`
        <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <circle fill="${color}" stroke="#ffffff" stroke-width="2" cx="8" cy="8" r="6"/>
        </svg>
      `)}`,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
      popupAnchor: [0, -8],
    });
  } else {
    // Multiple types - show multiple circles stacked vertically (same size as single)
    const circles = types
      .map((type, index) => {
        const typeColor = colors[type as keyof typeof colors] || '#666666';
        const yOffset = index * 16; // Stack vertically with 16px spacing (same as circle diameter)
        return `<circle fill="${typeColor}" stroke="#ffffff" stroke-width="2" cx="8" cy="${8 + yOffset}" r="6"/>`;
      })
      .join('');

    const totalHeight = 16 + (types.length - 1) * 16; // One full circle + spacing for additional circles

    return new Icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(`
        <svg width="16" height="${totalHeight}" viewBox="0 0 16 ${totalHeight}" xmlns="http://www.w3.org/2000/svg">
          ${circles}
        </svg>
      `)}`,
      iconSize: [16, totalHeight],
      iconAnchor: [8, totalHeight / 2],
      popupAnchor: [0, -totalHeight / 2],
    });
  }
};

interface TrainStationMarkerProps {
  station: TrainStation;
  showDistance?: boolean;
}

export function TrainStationMarker({
  station,
  showDistance = false,
}: TrainStationMarkerProps) {
  const icon = createStationIcon(station);

  return (
    <Marker position={[station.lat, station.lng]} icon={icon}>
      <Popup maxWidth={250} minWidth={200}>
        <div className="p-2">
          <h3 className="font-semibold text-gray-900">{station.name}</h3>
          <div className="mt-1 space-y-1 text-sm">
            <div>
              <span className="font-medium">Type:</span>{' '}
              <span className="capitalize">
                {station.type.replace('_', ' ')}
              </span>
            </div>
            {station.allTypes && station.allTypes.length > 1 && (
              <div>
                <span className="font-medium">All Types:</span>{' '}
                <span className="capitalize text-gray-600">
                  {station.allTypes
                    .map((type) => type.replace('_', ' '))
                    .join(', ')}
                </span>
              </div>
            )}
            {station.zone && (
              <div>
                <span className="font-medium">Zone:</span> {station.zone}
              </div>
            )}
            <div>
              <span className="font-medium">Lines:</span>{' '}
              <span className="text-gray-600">{station.lines.join(', ')}</span>
            </div>
            {showDistance && station.distance && (
              <div>
                <span className="font-medium">Distance:</span>{' '}
                <span className="text-gray-600">{station.distance}m</span>
              </div>
            )}
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
