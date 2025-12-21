/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, X, Heart, ZoomIn } from 'lucide-react';
import Navigation from './Navigation';

export default function CategoryGallery({ 
  title, 
  description, 
  message, 
  color, 
  icon: Icon,
  images 
}) {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="min-h-screen bg-spotify-black">
      <Navigation />
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header with Back Button */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <button
              onClick={() => navigate('/memories')}
              className="flex items-center gap-2 text-gray-400 hover:text-spotify-green transition-colors mb-6 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Memories</span>
            </button>

            <div className="flex items-start gap-4 mb-6">
              <div className={`w-14 h-14 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-spotify-green/20`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
                  {title}
                </h1>
                <p className="text-lg text-gray-400">
                  {description}
                </p>
              </div>
            </div>

            {/* Message Section */}
            {message && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-spotify-gray-dark/50 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-spotify-gray-medium/30 mb-8"
              >
                <div className="flex items-start gap-3">
                  <Heart className="w-6 h-6 text-spotify-green fill-current flex-shrink-0 mt-1" />
                  <p className="text-gray-300 leading-relaxed italic">
                    "{message}"
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedImage(image)}
                className="cursor-pointer group relative"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden bg-spotify-gray-medium shadow-md hover:shadow-xl hover:shadow-spotify-green/20 transition-all duration-300 border border-spotify-gray-medium/30">
                  <img
                    src={image.url}
                    alt={image.caption || `Memory ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Zoom Icon */}
                    <div className="absolute top-3 right-3">
                      <div className="w-8 h-8 bg-spotify-green/20 backdrop-blur-md rounded-full flex items-center justify-center border border-spotify-green/30">
                        <ZoomIn className="w-4 h-4 text-spotify-green" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {images.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Icon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                No images yet. Add some beautiful memories!
              </p>
            </motion.div>
          )}

          {/* Image Modal */}
          <AnimatePresence>
            {selectedImage && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedImage(null)}
                  className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50"
                />

                {/* Modal */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="fixed inset-4 sm:inset-8 lg:inset-12 z-50 flex items-center justify-center"
                >
                  <div className="relative bg-spotify-gray-dark rounded-3xl overflow-hidden shadow-2xl max-w-5xl w-full max-h-full flex flex-col border border-spotify-gray-medium/30">
                    {/* Close Button */}
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="absolute top-4 right-4 z-10 p-2 bg-spotify-gray-dark/80 hover:bg-spotify-gray-medium/80 backdrop-blur-md rounded-full transition-colors border border-spotify-gray-medium/30"
                    >
                      <X className="w-6 h-6 text-white" />
                    </button>

                    {/* Image */}
                    <div className="flex-1 overflow-hidden flex items-center justify-center p-4 sm:p-8 bg-black/40">
                      <img
                        src={selectedImage.url}
                        alt={selectedImage.caption || 'Memory'}
                        className="max-w-full max-h-full object-contain rounded-xl"
                      />
                    </div>

                    {/* Details */}
                    {(selectedImage.caption || selectedImage.date) && (
                      <div className="bg-spotify-gray-dark/90 backdrop-blur-xl border-t border-spotify-gray-medium/30 p-6">
                        {selectedImage.caption && (
                          <h3 className="text-lg font-semibold text-white mb-1">
                            {selectedImage.caption}
                          </h3>
                        )}
                        {selectedImage.date && (
                          <p className="text-sm text-gray-400">
                            {selectedImage.date}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
