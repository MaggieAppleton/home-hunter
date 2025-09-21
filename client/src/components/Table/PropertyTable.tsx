import { useState, useMemo, useCallback } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type { Property, UpdatePropertyRequest } from '../../types/property';
import { formatDate } from '../../utils/formatting';
import { PropertyDetailsModal } from '../PropertyDetailsModal';
import { ImageUpload } from '../Forms/ImageUpload';
import { api } from '../../utils/api';

interface PropertyTableProps {
  properties: Property[];
  loading: boolean;
  error: string | null;
  onPropertyUpdate?: (property: UpdatePropertyRequest) => Promise<Property>;
  onPropertyDelete?: (propertyId: number) => Promise<void>;
}

type SortingState = Array<{
  id: string;
  desc: boolean;
}>;

const statusColors = {
  'Not contacted': 'bg-gray-100 text-gray-800',
  Contacted: 'bg-orange-100 text-orange-800',
  'Viewing booked': 'bg-blue-100 text-blue-800',
  Viewed: 'bg-green-100 text-green-800',
  Rejected: 'bg-purple-100 text-purple-800',
  Sold: 'bg-red-100 text-red-800',
};

const statusOptions = [
  'Not contacted',
  'Contacted',
  'Viewing booked',
  'Viewed',
  'Rejected',
  'Sold',
] as const;

// Simple editable cell component
interface EditableCellProps {
  value: unknown;
  onSave: (value: unknown) => Promise<void>;
  type?: 'text' | 'number' | 'select' | 'date';
  options?: readonly string[];
  min?: number;
  max?: number;
  step?: number;
}

