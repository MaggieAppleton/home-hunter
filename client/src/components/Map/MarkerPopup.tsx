import type { Property } from '../../types/property';
import { api } from '../../utils/api';
import {
  formatTimeOnMarket,
  calculateTimeOnMarket,
} from '../../utils/formatting';

interface MarkerPopupProps {
  property: Property;
  onOpenDetailsModal?: (property: Property) => void;
}

function formatPrice(price?: number): string {
  if (!price) return 'Price not available';
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price / 100); // Convert from pence to pounds
}

const statusColors = {
  'Not contacted': 'bg-gray-100 text-gray-800',
  Contacted: 'bg-orange-100 text-orange-800',
  'Viewing booked': 'bg-blue-100 text-blue-800',
  Viewed: 'bg-green-100 text-green-800',
  Rejected: 'bg-purple-100 text-purple-800',
  Sold: 'bg-red-100 text-red-800',
};

export function MarkerPopup({
  property,
  onOpenDetailsModal,
}: MarkerPopupProps) {
  // Find the cover image from the property's images array
  const coverImage = property.images?.find((img) => img.isCover);
  const hasCoverImage = coverImage && coverImage.filename;

  // Calculate time on market
  const timeOnMarket = calculateTimeOnMarket(property.firstListedDate);

  return (
    <div className="p-4 min-w-[380px] max-w-[480px]">
      {/* Header with name and price */}
      <div className="mb-3">
        <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1">
          {property.name}
        </h3>
        <div className="text-xl font-bold text-blue-600">
          {formatPrice(property.price)}
        </div>
      </div>

      <div className="flex gap-4">
        {/* Left side - Cover Image */}
        <div className="w-2/5 flex-shrink-0">
          {hasCoverImage ? (
            <div className="w-full h-40 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={api.images.getImageUrl(coverImage.filename)}
                alt={`${property.name} cover image`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 text-sm">No image</span>
            </div>
          )}
        </div>

        {/* Right side - Property Information */}
        <div className="w-3/5 space-y-3 min-w-0">
          {/* Property Details */}
          <div className="space-y-1">
            {property.bedrooms && (
              <div className="text-sm text-gray-700">
                <span className="font-medium">
                  {property.bedrooms} bedroom
                  {property.bedrooms !== 1 ? 's' : ''}
                </span>
              </div>
            )}

            {property.bathrooms && (
              <div className="text-sm text-gray-700">
                <span className="font-medium">
                  {property.bathrooms} bathroom
                  {property.bathrooms !== 1 ? 's' : ''}
                </span>
              </div>
            )}

            {property.squareFeet && (
              <div className="text-sm text-gray-700">
                <span className="font-medium">
                  {property.squareFeet.toLocaleString()} sq ft
                </span>
              </div>
            )}
          </div>

          {/* Status */}
          <div>
            <span
              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[property.status]}`}
            >
              {property.status}
            </span>
          </div>

          {/* Nearby Stations */}
          {property.nearbyStations && property.nearbyStations.length > 0 && (
            <div className="space-y-1">
              <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                Nearby Stations
              </div>
              <div className="space-y-1">
                {property.nearbyStations.slice(0, 3).map((station) => (
                  <div key={station.id} className="text-xs text-gray-600">
                    <span className="font-medium">{station.name}</span>
                    <span className="ml-2 text-gray-500">
                      {station.distance}m • {station.walkingTime}min walk
                    </span>
                  </div>
                ))}
                {property.nearbyStations.length > 3 && (
                  <div className="text-xs text-gray-400">
                    +{property.nearbyStations.length - 3} more stations
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Time on Market */}
          {timeOnMarket !== null && (
            <div className="text-xs text-gray-600">
              <span className="font-medium">Time on market:</span>
              <span className="ml-1">{formatTimeOnMarket(timeOnMarket)}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 space-y-2">
            {property.link && (
              <a
                href={property.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-3 py-1.5 border border-blue-600 text-xs font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                View on Zoopla
              </a>
            )}
            {onOpenDetailsModal && (
              <button
                onClick={() => onOpenDetailsModal(property)}
                className="inline-flex items-center justify-center w-full px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                View Details
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
