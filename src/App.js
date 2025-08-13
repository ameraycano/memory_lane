import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Download, Image, Music, Disc3, Play, Pause, SkipForward, SkipBack, Shuffle, RotateCcw, Heart, Share2, ZoomIn, Grid3X3, List } from 'lucide-react';
import { memories } from './data/memories';
import MemoryPoint from './components/MemoryPoint';
import MemoryModal from './components/MemoryModal';
import ProgressBar from './components/ProgressBar';
import Character from './components/Character';

// Sample playlist data with colors for gradient
const playlist = [
  { 
    id: 1, 
    title: "Blind", 
    artist: "PRETTYMUCH", 
    spotifyUrl: "https://open.spotify.com/track/5NeHvs8ClxMHtqv8DHEK1X",
    previewUrl: "https://p.scdn.co/mp3-preview/64cd61418a239b1157727e4ea5cb40b54ff7755e",
    color: "from-pink-400 to-rose-600"
  },
  { 
    id: 2, 
    title: "WANTCHU", 
    artist: "keshi", 
    spotifyUrl: "https://open.spotify.com/track/0XWf8CRB6IptewumZDi5b6",
    previewUrl: "https://p.scdn.co/mp3-preview/a1cab65be94e76332399512bbdfdfeccbd9f674d",
    color: "from-blue-400 to-indigo-600"
  },
  { 
    id: 3, 
    title: "Back For You", 
    artist: "One Direction", 
    spotifyUrl: "https://open.spotify.com/track/02O8hDaIJPEUHh9XEj0u76?si=1d9b7fe2813e42eb",
    previewUrl: "https://p.scdn.co/mp3-preview/7590507958531f251a52671b32059e3266449a39",
    color: "from-green-400 to-emerald-600"
  },
  { 
    id: 4, 
    title: "Robbers", 
    artist: "THE 1975", 
    spotifyUrl: "https://open.spotify.com/track/6N5ruusDFjQPYvCka8ejwP",
    previewUrl: "https://p.scdn.co/mp3-preview/c90afde96512b419fde6f80b11f4352f32d89a6f",
    color: "from-purple-400 to-violet-600"
  },
  { 
    id: 5, 
    title: "XXL", 
    artist: "LANY", 
    spotifyUrl: "https://open.spotify.com/track/3l1grOhgJQG4E1E2MjfHWG?si=11df7f5bdb91403a",
    previewUrl: "https://p.scdn.co/mp3-preview/6a302720d8e29edf1fb3856197f063175537e3f4",
    color: "from-orange-400 to-red-600"
  },
  { 
    id: 6, 
    title: "Getting Over You", 
    artist: "Lauv", 
    spotifyUrl: "https://open.spotify.com/track/0leLID5Y6OqL4wkuT0JqlB?si=587d86dc2cc446d4",
    previewUrl: "https://p.scdn.co/mp3-preview/9febab256d1e139774c76de40732f8393e4bc33e",
    color: "from-teal-400 to-cyan-600"
  }
];

