import { useEffect, useMemo, useState } from 'react';
import type { Property, UpdatePropertyRequest } from '../types/property';
import { api } from '../utils/api';

interface PropertyDetailsModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (update: UpdatePropertyRequest) => Promise<void>;
}

export function PropertyDetailsModal({
  property,
  isOpen,
  onClose,
  onSave,
}: PropertyDetailsModalProps) {
  const [propertyDetails, setPropertyDetails] = useState({
    name: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    squareFeet: '',
    status: '',
    agency: '',
    link: '',
    notes: '',
    dateViewed: '',
    firstListedDate: '',
    lat: '',
    lng: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!property) return;

    // Initialize all editable fields from property data
    setPropertyDetails({
      name: property.name || '',
      price: property.price != null ? String(property.price) : '',
      bedrooms: property.bedrooms != null ? String(property.bedrooms) : '',
      bathrooms: property.bathrooms != null ? String(property.bathrooms) : '',
      squareFeet:
        property.squareFeet != null ? String(property.squareFeet) : '',
      status: property.status || '',
      agency: property.agency || '',
      link: property.link || '',
      notes: property.notes || '',
      dateViewed: property.dateViewed
        ? new Date(property.dateViewed).toISOString().split('T')[0]
        : '',
      firstListedDate: property.firstListedDate || '',
      lat: property.gpsLat != null ? String(property.gpsLat) : '',
      lng: property.gpsLng != null ? String(property.gpsLng) : '',
    });
    setError(null);
  }, [property]);

  const parsedValues = useMemo(() => {
    const parsedPrice =
      propertyDetails.price.trim() === ''
        ? undefined
        : Number(propertyDetails.price);
    const parsedBedrooms =
      propertyDetails.bedrooms.trim() === ''
        ? undefined
        : Number(propertyDetails.bedrooms);
    const parsedBathrooms =
      propertyDetails.bathrooms.trim() === ''
        ? undefined
        : Number(propertyDetails.bathrooms);
    const parsedSquareFeet =
      propertyDetails.squareFeet.trim() === ''
        ? undefined
        : Number(propertyDetails.squareFeet);
    const parsedLat =
      propertyDetails.lat.trim() === ''
        ? undefined
        : Number(propertyDetails.lat);
    const parsedLng =
      propertyDetails.lng.trim() === ''
        ? undefined
        : Number(propertyDetails.lng);
    return {
      parsedPrice,
      parsedBedrooms,
      parsedBathrooms,
      parsedSquareFeet,
      parsedLat,
      parsedLng,
    };
  }, [propertyDetails]);

  const validate = (): string | null => {
    const {
      parsedPrice,
      parsedBedrooms,
      parsedBathrooms,
      parsedSquareFeet,
      parsedLat,
      parsedLng,
    } = parsedValues;

    // Validate required fields
    if (!propertyDetails.name.trim()) return 'Property name is required';
    if (!propertyDetails.status.trim()) return 'Status is required';

    // Validate numeric fields
    if (
      parsedPrice !== undefined &&
      (!Number.isFinite(parsedPrice) || parsedPrice < 0)
    )
      return 'Price must be a positive number';
    if (
      parsedBedrooms !== undefined &&
      (!Number.isFinite(parsedBedrooms) || parsedBedrooms < 0)
    )
      return 'Bedrooms must be a positive number';
    if (
      parsedBathrooms !== undefined &&
      (!Number.isFinite(parsedBathrooms) || parsedBathrooms < 0)
    )
      return 'Bathrooms must be a positive number';
    if (
      parsedSquareFeet !== undefined &&
      (!Number.isFinite(parsedSquareFeet) || parsedSquareFeet < 0)
    )
      return 'Square feet must be a positive number';
    if (
      parsedLat !== undefined &&
      (!Number.isFinite(parsedLat) || parsedLat < -90 || parsedLat > 90)
    )
      return 'Latitude must be between -90 and 90';
    if (
      parsedLng !== undefined &&
      (!Number.isFinite(parsedLng) || parsedLng < -180 || parsedLng > 180)
    )
      return 'Longitude must be between -180 and 180';

    return null;
  };

  const handleSave = async () => {
    if (!property) return;
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const {
        parsedPrice,
        parsedBedrooms,
        parsedBathrooms,
        parsedSquareFeet,
        parsedLat,
        parsedLng,
      } = parsedValues;

      await onSave({
        id: property.id!,
        name: propertyDetails.name.trim(),
        price: parsedPrice,
        bedrooms: parsedBedrooms,
        bathrooms: parsedBathrooms,
        squareFeet: parsedSquareFeet,
        status: propertyDetails.status as Property['status'],
        agency: propertyDetails.agency.trim() || undefined,
        link: propertyDetails.link.trim() || undefined,
        notes: propertyDetails.notes.trim() || undefined,
        gpsLat: parsedLat,
        gpsLng: parsedLng,
        dateViewed: propertyDetails.dateViewed
          ? new Date(propertyDetails.dateViewed)
          : undefined,
        firstListedDate: propertyDetails.firstListedDate || undefined,
      });
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen || !property) return null;

  const formatDate = (date?: Date | string) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <input
            type="text"
            value={propertyDetails.name}
            onChange={(e) =>
              setPropertyDetails((prev) => ({ ...prev, name: e.target.value }))
            }
            className="text-xl font-semibold text-gray-900 bg-transparent border-none outline-none focus:ring-0 p-0"
            placeholder="Property name"
          />
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="px-6 py-4 space-y-6">
          {/* Images Section */}
          {property.images && property.images.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Images</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {property.images.map((image) => (
                  <div key={image.id} className="relative group">
                    <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={api.images.getImageUrl(image.filename)}
                        alt={image.originalName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {image.isCover && (
                      <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                        Cover
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Property Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Basic Information
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  value={propertyDetails.price}
                  onChange={(e) =>
                    setPropertyDetails((prev) => ({
                      ...prev,
                      price: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter price in pence"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={propertyDetails.bedrooms}
                    onChange={(e) =>
                      setPropertyDetails((prev) => ({
                        ...prev,
                        bedrooms: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Number of bedrooms"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={propertyDetails.bathrooms}
                    onChange={(e) =>
                      setPropertyDetails((prev) => ({
                        ...prev,
                        bathrooms: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Number of bathrooms"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Square Feet
                </label>
                <input
                  type="number"
                  min="0"
                  value={propertyDetails.squareFeet}
                  onChange={(e) =>
                    setPropertyDetails((prev) => ({
                      ...prev,
                      squareFeet: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Square feet"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={propertyDetails.status}
                  onChange={(e) =>
                    setPropertyDetails((prev) => ({
                      ...prev,
                      status: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select status</option>
                  <option value="Not contacted">Not contacted</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Viewing booked">Viewing booked</option>
                  <option value="Viewed">Viewed</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Sold">Sold</option>
                </select>
              </div>

              {['Viewed', 'Viewing booked', 'Sold', 'Rejected'].includes(
                propertyDetails.status
              ) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date Viewed
                  </label>
                  <input
                    type="date"
                    value={propertyDetails.dateViewed}
                    onChange={(e) =>
                      setPropertyDetails((prev) => ({
                        ...prev,
                        dateViewed: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Agency
                </label>
                <input
                  type="text"
                  value={propertyDetails.agency}
                  onChange={(e) =>
                    setPropertyDetails((prev) => ({
                      ...prev,
                      agency: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Agency name"
                />
              </div>
            </div>

            {/* Location & Dates */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Location & Dates
              </h3>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={propertyDetails.lat}
                    onChange={(e) =>
                      setPropertyDetails((prev) => ({
                        ...prev,
                        lat: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="51.5074"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={propertyDetails.lng}
                    onChange={(e) =>
                      setPropertyDetails((prev) => ({
                        ...prev,
                        lng: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="-0.1278"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Listed Date
                </label>
                <input
                  type="date"
                  value={propertyDetails.firstListedDate}
                  onChange={(e) =>
                    setPropertyDetails((prev) => ({
                      ...prev,
                      firstListedDate: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time on Market
                </label>
                <div className="text-gray-900">
                  {property.timeOnMarketMonths !== undefined &&
                  property.timeOnMarketMonths !== null
                    ? `${Math.round(property.timeOnMarketMonths)} months`
                    : 'N/A'}
                </div>
              </div>
            </div>
          </div>

          {/* Nearby Stations */}
          {property.nearbyStations && property.nearbyStations.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Nearby Stations
              </h3>
              <div className="space-y-3">
                {property.nearbyStations.map((station) => (
                  <div
                    key={station.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        {station.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {station.type.charAt(0).toUpperCase() +
                          station.type.slice(1)}
                        {station.lines && station.lines.length > 0 && (
                          <span className="ml-2">
                            • {station.lines.join(', ')}
                          </span>
                        )}
                        {station.zone && (
                          <span className="ml-2">• Zone {station.zone}</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {station.distance}m
                      </div>
                      <div className="text-xs text-gray-500">
                        {station.walkingTime}min walk
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Nearby Schools */}
          {property.nearbySchools && property.nearbySchools.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Nearby Schools
              </h3>
              <div className="space-y-3">
                {property.nearbySchools.map((school) => (
                  <div
                    key={school.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        {school.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {school.schoolType} • Ofsted: {school.ofstedRating}
                        {school.performancePercentage > 0 && (
                          <span className="ml-2">
                            • {school.performancePercentage}% performance
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {school.distance}m
                      </div>
                      <div className="text-xs text-gray-500">
                        {school.walkingTime}min walk
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Notes</h3>
            <textarea
              value={propertyDetails.notes}
              onChange={(e) =>
                setPropertyDetails((prev) => ({
                  ...prev,
                  notes: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              placeholder="Add notes about this property..."
            />
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Links</h3>
            <input
              type="url"
              value={propertyDetails.link}
              onChange={(e) =>
                setPropertyDetails((prev) => ({
                  ...prev,
                  link: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Property listing URL"
            />
            {propertyDetails.link && (
              <div className="mt-2">
                <a
                  href={propertyDetails.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  View Property Listing
                </a>
              </div>
            )}
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}
        </div>

        <div className="px-6 py-4 border-t flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Close
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
