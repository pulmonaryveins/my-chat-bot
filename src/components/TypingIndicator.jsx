import { motion } from 'framer-motion';

export default function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex gap-3 max-w-[85%] sm:max-w-[70%]"
    >
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-spotify-gray-dark flex items-center justify-center ring-2 ring-spotify-green/30">
        <div className="w-2 h-2 bg-spotify-green rounded-full animate-pulse"></div>
      </div>
      
      <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-spotify-gray-medium shadow-lg">
        <div className="flex gap-1.5">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
            className="w-2 h-2 bg-spotify-green rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
            className="w-2 h-2 bg-spotify-green rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
            className="w-2 h-2 bg-spotify-green rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
}