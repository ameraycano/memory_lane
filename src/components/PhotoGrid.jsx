import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';

/**
 * PhotoGrid - Displays a grid of photos with lightbox functionality
 * Props:
 * - photos: Array<{ src: string, alt?: string, caption?: string }>
 * - columns: number (2-5) default 3
 * - gap: string Tailwind gap class (e.g. 'gap-2') default 'gap-2'
 * - onPhotoClick: optional callback(photo, index)
 */
const PhotoGrid = ({ photos = [], columns = 3, gap = 'gap-2', onPhotoClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    function onKey(e) {
      if (!isOpen) return;
      if (e.key === 'Escape') setIsOpen(false);
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, currentIndex]);

  const openAt = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
    if (onPhotoClick) onPhotoClick(photos[index], index);
  };

  const prev = () => setCurrentIndex((i) => (i - 1 + photos.length) % photos.length);
  const next = () => setCurrentIndex((i) => (i + 1) % photos.length);

  const cols = Math.min(Math.max(columns, 2), 5);
  const gridColsClass = {
    2: 'grid-cols-2 sm:grid-cols-2 md:grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5',
  }[cols];

  return (
    <div>
      <div className={`grid ${gridColsClass} ${gap}`}>
        {photos.map((p, i) => (
          <button
            key={i}
            onClick={() => openAt(i)}
            className="block w-full h-40 sm:h-44 md:h-48 overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-300"
            aria-label={p.alt || `Photo ${i + 1}`}
          >
            <img
              src={p.src}
              alt={p.alt || `Photo ${i + 1}`}
              loading="lazy"
              className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/placeholder.jpg';
                e.target.className = "w-full h-full object-cover bg-gray-200";
              }}
            />
          </button>
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="max-w-[90vw] max-h-[90vh] w-full relative flex items-center">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-white bg-black/40 hover:bg-black/60 p-2 rounded-full z-10"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={prev}
              className="absolute left-2 hidden md:flex items-center justify-center p-2 rounded-full bg-black/30 hover:bg-black/50 z-10"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <div className="mx-auto max-h-[85vh] w-full flex items-center justify-center">
              <img
                src={photos[currentIndex]?.src}
                alt={photos[currentIndex]?.alt || `Photo ${currentIndex + 1}`}
                className="max-h-[85vh] w-auto max-w-full rounded-lg shadow-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/placeholder.jpg';
                  e.target.className = "max-h-[85vh] w-auto max-w-full rounded-lg shadow-lg bg-gray-200";
                }}
              />
            </div>

            <button
              onClick={next}
              className="absolute right-2 hidden md:flex items-center justify-center p-2 rounded-full bg-black/30 hover:bg-black/50 z-10"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-sm text-white">
              {photos[currentIndex]?.caption && (
                <div className="mb-2 bg-black/40 px-3 py-1 rounded-md">
                  {photos[currentIndex].caption}
                </div>
              )}
              <a
                href={photos[currentIndex]?.src}
                download
                className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 hover:bg-white/20 rounded-md text-white"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGrid;