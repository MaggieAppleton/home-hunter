import { useState, useEffect, useCallback } from 'react';
import type {
  Property,
  CreatePropertyRequest,
  UpdatePropertyRequest,
} from '../types/property';
import { api, ApiError } from '../utils/api';

interface UsePropertiesResult {
  properties: Property[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  createProperty: (data: CreatePropertyRequest) => Promise<Property>;
  updateProperty: (data: UpdatePropertyRequest) => Promise<Property>;
  deleteProperty: (id: number) => Promise<void>;
}

export function useProperties(): UsePropertiesResult {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.properties.list();

      // Convert date strings to Date objects
      const propertiesWithDates = data.map((property) => ({
        ...property,
        dateAdded: new Date(property.dateAdded),
        dateViewed: property.dateViewed
          ? new Date(property.dateViewed)
          : undefined,
      }));

      setProperties(propertiesWithDates);
    } catch (err) {
      const errorMessage =
        err instanceof ApiError ? err.message : 'Failed to fetch properties';
      setError(errorMessage);
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createProperty = useCallback(
    async (data: CreatePropertyRequest): Promise<Property> => {
      try {
        const newProperty = await api.properties.create(data);

        // Convert date strings to Date objects
        const propertyWithDates = {
          ...newProperty,
          dateAdded: new Date(newProperty.dateAdded),
          dateViewed: newProperty.dateViewed
            ? new Date(newProperty.dateViewed)
            : undefined,
        };

        setProperties((prev) => [propertyWithDates, ...prev]);
        return propertyWithDates;
      } catch (err) {
        const errorMessage =
          err instanceof ApiError ? err.message : 'Failed to create property';
        setError(errorMessage);
        throw err;
      }
    },
    []
  );

  const updateProperty = useCallback(
    async (data: UpdatePropertyRequest): Promise<Property> => {
      try {
        const updatedProperty = await api.properties.update(data);

        // Convert date strings to Date objects
        const propertyWithDates = {
          ...updatedProperty,
          dateAdded: new Date(updatedProperty.dateAdded),
          dateViewed: updatedProperty.dateViewed
            ? new Date(updatedProperty.dateViewed)
            : undefined,
        };

        setProperties((prev) =>
          prev.map((p) =>
            p.id === propertyWithDates.id ? propertyWithDates : p
          )
        );
        return propertyWithDates;
      } catch (err) {
        const errorMessage =
          err instanceof ApiError ? err.message : 'Failed to update property';
        setError(errorMessage);
        throw err;
      }
    },
    []
  );

  const deleteProperty = useCallback(async (id: number): Promise<void> => {
    try {
      await api.properties.delete(id);
      setProperties((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      const errorMessage =
        err instanceof ApiError ? err.message : 'Failed to delete property';
      setError(errorMessage);
      throw err;
    }
  }, []);

  // Fetch properties on mount
  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  return {
    properties,
    loading,
    error,
    refetch: fetchProperties,
    createProperty,
    updateProperty,
    deleteProperty,
  };
}
