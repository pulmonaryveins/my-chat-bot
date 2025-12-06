import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Home, Map, Camera, MessageCircle, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { FloatingDock } from './ui/floating-dock';

export default function Layout({ children }) {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { 
      title: 'Home', 
      icon: <Home className="w-full h-full text-neutral-500 dark:text-neutral-300" />, 
      href: '/' 
    },
    { 
      title: 'Maps', 
      icon: <Map className="w-full h-full text-neutral-500 dark:text-neutral-300" />, 
      href: '/maps' 
    },
    { 
      title: 'Memories', 
      icon: <Camera className="w-full h-full text-neutral-500 dark:text-neutral-300" />, 
      href: '/memories' 
    },
    { 
      title: 'Chatbot', 
      icon: <MessageCircle className="w-full h-full text-neutral-500 dark:text-neutral-300" />, 
      href: '/chat' 
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-spotify-black dark:to-spotify-gray-dark transition-colors">
      {/* Top Bar with Theme Toggle */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-40 bg-white/80 dark:bg-spotify-gray-dark/80 backdrop-blur-lg border-b border-spotify-gray-light/20 dark:border-spotify-gray-medium/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              For Francine ❤️
            </div>
            
            {/* Theme Toggle - Right */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-full bg-spotify-gray-medium/50 dark:bg-spotify-gray-medium/30 hover:bg-spotify-green/20 transition-colors"
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
      </motion.div>

      {/* Page Content */}
      <main className="pb-32 md:pb-28">{children}</main>

      {/* Floating Dock Navigation - Always Horizontal */}
      <div className="fixed bottom-6 left-0 right-0 z-50 flex items-center justify-center pointer-events-none">
        <div className="pointer-events-auto">
          <FloatingDock
            items={navItems}
            desktopClassName="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-lg border border-gray-200 dark:border-neutral-800 shadow-xl"
          />
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="border-t border-spotify-gray-light/20 dark:border-spotify-gray-medium/20 py-6 sm:py-8 mt-12 sm:mt-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-spotify-gray-light text-xs sm:text-sm">
            Made with ❤️ for Francine
          </p>
          <p className="text-spotify-gray-light text-[10px] sm:text-xs mt-2">
            © 2025 - Always here for you
          </p>
        </div>
      </motion.footer>
    </div>
  );
}