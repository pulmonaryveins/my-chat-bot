/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music2, ChevronUp, ChevronDown, EyeOff } from 'lucide-react';
import { useMusicPlayer } from '../contexts/MusicContext';

export default function MusicPlayer() {
  const {
    tracks,
    currentTrack,
    isPlaying,
    isMuted,
    togglePlay,
    playNext,
    playPrevious,
    toggleMute,
    changeTrack
  } = useMusicPlayer();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-hide on mobile when playing
  useEffect(() => {
    if (isMobile && isPlaying) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isMobile, isPlaying]);

  const currentSong = tracks[currentTrack];

  return (
    <>
      {/* Toggle Button - Shows when player is hidden on mobile */}
      <AnimatePresence>
        {!isVisible && isMobile && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsVisible(true)}
            className="fixed bottom-4 right-4 z-40 w-14 h-14 bg-spotify-green rounded-full shadow-2xl flex items-center justify-center"
          >
            <Music2 className="w-6 h-6 text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Player */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 right-4 sm:right-6 z-50"
          >
            {/* Expanded Player */}
            <AnimatePresence>
              {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-3 bg-spotify-gray-medium/95 backdrop-blur-xl rounded-2xl shadow-2xl p-4 w-72 border border-spotify-gray-dark"
          >
            {/* Track Info */}
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-spotify-green to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Music2 className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-white truncate">
                    {currentSong.title}
                  </h3>
                  <p className="text-xs text-gray-400 truncate">
                    {currentSong.artist}
                  </p>
                </div>
              </div>

              {/* Track List */}
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {tracks.map((track, index) => (
                  <button
                    key={track.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      changeTrack(index);
                    }}
                    className={`w-full text-xs py-1.5 px-2 rounded-lg transition-colors cursor-pointer ${
                      index === currentTrack
                        ? 'bg-spotify-green/10 text-spotify-green'
                        : 'text-gray-400 hover:bg-spotify-gray-dark hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-4 text-center font-medium">{index + 1}</span>
                      <span className="flex-1 truncate">{track.title}</span>
                      {index === currentTrack && isPlaying && (
                        <div className="flex gap-0.5">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ height: ['4px', '10px', '4px'] }}
                              transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                delay: i * 0.2
                              }}
                              className="w-0.5 bg-spotify-green rounded-full"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMute}
                className="p-2 rounded-lg hover:bg-spotify-gray-dark transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-gray-400" />
                ) : (
                  <Volume2 className="w-4 h-4 text-gray-400" />
                )}
              </motion.button>

              <div className="flex items-center gap-1">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={playPrevious}
                  className="p-2 rounded-lg hover:bg-spotify-gray-dark transition-colors"
                >
                  <SkipBack className="w-5 h-5 text-gray-300" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={togglePlay}
                  className="p-3 bg-spotify-green rounded-full hover:bg-spotify-green-dark transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-white fill-current" />
                  ) : (
                    <Play className="w-5 h-5 text-white fill-current ml-0.5" />
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={playNext}
                  className="p-2 rounded-lg hover:bg-spotify-gray-dark transition-colors"
                >
                  <SkipForward className="w-5 h-5 text-gray-300" />
                </motion.button>
              </div>

              <div className="w-8" /> {/* Spacer for balance */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compact Player */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-spotify-gray-medium/95 backdrop-blur-xl rounded-2xl shadow-2xl p-3 border border-spotify-gray-dark"
      >
        <div className="flex items-center gap-2 px-3 py-2">
          {/* Play Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={togglePlay}
            className="w-10 h-10 bg-gradient-to-br from-spotify-green to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-white fill-current" />
            ) : (
              <Play className="w-4 h-4 text-white fill-current ml-0.5" />
            )}
          </motion.button>

          {/* Now Playing */}
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="flex items-center gap-2 overflow-hidden"
            >
              <div className="flex gap-0.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ height: ['6px', '14px', '6px'] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                    className="w-1 bg-spotify-green rounded-full"
                  />
                ))}
              </div>
              <span className="text-xs text-gray-300 whitespace-nowrap pr-2">
                {currentSong.title}
              </span>
            </motion.div>
          )}

          {/* Hide Button (Mobile Only) */}
          {isMobile && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsVisible(false)}
              className="p-1.5 rounded-lg hover:bg-spotify-gray-dark transition-colors"
              title="Hide player"
            >
              <EyeOff className="w-4 h-4 text-gray-400" />
            </motion.button>
          )}

          {/* Expand/Collapse */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg hover:bg-spotify-gray-dark transition-colors"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            )}
          </motion.button>
        </div>
      </motion.div>
      </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
