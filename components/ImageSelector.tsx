
import React, { useRef, useState } from 'react';
import { MEME_TEMPLATES } from '../constants';
import type { ImageState } from '../types';
import { UploadIcon } from './icons';
import { ERROR_MESSAGES } from '../config';

interface ImageSelectorProps {
  onImageSelect: (imageState: ImageState) => void;
}

export function ImageSelector({ onImageSelect }: ImageSelectorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError(ERROR_MESSAGES.INVALID_FILE_TYPE);
        return;
      }
      processImageFile(file);
    }
  };

  const handleTemplateClick = async (url: string) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const blob = await response.blob();
        const file = new File([blob], "template.jpg", { type: blob.type });
        processImageFile(file);
    } catch (e) {
        console.error("Failed to fetch template image:", e);
        setError(ERROR_MESSAGES.TEMPLATE_LOAD_FAILED);
    }
  };
  
  const processImageFile = (file: File) => {
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        onImageSelect({
          src: e.target?.result as string,
          width: img.width,
          height: img.height,
          originalFileType: file.type,
        });
      };
      img.onerror = () => {
          setError(ERROR_MESSAGES.IMAGE_READ_FAILED);
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
        setError(ERROR_MESSAGES.FILE_READ_FAILED);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 md:p-8 text-center">
      <h2 className="text-3xl font-bold mb-4 text-white">Create Your Meme</h2>
      <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Start by uploading your own image or choose one of our popular templates below.</p>
      
      {error && <p className="text-red-400 mb-4">{error}</p>}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105 inline-flex items-center gap-2"
      >
        <UploadIcon className="w-6 h-6" />
        Upload Image
      </button>

      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-6 text-gray-300">Or Select a Template</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {MEME_TEMPLATES.map((template) => (
            <div key={template.id} className="group cursor-pointer" onClick={() => handleTemplateClick(template.url)}>
              <img
                src={template.url}
                alt={template.name}
                crossOrigin="anonymous"
                className="rounded-lg w-full h-full object-cover aspect-square border-2 border-transparent group-hover:border-purple-500 transition-all duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
