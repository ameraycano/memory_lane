import React from 'react';

const PhotoCards = ({ photos = [], position, isHovered, isTouched, isMobile }) => {
  if (!photos || photos.length === 0) return null;

  const showCards = isMobile ? isTouched : isHovered;
  
  // Normalize photos to always be objects with src property
  const normalizedPhotos = photos.map(photo => {
    // If photo is already an object with src, use it
    if (typeof photo === 'object' && photo.src) {
      return photo;
    }
    // If photo is a string (path), convert to object
    return {
      src: typeof photo === 'string' ? photo : photo,
      alt: "Memory photo"
    };
  });

  const getCardTransform = (index, total) => {
    if (!showCards) {
      return {
        transform: `translateX(-50%) translateY(${index * -2}px) rotate(${index * 2 - 1}deg)`,
        zIndex: total - index,
        opacity: index === 0 ? 1 : 0.7
      };
    }

    const angle = total === 1 ? 0 : (index - (total - 1) / 2) * (60 / (total - 1));
    const yOffset = Math.abs(angle) * 3;
    
    return {
      transform: `translateX(-50%) translateY(-${yOffset}px) rotate(${angle}deg) translateY(-15px)`,
      zIndex: 10 + index,
      opacity: 1
    };
  };

  return (
    <div 
      className="absolute pointer-events-none transition-all duration-500"
      style={{ 
        left: `${position.x}%`, 
        top: `${position.y - 15}%`,
        transform: 'translateX(-50%)'
      }}
    >
      {normalizedPhotos.map((photo, index) => (
        <div
          key={index}
          className="absolute bottom-0 left-1/2 transition-all duration-500 ease-out"
          style={getCardTransform(index, normalizedPhotos.length)}
        >
          <div className="w-16 h-20 bg-white rounded-lg shadow-lg border-2 border-white overflow-hidden hover:shadow-xl transition-shadow">
            <img
              src={photo.src}
              alt={photo.alt || "Memory photo"}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error(`Failed to load image: ${photo.src}`);
                e.target.onerror = null; 
                // Create a placeholder with a colored background instead
                e.target.style.display = 'none';
                const parent = e.target.parentElement;
                if (parent && !parent.querySelector('.placeholder')) {
                  const placeholder = document.createElement('div');
                  placeholder.className = 'placeholder w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-gray-600 text-xs font-medium';
                  placeholder.textContent = 'Photo';
                  parent.appendChild(placeholder);
                }
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhotoCards;