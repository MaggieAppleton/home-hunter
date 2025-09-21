import { useState, useMemo, useCallback } from 'react';
import type { Property, PropertyFilters } from '../types/property';

export function usePropertyFilters(properties: Property[]) {
  const [filters, setFilters] = useState<PropertyFilters>({});

  const areFiltersEqual = (a: PropertyFilters, b: PropertyFilters) => {
    return (
      (a.status || '') === (b.status || '') &&
      (a.search || '') === (b.search || '')
    );
  };

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      // Status filter
      if (filters.status && property.status !== filters.status) {
        return false;
      }

      // Search filter (case-insensitive search across name, agency, and notes)
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const searchableText = [
          property.name,
          property.agency,
          property.notes,
          property.trainStation,
          property.mapReference,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();

        if (!searchableText.includes(searchTerm)) {
          return false;
        }
      }

      return true;
    });
  }, [properties, filters]);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const updateFilters = useCallback((newFilters: PropertyFilters) => {
    setFilters((prev) =>
      areFiltersEqual(prev, newFilters) ? prev : newFilters
    );
  }, []);

  return {
    filters,
    filteredProperties,
    clearFilters,
    updateFilters,
  };
}
