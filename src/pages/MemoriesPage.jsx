import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Folder, Heart, Image, User, Camera } from 'lucide-react';
import Layout from '../components/Layout';

const folders = [
  {
    id: 'about-pransin',
    title: 'About Pransin',
    description: 'Photos that capture who Pransin is',
    icon: User,
    color: 'from-purple-500 to-indigo-600',
    preview: 'https://via.placeholder.com/400x300/8B5CF6/FFFFFF?text=About+Pransin',
    count: 12
  },
  {
    id: 'boyish-pransin',
    title: 'Boyish Pransin',
    description: 'His playful and charming side',
    icon: Heart,
    color: 'from-blue-500 to-cyan-600',
    preview: 'https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=Boyish+Pransin',
    count: 18
  },
  {
    id: 'media-pransin',
    title: 'Media Pransin',
    description: 'Videos and special moments captured',
    icon: Camera,
    color: 'from-pink-500 to-rose-600',
    preview: 'https://via.placeholder.com/400x300/EC4899/FFFFFF?text=Media+Pransin',
    count: 8
  },
  {
    id: 'our-gallery',
    title: 'Our Gallery',
    description: 'Beautiful moments we share together',
    icon: Image,
    color: 'from-emerald-500 to-teal-600',
    preview: 'https://via.placeholder.com/400x300/10B981/FFFFFF?text=Our+Gallery',
    count: 24
  }
];

export default function MemoriesPage() {
  const navigate = useNavigate();

  const handleFolderClick = (folderId) => {
    navigate(`/memories/${folderId}`);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-4">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl"
              >
                <Folder className="w-8 h-8 text-white" />
              </motion.div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Our Memories
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Every folder holds pieces of our story, Cyn. Click to explore the moments that make us, us.
            </p>
          </motion.div>

          {/* Folders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
            {folders.map((folder, index) => {
              const Icon = folder.icon;
              return (
                <motion.div
                  key={folder.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  onClick={() => handleFolderClick(folder.id)}
                  className="cursor-pointer group"
                >
                  <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                    {/* Folder Tab */}
                    <div className="absolute -top-3 left-6 z-10">
                      <div className={`bg-gradient-to-r ${folder.color} px-6 py-2 rounded-t-2xl shadow-lg`}>
                        <div className="flex items-center gap-2">
                          <Folder className="w-4 h-4 text-white" />
                          <span className="text-sm font-medium text-white">{folder.count} items</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-8 p-6">
                      {/* Preview Image */}
                      <div className="relative mb-4 rounded-2xl overflow-hidden aspect-video">
                        <img
                          src={folder.preview}
                          alt={folder.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Hover Icon */}
                        <motion.div
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <div className={`w-16 h-16 bg-gradient-to-br ${folder.color} rounded-full flex items-center justify-center shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                        </motion.div>
                      </div>

                      {/* Folder Info */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 bg-gradient-to-br ${folder.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all">
                            {folder.title}
                          </h3>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed ml-13">
                          {folder.description}
                        </p>
                      </div>

                      {/* Click Indicator */}
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="mt-4 flex items-center gap-2 text-sm text-gray-400 group-hover:text-purple-600 transition-colors"
                      >
                        <span>Click to open</span>
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

          {/* Footer Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center">
              <Heart className="w-10 h-10 text-pink-500 fill-current mx-auto mb-4" />
              <p className="text-gray-700 text-lg leading-relaxed">
                Each photo, each moment—they all tell the story of us. 
                These folders aren't just memories; they're pieces of my heart that belong to you.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}