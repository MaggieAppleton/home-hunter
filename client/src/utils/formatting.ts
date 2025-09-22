/**
 * Utility functions for formatting numbers, prices, and other data
 */

/**
 * Format a price in pence to GBP currency string
 */
export function formatPrice(price?: number): string {
  if (!price) return 'N/A';
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price / 100); // Convert from pence to pounds
}

/**
 * Format a number with thousands separators
 */
export function formatNumber(num?: number): string {
  if (num === undefined || num === null) return 'N/A';
  return new Intl.NumberFormat('en-GB').format(num);
}

/**
 * Format a decimal number (like square feet, bathrooms)
 */
export function formatDecimal(num?: number, decimals: number = 1): string {
  if (num === undefined || num === null) return 'N/A';
  return new Intl.NumberFormat('en-GB', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

/**
 * Format a date to UK format (DD/MM/YYYY)
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(dateObj);
}

/**
 * Format a date and time to UK format
 */
export function formatDateTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj);
}

/**
 * Parse a price string back to pence for API calls
 */
export function parsePrice(priceString: string): number | undefined {
  // Remove currency symbols and whitespace
  const cleanString = priceString.replace(/[£,\s]/g, '');
  const num = parseFloat(cleanString);
  return isNaN(num) ? undefined : Math.round(num * 100); // Convert to pence
}

/**
 * Get relative time string (e.g., "2 days ago")
 */
export function formatRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInMs = now.getTime() - dateObj.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
}

/**
 * Calculate time on market in months from first listed date
 * Matches the server-side calculation logic
 */
export function calculateTimeOnMarket(firstListedDate: string | null | undefined): number | null {
  if (!firstListedDate) return null;

  const firstListed = new Date(firstListedDate);
  const now = new Date();
  const diffTime = now.getTime() - firstListed.getTime();
  const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30)); // Approximate months

  return Math.max(0, diffMonths);
}

/**
 * Format time on market for display
 */
export function formatTimeOnMarket(timeOnMarketMonths: number | null | undefined): string {
  if (timeOnMarketMonths === undefined || timeOnMarketMonths === null) {
    return 'N/A';
  }
  return `${Math.round(timeOnMarketMonths)} months`;
}
