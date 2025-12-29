/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Map, Image, Heart, Sparkles, ChevronRight, Bug, Cat, PawPrint, Egg, Pickaxe,Angry    } from 'lucide-react';

const messages = [
  {
    id: 1,
    icon: Angry ,
    title: "Welcome, Newb",
    text: "How long did it take you to crack the code? I should've made it harder! Anyway, welcome to our special space.",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 2,
    icon: Cat,
    title: "Project-Prasin",
    text: "This is one of the projects of \"Project-Pransin\", which is a collection of things dedicated to you, and reminds me of you.",
    color: "from-spotify-green to-emerald-500"
  },
  {
    id: 3,
    icon: Bug,
    title: "Newbie Bugs",
    text: "If you find this early, there might be some bugs/errors since this website is still a work in progress. Please bear with me, I'll make updates every week. Actually daghan pa kaayo ko e-add ani na website HAHAHAHAHA",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 4,
    icon: Egg,
    title: "Easter Eggs",
    text: "There might be some hidden easter eggs throughout the site. Try to find them HAHAHHA (won't go easy on you on this one).",
    color: "from-orange-500 to-red-500"
  },
  {
    id: 5,
    icon: Pickaxe,
    title: "Explore",
    text: "Feel free to explore the different sections—Memories, Maps, Chatbot, and more. I still have a lot to add in the future, please do check it from time to time. Enjoy!",
    color: "from-indigo-500 to-purple-600"
  },
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
    <div className="min-h-screen flex items-center justify-center p-4 py-20 sm:py-4">
      <div className="max-w-2xl w-full space-y-6 sm:space-y-8">
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
            <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-spotify-green" />
          </motion.div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
            Your Personal Space
          </h1>
          <p className="text-sm sm:text-base text-spotify-gray-light font-light">
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
            className="w-full h-[400px] sm:h-96 md:h-[28rem] relative cursor-pointer focus:outline-none focus:ring-4 focus:ring-spotify-green/50 rounded-2xl sm:rounded-3xl overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ rotateY: -90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${currentMessage.color} p-6 sm:p-8 md:p-12 flex flex-col items-center justify-center text-white shadow-2xl`}
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
                  className="mb-4 sm:mb-6"
                >
                  <Icon className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" />
                </motion.div>

                {/* Title */}
                <motion.h3
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-3 sm:mb-4"
                >
                  {currentMessage.title}
                </motion.h3>

                {/* Message Text */}
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-base sm:text-lg md:text-xl text-center leading-relaxed mb-4 sm:mb-6 px-2 sm:px-4 max-w-lg opacity-95"
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
          className="space-y-2 sm:space-y-3 px-2 sm:px-0"
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