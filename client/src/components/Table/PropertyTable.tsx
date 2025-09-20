import { useState } from 'react';
import type { Property } from '../../types/property';
import { formatPrice, formatDate } from '../../utils/formatting';

interface PropertyTableProps {
  properties: Property[];
  loading: boolean;
  error: string | null;
}

type SortField =
  | 'name'
  | 'price'
  | 'bedrooms'
  | 'status'
  | 'dateAdded'
  | 'nearestStationDistance';
type SortDirection = 'asc' | 'desc';

const statusColors = {
  'Not contacted': 'bg-gray-100 text-gray-800',
  Contacted: 'bg-orange-100 text-orange-800',
  'Viewing booked': 'bg-blue-100 text-blue-800',
  Viewed: 'bg-green-100 text-green-800',
  Rejected: 'bg-purple-100 text-purple-800',
  Sold: 'bg-red-100 text-red-800',
};

function sortProperties(
  properties: Property[],
  field: SortField,
  direction: SortDirection
): Property[] {
  return [...properties].sort((a, b) => {
    let aValue: any;
    let bValue: any;

    switch (field) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'price':
        aValue = a.price || 0;
        bValue = b.price || 0;
        break;
      case 'bedrooms':
        aValue = a.bedrooms || 0;
        bValue = b.bedrooms || 0;
        break;
      case 'status':
        aValue = a.status;
        bValue = b.status;
        break;
      case 'dateAdded':
        aValue = new Date(a.dateAdded).getTime();
        bValue = new Date(b.dateAdded).getTime();
        break;
      case 'nearestStationDistance':
        aValue = a.nearestStationDistance || Infinity;
        bValue = b.nearestStationDistance || Infinity;
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;
    return 0;
  });
}

export function PropertyTable({
  properties,
  loading,
  error,
}: PropertyTableProps) {
  const [sortField, setSortField] = useState<SortField>('dateAdded');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedProperties = sortProperties(properties, sortField, sortDirection);
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

  const SortableHeader = ({
    field,
    children,
  }: {
    field: SortField;
    children: React.ReactNode;
  }) => (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      <button
        onClick={() => handleSort(field)}
        className="flex items-center space-x-1 hover:text-gray-700 focus:outline-none focus:text-gray-700"
      >
        <span>{children}</span>
        <span className="flex flex-col">
          <svg
            className={`w-3 h-3 ${
              sortField === field && sortDirection === 'asc'
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
              sortField === field && sortDirection === 'desc'
                ? 'text-gray-900'
                : 'text-gray-400'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" />
          </svg>
        </span>
      </button>
    </th>
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <SortableHeader field="name">Property</SortableHeader>
            <SortableHeader field="price">Price</SortableHeader>
            <SortableHeader field="bedrooms">Bedrooms</SortableHeader>
            <SortableHeader field="status">Status</SortableHeader>
            <SortableHeader field="nearestStationDistance">
              Nearest Station
            </SortableHeader>
            <SortableHeader field="dateAdded">Date Added</SortableHeader>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedProperties.map((property) => (
            <tr key={property.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {property.name}
                </div>
                {property.agency && (
                  <div className="text-sm text-gray-500">{property.agency}</div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatPrice(property.price)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {property.bedrooms || 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[property.status]}`}
                >
                  {property.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
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
                  'N/A'
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatDate(property.dateAdded)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
