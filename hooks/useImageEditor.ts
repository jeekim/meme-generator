import { useState, useCallback } from 'react';
import { editImage } from '../services/geminiService';
import { renderMemeToDataURL } from '../utils/canvasUtils';
import type { ImageState } from '../types';
import { ERROR_MESSAGES } from '../config';

/**
 * Custom hook for AI image editing
 * @returns Object containing image edit state and handler
 */
export function useImageEditor() {
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEditImage = useCallback(
    async (
      image: ImageState,
      topText: string,
      bottomText: string,
      prompt: string
    ): Promise<ImageState | null> => {
      if (!prompt) return null;

      setIsEditingImage(true);
      setError(null);
      try {
        const currentMemeDataUrl = await renderMemeToDataURL(image.src, topText, bottomText);
        const editedImageBase64 = await editImage(currentMemeDataUrl, prompt);

        return new Promise((resolve, reject) => {
          const newImage = new Image();
          newImage.onload = () => {
            resolve({
              src: `data:image/png;base64,${editedImageBase64}`,
              width: newImage.width,
              height: newImage.height,
              originalFileType: 'image/png',
            });
          };
          newImage.onerror = () => {
            reject(new Error(ERROR_MESSAGES.IMAGE_READ_FAILED));
          };
          newImage.src = `data:image/png;base64,${editedImageBase64}`;
        });
      } catch (err) {
        console.error(err);
        const errorMessage = ERROR_MESSAGES.IMAGE_EDIT_FAILED;
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setIsEditingImage(false);
      }
    },
    []
  );

  return {
    isEditingImage,
    error,
    handleEditImage,
  };
}
