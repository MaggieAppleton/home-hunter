export interface Property {
  id?: number;
  name: string;
  price?: number;
  squareFeet?: number;
  bedrooms?: number;
  bathrooms?: number;
  status:
    | 'Not contacted'
    | 'Contacted'
    | 'Viewing booked'
    | 'Viewed'
    | 'Rejected'
    | 'Sold';
  link?: string;
  agency?: string;
  gpsLat?: number;
  gpsLng?: number;
  mapReference?: string;
  coverImage?: string;
  notes?: string;
  firstListedDate?: string; // Date string (YYYY-MM-DD)
  timeOnMarketMonths?: number; // Calculated months on market
  nearbyStations: StationWithDistance[];
  nearbySchools: SchoolWithDistance[];
  dateAdded: Date;
  dateViewed?: Date;
  images: PropertyImage[];
}

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

export interface PropertyImage {
  id: number;
  propertyId: number;
  filename: string;
  originalName: string;
  isCover: boolean;
}

export interface CreatePropertyRequest {
  name: string;
  price?: number;
  squareFeet?: number;
  bedrooms?: number;
  bathrooms?: number;
  status?:
    | 'Not contacted'
    | 'Contacted'
    | 'Viewing booked'
    | 'Viewed'
    | 'Rejected'
    | 'Sold';
  link?: string;
  agency?: string;
  gpsLat?: number;
  gpsLng?: number;
  mapReference?: string;
  notes?: string;
  dateViewed?: Date;
  firstListedDate?: string; // Date string (YYYY-MM-DD)
}

export interface UpdatePropertyRequest extends Partial<CreatePropertyRequest> {
  id: number;
}

export interface PropertyFilters {
  status?: string;
  search?: string;
}
