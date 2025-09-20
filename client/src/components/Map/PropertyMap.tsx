import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { LatLngBounds } from 'leaflet';
import type { Property } from '../../types/property';
import { PropertyMarker } from './PropertyMarker';
import 'leaflet/dist/leaflet.css';

interface PropertyMapProps {
  properties: Property[];
  center?: [number, number];
  zoom?: number;
}

// Component to fit map bounds to show all properties
function MapBounds({ properties }: { properties: Property[] }) {
  const map = useMap();

  useEffect(() => {
    if (properties.length === 0) return;

    const validProperties = properties.filter((p) => p.gpsLat && p.gpsLng);
    if (validProperties.length === 0) return;

    if (validProperties.length === 1) {
      // Single property - center on it
      const property = validProperties[0];
      map.setView([property.gpsLat!, property.gpsLng!], 15);
    } else {
      // Multiple properties - fit bounds
      const bounds = new LatLngBounds(
        validProperties.map((p) => [p.gpsLat!, p.gpsLng!] as [number, number])
      );
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [map, properties]);

  return null;
}

export function PropertyMap({
  properties,
  center = [51.5074, -0.1278], // Default to London center
  zoom = 11,
}: PropertyMapProps) {
  // Filter properties that have GPS coordinates
  const propertiesWithLocation = properties.filter((p) => p.gpsLat && p.gpsLng);

  return (
    <div className="h-96 w-full rounded-lg border border-gray-200">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Fit bounds to show all properties */}
        <MapBounds properties={propertiesWithLocation} />

        {/* Render property markers */}
        {propertiesWithLocation.map((property) => (
          <PropertyMarker key={property.id} property={property} />
        ))}
      </MapContainer>
    </div>
  );
}
