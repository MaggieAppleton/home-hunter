import React, { useEffect, useMemo, useState } from 'react';
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
  const [lat, setLat] = useState<string>('');
  const [lng, setLng] = useState<string>('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!property) return;
    setLat(property.gpsLat != null ? String(property.gpsLat) : '');
    setLng(property.gpsLng != null ? String(property.gpsLng) : '');
    setError(null);
  }, [property]);

  const parsedLatLng = useMemo(() => {
    const parsedLat = lat.trim() === '' ? undefined : Number(lat);
    const parsedLng = lng.trim() === '' ? undefined : Number(lng);
    return { parsedLat, parsedLng };
  }, [lat, lng]);

  const validate = (): string | null => {
    const { parsedLat, parsedLng } = parsedLatLng;
    if (parsedLat == null || parsedLng == null)
      return 'Latitude and longitude are required';
    if (!Number.isFinite(parsedLat) || !Number.isFinite(parsedLng))
      return 'Latitude/Longitude must be numbers';
    if (parsedLat < -90 || parsedLat > 90)
      return 'Latitude must be between -90 and 90';
    if (parsedLng < -180 || parsedLng > 180)
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
      await onSave({
        id: property.id!,
        gpsLat: parsedLatLng.parsedLat,
        gpsLng: parsedLatLng.parsedLng,
      });
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen || !property) return null;

  const formatPrice = (price?: number) => {
    if (!price) return 'N/A';
    return `£${(price / 100).toLocaleString()}`;
  };

  const formatDate = (date?: Date | string) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {property.name}
          </h2>
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
                <div className="text-lg font-semibold text-gray-900">
                  {formatPrice(property.price)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bedrooms
                  </label>
                  <div className="text-gray-900">
                    {property.bedrooms || 'N/A'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bathrooms
                  </label>
                  <div className="text-gray-900">
                    {property.bathrooms || 'N/A'}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Square Feet
                </label>
                <div className="text-gray-900">
                  {property.squareFeet?.toLocaleString() || 'N/A'}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <div className="text-gray-900">{property.status}</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Agency
                </label>
                <div className="text-gray-900">{property.agency || 'N/A'}</div>
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
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
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
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="-0.1278"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Added
                </label>
                <div className="text-gray-900">
                  {formatDate(property.dateAdded)}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Viewed
                </label>
                <div className="text-gray-900">
                  {formatDate(property.dateViewed)}
                </div>
              </div>

              {property.nearestStationId && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nearest Station
                  </label>
                  <div className="text-gray-900">
                    {property.nearestStationId
                      .replace(/-/g, ' ')
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                    {property.nearestStationDistance && (
                      <span className="text-sm text-gray-500 ml-2">
                        ({property.nearestStationDistance}m,{' '}
                        {property.nearestStationWalkingTime || 0}min walk)
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          {property.notes && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Notes</h3>
              <div className="text-gray-900 whitespace-pre-wrap">
                {property.notes}
              </div>
            </div>
          )}

          {/* Links */}
          {property.link && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Links</h3>
              <a
                href={property.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 underline"
              >
                View Property Listing
              </a>
            </div>
          )}

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
            {saving ? 'Saving...' : 'Save Coordinates'}
          </button>
        </div>
      </div>
    </div>
  );
}
