import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

export default function InputArea({ onSend, disabled }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky bottom-0 bg-gradient-to-t from-white dark:from-spotify-gray-dark via-white/95 dark:via-spotify-gray-dark/95 to-transparent backdrop-blur-sm"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-center gap-2 bg-white dark:bg-spotify-gray-medium rounded-full shadow-xl border border-spotify-gray-light/20 dark:border-spotify-gray-medium p-2 transition-all focus-within:ring-2 focus-within:ring-spotify-green focus-within:border-transparent">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              disabled={disabled}
              className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-spotify-gray-light px-4 py-2 focus:outline-none text-sm sm:text-base disabled:opacity-50"
            />
            
            <motion.button
              type="submit"
              disabled={disabled || !message.trim()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-spotify-green to-spotify-green-dark text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-spotify-green/50 transition-all"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </div>
        </form>
        
        <p className="text-xs text-center text-spotify-gray-light mt-2">
          Press Enter to send
        </p>
      </div>
    </motion.div>
  );
}