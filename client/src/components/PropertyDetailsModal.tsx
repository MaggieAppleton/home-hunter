import React, { useEffect, useMemo, useState } from 'react';
import type { Property, UpdatePropertyRequest } from '../types/property';

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-xl mx-4">
        <div className="px-5 py-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Property Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-5 h-5"
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

        <div className="px-5 py-4 space-y-4">
          <div>
            <div className="text-sm text-gray-500">Name</div>
            <div className="text-gray-900 font-medium break-words">
              {property.name}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          {error && <div className="text-sm text-red-600">{error}</div>}

          {property.link && (
            <div>
              <a
                href={property.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 text-sm underline"
              >
                Open listing
              </a>
            </div>
          )}
        </div>

        <div className="px-5 py-4 border-t flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