// Enhanced Polaroid Photo Component
function EnhancedPolaroid({ photo, index, onClick, className = "", style = {}, size = "normal", layoutMode = "masonry" }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDeveloping, setIsDeveloping] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [developProgress, setDevelopProgress] = useState(0);
  
  // More natural rotation patterns
  const rotations = [-12, -8, -5, -2, 0, 2, 4, 7, 10, -10, -6, 3, 6, -4, 8];
  const rotation = layoutMode === 'grid' ? 0 : rotations[index % rotations.length];
  
  // Dynamic shadows based on rotation
  const shadowIntensity = Math.abs(rotation) / 15 + 0.2;
  
  // Size variants with better proportions
  const sizes = {
    small: { 
      width: 'w-24', height: 'h-32', imageHeight: 'h-20', 
      text: 'text-xs', padding: 'p-2', captionHeight: 'h-10' 
    },
    normal: { 
      width: 'w-36', height: 'h-48', imageHeight: 'h-32', 
      text: 'text-sm', padding: 'p-3', captionHeight: 'h-12' 
    },
    large: { 
      width: 'w-48', height: 'h-64', imageHeight: 'h-44', 
      text: 'text-base', padding: 'p-4', captionHeight: 'h-16' 
    }
  };
  
  const sizeClass = sizes[size] || sizes.normal;

  useEffect(() => {
    // Realistic developing effect with progress
    const developTimer = setInterval(() => {
      setDevelopProgress(prev => {
        if (prev >= 100) {
          setIsDeveloping(false);
          clearInterval(developTimer);
          return 100;
        }
        return prev + 5;
      });
    }, 50 + index * 20); // Staggered development
    
    return () => clearInterval(developTimer);
  }, [index]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div
      className={`
        ${sizeClass.width} ${sizeClass.height} bg-white shadow-lg cursor-pointer
        transform transition-all duration-700 hover:scale-105 hover:-translate-y-2 hover:z-30
        relative group ${className} select-none
      `}
      style={{
        transform: `rotate(${rotation}deg) ${style.transform || ''}`,
        boxShadow: `
          0 ${4 + shadowIntensity * 8}px ${12 + shadowIntensity * 8}px rgba(0,0,0,${shadowIntensity * 0.3}),
          0 ${2 + shadowIntensity * 4}px ${6 + shadowIntensity * 4}px rgba(0,0,0,${shadowIntensity * 0.2})
        `,
        ...style
      }}
      onClick={onClick}
    >
      {/* Polaroid Border with vintage texture */}
      <div className={`${sizeClass.padding} h-full flex flex-col bg-gradient-to-b from-gray-50 to-gray-100`}>
        {/* Photo Area */}
        <div className={`${sizeClass.imageHeight} bg-gray-200 overflow-hidden relative rounded-sm`}>
          {/* Developing overlay with progress */}
          {isDeveloping && (
            <div className="absolute inset-0 z-20">
              <div 
                className="absolute inset-0 bg-gradient-to-br from-gray-400 via-gray-300 to-gray-200 transition-opacity duration-500"
                style={{ opacity: 1 - (developProgress / 100) }}
              />
              <div className="absolute bottom-1 left-1 right-1 h-0.5 bg-gray-400 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all duration-300 rounded-full"
                  style={{ width: `${developProgress}%` }}
                />
              </div>
            </div>
          )}
          
          {/* Actual image */}
          <img
            src={photo.src || photo}
            alt={photo.alt || `Photo ${index + 1}`}
            className={`w-full h-full object-cover transition-all duration-1000 ${
              isLoaded && !isDeveloping ? 'opacity-100 saturate-100' : 'opacity-0 saturate-50'
            }`}
            onLoad={handleImageLoad}
            loading="lazy"
          />
          
          {/* Loading shimmer */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
          )}

          {/* Hover overlay with interactions */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex space-x-2">
              <button
                onClick={handleLike}
                className="p-2 bg-white/80 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100"
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
              </button>
              <button className="p-2 bg-white/80 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-150">
                <ZoomIn className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Vintage film strip holes */}
          <div className="absolute top-0 left-0 right-0 h-1 flex justify-between px-1 opacity-30">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-gray-400 rounded-full" />
            ))}
          </div>
        </div>
        
        {/* Enhanced Caption Area */}
        <div className={`${sizeClass.captionHeight} flex items-center justify-center ${sizeClass.text} text-gray-700 relative`}>
          <div className="text-center font-handwriting leading-tight px-1">
            <div className="font-medium">
              {photo.caption || photo.alt || `Memory #${index + 1}`}
            </div>
            {photo.date && (
              <div className="text-xs opacity-70 mt-1">{photo.date}</div>
            )}
          </div>
          
          {/* Love indicator */}
          {isLiked && (
            <div className="absolute top-1 right-1">
              <Heart className="w-3 h-3 text-red-500 fill-current animate-pulse" />
            </div>
          )}
        </div>
      </div>
      
      {/* Paper texture overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none rounded-sm"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='47' cy='7' r='1'/%3E%3Ccircle cx='7' cy='47' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      {/* Tape effect for some photos */}
      {index % 4 === 0 && (
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-yellow-100 opacity-80 border border-yellow-200 shadow-sm" 
             style={{ transform: `translateX(-50%) rotate(${rotation * 0.3}deg)` }} />
      )}
    </div>
  );
}

