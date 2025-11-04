
import React, { useState } from 'react';
import { ImageSelector } from './components/ImageSelector';
import { MemeEditor } from './components/MemeEditor';
import type { MemeCaption } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ERROR_MESSAGES } from './config';
import {
  useImageState,
  useMemeText,
  useCaptionGenerator,
  useImageEditor,
  useMemeDownload,
} from './hooks';

export default function App() {
  const [error, setError] = useState<string | null>(null);
  
  // Custom hooks for separated concerns
  const { image, setImage, handleImageSelect, handleReset } = useImageState();
  const { topText, bottomText, setTopText, setBottomText, resetText } = useMemeText();
  const {
    suggestedCaptions,
    isLoadingCaptions,
    error: captionError,
    handleGenerateCaptions: generateCaptions,
    resetCaptions,
  } = useCaptionGenerator();
  const {
    isEditingImage,
    error: editError,
    handleEditImage: editImageWithHook,
  } = useImageEditor();
  const downloadMeme = useMemeDownload();

  // Combined error from different sources
  const displayError = error || captionError || editError;

  const handleImageSelectWithReset = (imageState: typeof image) => {
    if (imageState) {
      handleImageSelect(imageState);
      resetText();
      resetCaptions();
      setError(null);
    }
  };

  const handleResetAll = () => {
    handleReset();
    resetText();
    resetCaptions();
    setError(null);
  };

  const handleGenerateCaptionsWrapper = async () => {
    if (!image) return;
    try {
      await generateCaptions(image.src);
    } catch (err) {
      // Error already handled in hook
    }
  };

  const handleCaptionSelect = (caption: MemeCaption) => {
    setTopText(caption.topText);
    setBottomText(caption.bottomText);
  };

  const handleEditImage = async (prompt: string) => {
    if (!image || !prompt) return;
    setError(null);
    try {
      const editedImage = await editImageWithHook(image, topText, bottomText, prompt);
      if (editedImage) {
        setImage(editedImage);
      }
    } catch (err) {
      // Error already handled in hook
    }
  };

  const handleDownload = async () => {
    if (!image) return;
    setError(null);
    try {
      await downloadMeme(image, topText, bottomText);
    } catch (err) {
      console.error(err);
      setError(ERROR_MESSAGES.DOWNLOAD_FAILED);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-7xl mx-auto">
          {displayError && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg relative mb-6 text-center" role="alert">
              <span className="block sm:inline">{displayError}</span>
            </div>
          )}
          {!image ? (
            <ImageSelector onImageSelect={handleImageSelectWithReset} />
          ) : (
            <MemeEditor
              image={image}
              topText={topText}
              bottomText={bottomText}
              onTopTextChange={setTopText}
              onBottomTextChange={setBottomText}
              suggestedCaptions={suggestedCaptions}
              onCaptionSelect={handleCaptionSelect}
              onGenerateCaptions={handleGenerateCaptionsWrapper}
              isLoadingCaptions={isLoadingCaptions}
              onEditImage={handleEditImage}
              isEditingImage={isEditingImage}
              onDownload={handleDownload}
              onReset={handleResetAll}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
