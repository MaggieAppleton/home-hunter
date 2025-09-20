import { useState, useEffect } from 'react';
import type { TrainStation } from '../components/Map/TrainStationMarker';

const API_BASE_URL = 'http://localhost:3001/api';

export function useTrainStations() {
  const [stations, setStations] = useState<TrainStation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStations = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/train-stations`);
      if (!response.ok) {
        throw new Error('Failed to fetch train stations');
      }

      const data = await response.json();
      setStations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error fetching train stations:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStationsByType = async (type: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${API_BASE_URL}/train-stations/type/${type}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch ${type} stations`);
      }

      const data = await response.json();
      setStations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error(`Error fetching ${type} stations:`, err);
    } finally {
      setLoading(false);
    }
  };

  const fetchNearbyStations = async (
    lat: number,
    lng: number,
    radius = 1000
  ) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${API_BASE_URL}/train-stations/nearby?lat=${lat}&lng=${lng}&radius=${radius}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch nearby stations');
      }

      const data = await response.json();
      setStations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error fetching nearby stations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  return {
    stations,
    loading,
    error,
    refetch: fetchStations,
    fetchByType: fetchStationsByType,
    fetchNearby: fetchNearbyStations,
  };
}
