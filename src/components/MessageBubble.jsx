import { motion } from 'framer-motion';
import { User, Music } from 'lucide-react';

export default function MessageBubble({ message, isUser, timestamp }) {
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} max-w-[85%] sm:max-w-[70%] ${
        isUser ? 'ml-auto' : 'mr-auto'
      }`}
    >
      {/* Avatar */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="flex-shrink-0"
      >
        {isUser ? (
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-spotify-green to-spotify-green-dark flex items-center justify-center">
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
        ) : (
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-spotify-gray-medium dark:bg-spotify-gray-dark flex items-center justify-center ring-2 ring-spotify-green/30">
            <Music className="w-4 h-4 sm:w-5 sm:h-5 text-spotify-green" />
          </div>
        )}
      </motion.div>

      {/* Message Content */}
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`px-4 py-3 rounded-2xl ${
            isUser
              ? 'bg-gradient-to-br from-spotify-green to-spotify-green-dark text-white rounded-tr-sm'
              : 'bg-white dark:bg-spotify-gray-medium text-gray-900 dark:text-white rounded-tl-sm'
          } shadow-lg`}
        >
          <p className="text-sm sm:text-base leading-relaxed break-words">
            {message}
          </p>
        </motion.div>
        
        <span className="text-xs text-spotify-gray-light mt-1 px-2">
          {formatTime(timestamp)}
        </span>
      </div>
    </motion.div>
  );
}