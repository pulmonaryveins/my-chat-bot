import { createContext, useContext, useRef, useState, useEffect, useCallback } from 'react';

const MusicContext = createContext();

export const useMusicPlayer = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusicPlayer must be used within MusicProvider');
  }
  return context;
};

export const MusicProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);

  const tracks = [
    {
      id: 1,
      title: 'About You',
      artist: 'The 1975',
      src: '/about-you.mp3'
    },
    {
      id: 2,
      title: 'Seasons',
      artist: 'Wave to Earth',
      src: '/seasons.mp3'
    },
    {
      id: 3,
      title: 'Bad',
      artist: 'Wave to Earth',
      src: '/bad.mp3'
    }
  ];

  const play = useCallback(async () => {
    try {
      await audioRef.current?.play();
      setIsPlaying(true);
    } catch (error) {
      console.log('Playback prevented:', error);
      setIsPlaying(false);
    }
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const playNext = useCallback(() => {
    const nextIndex = (currentTrack + 1) % tracks.length;
    setCurrentTrack(nextIndex);
    if (isPlaying) {
      setTimeout(() => play(), 100);
    }
  }, [currentTrack, tracks.length, isPlaying, play]);

  const playPrevious = useCallback(() => {
    const prevIndex = currentTrack === 0 ? tracks.length - 1 : currentTrack - 1;
    setCurrentTrack(prevIndex);
    if (isPlaying) {
      setTimeout(() => play(), 100);
    }
  }, [currentTrack, tracks.length, isPlaying, play]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      playNext();
    };

    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [playNext]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  const changeTrack = useCallback((index) => {
    setCurrentTrack(index);
    if (isPlaying) {
      setTimeout(() => play(), 100);
    }
  }, [isPlaying, play]);

  const value = {
    audioRef,
    currentTrack,
    tracks,
    isPlaying,
    isMuted,
    volume,
    play,
    pause,
    togglePlay,
    playNext,
    playPrevious,
    toggleMute,
    changeTrack,
    setVolume
  };

  return (
    <MusicContext.Provider value={value}>
      <audio
        ref={audioRef}
        src={tracks[currentTrack].src}
        muted={isMuted}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      {children}
    </MusicContext.Provider>
  );
};
