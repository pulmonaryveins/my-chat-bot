/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Map, Camera, MessageCircle } from 'lucide-react';

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { 
      title: 'Home', 
      icon: Home, 
      href: '/home' 
    },
    { 
      title: 'Maps', 
      icon: Map, 
      href: '/maps' 
    },
    { 
      title: 'Memories', 
      icon: Camera, 
      href: '/memories' 
    },
    { 
      title: 'Chatbot', 
      icon: MessageCircle, 
      href: '/chat' 
    },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-spotify-gray-dark/95 backdrop-blur-lg border-b border-spotify-gray-medium/30 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/home')}
          >
            <img 
              src="/logo.png" 
              alt="Project Pransin Logo" 
              className="w-8 h-8 rounded-lg object-cover"
            />
            <span className="text-white font-semibold text-lg hidden sm:block">Project-Pransin</span>
          </motion.div>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const ItemIcon = item.icon;
              const isActive = location.pathname === item.href || 
                             (item.href === '/memories' && location.pathname.startsWith('/memories'));
              
              return (
                <motion.button
                  key={item.href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(item.href)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full transition-all ${
                    isActive
                      ? 'bg-spotify-green text-white shadow-lg shadow-spotify-green/30'
                      : 'text-gray-300 hover:text-white hover:bg-spotify-gray-medium/50'
                  }`}
                >
                  <ItemIcon className="w-4 h-4" />
                  <span className="hidden md:inline text-sm font-medium">{item.title}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
