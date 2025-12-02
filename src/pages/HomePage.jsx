import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Heart, Play, Pause } from 'lucide-react';
import Layout from '../components/Layout';

export default function HomePage() {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Attempt to auto-play when component mounts
    const playAudio = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.log('Autoplay prevented - user interaction required:', error);
          setIsPlaying(false);
        }
      }
    };
    playAudio();
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <Layout>
      {/* Background Music - Multiple source formats for compatibility */}
      <audio
        ref={audioRef}
        loop
        muted={isMuted}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="/about-you.mp3" type="audio/mpeg" />
        <source src="/about-you.ogg" type="audio/ogg" />
        <source src="/about-you.wav" type="audio/wav" />
        Your browser does not support the audio element.
      </audio>

      {/* Music Controls - Fixed Bottom Right (Mobile Responsive) */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col gap-2 sm:gap-3">
        {/* Play/Pause Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={togglePlay}
          className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-spotify-green to-emerald-500 rounded-full flex items-center justify-center shadow-2xl hover:shadow-spotify-green/50 transition-all"
          aria-label="Play/Pause music"
        >
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.div
                key="pause"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
              >
                <Pause className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-current" />
              </motion.div>
            ) : (
              <motion.div
                key="play"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
              >
                <Play className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-current ml-1" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Mute Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMute}
          className="w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-spotify-gray-medium rounded-full flex items-center justify-center shadow-xl hover:shadow-lg transition-all border border-gray-200 dark:border-spotify-gray-dark"
          aria-label="Toggle mute"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300" />
          ) : (
            <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-spotify-green" />
          )}
        </motion.button>

        {/* Now Playing Indicator */}
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-spotify-gray-medium rounded-full px-3 py-1.5 sm:px-4 sm:py-2 shadow-xl border border-gray-200 dark:border-spotify-gray-dark"
          >
            <div className="flex items-center gap-1.5 sm:gap-2">
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
                    className="w-0.5 sm:w-1 bg-spotify-green rounded-full"
                    style={{ height: '6px' }}
                  />
                ))}
              </div>
              <span className="text-[10px] sm:text-xs text-gray-700 dark:text-gray-300 whitespace-nowrap">
                About You
              </span>
            </div>
          </motion.div>
        )}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16 min-h-screen flex flex-col justify-center relative overflow-hidden">
        
        {/* 
          ===================================
          CUSTOM ELEMENTS PLACEHOLDER AREA
          ===================================
          Add your custom vinyl records, cassette tapes, polaroids, or any other elements here.
          Example positions:
          - Top left: className="absolute top-10 left-10"
          - Top right: className="absolute top-10 right-10"
          - Bottom left: className="absolute bottom-20 left-10"
          - Bottom right: className="absolute bottom-20 right-20"
          
          For mobile responsiveness, use responsive classes:
          - className="absolute top-4 sm:top-10 left-4 sm:left-10"
        */}

        {/* Main Content */}
        <div className="text-center space-y-8 sm:space-y-12 relative z-10">
          {/* Subtle intro text */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="text-xs sm:text-sm md:text-base text-spotify-gray-light uppercase tracking-widest">
              Do you think I have forgotten
            </p>
          </motion.div>

          {/* Main Title - Minimalist */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-gray-900 dark:text-white mb-4 sm:mb-6 tracking-tight px-4">
              About <span className="italic font-normal">You</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="space-y-4 px-4"
          >
            <p className="text-base sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
              This is a space where you exist in my memory,<br />
              where every moment still matters.
            </p>
          </motion.div>

          {/* Pulsing Heart */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="py-6 sm:py-8 relative"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              <Heart className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-red-500 fill-current opacity-80" />
            </motion.div>
          </motion.div>

          {/* Navigation Links - Clean Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-6 sm:pt-8 px-4"
          >
            {[
                { label: "Maps", path: "/maps" },
                { label: "Memories", path: "/memories" },
                { label: "Talk", path: "/chat" }
            ].map((link, index) => (
              <motion.a
                key={index}
                href={link.path}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="group relative overflow-hidden"
              >
                <div className="bg-white dark:bg-spotify-gray-medium border border-gray-200 dark:border-spotify-gray-dark rounded-lg p-4 sm:p-6 transition-all hover:border-spotify-green hover:shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-spotify-green/0 to-spotify-green/0 group-hover:from-spotify-green/5 group-hover:to-spotify-green/10 transition-all duration-300" />
                  <p className="text-base sm:text-lg font-medium text-gray-900 dark:text-white relative z-10">
                    {link.label}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Quote - The 1975 Style */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 2 }}
            className="pt-12 sm:pt-16 px-4"
          >
            <blockquote className="text-sm sm:text-base md:text-lg text-gray-500 dark:text-gray-500 italic font-light">
              "I know you, and I know about you."
            </blockquote>
            <p className="text-xs sm:text-sm text-spotify-gray-light mt-2">
              — For Francine
            </p>
          </motion.div>
        </div>

        {/* Subtle Bottom Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2.5 }}
          className="text-center mt-12 sm:mt-16 text-xs text-spotify-gray-light relative z-10 px-4"
        >
          <p>Still here, still thinking about you</p>
        </motion.div>
      </div>
    </Layout>
  );
}