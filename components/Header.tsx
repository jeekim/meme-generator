import React from 'react';
import { SparklesIcon } from './icons';

/**
 * Header component displaying the application title and branding
 */
export function Header() {
  return (
    <header className="w-full py-4 px-4 md:px-8 border-b border-gray-700/50 bg-gray-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex items-center">
        <SparklesIcon className="w-8 h-8 text-purple-400 mr-3" />
        <h1 className="text-2xl font-bold tracking-tight text-white">AI Magic Meme Generator</h1>
      </div>
    </header>
  );
}
