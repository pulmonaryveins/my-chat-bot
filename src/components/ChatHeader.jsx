import { motion } from 'framer-motion';
import { Moon, Sun, Music, Trash2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function ChatHeader({ botName, avatarUrl, onClearChat }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 bg-spotify-black dark:bg-spotify-gray-dark border-b border-spotify-gray-medium/20 backdrop-blur-lg bg-opacity-95"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Avatar and Bot Name */}
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={botName}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-spotify-green"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-spotify-green to-spotify-green-dark flex items-center justify-center ring-2 ring-spotify-green">
                  <Music className="w-6 h-6 text-white" />
                </div>
              )}
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-spotify-green rounded-full border-2 border-spotify-black dark:border-spotify-gray-dark"></div>
            </motion.div>
            
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-white">
                {botName}
              </h1>
              <p className="text-xs text-spotify-gray-light">Active now</p>
            </div>
          </div>

          {/* Right: Clear Chat, Theme Toggle */}
          <div className="flex items-center gap-2">
            {/* Clear Chat Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClearChat}
              className="p-2.5 rounded-full bg-spotify-gray-medium dark:bg-spotify-gray-medium/50 hover:bg-red-500/20 transition-colors"
              aria-label="Clear chat"
              title="Clear all messages"
            >
              <Trash2 className="w-5 h-5 text-red-400 hover:text-red-300" />
            </motion.button>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-spotify-gray-medium dark:bg-spotify-gray-medium/50 hover:bg-spotify-green/20 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-spotify-green" />
              ) : (
                <Moon className="w-5 h-5 text-spotify-green" />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}