/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Heart, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (passcode.toLowerCase() === 'p!ngu') {
      // Correct passcode - redirect to switching cards
      localStorage.setItem('hasEnteredPasscode', 'true');
      navigate('/cards');
    } else {
      // Incorrect passcode - show error
      setError('Hmm, that\'s not quite right. Think about what we both loved...');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setPasscode('');
    }
  };

  return (
    <div className="min-h-screen bg-spotify-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements - Matching Home Page */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(29, 185, 84) 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }} />
        </div>
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-spotify-green/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Lock Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-spotify-green/20 rounded-full blur-xl"></div>
            <div className="relative w-20 h-20 bg-gradient-to-br from-spotify-green to-emerald-500 rounded-full flex items-center justify-center shadow-2xl">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="absolute -top-2 -right-2"
            >
              <Sparkles className="w-6 h-6 text-spotify-green" />
            </motion.div>
          </div>
        </motion.div>

        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 px-4 tracking-tight">
            Welcome Pransin!
          </h1>
          <div className="flex items-center justify-center gap-2 mb-2">
            <p className="text-lg sm:text-xl text-spotify-gray-light font-light">
              Glad you finally found my secret gift
            </p>
          </div>
        </motion.div>

        {/* Passcode Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-spotify-gray-dark/50 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-spotify-gray-medium/20"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Hint */}
            <div className="bg-spotify-gray-medium/30 rounded-2xl p-4 border border-spotify-green/20">
              <p className="text-sm text-gray-300 text-center leading-relaxed">
                <span className="text-spotify-green font-medium">Hint:</span> We both loved. You might find the code from the gifts I've given
              </p>
            </div>

            {/* Input Field */}
            <div>
              <label htmlFor="passcode" className="block text-sm font-medium text-gray-300 mb-2 text-center">
                Enter the passcode
              </label>
              <motion.input
                animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
                type="text"
                id="passcode"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setError('');
                }}
                className="w-full px-6 py-4 bg-spotify-black/50 border-2 border-spotify-gray-medium rounded-2xl text-white text-center text-lg font-medium placeholder-gray-500 focus:outline-none focus:border-spotify-green focus:ring-2 focus:ring-spotify-green/20 transition-all"
                placeholder="Type here..."
                autoFocus
              />
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4"
                >
                  <p className="text-red-400 text-sm text-center">
                    {error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-spotify-green to-emerald-500 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-spotify-green/50 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Lock className="w-5 h-5" />
              Unlock
            </motion.button>
          </form>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-center"
        >
        </motion.div>
      </motion.div>
    </div>
  );
}
