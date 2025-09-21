import { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { LatLngBounds } from 'leaflet';
import type { Property } from '../../types/property';
import { PropertyMarker } from './PropertyMarker';
// import { useTrainStations } from '../../hooks/useTrainStations';
import 'leaflet/dist/leaflet.css';

interface PropertyMapProps {
  properties: Property[];
  center?: [number, number];
  zoom?: number;
}

// Component to fit map bounds to show all properties
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function MapBounds({ properties }: { properties: Property[] }) {
  const map = useMap();

  // Create a stable key representing the coordinates to avoid excessive re-runs
  const coords = useMemo(() => {
    return properties
      .filter((p) => p.gpsLat && p.gpsLng)
      .map((p) => [p.gpsLat!, p.gpsLng!] as [number, number]);
  }, [properties]);

  const boundsKey = useMemo(
    () => coords.map((c) => `${c[0].toFixed(6)},${c[1].toFixed(6)}`).join('|'),
    [coords]
  );

  useEffect(() => {
    if (coords.length === 0) return;

    if (coords.length === 1) {
      const [lat, lng] = coords[0];
      map.setView([lat, lng], 15);
    } else {
      const bounds = new LatLngBounds(coords);
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [map, boundsKey, coords]);

  return null;
}

export function PropertyMap({
  properties,
  center = [51.5074, -0.1278], // Default to London center
  zoom = 11,
}: PropertyMapProps) {
  const [showStations, setShowStations] = useState(false);
  // const { stations, loading: stationsLoading } = useTrainStations();

  const isValidCoord = (lat?: number, lng?: number) => {
    if (lat == null || lng == null) return false;
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return false;
    return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
  };

  // Filter properties that have valid GPS coordinates
  const propertiesWithLocation = properties.filter((p) =>
    isValidCoord(p.gpsLat, p.gpsLng)
  );

  return (
    <div className="relative">
      {/* Station toggle */}
      <div className="absolute top-4 right-4 z-[1000] bg-white rounded-lg shadow-lg p-3">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showStations}
            onChange={(e) => setShowStations(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">
            Show Train Stations
          </span>
        </label>
      </div>

      <div
        className="w-full rounded-lg border border-gray-200"
        style={{ height: '800px' }}
      >
        <MapContainer
          center={center}
          zoom={zoom}
          style={{ height: '100%', width: '100%' }}
          className="rounded-lg map-clean"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />

          {/* Fit bounds to show all properties - disabled during freeze debug */}
          {/* <MapBounds properties={propertiesWithLocation} /> */}

          {/* Render property markers */}
          {propertiesWithLocation.map((property) => (
            <PropertyMarker key={property.id} property={property} />
          ))}

          {/* Render train station markers */}
          {/* Station markers disabled during freeze debug */}
          {/* {showStations &&
            !stationsLoading &&
            stations.map((station) => (
              <TrainStationMarker key={station.id} station={station} />
            ))} */}
        </MapContainer>
      </div>
    </div>
  );
}