function EditableCell({
  value,
  onSave,
  type = 'text',
  options = [],
  min,
  max,
  step,
}: EditableCellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value?.toString() || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (editValue !== value?.toString()) {
      setSaving(true);
      try {
        let finalValue: unknown = editValue;

        if (type === 'number') {
          finalValue = editValue === '' ? undefined : parseFloat(editValue);
        } else if (type === 'date') {
          finalValue = editValue ? new Date(editValue) : undefined;
        }

        await onSave(finalValue);
        setIsEditing(false);
      } catch {
        setEditValue(value?.toString() || ''); // Revert on error
      } finally {
        setSaving(false);
      }
    } else {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditValue(value?.toString() || '');
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    const inputProps = {
      value: editValue,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
        setEditValue(e.target.value),
      onBlur: handleSave,
      onKeyDown: handleKeyDown,
      onMouseDown: (e: React.MouseEvent) => {
        // Keep focus on the input and prevent parent handlers from firing
        e.stopPropagation();
      },
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation();
      },
      disabled: saving,
      autoFocus: true,
      className:
        'w-full h-full px-1 py-1 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm box-border',
      style: undefined,
    };

    if (type === 'select') {
      return (
        <div className="px-1 py-1 rounded min-h-[2rem] flex items-center w-full">
          <select {...inputProps} className={inputProps.className + ' w-full'}>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );
    }

    return (
      <div className="px-1 py-1 rounded min-h-[2rem] flex items-center w-full">
        <input
          type={type === 'date' ? 'date' : type}
          {...inputProps}
          className={inputProps.className + ' w-full'}
          min={min}
          max={max}
          step={step}
        />
      </div>
    );
  }

  const displayValue = (() => {
    if (type === 'date' && value) {
      return formatDate(value as Date);
    }
    if (type === 'select' && value) {
      return (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            statusColors[value as keyof typeof statusColors] ||
            'bg-gray-100 text-gray-800'
          }`}
        >
          {value as string}
        </span>
      );
    }
    return (
      (value as string) || (
        <span className="text-gray-400 italic">Click to edit</span>
      )
    );
  })();

  return (
    <div
      className="cursor-pointer hover:bg-gray-100 px-1 py-1 rounded min-h-[2rem] flex items-center w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsEditing(true);
        }
      }}
      onMouseDown={(e) => {
        // Enter edit mode before default focus handling to avoid immediate blur
        e.preventDefault();
        e.stopPropagation();
        setIsEditing(true);
      }}
      title="Click to edit"
    >
      <div className="truncate w-full">{displayValue}</div>
    </div>
  );
}

// Confirmation Dialog Component
interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

function ConfirmDialog({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

// Column Helper
const columnHelper = createColumnHelper<Property>();

export function PropertyTable({
  properties,
  loading,
  error,
  onPropertyUpdate,
  onPropertyDelete,
}: PropertyTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    propertyId: number | null;
    propertyName: string;
  }>({
    isOpen: false,
    propertyId: null,
    propertyName: '',
  });

  const [imageModal, setImageModal] = useState<{
    isOpen: boolean;
    property: Property | null;
  }>({
    isOpen: false,
    property: null,
  });

  const [detailsModal, setDetailsModal] = useState<{
    isOpen: boolean;
    property: Property | null;
  }>({
    isOpen: false,
    property: null,
  });

  const handleFieldUpdate = useCallback(
    async (propertyId: number, field: string, value: unknown) => {
      try {
        const updateData: UpdatePropertyRequest = {
          id: propertyId,
          [field]: value,
        };

        // Handle special cases
        if (field === 'price' && typeof value === 'number') {
          updateData.price = Math.round(value * 100); // Convert to pence
        }

        if (onPropertyUpdate) {
          await onPropertyUpdate(updateData);
        }
      } catch (error) {
        console.error('Error updating property:', error);
      }
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const handleDeleteClick = useCallback(
    (propertyId: number, propertyName: string) => {
      setDeleteDialog({
        isOpen: true,
        propertyId,
        propertyName,
      });
    },
    []
  );

  const handleDeleteConfirm = useCallback(async () => {
    if (deleteDialog.propertyId && onPropertyDelete) {
      try {
        await onPropertyDelete(deleteDialog.propertyId);
        setDeleteDialog({ isOpen: false, propertyId: null, propertyName: '' });
      } catch (error) {
        console.error('Error deleting property:', error);
      }
    }
  }, [deleteDialog.propertyId]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDeleteCancel = useCallback(() => {
    setDeleteDialog({ isOpen: false, propertyId: null, propertyName: '' });
  }, []);

  const handleImageManageClick = useCallback((property: Property) => {
    setImageModal({
      isOpen: true,
      property,
    });
  }, []);

  const handleImageModalClose = useCallback(() => {
    setImageModal({ isOpen: false, property: null });
  }, []);

  const handleDetailsOpen = useCallback((property: Property) => {
    setDetailsModal({ isOpen: true, property });
  }, []);

  const handleDetailsClose = useCallback(() => {
    setDetailsModal({ isOpen: false, property: null });
  }, []);

  const columns = useMemo(
    () => [
      // Thumbnail column
      columnHelper.display({
        id: 'thumbnail',
        header: '',
        size: 80,
        cell: (info) => {
          const property = info.row.original;
          const coverImage =
            property.images?.find((img) => img.isCover) || property.images?.[0];

          return (
            <div className="flex justify-center">
              {coverImage ? (
                <img
                  src={api.images.getImageUrl(coverImage.filename)}
                  alt={property.name}
                  className="w-12 h-12 object-cover rounded border border-gray-200"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-100 rounded border border-gray-200 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
            </div>
          );
        },
        enableSorting: false,
      }),
      columnHelper.accessor('name', {
        header: 'Property',
        size: 260,
        cell: (info) => (
          <EditableCell
            value={info.getValue()}
            onSave={(value) =>
              handleFieldUpdate(info.row.original.id!, 'name', value)
            }
            type="text"
          />
        ),
        enableSorting: true,
      }),
      columnHelper.accessor('price', {
        header: 'Price',
        size: 120,
        cell: (info) => {
          const value = info.getValue();
          const priceInPounds = value ? value / 100 : undefined;
          return (
            <EditableCell
              value={priceInPounds}
              onSave={(value) =>
                handleFieldUpdate(info.row.original.id!, 'price', value)
              }
              type="number"
              min={0}
              step={1000}
            />
          );
        },
        enableSorting: true,
      }),
      columnHelper.accessor('bedrooms', {
        header: 'Bedrooms',
        size: 100,
        cell: (info) => (
          <EditableCell
            value={info.getValue()}
            onSave={(value) =>
              handleFieldUpdate(info.row.original.id!, 'bedrooms', value)
            }
            type="number"
            min={0}
            max={10}
          />
        ),
        enableSorting: true,
      }),
      columnHelper.accessor('bathrooms', {
        header: 'Bathrooms',
        size: 110,
        cell: (info) => (
          <EditableCell
            value={info.getValue()}
            onSave={(value) =>
              handleFieldUpdate(info.row.original.id!, 'bathrooms', value)
            }
            type="number"
            min={0}
            max={10}
            step={0.5}
          />
        ),
        enableSorting: true,
      }),
      columnHelper.accessor('squareFeet', {
        header: 'Sq Ft',
        size: 110,
        cell: (info) => (
          <EditableCell
            value={info.getValue()}
            onSave={(value) =>
              handleFieldUpdate(info.row.original.id!, 'squareFeet', value)
            }
            type="number"
            min={0}
          />
        ),
        enableSorting: true,
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        size: 160,
        cell: (info) => (
          <EditableCell
            value={info.getValue()}
            onSave={(value) =>
              handleFieldUpdate(info.row.original.id!, 'status', value)
            }
            type="select"
            options={statusOptions}
          />
        ),
        enableSorting: true,
      }),
      columnHelper.accessor('agency', {
        header: 'Agency',
        size: 160,
        cell: (info) => (
          <EditableCell
            value={info.getValue()}
            onSave={(value) =>
              handleFieldUpdate(info.row.original.id!, 'agency', value)
            }
            type="text"
          />
        ),
        enableSorting: true,
      }),
      columnHelper.accessor('nearestStationId', {
        header: 'Nearest Station',
        size: 220,
        cell: (info) => {
          const property = info.row.original;
          return (
            <div className="text-sm">
              {property.nearestStationId ? (
                <div>
                  <div className="font-medium">
                    {property.nearestStationId
                      .replace(/-/g, ' ')
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </div>
                  {property.nearestStationDistance && (
                    <div className="text-xs text-gray-500">
                      {property.nearestStationDistance}m,{' '}
                      {property.nearestStationWalkingTime || 0}min walk
                    </div>
                  )}
                </div>
              ) : (
                <span className="text-gray-400 italic">N/A</span>
              )}
            </div>
          );
        },
        enableSorting: false,
      }),
      columnHelper.accessor('dateViewed', {
        header: 'Date Viewed',
        size: 150,
        cell: (info) => (
          <EditableCell
            value={info.getValue()}
            onSave={(value) =>
              handleFieldUpdate(info.row.original.id!, 'dateViewed', value)
            }
            type="date"
          />
        ),
        enableSorting: true,
      }),
      columnHelper.accessor('link', {
        header: 'Property Link',
        size: 160,
        cell: (info) => {
          const value = info.getValue();
          if (value) {
            return (
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm underline"
              >
                View Property
              </a>
            );
          }
          return (
            <EditableCell
              value={value}
              onSave={(value) =>
                handleFieldUpdate(info.row.original.id!, 'link', value)
              }
              type="text"
            />
          );
        },
        enableSorting: false,
      }),
      columnHelper.accessor('features', {
        header: 'Features',
        size: 300,
        cell: (info) => {
          const features = info.getValue() as string[];
          const featuresText = features.join(', ');

          return (
            <div className="w-full">
              <EditableCell
                value={featuresText}
                onSave={async (value) => {
                  const newFeatures = value
                    ? (value as string)
                        .split(',')
                        .map((f) => f.trim())
                        .filter((f) => f)
                    : [];
                  await handleFieldUpdate(
                    info.row.original.id!,
                    'features',
                    newFeatures
                  );
                }}
                type="text"
              />
            </div>
          );
        },
        enableSorting: false,
      }),
      columnHelper.accessor('notes', {
        header: 'Notes',
        size: 320,
        cell: (info) => (
          <EditableCell
            value={info.getValue()}
            onSave={(value) =>
              handleFieldUpdate(info.row.original.id!, 'notes', value)
            }
            type="text"
          />
        ),
        enableSorting: false,
      }),
      columnHelper.accessor('dateAdded', {
        header: 'Date Added',
        size: 140,
        cell: (info) => formatDate(info.getValue()),
        enableSorting: true,
      }),
      // Actions column
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        size: 100,
        cell: (info) => {
          const property = info.row.original;
          return (
            <div className="flex justify-center space-x-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDetailsOpen(property);
                }}
                className="text-gray-600 hover:text-gray-800 hover:bg-gray-50 p-1 rounded transition-colors"
                title="View/Edit details"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleImageManageClick(property);
                }}
                className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1 rounded transition-colors"
                title="Manage images"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick(
                    property.id!,
                    property.name || 'Unknown Property'
                  );
                }}
                className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1 rounded transition-colors"
                title="Delete property"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          );
        },
        enableSorting: false,
      }),
    ],
    [
      handleFieldUpdate,
      handleDeleteClick,
      handleImageManageClick,
      handleDetailsOpen,
    ]
  );

  const table = useReactTable({
    data: properties,
    columns,
    getRowId: (row) => String(row.id ?? ''),
    columnResizeMode: 'onChange',
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading properties...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Error loading properties
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          No properties found. Add your first property to get started!
        </p>
      </div>
    );
  }

  return (
    <>
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="Delete Property"
        message={`Are you sure you want to delete "${deleteDialog.propertyName}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        confirmText="Delete"
        cancelText="Cancel"
      />

      {/* Details Modal */}
      <PropertyDetailsModal
        property={detailsModal.property}
        isOpen={detailsModal.isOpen}
        onClose={handleDetailsClose}
        onSave={async (update) => {
          if (onPropertyUpdate) {
            await onPropertyUpdate(update);
          }
        }}
      />

      {/* Image Management Modal */}
      {imageModal.isOpen && imageModal.property && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Manage Images - {imageModal.property.name}
                </h3>
                <button
                  onClick={handleImageModalClose}
                  className="text-gray-400 hover:text-gray-600"
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

              <ImageUpload
                propertyId={imageModal.property.id!}
                existingImages={imageModal.property.images || []}
                onImagesChange={(images) => {
                  // Update the property in the local state
                  // This is a simplified approach - in a real app you might want to refresh from server
                  const updatedProperty = { ...imageModal.property!, images };
                  setImageModal({ ...imageModal, property: updatedProperty });
                }}
                onError={(error) => {
                  console.error('Image upload error:', error);
                  // TODO: Show error toast
                }}
              />
            </div>
          </div>
        </div>
      )}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full table-fixed divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 sticky top-0"
                    style={{ width: header.getSize() }}
                    tabIndex={header.column.getCanSort() ? 0 : -1}
                    role={header.column.getCanSort() ? 'button' : undefined}
                    aria-sort={
                      header.column.getIsSorted() === 'asc'
                        ? 'ascending'
                        : header.column.getIsSorted() === 'desc'
                          ? 'descending'
                          : 'none'
                    }
                    onKeyDown={(e) => {
                      if (!header.column.getCanSort()) return;
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        header.column.toggleSorting(undefined, true);
                      }
                      if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        header.column.toggleSorting(false, true);
                      }
                      if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        header.column.toggleSorting(true, true);
                      }
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? 'cursor-pointer select-none flex items-center space-x-1 hover:text-gray-700'
                            : ''
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <span>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </span>
                        {header.column.getCanSort() && (
                          <span className="flex flex-col">
                            <svg
                              className={`w-3 h-3 ${
                                header.column.getIsSorted() === 'asc'
                                  ? 'text-gray-900'
                                  : 'text-gray-400'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                            <svg
                              className={`w-3 h-3 -mt-1 ${
                                header.column.getIsSorted() === 'desc'
                                  ? 'text-gray-900'
                                  : 'text-gray-400'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" />
                            </svg>
                          </span>
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-3 py-4 whitespace-nowrap">
                    <div style={{ width: cell.column.getSize() }}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
