import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Heart, X } from 'lucide-react';
import Layout from '../components/Layout';

// Placeholder memories - replace with actual photos
const memories = [
  {
    id: 1,
    title: "First Meeting",
    date: "November 2023",
    description: "UC Webmasters jersey - how it all started",
    image: "https://via.placeholder.com/400x300/1DB954/FFFFFF?text=First+Meeting",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 2,
    title: "Matcha Date",
    date: "December 22, 2023",
    description: "McDonald's before you left for Davao",
    image: "https://via.placeholder.com/400x300/1ed760/FFFFFF?text=Matcha+Date",
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 3,
    title: "Movie Night",
    date: "January 2024",
    description: "The Boy and the Heron at Ayala Cinema",
    image: "https://via.placeholder.com/400x300/e91e63/FFFFFF?text=Movie+Night",
    color: "from-pink-500 to-red-500"
  },
  {
    id: 4,
    title: "Sinulog 2024",
    date: "January 2024",
    description: "Meeting at McDonald's in the chaos",
    image: "https://via.placeholder.com/400x300/2196f3/FFFFFF?text=Sinulog+2024",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 5,
    title: "Intramurals",
    date: "November 2024",
    description: "Esports tournament - our own little world",
    image: "https://via.placeholder.com/400x300/ff9800/FFFFFF?text=Intramurals",
    color: "from-orange-500 to-red-500"
  },
  {
    id: 6,
    title: "Sinulog 2025",
    date: "January 2025",
    description: "Watching fireworks together",
    image: "https://via.placeholder.com/400x300/9c27b0/FFFFFF?text=Sinulog+2025",
    color: "from-purple-600 to-indigo-600"
  }
];

export default function MemoriesPage() {
  const [selectedMemory, setSelectedMemory] = useState(null);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Camera className="w-16 h-16 text-spotify-green mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our Memories
          </h1>
          <p className="text-xl text-spotify-gray-light">
            Moments we've shared, frozen in time
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {memories.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              onClick={() => setSelectedMemory(memory)}
              className="cursor-pointer group"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                {/* Image */}
                <div className="aspect-[4/3] bg-gradient-to-br from-spotify-gray-medium to-spotify-gray-dark">
                  <img
                    src={memory.image}
                    alt={memory.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{memory.title}</h3>
                    <p className="text-sm opacity-90">{memory.date}</p>
                  </div>
                </div>

                {/* Top badge */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full p-2">
                  <Heart className="w-5 h-5 text-white fill-current" />
                </div>
              </div>

              {/* Info below image */}
              <div className="mt-4 px-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {memory.title}
                </h3>
                <p className="text-sm text-spotify-gray-light">
                  {memory.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal for expanded view */}
        <AnimatePresence>
          {selectedMemory && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedMemory(null)}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              />

              {/* Modal */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="fixed inset-4 sm:inset-10 md:inset-20 z-50 flex items-center justify-center"
              >
                <div className="bg-white dark:bg-spotify-gray-medium rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full max-h-full overflow-y-auto">
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedMemory(null)}
                    className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors z-10"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>

                  {/* Image */}
                  <div className="relative">
                    <img
                      src={selectedMemory.image}
                      alt={selectedMemory.title}
                      className="w-full h-64 sm:h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedMemory.title}
                    </h2>
                    <p className="text-lg text-spotify-green mb-4">
                      {selectedMemory.date}
                    </p>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      {selectedMemory.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Footer message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="bg-white dark:bg-spotify-gray-medium rounded-3xl p-8 shadow-xl max-w-2xl mx-auto border border-spotify-gray-light/10">
            <Heart className="w-10 h-10 text-red-500 fill-current mx-auto mb-4" />
            <p className="text-lg text-gray-900 dark:text-white">
              Every moment with you is a memory I treasure, Cyn.
            </p>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}