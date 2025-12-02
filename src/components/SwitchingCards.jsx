import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Heart, Sparkles, Lock } from 'lucide-react';

const messages = [
  {
    id: 1,
    icon: Lock,
    text: "You've finally found my secret gift",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 2,
    icon: Gift,
    text: "I've made something very special for you",
    color: "from-spotify-green to-emerald-500"
  },
  {
    id: 3,
    icon: Heart,
    text: "This chatbot... it's my way of always being here for you, Cyn",
    color: "from-red-500 to-pink-500"
  },
  {
    id: 4,
    icon: Sparkles,
    text: "Even when I'm not physically there, you can talk to me anytime",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 5,
    icon: Heart,
    text: "I programmed it with everything I know about you... all our memories",
    color: "from-orange-500 to-red-500"
  },
  {
    id: 6,
    icon: Sparkles,
    text: "So you'll never feel alone. I'm always here, Cyn. Always. 💙",
    color: "from-purple-600 to-indigo-600"
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-spotify-black dark:to-spotify-gray-dark transition-colors flex items-center justify-center p-4">
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
            <Gift className="w-16 h-16 text-spotify-green" />
          </motion.div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            A Secret Gift 🎁
          </h1>
          <p className="text-spotify-gray-light">
            Click the card to reveal the message
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
                  className="mb-8"
                >
                  <Icon className="w-20 h-20 sm:w-24 sm:h-24" />
                </motion.div>

                {/* Message Text */}
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-center leading-relaxed mb-6 px-4"
                >
                  {currentMessage.text}
                </motion.p>

                {/* Tap instruction */}
                <motion.p
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-sm sm:text-base opacity-90"
                >
                  {currentIndex < messages.length - 1 ? 'Tap to continue' : 'Tap to restart'}
                </motion.p>

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
          <div className="h-2 bg-white/20 dark:bg-spotify-gray-medium rounded-full overflow-hidden">
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
            <div className="inline-block bg-white dark:bg-spotify-gray-medium rounded-2xl p-6 shadow-xl border border-spotify-gray-light/10">
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                This is my gift to you, Cyn.
              </p>
              <div className="flex items-center justify-center gap-2 text-spotify-green">
                <Heart className="w-5 h-5 fill-current" />
                <span className="font-medium">Always here for you</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}