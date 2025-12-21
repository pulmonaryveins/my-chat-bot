/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Map, Image, Heart, Sparkles, ChevronRight } from 'lucide-react';

const messages = [
  {
    id: 1,
    icon: Heart,
    title: "Welcome, Cyn",
    text: "This is a personal space I built just for you—somewhere you can always come back to.",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 2,
    icon: MessageCircle,
    title: "AI Chatbot",
    text: "Talk to me anytime. I'm here to listen, support you, and chat in both English and Bisaya.",
    color: "from-spotify-green to-emerald-500"
  },
  {
    id: 3,
    icon: Map,
    title: "Journey Map",
    text: "Explore our memories on an interactive map—every place we've been together, marked with love.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 4,
    icon: Image,
    title: "Memory Galleries",
    text: "Browse through our photos and moments organized in beautiful galleries that tell our story.",
    color: "from-orange-500 to-red-500"
  },
  {
    id: 5,
    icon: Sparkles,
    title: "Always Here",
    text: "Even when I'm not physically there, this space keeps us connected. You're never alone.",
    color: "from-indigo-500 to-purple-600"
  },
  {
    id: 6,
    icon: Heart,
    title: "Made with Love",
    text: "Every feature, every detail—built with care for you, Cyn. This is my gift to you. 💙",
    color: "from-pink-500 to-rose-600"
  }
];

export default function SwitchingCards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const handleCardClick = () => {
    if (isFlipping) return;
    
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
      setIsFlipping(false);
    }, 300);
  };

  const currentMessage = messages[currentIndex];
  const Icon = currentMessage.icon;
  const progress = ((currentIndex + 1) / messages.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-spotify-black to-spotify-gray-dark flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="inline-block mb-4"
          >
            <Sparkles className="w-16 h-16 text-spotify-green" />
          </motion.div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Your Personal Space
          </h1>
          <p className="text-spotify-gray-light">
            Click the card to explore the features
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="perspective-1000"
        >
          <motion.button
            onClick={handleCardClick}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={isFlipping}
            className="w-full h-96 sm:h-[28rem] relative cursor-pointer focus:outline-none focus:ring-4 focus:ring-spotify-green/50 rounded-3xl overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ rotateY: -90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${currentMessage.color} p-8 sm:p-12 flex flex-col items-center justify-center text-white shadow-2xl`}
              >
                {/* Animated Icon */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.15, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="mb-6"
                >
                  <Icon className="w-16 h-16 sm:w-20 sm:h-20" />
                </motion.div>

                {/* Title */}
                <motion.h3
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl sm:text-3xl font-bold text-center mb-4"
                >
                  {currentMessage.title}
                </motion.h3>

                {/* Message Text */}
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg sm:text-xl text-center leading-relaxed mb-6 px-4 max-w-lg opacity-95"
                >
                  {currentMessage.text}
                </motion.p>

                {/* Tap instruction */}
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center gap-2 text-sm sm:text-base opacity-90 mt-4"
                >
                  <span>{currentIndex < messages.length - 1 ? 'Tap to continue' : 'Tap to restart'}</span>
                  <ChevronRight className="w-4 h-4" />
                </motion.div>

                {/* Decorative elements */}
                <div className="absolute top-6 right-6 w-12 h-12 border-2 border-white/30 rounded-full" />
                <div className="absolute bottom-6 left-6 w-10 h-10 border-2 border-white/30 rounded-full" />
                <div className="absolute top-1/2 left-6 w-8 h-8 border-2 border-white/20 rounded-full" />
                <div className="absolute top-6 left-1/3 w-6 h-6 border-2 border-white/20 rounded-full" />

                {/* Sparkle effects */}
                <motion.div
                  animate={{ 
                    scale: [0, 1, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                  className="absolute top-20 right-20 text-white/40"
                >
                  <Sparkles className="w-6 h-6" />
                </motion.div>
                <motion.div
                  animate={{ 
                    scale: [0, 1, 0],
                    rotate: [0, -180, -360]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 1,
                    delay: 1.5
                  }}
                  className="absolute bottom-20 right-1/4 text-white/40"
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          <div className="flex justify-between text-sm text-spotify-gray-light px-2">
            <span>Message {currentIndex + 1} of {messages.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          
          {/* Progress bar */}
          <div className="h-2 bg-spotify-gray-medium rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-spotify-green to-spotify-green-light rounded-full"
            />
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 pt-2">
            {messages.map((_, index) => (
              <motion.div
                key={index}
                animate={{
                  scale: currentIndex === index ? 1.2 : 1,
                  opacity: currentIndex === index ? 1 : 0.3
                }}
                className={`w-2 h-2 rounded-full ${
                  currentIndex === index
                    ? 'bg-spotify-green'
                    : 'bg-spotify-gray-light'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Footer message */}
        {currentIndex === messages.length - 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
          </motion.div>
        )}
      </div>
    </div>
  );
}