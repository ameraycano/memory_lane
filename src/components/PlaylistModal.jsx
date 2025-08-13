import React, { useState, useEffect } from 'react';
import { X, Play, Pause, SkipForward, SkipBack } from 'lucide-react';

const PlaylistModal = ({ isOpen, onClose }) => {
  const [nowPlaying, setNowPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = React.useRef(null);

  const songs = [
    {
      id: 1,
      title: "Blind",
      artist: "PRETTYMUCH",
      spotifyUrl: "https://open.spotify.com/track/5NeHvs8ClxMHtqv8DHEK1X",
      previewUrl: "https://p.scdn.co/mp3-preview/ab4d000e1a07ea1a0a4afd3a0c6f7878b43b2e2a"
    },
    {
      id: 2,
      title: "Golden",
      artist: "Harry Styles",
      spotifyUrl: "https://open.spotify.com/track/6Qs4SXO9dwPj5GKvVOv8Ki",
      previewUrl: "https://p.scdn.co/mp3-preview/5d3c3a2f5e9a7b1c0a8d7e6f5c4b3a2d1"
    }
  ];

  const playlists = [
    {
      id: 1,
      url: "https://open.spotify.com/embed/playlist/7qJAJd6lRZ5SsHx54e5XBW",
      title: "Billys with You"
    },
    {
      id: 2,
      url: "https://open.spotify.com/embed/playlist/7cSAIzVCAPkUTHQWYbWKkZ",
      title: "Night Avenue"
    }
  ];

  const playSong = (song) => {
    if (!song.previewUrl) return;
    
    setNowPlaying(song);
    const songIndex = songs.findIndex(s => s.id === song.id);
    setCurrentSongIndex(songIndex);
    
    if (audioRef.current) {
      audioRef.current.src = song.previewUrl;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.error("Playback failed:", e));
    }
  };

  const playPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(e => console.error("Playback failed:", e));
      }
    }
  };

  const nextSong = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    playSong(songs[nextIndex]);
  };

  const prevSong = () => {
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(songs[prevIndex]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] flex flex-col relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-500 hover:text-stone-700"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-2xl font-bold text-stone-800 mb-4">Our Music</h2>
        
        {/* Song Player Section */}
        <div className="mb-6 bg-purple-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-stone-700 mb-2">Special Songs</h3>
          
          {nowPlaying ? (
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-medium">{nowPlaying.title}</p>
                <p className="text-sm text-stone-600">{nowPlaying.artist}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={prevSong}
                  className="p-2 text-purple-600 hover:text-purple-800"
                >
                  <SkipBack size={20} />
                </button>
                <button 
                  onClick={playPause}
                  className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button 
                  onClick={nextSong}
                  className="p-2 text-purple-600 hover:text-purple-800"
                >
                  <SkipForward size={20} />
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-stone-500 mb-3">Select a song to play</p>
          )}

          <div className="space-y-2">
            {songs.map((song) => (
              <div 
                key={song.id}
                onClick={() => playSong(song)}
                className={`p-3 rounded cursor-pointer ${nowPlaying?.id === song.id ? 'bg-purple-100' : 'hover:bg-purple-50'}`}
              >
                <p className="font-medium">{song.title}</p>
                <p className="text-sm text-stone-600">{song.artist}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Playlists Section */}
        <div className="overflow-y-auto flex-1 space-y-4 pr-2">
          <h3 className="text-lg font-semibold text-stone-700">Our Playlists</h3>
          {playlists.map((playlist) => (
            <div key={playlist.id} className="mb-4">
              <h4 className="font-medium text-stone-700 mb-2">{playlist.title}</h4>
              <iframe 
                src={`${playlist.url}?utm_source=generator`}
                width="100%" 
                height="152" 
                frameBorder="0" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                className="rounded-lg"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <audio ref={audioRef} />
      </div>
    </div>
  );
};

export default PlaylistModal;