import React from 'react';

export default function Character({ position }) {
  const herImage = `${process.env.PUBLIC_URL}/images/characters/her%20bg%20remove.png`;
  const imageSrc = `${process.env.PUBLIC_URL}/images/characters/me%20and%20charli%20bg%20removed.png`;

  return (
    <div className="relative">
      {/* Character container with proper sizing */}
      <div className="flex items-end space-x-1">
        <div className="relative">
          <img 
            src={herImage}
            alt="Her"
            className="w-11 h-11 object-contain animate-bounce"
            style={{ animationDelay: '0s' }}
          />
        </div>
        <div className="relative">
          <img 
            src={imageSrc}
            alt="Me and Charli"
            className="w-12 h-12 object-contain animate-bounce"
            style={{ animationDelay: '0.1s' }}
          />
        </div>
      </div>
    </div>
  );
}
