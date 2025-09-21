import { useState, useEffect, useRef } from 'react';
import type {
  Property,
  CreatePropertyRequest,
  PropertyImage,
} from '../../types/property';
import { ImageUpload } from './ImageUpload';

// File selector component for new properties
interface FileSelectorProps {
  selectedFiles: File[];
  onFilesChange: (files: File[]) => void;
  onError: (error: string) => void;
}

function FileSelector({
  selectedFiles,
  onFilesChange,
  onError,
}: FileSelectorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    // Validate file types and sizes
    const validFiles: File[] = [];
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
    ];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!allowedTypes.includes(file.type)) {
        onError(`File "${file.name}" is not a supported image type`);
        continue;
      }

      if (file.size > maxSize) {
        onError(`File "${file.name}" is too large (max 10MB)`);
        continue;
      }

      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      onFilesChange([...selectedFiles, ...validFiles]);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    onFilesChange(newFiles);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />

        <div className="space-y-2">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="text-sm text-gray-600">
            <button
              type="button"
              onClick={openFileDialog}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Click to select
            </button>{' '}
            or drag and drop
          </div>
          <p className="text-xs text-gray-500">
            PNG, JPG, GIF, WebP up to 10MB each
          </p>
        </div>
      </div>

      {/* Selected Files Preview */}
      {selectedFiles.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {selectedFiles.map((file, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Remove button */}
              <button
                onClick={() => removeFile(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove image"
              >
                <svg
                  className="w-3 h-3"
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

              {/* File name */}
              <div
                className="mt-1 text-xs text-gray-600 truncate"
                title={file.name}
              >
                {file.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface PropertyFormProps {
  property?: Property;
  onSubmit: (data: CreatePropertyRequest) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
  onError?: (error: string) => void;
}

const statusOptions = [
  'Not contacted',
  'Contacted',
  'Viewing booked',
  'Viewed',
  'Rejected',
  'Sold',
] as const;

export function PropertyForm({
  property,
  onSubmit,
  onCancel,
  loading = false,
  onError,
}: PropertyFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    squareFeet: '',
    bedrooms: '',
    bathrooms: '',
    status: 'Not contacted' as
      | 'Not contacted'
      | 'Contacted'
      | 'Viewing booked'
      | 'Viewed'
      | 'Rejected'
      | 'Sold',
    trainStation: '',
    link: '',
    agency: '',
    gpsLat: '',
    gpsLng: '',
    mapReference: '',
    notes: '',
    dateViewed: '',
    firstListedDate: '',
  });

  const [images, setImages] = useState<PropertyImage[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Populate form with existing property data
  useEffect(() => {
    if (property) {
      setFormData({
        name: property.name || '',
        price: property.price ? (property.price / 100).toString() : '', // Convert from pence to pounds
        squareFeet: property.squareFeet?.toString() || '',
        bedrooms: property.bedrooms?.toString() || '',
        bathrooms: property.bathrooms?.toString() || '',
        status: property.status || 'Not contacted',
        trainStation: property.trainStation || '',
        link: property.link || '',
        agency: property.agency || '',
        gpsLat: property.gpsLat?.toString() || '',
        gpsLng: property.gpsLng?.toString() || '',
        mapReference: property.mapReference || '',
        notes: property.notes || '',
        dateViewed: property.dateViewed
          ? property.dateViewed.toISOString().split('T')[0]
          : '',
        firstListedDate: property.firstListedDate || '',
      });
      setImages(property.images || []);
    }
  }, [property]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert price from pounds to pence
    const priceInPence = formData.price
      ? Math.round(parseFloat(formData.price) * 100)
      : undefined;

    const submitData: CreatePropertyRequest = {
      name: formData.name,
      price: priceInPence,
      squareFeet: formData.squareFeet
        ? parseFloat(formData.squareFeet)
        : undefined,
      bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : undefined,
      bathrooms: formData.bathrooms
        ? parseFloat(formData.bathrooms)
        : undefined,
      status: formData.status,
      trainStation: formData.trainStation || undefined,
      link: formData.link || undefined,
      agency: formData.agency || undefined,
      gpsLat: formData.gpsLat ? parseFloat(formData.gpsLat) : undefined,
      gpsLng: formData.gpsLng ? parseFloat(formData.gpsLng) : undefined,
      mapReference: formData.mapReference || undefined,
      notes: formData.notes || undefined,
      dateViewed: formData.dateViewed
        ? new Date(formData.dateViewed)
        : undefined,
      firstListedDate: formData.firstListedDate || undefined,
    };

    // For new properties, we need to pass the selected files to upload after creation
    if (!property && selectedFiles.length > 0) {
      (submitData as any).selectedFiles = selectedFiles;
    }

    await onSubmit(submitData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {property ? 'Edit Property' : 'Add New Property'}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {property
                ? 'Update the property details below.'
                : 'Enter the details of the property you want to track.'}
            </p>
          </div>

          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="grid grid-cols-6 gap-6">
              {/* Property Name - Required */}
              <div className="col-span-6">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Property Name/Address *
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="e.g. 2 Bedroom Flat, Clapham Common"
                />
              </div>

              {/* Price */}
              <div className="col-span-3">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price (£)
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  min="0"
                  step="1000"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="650000"
                />
              </div>

              {/* Status */}
              <div className="col-span-3">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  name="status"
                  id="status"
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              {/* Bedrooms */}
              <div className="col-span-2">
                <label
                  htmlFor="bedrooms"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bedrooms
                </label>
                <input
                  type="number"
                  name="bedrooms"
                  id="bedrooms"
                  min="0"
                  max="10"
                  value={formData.bedrooms}
                  onChange={(e) =>
                    handleInputChange('bedrooms', e.target.value)
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="2"
                />
              </div>

              {/* Bathrooms */}
              <div className="col-span-2">
                <label
                  htmlFor="bathrooms"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bathrooms
                </label>
                <input
                  type="number"
                  name="bathrooms"
                  id="bathrooms"
                  min="0"
                  max="10"
                  step="0.5"
                  value={formData.bathrooms}
                  onChange={(e) =>
                    handleInputChange('bathrooms', e.target.value)
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="1"
                />
              </div>

              {/* Square Feet */}
              <div className="col-span-2">
                <label
                  htmlFor="squareFeet"
                  className="block text-sm font-medium text-gray-700"
                >
                  Square Feet
                </label>
                <input
                  type="number"
                  name="squareFeet"
                  id="squareFeet"
                  min="0"
                  value={formData.squareFeet}
                  onChange={(e) =>
                    handleInputChange('squareFeet', e.target.value)
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="850"
                />
              </div>

              {/* Train Station */}
              <div className="col-span-3">
                <label
                  htmlFor="trainStation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nearest Train Station
                </label>
                <input
                  type="text"
                  name="trainStation"
                  id="trainStation"
                  value={formData.trainStation}
                  onChange={(e) =>
                    handleInputChange('trainStation', e.target.value)
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Clapham Common"
                />
              </div>

              {/* Agency */}
              <div className="col-span-3">
                <label
                  htmlFor="agency"
                  className="block text-sm font-medium text-gray-700"
                >
                  Agency
                </label>
                <input
                  type="text"
                  name="agency"
                  id="agency"
                  value={formData.agency}
                  onChange={(e) => handleInputChange('agency', e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Foxtons"
                />
              </div>

              {/* GPS Coordinates */}
              <div className="col-span-3">
                <label
                  htmlFor="gpsLat"
                  className="block text-sm font-medium text-gray-700"
                >
                  Latitude
                </label>
                <input
                  type="number"
                  name="gpsLat"
                  id="gpsLat"
                  step="any"
                  value={formData.gpsLat}
                  onChange={(e) => handleInputChange('gpsLat', e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="51.4618"
                />
              </div>

              <div className="col-span-3">
                <label
                  htmlFor="gpsLng"
                  className="block text-sm font-medium text-gray-700"
                >
                  Longitude
                </label>
                <input
                  type="number"
                  name="gpsLng"
                  id="gpsLng"
                  step="any"
                  value={formData.gpsLng}
                  onChange={(e) => handleInputChange('gpsLng', e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="-0.1385"
                />
              </div>

              {/* Property Link */}
              <div className="col-span-6">
                <label
                  htmlFor="link"
                  className="block text-sm font-medium text-gray-700"
                >
                  Property Link (URL)
                </label>
                <input
                  type="url"
                  name="link"
                  id="link"
                  value={formData.link}
                  onChange={(e) => handleInputChange('link', e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="https://example.com/property"
                />
              </div>

              {/* Map Reference */}
              <div className="col-span-3">
                <label
                  htmlFor="mapReference"
                  className="block text-sm font-medium text-gray-700"
                >
                  Map Reference
                </label>
                <input
                  type="text"
                  name="mapReference"
                  id="mapReference"
                  value={formData.mapReference}
                  onChange={(e) =>
                    handleInputChange('mapReference', e.target.value)
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="TQ 295 770"
                />
              </div>

              {/* First Listed Date */}
              <div className="col-span-3">
                <label
                  htmlFor="firstListedDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Listed Date
                </label>
                <input
                  type="date"
                  name="firstListedDate"
                  id="firstListedDate"
                  value={formData.firstListedDate}
                  onChange={(e) =>
                    handleInputChange('firstListedDate', e.target.value)
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              {/* Time on Market (Read-only) */}
              {property && property.timeOnMarketMonths !== undefined && (
                <div className="col-span-3">
                  <label
                    htmlFor="timeOnMarketMonths"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Time on Market (Months)
                  </label>
                  <input
                    type="text"
                    name="timeOnMarketMonths"
                    id="timeOnMarketMonths"
                    value={`${property.timeOnMarketMonths.toFixed(1)} months`}
                    readOnly
                    disabled
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-600 sm:text-sm"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Calculated automatically from first listed date
                  </p>
                </div>
              )}

              {/* Date Viewed */}
              <div className="col-span-3">
                <label
                  htmlFor="dateViewed"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date Viewed
                </label>
                <input
                  type="date"
                  name="dateViewed"
                  id="dateViewed"
                  value={formData.dateViewed}
                  onChange={(e) =>
                    handleInputChange('dateViewed', e.target.value)
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              {/* Notes */}
              <div className="col-span-6">
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Notes
                </label>
                <textarea
                  name="notes"
                  id="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Additional notes about the property..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Images Section */}
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Property Images
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {property
                ? 'Upload and manage images for this property.'
                : 'Select images to upload after creating the property.'}
            </p>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            {property ? (
              <ImageUpload
                propertyId={property.id!}
                existingImages={images}
                onImagesChange={setImages}
                onError={onError || (() => {})}
              />
            ) : (
              <FileSelector
                selectedFiles={selectedFiles}
                onFilesChange={setSelectedFiles}
                onError={onError || (() => {})}
              />
            )}
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading || !formData.name.trim()}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading
            ? 'Saving...'
            : property
              ? 'Update Property'
              : 'Add Property'}
        </button>
      </div>
    </form>
  );
}
