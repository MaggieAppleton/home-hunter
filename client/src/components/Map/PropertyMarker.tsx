import { Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import type { Property } from '../../types/property';
import { MarkerPopup } from './MarkerPopup';

// Create custom icons for different property statuses
const createStatusIcon = (_status: Property['status'], color: string) => {
  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
        <path fill="${color}" stroke="#ffffff" stroke-width="2" d="M12.5 0C5.6 0 0 5.6 0 12.5c0 12.5 12.5 28.5 12.5 28.5s12.5-16 12.5-28.5C25 5.6 19.4 0 12.5 0z"/>
        <circle fill="#ffffff" cx="12.5" cy="12.5" r="6"/>
        <circle fill="${color}" cx="12.5" cy="12.5" r="4"/>
      </svg>
    `)}`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
  });
};

const statusColors = {
  'Not contacted': '#6B7280', // gray
  Contacted: '#F97316', // orange
  'Viewing booked': '#3B82F6', // blue
  Viewed: '#10B981', // green
  Rejected: '#8B5CF6', // purple
  Sold: '#EF4444', // red
};

interface PropertyMarkerProps {
  property: Property;
}

export function PropertyMarker({ property }: PropertyMarkerProps) {
  if (!property.gpsLat || !property.gpsLng) {
    return null;
  }

  const icon = createStatusIcon(property.status, statusColors[property.status]);

  return (
    <Marker position={[property.gpsLat, property.gpsLng]} icon={icon}>
      <Popup maxWidth={300} minWidth={200}>
        <MarkerPopup property={property} />
      </Popup>
    </Marker>
  );
}
