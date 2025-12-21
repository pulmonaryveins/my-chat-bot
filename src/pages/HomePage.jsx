import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import Layout from '../components/Layout';
import GridBackground from '../components/GridBackground';
import { useMusicPlayer } from '../contexts/MusicContext';

export default function HomePage() {
  const { play, isPlaying } = useMusicPlayer();

  useEffect(() => {
    // Attempt to auto-play when component mounts
    if (!isPlaying) {
      play();
    }
  }, []);


  return (
    <Layout>
      <GridBackground className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16 min-h-screen flex flex-col justify-center relative overflow-hidden">
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
      </GridBackground>
    </Layout>
  );
}