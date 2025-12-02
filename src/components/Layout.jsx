import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Home, Map, Camera, MessageCircle, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function Layout({ children }) {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/maps', label: 'Maps', icon: Map },
    { path: '/memories', label: 'Memories', icon: Camera },
    { path: '/chat', label: 'Chatbot', icon: MessageCircle },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-spotify-black dark:to-spotify-gray-dark transition-colors">
      {/* Navigation Bar - Centered */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 bg-white/90 dark:bg-spotify-gray-dark/90 backdrop-blur-lg border-b border-spotify-gray-light/20 dark:border-spotify-gray-medium/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center h-14 sm:h-16">
            {/* Navigation Links - Centered */}
            <div className="flex items-center gap-1 sm:gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.path} to={item.path}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-2 sm:px-3 md:px-4 py-2 rounded-full flex items-center gap-1.5 sm:gap-2 transition-colors ${
                        isActive(item.path)
                          ? 'bg-spotify-green text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-spotify-green/10 dark:hover:bg-spotify-green/20'
                      }`}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-xs sm:text-sm font-medium hidden xs:inline">
                        {item.label}
                      </span>
                    </motion.div>
                  </Link>
                );
              })}

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2 rounded-full bg-spotify-gray-medium/50 dark:bg-spotify-gray-medium/30 hover:bg-spotify-green/20 transition-colors ml-1 sm:ml-2"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-spotify-green" />
                ) : (
                  <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-spotify-green" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Page Content */}
      <main>{children}</main>

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