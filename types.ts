/**
 * Type definitions for the meme generator application
 */

/**
 * Represents a meme template with predefined image
 */
export interface MemeTemplate {
  id: string;
  name: string;
  url: string;
}

/**
 * Represents a meme caption with top and bottom text
 */
export interface MemeCaption {
  topText: string;
  bottomText: string;
}

/**
 * Represents the state of an image in the application
 */
export interface ImageState {
  src: string;
  width: number;
  height: number;
  originalFileType: string;
}
