import { useState, useEffect, useRef } from 'react';
import type { PropertyFilters } from '../../types/property';

interface TableFiltersProps {
  filters: PropertyFilters;
  onFiltersChange: (filters: PropertyFilters) => void;
  onClearFilters: () => void;
}

const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'Not contacted', label: 'Not contacted' },
  { value: 'Contacted', label: 'Contacted' },
  { value: 'Viewing booked', label: 'Viewing booked' },
  { value: 'Viewed', label: 'Viewed' },
  { value: 'Rejected', label: 'Rejected' },
  { value: 'Sold', label: 'Sold' },
];

export function TableFilters({
  filters,
  onFiltersChange,
  onClearFilters,
}: TableFiltersProps) {
  const [localSearch, setLocalSearch] = useState(filters.search || '');
  const lastEmittedSearchRef = useRef<string>(filters.search || '');

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
  };

  // Debounce search input and avoid emitting if value didn't change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (lastEmittedSearchRef.current !== localSearch) {
        lastEmittedSearchRef.current = localSearch;
        onFiltersChange({ ...filters, search: localSearch });
      }
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [localSearch, filters, onFiltersChange]);

  const handleStatusChange = (status: string) => {
    onFiltersChange({ ...filters, status: status || undefined });
  };

  const hasActiveFilters = filters.status || filters.search;

  return (
    <div className="bg-white p-4 border-b border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Search */}
        <div>
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Search
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search properties, agencies, notes..."
            value={localSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Status Filter */}
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Status
          </label>
          <select
            id="status"
            value={filters.status || ''}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClearFilters}
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
