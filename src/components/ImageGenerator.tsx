import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { ImagePlus, Wand2, Download } from 'lucide-react';
import { ImageSize } from '../types';

const sizes: { id: ImageSize; label: string; dimensions: string }[] = [
  { id: 'youtube', label: 'YouTube Thumbnail', dimensions: '1280x720' },
  { id: 'instagram', label: 'Instagram Post', dimensions: '1080x1080' },
  { id: 'twitter', label: 'Twitter Post', dimensions: '1200x675' },
  { id: 'custom', label: 'Custom Size', dimensions: 'Custom' },
];

export const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedSize, setSelectedSize] = useState<ImageSize>('youtube');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 1,
    onDrop: (files) => console.log(files),
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="space-y-2">
          <label className="block text-sm font-medium">Prompt</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none h-32 dark:bg-gray-800 dark:border-gray-700"
            placeholder="Describe your image in detail..."
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Size</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sizes.map((size) => (
              <button
                key={size.id}
                onClick={() => setSelectedSize(size.id)}
                className={`p-3 rounded-lg border ${
                  selectedSize === size.id
                    ? 'border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-900 dark:text-purple-200'
                    : 'border-gray-200 hover:border-purple-200 dark:border-gray-700 dark:hover:border-purple-700'
                } transition-all`}
              >
                <div className="text-sm font-medium">{size.label}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{size.dimensions}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Reference Image (Optional)</label>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
              isDragActive ? 'border-purple-500 bg-purple-50 dark:bg-purple-900' : 'border-gray-200 hover:border-purple-300 dark:border-gray-700 dark:hover:border-purple-600'
            }`}
          >
            <input {...getInputProps()} />
            <ImagePlus className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Drag & drop an image here, or click to select
            </p>
          </div>
        </div>

        <button className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 ai-glow">
          <Wand2 className="w-5 h-5" />
          Generate Image (10 Coins)
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative min-h-[300px] lg:min-h-[600px] rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden glass-effect"
      >
        {generatedImage ? (
          <div className="relative h-full">
            <img
              src={generatedImage}
              alt="Generated"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 glass-effect">
              <button className="w-full py-2 px-4 bg-white/90 dark:bg-gray-800/90 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Download Image
              </button>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              Your generated image will appear here
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};