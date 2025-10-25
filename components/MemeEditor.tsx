
import React, { useState } from 'react';
import type { ImageState } from '../App';
import type { MemeCaption } from '../types';
import { SparklesIcon, EditIcon, DownloadIcon, BackIcon } from './icons';
import { Spinner } from './Spinner';

interface MemeEditorProps {
  image: ImageState;
  topText: string;
  bottomText: string;
  onTopTextChange: (text: string) => void;
  onBottomTextChange: (text: string) => void;
  suggestedCaptions: MemeCaption[];
  onCaptionSelect: (caption: MemeCaption) => void;
  onGenerateCaptions: () => void;
  isLoadingCaptions: boolean;
  onEditImage: (prompt: string) => void;
  isEditingImage: boolean;
  onDownload: () => void;
  onReset: () => void;
}

export function MemeEditor({
  image,
  topText,
  bottomText,
  onTopTextChange,
  onBottomTextChange,
  suggestedCaptions,
  onCaptionSelect,
  onGenerateCaptions,
  isLoadingCaptions,
  onEditImage,
  isEditingImage,
  onDownload,
  onReset,
}: MemeEditorProps) {
  const [editPrompt, setEditPrompt] = useState('');

  const handleEditSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (editPrompt.trim()) {
          onEditImage(editPrompt);
      }
  }

  const memeAspectRatio = image.width / image.height;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Meme Preview */}
      <div className="lg:col-span-2 flex flex-col items-center justify-center bg-gray-900/50 border border-gray-700/50 rounded-2xl p-4 relative">
        <div 
          className="relative w-full overflow-hidden" 
          style={{ aspectRatio: `${memeAspectRatio}` }}
        >
          <img src={image.src} alt="Meme preview" className="w-full h-full object-contain" />
          <div className="absolute inset-0 flex flex-col justify-between p-2 md:p-4 pointer-events-none">
            <div 
              className="meme-text text-center w-full break-words" 
              style={{ fontSize: `${Math.max(12, image.width / 15)}px` }}
            >
              {topText}
            </div>
            <div 
              className="meme-text text-center w-full break-words"
              style={{ fontSize: `${Math.max(12, image.width / 15)}px` }}
            >
              {bottomText}
            </div>
          </div>
        </div>
        {(isEditingImage) && (
            <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center rounded-2xl z-10">
                <Spinner />
                <p className="text-lg mt-4 text-gray-300">Magically editing your image...</p>
            </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6 flex flex-col space-y-6">
        <div>
          <label htmlFor="top-text" className="block text-sm font-medium text-gray-400 mb-2">Top Text</label>
          <input
            id="top-text"
            type="text"
            value={topText}
            onChange={(e) => onTopTextChange(e.target.value)}
            placeholder="Enter top text"
            className="w-full bg-gray-700 border-gray-600 rounded-md py-2 px-3 text-white focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        <div>
          <label htmlFor="bottom-text" className="block text-sm font-medium text-gray-400 mb-2">Bottom Text</label>
          <input
            id="bottom-text"
            type="text"
            value={bottomText}
            onChange={(e) => onBottomTextChange(e.target.value)}
            placeholder="Enter bottom text"
            className="w-full bg-gray-700 border-gray-600 rounded-md py-2 px-3 text-white focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        <div className="border-t border-gray-700 pt-6 space-y-4">
            <h3 className="text-lg font-semibold text-white">AI Magic Tools</h3>
            <button
                onClick={onGenerateCaptions}
                disabled={isLoadingCaptions}
                className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-md transition-all disabled:bg-purple-900 disabled:cursor-not-allowed"
            >
                {isLoadingCaptions ? <Spinner/> : <SparklesIcon className="w-5 h-5"/>}
                {isLoadingCaptions ? 'Generating...' : 'Magic Caption'}
            </button>
            {suggestedCaptions.length > 0 && (
                <div className="space-y-2">
                    {suggestedCaptions.map((caption, index) => (
                        <button key={index} onClick={() => onCaptionSelect(caption)} className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600/80 rounded-md text-sm transition">
                            <p><strong>Top:</strong> {caption.topText}</p>
                            <p><strong>Bottom:</strong> {caption.bottomText}</p>
                        </button>
                    ))}
                </div>
            )}
        </div>

        <div className="border-t border-gray-700 pt-6 space-y-4">
            <form onSubmit={handleEditSubmit} className="space-y-4">
                <label htmlFor="magic-edit" className="block text-lg font-semibold text-white">Magic Edit</label>
                <input
                    id="magic-edit"
                    type="text"
                    value={editPrompt}
                    onChange={(e) => setEditPrompt(e.target.value)}
                    placeholder="e.g., 'Add a party hat'"
                    className="w-full bg-gray-700 border-gray-600 rounded-md py-2 px-3 text-white focus:ring-purple-500 focus:border-purple-500"
                />
                <button
                    type="submit"
                    disabled={isEditingImage || !editPrompt}
                    className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-md transition-all disabled:bg-indigo-900 disabled:cursor-not-allowed"
                >
                    {isEditingImage ? <Spinner /> : <EditIcon className="w-5 h-5" />}
                    Apply Edit
                </button>
            </form>
        </div>

        <div className="border-t border-gray-700 pt-6 flex flex-col space-y-3">
             <button
                onClick={onDownload}
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition-all"
            >
                <DownloadIcon className="w-5 h-5" />
                Download Meme
            </button>
            <button
                onClick={onReset}
                className="w-full flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md transition-all text-sm"
            >
                <BackIcon className="w-4 h-4" />
                Start Over
            </button>
        </div>
      </div>
    </div>
  );
}
