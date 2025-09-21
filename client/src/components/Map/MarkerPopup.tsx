import type { Property } from '../../types/property';
import { api } from '../../utils/api';

interface MarkerPopupProps {
  property: Property;
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

export function MarkerPopup({ property }: MarkerPopupProps) {
  // Find the cover image from the property's images array
  const coverImage = property.images?.find((img) => img.isCover);
  const hasCoverImage = coverImage && coverImage.filename;

  return (
    <div className="p-3 min-w-[350px] max-w-[450px]">
      <div className="flex gap-3">
        {/* Left side - Cover Image */}
        <div className="w-2/5 flex-shrink-0">
          {hasCoverImage ? (
            <div className="w-full h-44 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={api.images.getImageUrl(coverImage.filename)}
                alt={`${property.name} cover image`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="w-full h-44 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 text-sm">No image</span>
            </div>
          )}
        </div>

        {/* Right side - Property Information */}
        <div className="w-3/5 space-y-2 min-w-0">
          {/* Property Name */}
          <h3 className="font-semibold text-gray-900 text-sm leading-tight">
            {property.name}
          </h3>

          {/* Price */}
          <div className="text-lg font-bold text-blue-600">
            {formatPrice(property.price)}
          </div>

          {/* Property Details */}
          <div className="space-y-1 text-sm text-gray-600">
            {property.bedrooms && (
              <div className="flex items-center">
                <span className="font-medium">Bedrooms:</span>
                <span className="ml-2">{property.bedrooms}</span>
              </div>
            )}

            {property.bathrooms && (
              <div className="flex items-center">
                <span className="font-medium">Bathrooms:</span>
                <span className="ml-2">{property.bathrooms}</span>
              </div>
            )}

            {property.squareFeet && (
              <div className="flex items-center">
                <span className="font-medium">Size:</span>
                <span className="ml-2">{property.squareFeet} sq ft</span>
              </div>
            )}
          </div>

          {/* Status */}
          <div className="flex items-center flex-wrap">
            <span className="font-medium text-sm">Status:</span>
            <span
              className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${statusColors[property.status]}`}
            >
              {property.status}
            </span>
          </div>

          {/* Train Station */}
          {(property.trainStation || property.nearestStationId) && (
            <div className="text-sm text-gray-600">
              <span className="font-medium">Nearest Station:</span>
              <span className="ml-2">
                {property.trainStation || property.nearestStationId}
                {property.nearestStationDistance && (
                  <span className="text-xs text-gray-500 ml-1">
                    ({property.nearestStationDistance}m,{' '}
                    {property.nearestStationWalkingTime || 0}min walk)
                  </span>
                )}
              </span>
            </div>
          )}

          {/* All Nearby Stations */}
          {property.allStationsWithin1km &&
            property.allStationsWithin1km.length > 1 && (
              <div className="text-xs text-gray-500">
                <span className="font-medium">Nearby stations:</span>
                <div className="mt-1 space-y-0.5">
                  {property.allStationsWithin1km.slice(0, 3).map((station) => (
                    <div key={station.id} className="flex justify-between">
                      <span>{station.name}</span>
                      <span>{station.distance}m</span>
                    </div>
                  ))}
                  {property.allStationsWithin1km.length > 3 && (
                    <div className="text-gray-400">
                      +{property.allStationsWithin1km.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            )}

          {/* Agency */}
          {property.agency && (
            <div className="text-sm text-gray-600">
              <span className="font-medium">Agency:</span>
              <span className="ml-2 break-words">{property.agency}</span>
            </div>
          )}

          {/* Link */}
          {property.link && (
            <div className="pt-2">
              <a
                href={property.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                View Property
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
