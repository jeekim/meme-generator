import { useState, useCallback } from 'react';
import type { ImageState } from '../types';

/**
 * Custom hook for managing image state and operations
 * @returns Object containing image state and handlers
 */
export function useImageState() {
  const [image, setImage] = useState<ImageState | null>(null);

  const handleImageSelect = useCallback((imageState: ImageState) => {
    setImage(imageState);
  }, []);

  const handleReset = useCallback(() => {
    setImage(null);
  }, []);

  return {
    image,
    setImage,
    handleImageSelect,
    handleReset,
  };
}
