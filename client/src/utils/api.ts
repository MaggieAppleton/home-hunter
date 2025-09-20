import type {
  Property,
  CreatePropertyRequest,
  UpdatePropertyRequest,
  PropertyImage,
} from '../types/property';

const API_BASE_URL = 'http://localhost:3001/api';

export class ApiError extends Error {
  public status: number;
  public statusText: string;

  constructor(message: string, status: number, statusText: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

    try {
      const errorData = JSON.parse(errorText);
      if (errorData.error) {
        errorMessage = errorData.error;
      }
    } catch {
      // If we can't parse the error, use the raw text or default message
      if (errorText) {
        errorMessage = errorText;
      }
    }

    throw new ApiError(errorMessage, response.status, response.statusText);
  }

  // Handle 204 No Content responses
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

export const api = {
  // Properties endpoints
  properties: {
    // Get all properties
    async list(): Promise<Property[]> {
      const response = await fetch(`${API_BASE_URL}/properties`);
      return handleResponse<Property[]>(response);
    },

    // Get single property
    async get(id: number): Promise<Property> {
      const response = await fetch(`${API_BASE_URL}/properties/${id}`);
      return handleResponse<Property>(response);
    },

    // Create new property
    async create(data: CreatePropertyRequest): Promise<Property> {
      const response = await fetch(`${API_BASE_URL}/properties`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return handleResponse<Property>(response);
    },

    // Update property
    async update(data: UpdatePropertyRequest): Promise<Property> {
      const response = await fetch(`${API_BASE_URL}/properties/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return handleResponse<Property>(response);
    },

    // Delete property
    async delete(id: number): Promise<void> {
      const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
        method: 'DELETE',
      });
      return handleResponse<void>(response);
    },
  },

  // Images endpoints
  images: {
    // Upload images for a property
    async upload(
      propertyId: number,
      files: File[]
    ): Promise<{ images: PropertyImage[] }> {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('images', file);
      });

      const response = await fetch(
        `${API_BASE_URL}/properties/${propertyId}/images`,
        {
          method: 'POST',
          body: formData,
        }
      );
      return handleResponse<{ images: PropertyImage[] }>(response);
    },

    // Delete an image
    async delete(imageId: number): Promise<void> {
      const response = await fetch(`${API_BASE_URL}/images/${imageId}`, {
        method: 'DELETE',
      });
      return handleResponse<void>(response);
    },

    // Set image as cover
    async setCover(imageId: number): Promise<{ message: string }> {
      const response = await fetch(`${API_BASE_URL}/images/${imageId}/cover`, {
        method: 'PUT',
      });
      return handleResponse<{ message: string }>(response);
    },

    // Get image URL
    getImageUrl(filename: string): string {
      return `${API_BASE_URL}/images/${filename}`;
    },
  },

  // Health check
  async healthCheck(): Promise<{
    status: string;
    message: string;
    timestamp: string;
  }> {
    const response = await fetch(`${API_BASE_URL}/health`);
    return handleResponse(response);
  },
};
