/**
 * Validation utilities for input sanitization and validation
 */

/**
 * Validates if a file is an image
 * @param file - File to validate
 * @returns True if file is a valid image
 */
export function isValidImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}

/**
 * Validates if a string is not empty after trimming
 * @param value - String to validate
 * @returns True if string is not empty
 */
export function isNonEmptyString(value: string): boolean {
  return value.trim().length > 0;
}

/**
 * Sanitizes text input by trimming and limiting length
 * @param text - Text to sanitize
 * @param maxLength - Maximum allowed length (default: 100)
 * @returns Sanitized text
 */
export function sanitizeTextInput(text: string, maxLength: number = 100): string {
  return text.trim().slice(0, maxLength);
}

/**
 * Validates if a URL is a valid data URL
 * @param url - URL to validate
 * @returns True if URL is a valid data URL
 */
export function isValidDataUrl(url: string): boolean {
  return url.startsWith('data:');
}

/**
 * Validates if a URL is a valid HTTP/HTTPS URL
 * @param url - URL to validate
 * @returns True if URL is valid
 */
export function isValidHttpUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Validates image dimensions are within acceptable bounds
 * @param width - Image width
 * @param height - Image height
 * @param maxWidth - Maximum width (default: 4096)
 * @param maxHeight - Maximum height (default: 4096)
 * @returns True if dimensions are valid
 */
export function isValidImageDimensions(
  width: number,
  height: number,
  maxWidth: number = 4096,
  maxHeight: number = 4096
): boolean {
  return width > 0 && height > 0 && width <= maxWidth && height <= maxHeight;
}
