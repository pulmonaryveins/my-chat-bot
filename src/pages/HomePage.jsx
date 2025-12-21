/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Heart, Sparkles } from 'lucide-react';
import Navigation from '../components/Navigation';
import DraggableCards from '../components/DraggableCards';
import InfiniteMovingCards from '../components/InfiniteMovingCards';
import { useMusicPlayer } from '../contexts/MusicContext';

export default function HomePage() {
  const { play, isPlaying } = useMusicPlayer();

  useEffect(() => {
    // Attempt to auto-play when component mounts
    if (!isPlaying) {
      play();
    }
  }, [play, isPlaying]);

  return (
    <div className="min-h-screen bg-spotify-black">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(29, 185, 84) 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }} />
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-spotify-green/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
          {/* Floating Icon */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 flex justify-center"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-spotify-green/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-spotify-green/20">
                <Play className="w-10 h-10 sm:w-12 sm:h-12 text-spotify-green fill-spotify-green" />
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-spotify-green/20 rounded-full blur-xl"
              />
            </motion.div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight"
          >
            Still Playing
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl md:text-3xl text-spotify-gray-light font-light max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            A collection of memories we never let go
          </motion.p>

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center gap-6 mb-16"
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-spotify-green" />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Sparkles className="w-6 h-6 text-spotify-green" />
            </motion.div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-spotify-green" />
          </motion.div>

          {/* Stats or Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto"
          >
            {[
              { icon: Heart, label: 'Memories Preserved', value: 'Forever' },
              { icon: Play, label: 'Always Playing', value: 'On Repeat' },
              { icon: Sparkles, label: 'Made For', value: 'Cyn' }
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-spotify-gray-medium/30 backdrop-blur-sm border border-spotify-gray-medium/20 rounded-2xl p-6 hover:border-spotify-green/30 transition-all duration-300"
              >
                <item.icon className="w-8 h-8 text-spotify-green mx-auto mb-3" />
                <p className="text-sm text-spotify-gray-light uppercase tracking-wider mb-1">
                  {item.label}
                </p>
                <p className="text-xl font-semibold text-white">
                  {item.value}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-20"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-spotify-gray-light"
            >
              <p className="text-sm uppercase tracking-wider">Scroll to explore</p>
              <div className="w-px h-12 bg-gradient-to-b from-spotify-green to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Draggable Cards Section */}
      <DraggableCards />

      {/* Infinite Moving Cards Section */}
      <InfiniteMovingCards />

      {/* Footer Quote Section */}
      <section className="py-20 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <blockquote className="text-2xl sm:text-3xl md:text-4xl text-white font-light italic mb-6 leading-relaxed">
              "Our relationship has ended, but the memories continue to play. Thank you for everything, Cyn. I will cherish them forever. "
            </blockquote>
            <p className="text-spotify-gray-light text-lg">
              — 🐱
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}