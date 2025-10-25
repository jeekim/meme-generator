
import React, { useState, useCallback } from 'react';
import { ImageSelector } from './components/ImageSelector';
import { MemeEditor } from './components/MemeEditor';
import { generateCaptions, editImage } from './services/geminiService';
import { renderMemeToDataURL } from './utils/canvasUtils';
import type { MemeCaption } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export interface ImageState {
  src: string;
  width: number;
  height: number;
  originalFileType: string;
}

export default function App() {
  const [image, setImage] = useState<ImageState | null>(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [suggestedCaptions, setSuggestedCaptions] = useState<MemeCaption[]>([]);
  const [isLoadingCaptions, setIsLoadingCaptions] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (imageState: ImageState) => {
    setImage(imageState);
    setTopText('');
    setBottomText('');
    setSuggestedCaptions([]);
    setError(null);
  };

  const handleReset = () => {
    setImage(null);
  };

  const handleGenerateCaptions = useCallback(async () => {
    if (!image) return;
    setIsLoadingCaptions(true);
    setError(null);
    setSuggestedCaptions([]);
    try {
      const captions = await generateCaptions(image.src);
      setSuggestedCaptions(captions);
    } catch (err) {
      console.error(err);
      setError('Could not generate captions. Please try again.');
    } finally {
      setIsLoadingCaptions(false);
    }
  }, [image]);

  const handleCaptionSelect = (caption: MemeCaption) => {
    setTopText(caption.topText);
    setBottomText(caption.bottomText);
  };

  const handleEditImage = useCallback(async (prompt: string) => {
    if (!image || !prompt) return;
    setIsEditingImage(true);
    setError(null);
    try {
      const currentMemeDataUrl = await renderMemeToDataURL(image.src, topText, bottomText);
      const editedImageBase64 = await editImage(currentMemeDataUrl, prompt);
      
      const newImage = new Image();
      newImage.onload = () => {
        setImage({
          src: `data:image/png;base64,${editedImageBase64}`,
          width: newImage.width,
          height: newImage.height,
          originalFileType: 'image/png',
        });
      };
      newImage.src = `data:image/png;base64,${editedImageBase64}`;

    } catch (err) {
      console.error(err);
      setError('Could not edit the image. Please try again.');
    } finally {
      setIsEditingImage(false);
    }
  }, [image, topText, bottomText]);

  const handleDownload = useCallback(async () => {
    if (!image) return;
    try {
      const dataUrl = await renderMemeToDataURL(image.src, topText, bottomText, image.originalFileType);
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `meme-${Date.now()}.${image.originalFileType.split('/')[1] || 'png'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error(err);
      setError('Could not prepare image for download.');
    }
  }, [image, topText, bottomText]);


  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-7xl mx-auto">
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg relative mb-6 text-center" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          {!image ? (
            <ImageSelector onImageSelect={handleImageSelect} />
          ) : (
            <MemeEditor
              image={image}
              topText={topText}
              bottomText={bottomText}
              onTopTextChange={setTopText}
              onBottomTextChange={setBottomText}
              suggestedCaptions={suggestedCaptions}
              onCaptionSelect={handleCaptionSelect}
              onGenerateCaptions={handleGenerateCaptions}
              isLoadingCaptions={isLoadingCaptions}
              onEditImage={handleEditImage}
              isEditingImage={isEditingImage}
              onDownload={handleDownload}
              onReset={handleReset}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
