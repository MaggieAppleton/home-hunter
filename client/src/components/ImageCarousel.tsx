import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import type { PropertyImage } from '../types/property';

interface ImageCarouselProps {
  images: PropertyImage[];
  initialIndex?: number;
  onClose?: () => void;
  showControls?: boolean;
  showThumbnails?: boolean;
  className?: string;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  initialIndex = 0,
  onClose,
  showControls = true,
  showThumbnails = true,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Reset current index when images change or initialIndex changes
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, images]);

  if (!images || images.length === 0) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}
      >
        <div className="text-gray-500 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400 mb-2"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-sm">No images available</p>
        </div>
      </div>
    );
  }

  const currentImage = images[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        goToPrevious();
      } else if (event.key === 'ArrowRight') {
        goToNext();
      } else if (event.key === 'Escape' && onClose) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className={`relative bg-white rounded-lg overflow-hidden ${className}`}
    >
      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-all"
          aria-label="Close carousel"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}

      {/* Main image container */}
      <div className="relative">
        <div className="aspect-video bg-gray-100 flex items-center justify-center">
          <img
            src={api.images.getImageUrl(currentImage.filename)}
            alt={currentImage.originalName}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* Navigation arrows */}
        {showControls && images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-all"
              aria-label="Previous image"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-all"
              aria-label="Next image"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}

        {/* Cover badge */}
        {currentImage.isCover && (
          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
            Cover Image
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      {showThumbnails && images.length > 1 && (
        <div className="p-2 bg-gray-50 border-t">
          <div className="flex space-x-2 overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => goToImage(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentIndex
                    ? 'border-blue-500 ring-2 ring-blue-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                aria-label={`View image ${index + 1}`}
              >
                <img
                  src={api.images.getImageUrl(image.filename)}
                  alt={image.originalName}
                  className="w-full h-full object-cover"
                />
                {image.isCover && (
                  <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-1 rounded-bl">
                    C
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Image info */}
      <div className="p-2 bg-gray-50 border-t text-sm text-gray-600">
        <div className="flex justify-between items-center">
          <span className="truncate">{currentImage.originalName}</span>
          {currentImage.isCover && (
            <span className="text-green-600 font-medium text-xs">
              Cover Image
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
