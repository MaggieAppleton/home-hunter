/**
 * Calculate the distance between two points using the Haversine formula
 * @param lat1 Latitude of first point
 * @param lng1 Longitude of first point
 * @param lat2 Latitude of second point
 * @param lng2 Longitude of second point
 * @returns Distance in meters
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371000; // Earth's radius in meters
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Convert degrees to radians
 */
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Calculate walking time based on distance
 * Assumes average walking speed of 1.4 m/s (about 5 km/h)
 * @param distance Distance in meters
 * @returns Walking time in minutes
 */
export function calculateWalkingTime(distance: number): number {
  const walkingSpeed = 1.4; // meters per second
  const walkingTimeSeconds = distance / walkingSpeed;
  return Math.round(walkingTimeSeconds / 60); // Convert to minutes
}

/**
 * Find the nearest station to a property
 */
export interface StationWithDistance {
  id: string;
  name: string;
  lat: number;
  lng: number;
  lines: string[];
  type: string;
  zone?: number;
  networks?: string[];
  allTypes?: string[];
  distance: number;
  walkingTime: number;
}

export function findNearestStation(
  propertyLat: number,
  propertyLng: number,
  stations: Array<{
    id: string;
    name: string;
    lat: number;
    lng: number;
    lines: string[];
    type: string;
    zone?: number;
  }>
): StationWithDistance | null {
  if (stations.length === 0) return null;

  let nearest: StationWithDistance | null = null;
  let minDistance = Infinity;

  for (const station of stations) {
    const distance = calculateDistance(
      propertyLat,
      propertyLng,
      station.lat,
      station.lng
    );

    if (distance < minDistance) {
      minDistance = distance;
      nearest = {
        ...station,
        distance: Math.round(distance),
        walkingTime: calculateWalkingTime(distance),
      };
    }
  }

  return nearest;
}

/**
 * Find all stations within a given radius
 */
export function findStationsWithinRadius(
  propertyLat: number,
  propertyLng: number,
  stations: Array<{
    id: string;
    name: string;
    lat: number;
    lng: number;
    lines: string[];
    type: string;
    zone?: number;
    networks?: string[];
    allTypes?: string[];
  }>,
  radiusMeters: number = 1000
): StationWithDistance[] {
  const stationsWithinRadius: StationWithDistance[] = [];

  for (const station of stations) {
    const distance = calculateDistance(
      propertyLat,
      propertyLng,
      station.lat,
      station.lng
    );

    if (distance <= radiusMeters) {
      stationsWithinRadius.push({
        ...station,
        distance: Math.round(distance),
        walkingTime: calculateWalkingTime(distance),
      });
    }
  }

  // Sort by distance
  return stationsWithinRadius.sort((a, b) => a.distance - b.distance);
}

/**
 * Calculate nearby stations for a property (alias for findStationsWithinRadius)
 */
export function calculateNearbyStations(
  propertyLat: number,
  propertyLng: number,
  stations: Array<{
    id: string;
    name: string;
    lat: number;
    lng: number;
    lines: string[];
    type: string;
    zone?: number;
    networks?: string[];
    allTypes?: string[];
  }>,
  radiusMeters: number = 1000
): StationWithDistance[] {
  return findStationsWithinRadius(
    propertyLat,
    propertyLng,
    stations,
    radiusMeters
  );
}

/**
 * School with distance information
 */
export interface SchoolWithDistance {
  id: string;
  name: string;
  lat: number;
  lng: number;
  ofstedRating: string;
  schoolType: string;
  performancePercentage: number;
  distance: number;
  walkingTime: number;
}

/**
 * Find all schools within a given radius
 */
export function findSchoolsWithinRadius(
  propertyLat: number,
  propertyLng: number,
  schools: Array<{
    id: string;
    name: string;
    lat: number;
    lng: number;
    ofstedRating: string;
    schoolType: string;
    performancePercentage: number;
  }>,
  radiusMeters: number = 2000 // 2km for schools
): SchoolWithDistance[] {
  const schoolsWithinRadius: SchoolWithDistance[] = [];

  for (const school of schools) {
    const distance = calculateDistance(
      propertyLat,
      propertyLng,
      school.lat,
      school.lng
    );

    if (distance <= radiusMeters) {
      schoolsWithinRadius.push({
        ...school,
        distance: Math.round(distance),
        walkingTime: calculateWalkingTime(distance),
      });
    }
  }

  // Sort by distance
  return schoolsWithinRadius.sort((a, b) => a.distance - b.distance);
}

/**
 * Calculate nearby schools for a property
 */
export function calculateNearbySchools(
  propertyLat: number,
  propertyLng: number,
  schools: Array<{
    id: string;
    name: string;
    lat: number;
    lng: number;
    ofstedRating: string;
    schoolType: string;
    performancePercentage: number;
  }>,
  radiusMeters: number = 2000 // 2km for schools
): SchoolWithDistance[] {
  return findSchoolsWithinRadius(
    propertyLat,
    propertyLng,
    schools,
    radiusMeters
  );
}
