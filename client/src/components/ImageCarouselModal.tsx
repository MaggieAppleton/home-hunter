import React from 'react';
import { ImageCarousel } from './ImageCarousel';
import type { PropertyImage } from '../types/property';

interface ImageCarouselModalProps {
  images: PropertyImage[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export const ImageCarouselModal: React.FC<ImageCarouselModalProps> = ({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  title,
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'carousel-modal-title' : undefined}
    >
      <div className="relative max-w-4xl max-h-[90vh] w-full mx-4">
        {/* Modal header */}
        {title && (
          <div className="bg-white rounded-t-lg px-4 py-3 border-b">
            <h2
              id="carousel-modal-title"
              className="text-lg font-semibold text-gray-900"
            >
              {title}
            </h2>
          </div>
        )}

        {/* Carousel */}
        <ImageCarousel
          images={images}
          initialIndex={initialIndex}
          onClose={onClose}
          showControls={true}
          showThumbnails={true}
          className="rounded-lg"
        />
      </div>
    </div>
  );
};
