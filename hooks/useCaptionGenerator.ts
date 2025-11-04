import { useState, useCallback } from 'react';
import { generateCaptions } from '../services/geminiService';
import type { MemeCaption } from '../types';
import { ERROR_MESSAGES } from '../config';

/**
 * Custom hook for AI caption generation
 * @returns Object containing caption state and generation handler
 */
export function useCaptionGenerator() {
  const [suggestedCaptions, setSuggestedCaptions] = useState<MemeCaption[]>([]);
  const [isLoadingCaptions, setIsLoadingCaptions] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateCaptions = useCallback(async (imageSrc: string) => {
    setIsLoadingCaptions(true);
    setError(null);
    setSuggestedCaptions([]);
    try {
      const captions = await generateCaptions(imageSrc);
      setSuggestedCaptions(captions);
      return captions;
    } catch (err) {
      console.error(err);
      const errorMessage = ERROR_MESSAGES.CAPTION_GENERATION_FAILED;
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoadingCaptions(false);
    }
  }, []);

  const resetCaptions = useCallback(() => {
    setSuggestedCaptions([]);
    setError(null);
  }, []);

  return {
    suggestedCaptions,
    isLoadingCaptions,
    error,
    handleGenerateCaptions,
    resetCaptions,
  };
}
