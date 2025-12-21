/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';

const images = [
  '/featured/moving/m1.png',
  '/featured/moving/m2.png',
  '/featured/moving/m3.png',
  '/featured/moving/m4.png',
  '/featured/moving/m5.png',
];

function MovingCard({ image, index }) {
  return (
    <div className="relative flex-shrink-0 w-80 sm:w-96 h-64 sm:h-80 mx-4 group">
      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-2 border-spotify-gray-medium/30 bg-spotify-gray-dark">
        <img
          src={image}
          alt={`Moving memory ${index + 1}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
        
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-spotify-green/0 group-hover:bg-spotify-green/10 transition-colors duration-300" />
      </div>
    </div>
  );
}

export default function InfiniteMovingCards() {
  // Double the images array for seamless loop
  const duplicatedImages = [...images, ...images];

  return (
    <div className="w-full py-20 sm:py-32 overflow-hidden bg-spotify-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Always in Motion
          </h2>
          <p className="text-spotify-gray-light text-lg max-w-2xl mx-auto">
            Our story keeps moving forward
          </p>
        </motion.div>
      </div>

      {/* Infinite Scrolling Container */}
      <div className="relative w-full">
        <motion.div
          className="flex"
          animate={{
            x: [0, -1920], // Adjust based on card width
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 30,
              ease: 'linear',
            },
          }}
        >
          {duplicatedImages.map((image, index) => (
            <MovingCard key={index} image={image} index={index} />
          ))}
        </motion.div>

        {/* Gradient Overlays for smooth edge fade */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-spotify-black to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-spotify-black to-transparent pointer-events-none z-10" />
      </div>

      {/* Bottom spacer */}
      <div className="h-8" />
    </div>
  );
}
