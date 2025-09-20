import type { Property } from '../types/property';
import { formatPrice, formatDate } from './formatting';

/**
 * Convert an array of properties to CSV format
 */
export function propertiesToCSV(properties: Property[]): string {
  if (properties.length === 0) {
    return '';
  }

  // Define CSV headers
  const headers = [
    'Name',
    'Price',
    'Square Feet',
    'Bedrooms',
    'Bathrooms',
    'Status',
    'Train Station',
    'Features',
    'Agency',
    'GPS Latitude',
    'GPS Longitude',
    'Map Reference',
    'Cover Image',
    'Notes',
    'Date Added',
    'Date Viewed',
    'Property Link',
  ];

  // Convert properties to CSV rows
  const rows = properties.map((property) => {
    return [
      escapeCSVField(property.name),
      property.price ? formatPrice(property.price) : '',
      property.squareFeet ? property.squareFeet.toString() : '',
      property.bedrooms ? property.bedrooms.toString() : '',
      property.bathrooms ? property.bathrooms.toString() : '',
      escapeCSVField(property.status),
      escapeCSVField(property.trainStation || ''),
      escapeCSVField(property.features.join(', ')),
      escapeCSVField(property.agency || ''),
      property.gpsLat ? property.gpsLat.toString() : '',
      property.gpsLng ? property.gpsLng.toString() : '',
      escapeCSVField(property.mapReference || ''),
      escapeCSVField(property.coverImage || ''),
      escapeCSVField(property.notes || ''),
      formatDate(property.dateAdded),
      property.dateViewed ? formatDate(property.dateViewed) : '',
      escapeCSVField(property.link || ''),
    ];
  });

  // Combine headers and rows
  const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n');

  return csvContent;
}

/**
 * Escape CSV field to handle commas, quotes, and newlines
 */
function escapeCSVField(field: string): string {
  if (!field) return '';

  // If field contains comma, quote, or newline, wrap in quotes and escape internal quotes
  if (
    field.includes(',') ||
    field.includes('"') ||
    field.includes('\n') ||
    field.includes('\r')
  ) {
    return `"${field.replace(/"/g, '""')}"`;
  }

  return field;
}

/**
 * Download CSV file
 */
export function downloadCSV(
  csvContent: string,
  filename: string = 'properties.csv'
): void {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

/**
 * Export properties to CSV and trigger download
 */
export function exportPropertiesToCSV(
  properties: Property[],
  filename?: string
): void {
  const csvContent = propertiesToCSV(properties);
  downloadCSV(csvContent, filename);
}
