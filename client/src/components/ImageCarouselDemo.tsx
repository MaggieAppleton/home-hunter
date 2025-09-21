import React, { useState } from 'react';
import { ImageCarousel } from './ImageCarousel';
import { ImageCarouselModal } from './ImageCarouselModal';
import type { PropertyImage } from '../types/property';

// Demo component to showcase the ImageCarousel functionality
export const ImageCarouselDemo: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  // Mock images for demo purposes
  const mockImages: PropertyImage[] = [
    {
      id: 1,
      propertyId: 1,
      filename: 'demo1.jpg',
      originalName: 'Living Room',
      isCover: true,
    },
    {
      id: 2,
      propertyId: 1,
      filename: 'demo2.jpg',
      originalName: 'Kitchen',
      isCover: false,
    },
    {
      id: 3,
      propertyId: 1,
      filename: 'demo3.jpg',
      originalName: 'Bedroom',
      isCover: false,
    },
    {
      id: 4,
      propertyId: 1,
      filename: 'demo4.jpg',
      originalName: 'Bathroom',
      isCover: false,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Image Carousel Demo</h2>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          Inline Carousel (with thumbnails)
        </h3>
        <div className="max-w-2xl">
          <ImageCarousel
            images={mockImages}
            showControls={true}
            showThumbnails={true}
            className="border rounded-lg"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          Compact Carousel (no thumbnails)
        </h3>
        <div className="max-w-md">
          <ImageCarousel
            images={mockImages}
            showControls={true}
            showThumbnails={false}
            className="border rounded-lg"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Modal Carousel</h3>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Open Image Modal
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Single Image</h3>
        <div className="max-w-md">
          <ImageCarousel
            images={[mockImages[0]]}
            showControls={false}
            showThumbnails={false}
            className="border rounded-lg"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">No Images</h3>
        <div className="max-w-md">
          <ImageCarousel
            images={[]}
            showControls={true}
            showThumbnails={true}
            className="border rounded-lg"
          />
        </div>
      </div>

      {/* Modal */}
      <ImageCarouselModal
        images={mockImages}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Property Images Demo"
      />
    </div>
  );
};
