import { useState, useRef, useMemo } from 'react';
import type { CreatePropertyRequest } from '../types/property';
import { calculateTimeOnMarket, formatTimeOnMarket } from '../utils/formatting';

interface AddPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (
    data: CreatePropertyRequest & { selectedFiles?: File[] }
  ) => Promise<void>;
  loading?: boolean;
}

// Helper function to validate date string format (YYYY-MM-DD)
function isValidDateString(dateString: string): boolean {
  if (!dateString) return false;

  // Check if the string matches YYYY-MM-DD format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) return false;

  // Check if it's a valid date
  const date = new Date(dateString);
  return (
    date instanceof Date &&
    !isNaN(date.getTime()) &&
    date.toISOString().split('T')[0] === dateString
  );
}

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

const statusOptions = [
  'Not contacted',
  'Contacted',
  'Viewing booked',
  'Viewed',
  'Rejected',
  'Sold',
] as const;

export function AddPropertyModal({
  isOpen,
  onClose,
  onCreate,
  loading = false,
}: AddPropertyModalProps) {
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
    link: '',
    agency: '',
    gpsLat: '',
    gpsLng: '',
    notes: '',
    dateViewed: '',
    firstListedDate: '',
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Calculate real-time time on market based on current firstListedDate
  const realTimeOnMarket = useMemo(() => {
    return calculateTimeOnMarket(formData.firstListedDate);
  }, [formData.firstListedDate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate firstListedDate format if provided
    if (
      formData.firstListedDate &&
      !isValidDateString(formData.firstListedDate)
    ) {
      setError('First listed date must be in YYYY-MM-DD format');
      return;
    }

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
      link: formData.link || undefined,
      agency: formData.agency || undefined,
      gpsLat: formData.gpsLat ? parseFloat(formData.gpsLat) : undefined,
      gpsLng: formData.gpsLng ? parseFloat(formData.gpsLng) : undefined,
      notes: formData.notes || undefined,
      dateViewed: formData.dateViewed
        ? new Date(formData.dateViewed)
        : undefined,
      firstListedDate: formData.firstListedDate || undefined,
    };

    // Pass the selected files to upload after creation
    const submitDataWithFiles =
      selectedFiles.length > 0 ? { ...submitData, selectedFiles } : submitData;

    try {
      await onCreate(submitDataWithFiles);
      // Reset form on success
      setFormData({
        name: '',
        price: '',
        squareFeet: '',
        bedrooms: '',
        bathrooms: '',
        status: 'Not contacted',
        link: '',
        agency: '',
        gpsLat: '',
        gpsLng: '',
        notes: '',
        dateViewed: '',
        firstListedDate: '',
      });
      setSelectedFiles([]);
      onClose();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Failed to create property'
      );
    }
  };

  const handleClose = () => {
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Add New Property
          </h2>
          <button
            onClick={handleClose}
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

        <form onSubmit={handleSubmit}>
          <div className="px-6 py-4 space-y-6">
            {/* Property Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Basic Information
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Name/Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. 2 Bedroom Flat, Clapham Common"
                    data-1p-ignore
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (£)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="650000"
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
                      max="10"
                      value={formData.bedrooms}
                      onChange={(e) =>
                        handleInputChange('bedrooms', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bathrooms
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.5"
                      value={formData.bathrooms}
                      onChange={(e) =>
                        handleInputChange('bathrooms', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="1"
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
                    value={formData.squareFeet}
                    onChange={(e) =>
                      handleInputChange('squareFeet', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="850"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      handleInputChange('status', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                {['Viewed', 'Viewing booked', 'Sold', 'Rejected'].includes(
                  formData.status
                ) && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date Viewed
                    </label>
                    <input
                      type="date"
                      value={formData.dateViewed}
                      onChange={(e) =>
                        handleInputChange('dateViewed', e.target.value)
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
                    value={formData.agency}
                    onChange={(e) =>
                      handleInputChange('agency', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Foxtons"
                    data-1p-ignore
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
                      value={formData.gpsLat}
                      onChange={(e) =>
                        handleInputChange('gpsLat', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="51.4618"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Longitude
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={formData.gpsLng}
                      onChange={(e) =>
                        handleInputChange('gpsLng', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="-0.1385"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Listed Date
                  </label>
                  <input
                    type="date"
                    value={formData.firstListedDate}
                    onChange={(e) =>
                      handleInputChange('firstListedDate', e.target.value)
                    }
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                      formData.firstListedDate &&
                      !isValidDateString(formData.firstListedDate)
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                        : ''
                    }`}
                  />
                  {formData.firstListedDate &&
                    !isValidDateString(formData.firstListedDate) && (
                      <p className="mt-1 text-sm text-red-600">
                        Please enter a valid date in YYYY-MM-DD format
                      </p>
                    )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time on Market
                  </label>
                  <div className="text-gray-900">
                    {formatTimeOnMarket(realTimeOnMarket)}
                  </div>
                  {formData.firstListedDate && (
                    <p className="mt-1 text-xs text-gray-500">
                      Calculated from first listed date
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Property Link */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Links</h3>
              <input
                type="url"
                value={formData.link}
                onChange={(e) => handleInputChange('link', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/property"
                data-1p-ignore
              />
            </div>

            {/* Notes */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Notes</h3>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                placeholder="Additional notes about the property..."
              />
            </div>

            {/* Images Section */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Property Images
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Select images to upload after creating the property.
              </p>
              <FileSelector
                selectedFiles={selectedFiles}
                onFilesChange={setSelectedFiles}
                onError={setError}
              />
            </div>

            {error && <div className="text-sm text-red-600">{error}</div>}
          </div>

          <div className="px-6 py-4 border-t flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !formData.name.trim()}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Add Property'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