// Card component for individual songs with enhanced play functionality
function SongCard({ song, isActive, onClick, onPlay, style, isMobile }) {
  const handleCardClick = () => {
    onClick(song);
  };

  const handlePlayClick = (e) => {
    e.stopPropagation();
    onPlay(song);
  };

  return (
    <div
      className={`absolute cursor-pointer transition-all duration-300 hover:scale-105 ${
        isActive ? 'z-30' : 'z-10'
      }`}
      style={style}
      onClick={handleCardClick}
    >
      <div className={`
        ${isMobile ? 'w-48 h-64' : 'w-56 h-72'} 
        bg-gradient-to-br ${song.color} 
        rounded-2xl shadow-2xl border-4 border-white/20 
        backdrop-blur-sm overflow-hidden
        ${isActive ? 'ring-4 ring-white/50 shadow-3xl' : 'hover:shadow-xl'}
      `}>
        {/* Card Header */}
        <div className="h-12 bg-black/20 flex items-center justify-center">
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-white/60 rounded-full"></div>
            ))}
          </div>
        </div>
        
        {/* Vinyl Record Visual */}
        <div className="flex justify-center mt-4 mb-4 relative">
          <div className={`relative w-20 h-20 ${isActive ? 'animate-spin' : ''}`} style={{animationDuration: '3s'}}>
            <div className="w-20 h-20 bg-black rounded-full shadow-lg border-2 border-white/30">
              <div className="absolute inset-2 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full">
                <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white/80 rounded-full"></div>
                </div>
              </div>
              {/* Grooves */}
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute border border-white/20 rounded-full"
                  style={{
                    inset: `${4 + i * 3}px`,
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Play button overlay */}
          <button
            onClick={handlePlayClick}
            className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/20 rounded-full transition-all duration-300 group"
          >
            <div className="bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300">
              <Play className="w-5 h-5 text-gray-800" />
            </div>
          </button>
        </div>

        {/* Song Info */}
        <div className="px-4 text-center text-white">
          <h3 className={`font-bold leading-tight mb-1 ${isMobile ? 'text-sm' : 'text-base'}`}>
            {song.title}
          </h3>
          <p className={`opacity-90 ${isMobile ? 'text-xs' : 'text-sm'}`}>
            {song.artist}
          </p>
        </div>

        {/* Play indicator */}
        {isActive && (
          <div className="absolute top-16 right-4">
            <div className="flex space-x-1">
              <div className="w-1 h-6 bg-white animate-pulse"></div>
              <div className="w-1 h-6 bg-white animate-pulse" style={{animationDelay: '0.1s'}}></div>
              <div className="w-1 h-6 bg-white animate-pulse" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        )}

        {/* Spotify link */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <a
            href={song.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white text-xs underline"
            onClick={(e) => e.stopPropagation()}
          >
            🎵 Spotify
          </a>
        </div>
      </div>
    </div>
  );
}

// Updated PlaylistModal component with the new UI
function PlaylistModal({ isOpen, onClose, nowPlaying, onPlayPause, isPlaying, onNext, onPrev, onSelectSong }) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const [shuffledPlaylist, setShuffledPlaylist] = useState(playlist);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const shuffleCards = () => {
    const shuffled = [...playlist].sort(() => Math.random() - 0.5);
    setShuffledPlaylist(shuffled);
    setIsShuffled(true);
    setCurrentCardIndex(0);
  };

  const resetOrder = () => {
    setShuffledPlaylist(playlist);
    setIsShuffled(false);
    setCurrentCardIndex(0);
  };

  const currentPlaylist = isShuffled ? shuffledPlaylist : playlist;

  const getCardStyle = (index) => {
    const totalCards = currentPlaylist.length;
    const centerIndex = Math.floor(totalCards / 2);
    const offset = index - currentCardIndex;
    
    if (isMobile) {
      // Mobile: Simple horizontal scroll
      const isVisible = Math.abs(offset) <= 1;
      return {
        opacity: isVisible ? 1 : 0,
        transform: `translateX(${offset * 160 + (window.innerWidth / 2) - 96}px) translateY(50px) ${
          offset === 0 ? 'scale(1)' : 'scale(0.9)'
        }`,
        zIndex: offset === 0 ? 30 : 20 - Math.abs(offset),
        pointerEvents: isVisible ? 'auto' : 'none'
      };
    } else {
      // Desktop: Fan layout
      const angle = offset * 15; // degrees
      const yOffset = Math.abs(offset) * 20;
      const xOffset = offset * 120;
      
      return {
        transform: `
          translateX(${xOffset + window.innerWidth / 2 - 112}px) 
          translateY(${yOffset + 100}px) 
          rotate(${angle}deg)
          ${offset === 0 ? 'scale(1.05)' : 'scale(0.95)'}
        `,
        zIndex: 30 - Math.abs(offset),
        opacity: Math.abs(offset) > 2 ? 0.3 : 1,
      };
    }
  };

  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % currentPlaylist.length);
  };

  const prevCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + currentPlaylist.length) % currentPlaylist.length);
  };

  const handleCardClick = (song) => {
    const clickedIndex = currentPlaylist.findIndex(s => s.id === song.id);
    setCurrentCardIndex(clickedIndex);
  };

  const handlePlaySong = (song) => {
    onSelectSong(song);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-40 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex justify-between items-center p-6">
          <div className="flex items-center space-x-3">
            <Disc3 className="w-8 h-8 text-purple-400" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">Personalized Vinyl</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-300 p-2 bg-white/10 rounded-full backdrop-blur-sm"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Cards Container */}
      <div className="relative w-full h-full">
        {currentPlaylist.map((song, index) => (
          <SongCard
            key={song.id}
            song={song}
            isActive={nowPlaying?.id === song.id}
            onClick={handleCardClick}
            onPlay={handlePlaySong}
            style={getCardStyle(index)}
            isMobile={isMobile}
          />
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex space-x-4">
        <button
          onClick={prevCard}
          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextCard}
          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent">
        {/* Shuffle Controls */}
        <div className="flex justify-center space-x-4 mb-4">
          <button
            onClick={shuffleCards}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
              isShuffled ? 'bg-purple-600 text-white' : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <Shuffle className="w-4 h-4" />
            <span className="text-sm">Shuffle</span>
          </button>
          <button
            onClick={resetOrder}
            className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="text-sm">Reset</span>
          </button>
        </div>

        {/* Now Playing */}
        {nowPlaying && (
          <div className="bg-gradient-to-r from-purple-600/90 to-purple-700/90 backdrop-blur-sm mx-4 mb-4 rounded-2xl p-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold text-white">Now Playing</h3>
              <p className="text-purple-100">{nowPlaying.title}</p>
              <p className="text-purple-200 text-sm">{nowPlaying.artist}</p>
            </div>
            
            {/* Music Controls */}
            <div className="flex justify-center items-center space-x-6">
              <button 
                onClick={onPrev}
                className="text-white hover:text-purple-200 p-2"
              >
                <SkipBack className="w-6 h-6" />
              </button>
              <button 
                onClick={onPlayPause}
                className="bg-white hover:bg-gray-100 text-purple-600 p-4 rounded-full shadow-lg transition-colors"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              <button 
                onClick={onNext}
                className="text-white hover:text-purple-200 p-2"
              >
                <SkipForward className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        {/* Card indicator */}
        <div className="flex justify-center space-x-2 pb-6">
          {currentPlaylist.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentCardIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentCardIndex ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Instructions */}
      {isMobile && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-white/70 text-sm bg-black/40 px-3 py-1 rounded-full">
            Swipe left or right to browse cards
          </p>
        </div>
      )}
    </div>
  );
}

// Enhanced PhotoGrid component with polaroid effects
function EnhancedPhotoGrid({ photos = [], onPhotoClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [layoutMode, setLayoutMode] = useState('masonry');

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

  const getGridLayout = () => {
    switch (layoutMode) {
      case 'grid':
        return 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center';
      case 'masonry':
        return 'columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-6 space-y-6';
      default:
        return 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 justify-items-center';
    }
  };

  return (
    <div className="space-y-6">
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
        .masonry-item {
          break-inside: avoid;
          margin-bottom: 1.5rem;
          display: inline-block;
          width: 100%;
        }
        @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&family=Caveat:wght@400;600;700&display=swap');
        .font-handwriting {
          font-family: 'Caveat', cursive;
        }
      `}</style>

      {/* Enhanced Controls */}
      <div className="flex flex-wrap gap-4 justify-between items-center bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            📸 Memory Gallery
          </h2>
          <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
            {photos.length} photos
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {/* Layout Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setLayoutMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                layoutMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayoutMode('masonry')}
              className={`p-2 rounded-md transition-colors ${
                layoutMode === 'masonry' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Photo Grid with Polaroids */}
      <div className={`transition-all duration-500 ${getGridLayout()}`}>
        {photos.map((photo, i) => (
          <div
            key={i}
            className={layoutMode === 'masonry' ? 'masonry-item' : ''}
          >
            <EnhancedPolaroid
              photo={{
                src: photo.src || photo,
                alt: photo.alt || `Memory photo ${i + 1}`,
                caption: photo.caption || `Memory #${i + 1}`,
                date: photo.date
              }}
              index={i}
              size="large"
              layoutMode={layoutMode}
              onClick={() => openAt(i)}
              className="hover:shadow-2xl"
            />
          </div>
        ))}
      </div>

      {/* Enhanced Modal with Polaroid Styling */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm">
          <div className="max-w-[90vw] max-h-[90vh] w-full relative flex items-center">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 p-3 rounded-full z-10 transition-all hover:scale-110"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation */}
            <button
              onClick={prev}
              className="absolute left-4 hidden md:flex items-center justify-center p-3 rounded-full bg-black/50 hover:bg-black/70 z-10 transition-all hover:scale-110"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            {/* Main photo with enhanced polaroid styling */}
            <div className="mx-auto max-h-[85vh] w-full flex items-center justify-center">
              <div className="bg-white p-8 shadow-2xl max-w-4xl transform hover:scale-105 transition-transform duration-300 relative">
                <img
                  src={photos[currentIndex]?.src || photos[currentIndex]}
                  alt={photos[currentIndex]?.alt || `Photo ${currentIndex + 1}`}
                  className="w-full h-auto max-h-[65vh] object-contain"
                />
                <div className="mt-6 text-center space-y-2">
                  {photos[currentIndex]?.caption && (
                    <div className="text-gray-700 font-handwriting text-xl">
                      {photos[currentIndex].caption}
                    </div>
                  )}
                  {photos[currentIndex]?.date && (
                    <div className="text-gray-500 text-sm">
                      {photos[currentIndex].date}
                    </div>
                  )}
                </div>
                
                {/* Polaroid paper texture */}
                <div 
                  className="absolute inset-0 opacity-5 pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='47' cy='7' r='1'/%3E%3Ccircle cx='7' cy='47' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                  }}
                />
              </div>
            </div>

            <button
              onClick={next}
              className="absolute right-4 hidden md:flex items-center justify-center p-3 rounded-full bg-black/50 hover:bg-black/70 z-10 transition-all hover:scale-110"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Enhanced bottom controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
              <a
                href={photos[currentIndex]?.src || photos[currentIndex]}
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white transition-all hover:scale-105"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
              
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white transition-all hover:scale-105">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>

            {/* Photo counter with progress */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm px-6 py-2 rounded-full text-white text-sm">
              <div className="flex items-center space-x-2">
                <span>{currentIndex + 1} of {photos.length}</span>
                <div className="w-16 h-1 bg-white/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white transition-all duration-300 rounded-full"
                    style={{ width: `${((currentIndex + 1) / photos.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// PhotoCards component for the floating cards with SMART POSITIONING
const PhotoCards = ({ photos = [], position, isHovered, isTouched, isMobile }) => {
  if (!photos || photos.length === 0) return null;

  const showCards = isMobile ? isTouched : isHovered;
  
  // Normalize photos to always be objects with src property
  const normalizedPhotos = photos.map(photo => ({
    src: photo,
    alt: "Memory photo"
  }));

  const getCardTransform = (index, total) => {
    if (!showCards) {
      return {
        transform: `translateX(-50%) translateY(${index * -2}px) rotate(${index * 2 - 1}deg)`,
        zIndex: total - index,
        opacity: index === 0 ? 1 : 0.7
      };
    }

    // Smart positioning logic
    const isNearTopEdge = position.y < 25;
    const isNearLeftEdge = position.x < 25;
    const isNearRightEdge = position.x > 75;
    
    let spreadDirection = 'up'; // default
    let baseAngle = (index - (total - 1) / 2) * (80 / Math.max(total - 1, 1)); // Wider spread
    
    // Determine spread direction based on position
    if (isNearTopEdge) {
      spreadDirection = 'down';
    }
    
    // Adjust angles based on edge proximity
    if (isNearLeftEdge) {
      baseAngle = Math.abs(baseAngle); // Force positive angles (spread right)
    } else if (isNearRightEdge) {
      baseAngle = -Math.abs(baseAngle); // Force negative angles (spread left)
    }
    
    const yOffset = Math.abs(baseAngle) * 2;
    const verticalOffset = spreadDirection === 'down' ? 25 : -25;
    
    return {
      transform: `translateX(-50%) translateY(${spreadDirection === 'down' ? '' : '-'}${yOffset}px) rotate(${baseAngle}deg) translateY(${verticalOffset}px)`,
      zIndex: 10 + index,
      opacity: 1
    };
  };

  // Adjust container position for mobile to prevent overflow
  const getContainerStyle = () => {
    let adjustedX = position.x;
    let adjustedY = position.y;
    
    if (isMobile) {
      // Ensure cards don't go out of bounds on mobile
      if (position.x < 15) adjustedX = 15;
      if (position.x > 85) adjustedX = 85;
      if (position.y < 20) adjustedY = 20;
    }
    
    return {
      left: `${adjustedX}%`,
      top: `${adjustedY}%`,
      transform: 'translateX(-50%)'
    };
  };

  return (
    <div 
      className="absolute pointer-events-none transition-all duration-500"
      style={getContainerStyle()}
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
              alt={photo.alt}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function MemoryLaneGame() {
  const [currentMemoryIndex, setCurrentMemoryIndex] = useState(0);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [memoriesData, setMemoriesData] = useState(memories);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [showPhotoGrid, setShowPhotoGrid] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [nowPlaying, setNowPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef(null);

  // Enhanced emoji set for background
  const emojis = ['🐰', '📸', '🤎', '🌼'];

  // Collect all photos from all memories with proper structure
  const allPhotos = memoriesData.reduce((acc, memory) => {
    if (memory.photos && memory.photos.length > 0) {
      return [...acc, ...memory.photos.map(photo => ({
        src: photo,
        alt: memory.title,
        caption: `${memory.date} - ${memory.title}`,
        date: memory.date
      }))];
    }
    return acc;
  }, []);

  const getCurrentMemory = () => {
    return memoriesData[currentMemoryIndex];
  };

  const getCharacterPosition = (index) => {
    if (index >= memoriesData.length) return memoriesData[memoriesData.length - 1].position;
    return memoriesData[index].position;
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      const mobileMemories = memories.map((memory, index) => ({
        ...memory,
        position: {
          x: 50,
          y: 10 + (index * (80 / (memories.length - 1)))
        }
      }));
      setMemoriesData(mobileMemories);
    } else {
      setMemoriesData(memories);
    }
  }, [isMobile]);

  const unlockNextMemory = () => {
    if (currentMemoryIndex < memoriesData.length - 1) {
      const newMemories = [...memoriesData];
      newMemories[currentMemoryIndex + 1].unlocked = true;
      setMemoriesData(newMemories);
      setCurrentMemoryIndex(currentMemoryIndex + 1);
    }
  };

  const startGame = () => {
    setGameStarted(true);
  };

const generatePathD = () => {
  if (!memoriesData.length) return '';

  // Find August 3rd memory index
  const august3rdIndex = memoriesData.findIndex(m => m.date.includes('August 3rd'));
  
  // Only include memories up to August 3rd
  const pathMemories = memoriesData.slice(0, august3rdIndex + 1).filter(m => m.unlocked);
  if (pathMemories.length < 2) return '';

  const coords = pathMemories.map(m => {
    const xPx = (m.position.x / 100) * windowSize.width;
    const yPx = (m.position.y / 100) * windowSize.height;
    return `${xPx},${yPx}`;
  });

  // Use smooth curves
  return coords.reduce((path, coord, index) => {
    if (index === 0) return `M ${coord}`;
    
    const prevCoord = coords[index - 1].split(',');
    const currentCoord = coord.split(',');
    const prevX = parseFloat(prevCoord[0]);
    const prevY = parseFloat(prevCoord[1]);
    const currX = parseFloat(currentCoord[0]);
    const currY = parseFloat(currentCoord[1]);
    
    // Create smooth curve
    const controlX = (prevX + currX) / 2;
    const controlY = prevY;
    
    return `${path} Q ${controlX},${controlY} ${coord}`;
  }, '');
};

  const handleMouseEnter = () => {
    if (!isMobile) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setIsHovered(false);
  };

  const handleTouch = () => {
    if (isMobile) {
      setIsTouched(!isTouched);
      setTimeout(() => setIsTouched(false), 3000);
    }
  };

  const showCards = isMobile ? isTouched : isHovered;

  const playSong = (song) => {
    if (!song.previewUrl) {
      console.warn("No preview available for this song");
      return;
    }
    
    setNowPlaying(song);
    const songIndex = playlist.findIndex(s => s.id === song.id);
    setCurrentSongIndex(songIndex);
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = song.previewUrl;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.error("Playback failed:", e));
    }
  };

  const playPause = () => {
    if (audioRef.current && nowPlaying) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(e => console.log("Audio play error:", e));
      }
    }
  };

  const nextSong = () => {
    const nextIndex = (currentSongIndex + 1) % playlist.length;
    playSong(playlist[nextIndex]);
  };

  const prevSong = () => {
    const prevIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    playSong(playlist[prevIndex]);
  };

  const stopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setNowPlaying(null);
    setIsPlaying(false);
  };

  // Auto-play next song when current song ends
  useEffect(() => {
    const handleSongEnd = () => {
      nextSong();
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('ended', handleSongEnd);
      return () => audioRef.current?.removeEventListener('ended', handleSongEnd);
    }
  }, [currentSongIndex]);

  // Handle playlist close - show now playing info
  const handlePlaylistClose = () => {
    setShowPlaylist(false);
    // The now playing indicator will automatically show if there's a song playing
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-200 via-gray-100 to-slate-300 flex items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="text-6xl mb-4">📸✨</div>
          <h1 className="text-4xl font-bold text-stone-800 mb-2">Memory Lane</h1>
          <p className="text-stone-600 leading-relaxed">
          I walk down memory lane late at night
I end up losing my way every time
I wake up missing you more
— Lauv
          </p>
          <button 
            onClick={startGame}
            className="bg-gradient-to-r from-emerald-700 to-slate-700 text-white px-8 py-3 rounded-full font-medium hover:scale-105 transition-transform shadow-lg"
          >
            Let's Go
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-200 via-gray-100 to-slate-300 overflow-hidden">
      {/* Hidden audio element */}
      <audio ref={audioRef} loop />
      
      {/* Enhanced emoji background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(15)].map((_, i) => {
          const emoji = emojis[Math.floor(Math.random() * emojis.length)];
          const size = `${Math.random() * 2 + 1}rem`;
          const delay = `${Math.random() * 5}s`;
          const duration = `${5 + Math.random() * 10}s`;
          
          return (
            <div
              key={i}
              className="absolute text-2xl opacity-20 hover:opacity-40 hover:scale-125 transition-all duration-1000"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: size,
                animation: `float ${duration} ease-in-out infinite ${delay}`,
                animationName: 'float',
                zIndex: 0,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.6';
                e.currentTarget.style.transform = `scale(1.5) rotate(${Math.random() * 360}deg)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.2';
                e.currentTarget.style.transform = `scale(1) rotate(${Math.random() * 360}deg)`;
              }}
            >
              {emoji}
            </div>
          );
        })}
      </div>

      {/* Now playing indicator - shows when music is playing and playlist is closed */}
      {nowPlaying && !showPlaylist && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600/90 to-purple-700/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg z-50 flex items-center space-x-4 animate-slideUp">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Disc3 className={`w-5 h-5 text-white ${isPlaying ? 'animate-spin' : ''}`} />
          </div>
          <div className="text-sm">
            <div className="font-medium text-white">Now Playing</div>
            <div className="text-xs text-purple-100">
              {nowPlaying.title} • {nowPlaying.artist}
            </div>
          </div>
          <button 
            onClick={playPause}
            className="text-white hover:text-purple-200"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button 
            onClick={stopMusic}
            className="text-white hover:text-purple-200"
            aria-label="Stop music"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(10px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out forwards;
        }
      `}</style>

      <ProgressBar currentMemory={currentMemoryIndex + 1} totalMemories={memoriesData.length} />
      
      <div className="relative w-full h-screen">
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path
            d={generatePathD()}
            stroke="rgba(52, 211, 153, 0.4)"
            strokeWidth="4"
            fill="none"
            strokeDasharray="10,5"
          />
        </svg>

        {memoriesData.map((memory, index) => (
          <MemoryPoint
            key={memory.id}
            memory={memory}
            isActive={index === currentMemoryIndex}
            isUnlocked={memory.unlocked}
            onClick={setSelectedMemory}
          />
        ))}

        {getCurrentMemory()?.photos && getCurrentMemory().photos.length > 0 && (
          <PhotoCards 
            photos={getCurrentMemory().photos}
            position={getCharacterPosition(currentMemoryIndex)}
            isHovered={showCards}
            isTouched={isTouched}
            isMobile={isMobile}
          />
        )}

        <div 
          className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-in-out z-10 cursor-pointer"
          style={{ 
            left: `${getCharacterPosition(currentMemoryIndex).x}%`, 
            top: `${getCharacterPosition(currentMemoryIndex).y}%`,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleTouch}
          onTouchStart={handleTouch}
        >
          <Character position={getCharacterPosition(currentMemoryIndex)} />
          
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-1 animate-pulse">
              <div className="w-1 h-1 bg-emerald-500 rounded-full opacity-60"></div>
              <div className="w-1 h-1 bg-emerald-500 rounded-full opacity-40"></div>
              <div className="w-1 h-1 bg-emerald-500 rounded-full opacity-20"></div>
            </div>
          </div>

          {isMobile && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded whitespace-nowrap animate-bounce">
              Tap to see photos
            </div>
          )}
        </div>

        <div
          className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer transition-all duration-300 group pointer-events-none"
          style={{
            left: `${getCharacterPosition(currentMemoryIndex).x}%`,
            top: `${getCharacterPosition(currentMemoryIndex).y}%`,
          }}
        >
          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white p-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity w-40 text-center">
            <h4 className="text-sm font-bold text-stone-800">
              {memoriesData[currentMemoryIndex]?.title}
            </h4>
            <p className="text-xs text-stone-600">
              {memoriesData[currentMemoryIndex]?.description?.slice(0, 40)}...
            </p>
          </div>
        </div>

        {memoriesData.slice(0, currentMemoryIndex + 1).map((memory, index) => (
          <div
            key={`trail-${memory.id}`}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 pointer-events-none"
            style={{ 
              left: `${memory.position.x}%`, 
              top: `${memory.position.y}%`,
              opacity: Math.max(0.3, 1 - (currentMemoryIndex - index) * 0.2)
            }}
          >
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
            <div className="absolute top-0 left-0 w-2 h-2 bg-emerald-600 rounded-full"></div>
          </div>
        ))}

        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse transition-all duration-1000"
              style={{
                left: `${getCharacterPosition(currentMemoryIndex).x + Math.sin(Date.now() / 1000 + i) * 5}%`,
                top: `${getCharacterPosition(currentMemoryIndex).y - 10 + Math.cos(Date.now() / 1000 + i) * 3}%`,
                animationDelay: `${i * 0.3}s`
              }}
            >
              <div className="text-lg opacity-60">
                {['💕', '✨', '🌸'][i]}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
        <button 
          onClick={() => setShowPhotoGrid(true)}
          className="bg-white text-stone-800 px-4 py-2 rounded-full font-medium shadow-lg hover:scale-105 transition-transform border border-gray-300 flex items-center space-x-2"
        >
          <Image className="w-4 h-4" />
          <span>View Photos</span>
        </button>

        <button 
          onClick={() => setShowPlaylist(true)}
          className="bg-white text-stone-800 px-4 py-2 rounded-full font-medium shadow-lg hover:scale-105 transition-transform border border-gray-300 flex items-center space-x-2"
        >
          <Music className="w-4 h-4" />
          <span>Personalized Vinyl</span>
        </button>

        <button 
          onClick={unlockNextMemory}
          disabled={currentMemoryIndex >= memoriesData.length - 1}
          className="bg-gradient-to-r from-emerald-600 to-slate-600 text-white px-6 py-2 rounded-full font-medium hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        >
          Next Memory →
        </button>
      </div>

      <MemoryModal 
        memory={selectedMemory}
        isOpen={!!selectedMemory}
        onClose={() => setSelectedMemory(null)}
      />

      {showPhotoGrid && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 overflow-y-auto">
          <div className="container mx-auto py-20 px-4">
            <div className="flex justify-between items-center mb-8 sticky top-0 bg-black/80 backdrop-blur-sm py-4 z-10">
              <h2 className="text-3xl font-bold text-white">Our Photo Collection</h2>
              <button 
                onClick={() => setShowPhotoGrid(false)}
                className="text-white hover:text-gray-300 p-2"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            
            <EnhancedPhotoGrid 
              photos={allPhotos} 
              onPhotoClick={(photo, index) => console.log('Photo clicked:', photo, index)}
            />
          </div>
        </div>
      )}

      <PlaylistModal
        isOpen={showPlaylist}
        onClose={handlePlaylistClose}
        nowPlaying={nowPlaying}
        onPlayPause={playPause}
        isPlaying={isPlaying}
        onNext={nextSong}
        onPrev={prevSong}
        onSelectSong={playSong}
      />
    </div>
  );
}