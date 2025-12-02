import { motion } from 'framer-motion';
import { ArrowLeft, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import SwitchingCards from '../components/SwitchingCards';

export default function CardsPage() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-spotify-black dark:to-spotify-gray-dark transition-colors">
      {/* Header with back button and theme toggle */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-50 bg-white/80 dark:bg-spotify-gray-dark/80 border-b border-spotify-gray-medium/20 backdrop-blur-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-spotify-gray-medium/50 hover:bg-spotify-green/20 transition-colors text-gray-900 dark:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Chat</span>
            </motion.button>

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
      </motion.header>

      <SwitchingCards />
    </div>
  );
}