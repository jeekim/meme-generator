import { useState } from 'react';

/**
 * Custom hook for managing meme text state
 * @returns Object containing text state and handlers
 */
export function useMemeText() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');

  const resetText = () => {
    setTopText('');
    setBottomText('');
  };

  return {
    topText,
    bottomText,
    setTopText,
    setBottomText,
    resetText,
  };
}
