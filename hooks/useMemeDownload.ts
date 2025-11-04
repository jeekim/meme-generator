import { useCallback } from 'react';
import { renderMemeToDataURL } from '../utils/canvasUtils';
import type { ImageState } from '../types';

/**
 * Custom hook for meme download functionality
 * @returns Download handler function
 */
export function useMemeDownload() {
  const handleDownload = useCallback(
    async (image: ImageState, topText: string, bottomText: string) => {
      const dataUrl = await renderMemeToDataURL(
        image.src,
        topText,
        bottomText,
        image.originalFileType
      );

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `meme-${Date.now()}.${image.originalFileType.split('/')[1] || 'png'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    []
  );

  return handleDownload;
}
