export interface Property {
  id?: number;
  name: string;
  price?: number;
  squareFeet?: number;
  bedrooms?: number;
  bathrooms?: number;
  status: 'Not contacted' | 'Contacted' | 'Viewing booked' | 'Viewed' | 'Sold';
  trainStation?: string;
  features: string[];
  link?: string;
  agency?: string;
  gpsLat?: number;
  gpsLng?: number;
  mapReference?: string;
  coverImage?: string;
  notes?: string;
  dateAdded: Date;
  dateViewed?: Date;
  images: PropertyImage[];
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
  status?: 'Not contacted' | 'Contacted' | 'Viewing booked' | 'Viewed' | 'Sold';
  trainStation?: string;
  features?: string[];
  link?: string;
  agency?: string;
  gpsLat?: number;
  gpsLng?: number;
  mapReference?: string;
  notes?: string;
  dateViewed?: Date;
}

export interface UpdatePropertyRequest extends Partial<CreatePropertyRequest> {
  id: number;
}

export interface PropertyFilters {
  status?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  search?: string;
}
