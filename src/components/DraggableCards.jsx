/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  '/featured/card/pic1.png',
  '/featured/card/pic2.png',
  '/featured/card/pic3.png',
  '/featured/card/pic4.png',
  '/featured/card/pic5.png',
  '/featured/card/pic6.png',
  '/featured/card/pic7.png',
  '/featured/card/pic8.png',
  '/featured/card/pic9.png',
  '/featured/card/pic10.png',
  '/featured/card/pic11.png',
  '/featured/card/pic12.png',
  '/featured/card/pic13.png',
  '/featured/card/12.png',
];

export default function DraggableCards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = images.length - 1;
      if (nextIndex >= images.length) nextIndex = 0;
      return nextIndex;
    });
  };

  return (
    <div className="w-full py-20 sm:py-32 overflow-hidden bg-spotify-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Captured Moments
          </h2>
          <p className="text-spotify-gray-light text-lg max-w-2xl mx-auto mb-2">
            Click the arrows or swipe to explore our memories
          </p>
          <p className="text-spotify-gray-light/60 text-sm">
            {currentIndex + 1} of {images.length}
          </p>
        </motion.div>

        {/* Card Switcher Container */}
        <div className="relative flex items-center justify-center">
          {/* Previous Button */}
          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(-1)}
            className="absolute left-0 sm:left-4 md:left-8 z-10 w-12 h-12 sm:w-14 sm:h-14 bg-spotify-gray-medium/90 backdrop-blur-sm hover:bg-spotify-green/20 rounded-full flex items-center justify-center border-2 border-spotify-gray-light/20 hover:border-spotify-green/50 transition-all duration-300 shadow-lg cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </motion.button>

          {/* Card Display Area */}
          <div className="relative w-full max-w-2xl mx-auto">
            <div className="relative aspect-square w-full max-w-xl mx-auto">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                    scale: { duration: 0.2 },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                      paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                      paginate(-1);
                    }
                  }}
                  className="absolute inset-0 cursor-pointer"
                  onClick={() => paginate(1)}
                >
                  {/* Square Card Container */}
                  <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl border-2 border-spotify-gray-medium/30 bg-spotify-gray-dark hover:border-spotify-green/40 transition-colors duration-300">
                    <img
                      src={images[currentIndex]}
                      alt={`Memory ${currentIndex + 1}`}
                      className="w-full h-full object-cover select-none"
                      draggable={false}
                    />
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Click hint overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm pointer-events-none"
            >
              Click or swipe to continue
            </motion.div>
          </div>

          {/* Next Button */}
          <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(1)}
            className="absolute right-0 sm:right-4 md:right-8 z-10 w-12 h-12 sm:w-14 sm:h-14 bg-spotify-gray-medium/90 backdrop-blur-sm hover:bg-spotify-green/20 rounded-full flex items-center justify-center border-2 border-spotify-gray-light/20 hover:border-spotify-green/50 transition-all duration-300 shadow-lg cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </motion.button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {images.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                index === currentIndex
                  ? 'w-8 bg-spotify-green'
                  : 'w-2 bg-spotify-gray-light/30 hover:bg-spotify-gray-light/50'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
