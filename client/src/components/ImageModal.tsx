import { useState } from 'react';
import { X } from 'lucide-react';

interface ImageModalProps {
  images: Array<{
    src: string;
    alt: string;
    caption: string;
  }>;
}

export default function ImageModal({ images }: ImageModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {images.map((image, index) => (
          <div key={index} className="group cursor-pointer" onClick={() => openModal(index)}>
            <img 
              src={image.src}
              alt={image.alt}
              className="w-full h-64 object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300" 
            />
            <p className="text-center mt-4 font-quicksand">{image.caption}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
              onClick={closeModal}
            >
              <X size={24} />
            </button>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all"
                  onClick={prevImage}
                >
                  ←
                </button>
                <button 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all"
                  onClick={nextImage}
                >
                  →
                </button>
              </>
            )}

            {/* Image */}
            <img 
              src={images[currentImageIndex].src}
              alt={images[currentImageIndex].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
            
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-lg">
              <p className="text-center font-quicksand text-lg">
                {images[currentImageIndex].caption}
              </p>
              {images.length > 1 && (
                <p className="text-center text-sm opacity-80 mt-2">
                  {currentImageIndex + 1} de {images.length}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}