import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Folder, Heart, Image, User, Camera } from 'lucide-react';
import Navigation from '../components/Navigation';

const folders = [
  {
    id: 'about-pransin',
    title: 'About Pransin',
    description: 'Photos that capture who Pransin is',
    icon: User,
    color: 'from-purple-500 to-indigo-600',
    preview: '/memories/about-pransin/169.png',
    count: 115
  },
  {
    id: 'boyish-pransin',
    title: 'Boyish Pransin',
    description: 'His playful and charming side',
    icon: Heart,
    color: 'from-blue-500 to-cyan-600',
    preview: '/memories/boyish/162.png',
    count: 24
  },
  {
    id: 'media-pransin',
    title: 'Media Pransin',
    description: 'Videos and special moments captured',
    icon: Camera,
    color: 'from-pink-500 to-rose-600',
    preview: '/memories/media/7.png',
    count: 11
  },
  {
    id: 'our-gallery',
    title: 'Our Gallery',
    description: 'Beautiful moments we share together',
    icon: Image,
    color: 'from-spotify-green to-emerald-600',
    preview: '/memories/gallery/223.png',
    count: 87
  }
];

export default function MemoriesPage() {
  const navigate = useNavigate();

  const handleFolderClick = (folderId) => {
    navigate(`/memories/${folderId}`);
  };

  return (
    <div className="min-h-screen bg-spotify-black">
      <Navigation />
      
      {/* Hero Section - Matching Home Page Style */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(29, 185, 84) 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }} />
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-spotify-green/10 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8 flex justify-center"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-spotify-green/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-spotify-green/20">
                  <Folder className="w-10 h-10 sm:w-12 sm:h-12 text-spotify-green" />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-spotify-green/20 rounded-full blur-xl"
                />
              </motion.div>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              Our Memories
            </h1>
            <p className="text-xl sm:text-2xl text-spotify-gray-light font-light max-w-3xl mx-auto leading-relaxed">
              Every folder holds pieces of our story
            </p>
          </motion.div>

          {/* Folders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {folders.map((folder, index) => {
              const Icon = folder.icon;
              return (
                <motion.div
                  key={folder.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
                  onClick={() => handleFolderClick(folder.id)}
                  className="cursor-pointer group"
                >
                  <div className="relative bg-spotify-gray-dark/50 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-spotify-green/20 transition-all duration-300 overflow-hidden border border-spotify-gray-medium/20 hover:border-spotify-green/30">
                    {/* Folder Tab - Improved visibility */}
                    <div className="absolute -top-3 left-6 z-20">
                    </div>

                    <div className="pt-8 p-6 sm:p-8">
                      {/* Preview Image - Square format */}
                      <div className="relative mb-6 rounded-2xl overflow-hidden aspect-square bg-spotify-gray-medium">
                        <img
                          src={folder.preview}
                          alt={folder.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                        
                        {/* Hover Icon */}
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          whileHover={{ scale: 1, opacity: 1 }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <div className={`w-20 h-20 bg-gradient-to-br ${folder.color} rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300`}>
                            <Icon className="w-10 h-10 text-white" />
                          </div>
                        </motion.div>

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-spotify-green/0 group-hover:bg-spotify-green/10 transition-colors duration-300" />
                      </div>

                      {/* Folder Info */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 bg-gradient-to-br ${folder.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-spotify-green transition-colors">
                            {folder.title}
                          </h3>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                          {folder.description}
                        </p>
                      </div>

                      {/* Click Indicator */}
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="mt-6 flex items-center gap-2 text-sm text-spotify-gray-light group-hover:text-spotify-green transition-colors"
                      >
                        <span className="font-medium">Click to explore</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer Message */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-spotify-gray-dark/50 backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-xl border border-spotify-gray-medium/20 text-center">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="mb-6"
              >
                <Heart className="w-12 h-12 text-pink-500 fill-current mx-auto" />
              </motion.div>
              <p className="text-gray-300 text-lg sm:text-xl leading-relaxed">
                Each photo, each moment—they all tell the story of us. 
                These folders aren't just memories; they're pieces of my heart that belong to you.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}