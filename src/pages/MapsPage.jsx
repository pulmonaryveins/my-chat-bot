/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Polyline, Circle, useMapEvents, useMap } from 'react-leaflet';
import { MapPin, Plus, X, Edit, Trash2, Calendar, Search, Loader2 } from 'lucide-react';
import Navigation from '../components/Navigation';
import Layout from '../components/Layout';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { db } from '../config/firebase';
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, orderBy, updateDoc } from 'firebase/firestore';

// Fix Leaflet default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Enhanced custom marker icon with gradient
const createCustomIcon = (color = '#1DB954') => new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="52" viewBox="0 0 40 52">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
          <stop offset="100%" style="stop-color:#10b981;stop-opacity:1" />
        </linearGradient>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.3"/>
        </filter>
      </defs>
      <path fill="url(#grad)" stroke="#fff" stroke-width="2" filter="url(#shadow)" 
        d="M20 0C11.7 0 5 6.7 5 15c0 10 15 35 15 35s15-25 15-35c0-8.3-6.7-15-15-15z"/>
      <circle cx="20" cy="15" r="7" fill="#fff"/>
      <circle cx="20" cy="15" r="4" fill="${color}"/>
    </svg>
  `),
  iconSize: [40, 52],
  iconAnchor: [20, 52],
  popupAnchor: [0, -52],
  className: 'custom-marker-icon'
});

const customIcon = createCustomIcon();

function MapClickHandler({ onMapClick, isAddingMarker }) {
  useMapEvents({
    click: (e) => {
      if (isAddingMarker) {
        onMapClick(e.latlng);
      }
    },
  });
  return null;
}

// Component to fly to location
function FlyToLocation({ center, zoom }) {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom, {
        duration: 1.5,
        easeLinearity: 0.25
      });
    }
  }, [center, zoom, map]);
  
  return null;
}

export default function MapsPage() {
  const [pins, setPins] = useState([]);
  const [isAddingMarker, setIsAddingMarker] = useState(false);
  const [selectedPin, setSelectedPin] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [tempLocation, setTempLocation] = useState(null);
  const [showRoutes, setShowRoutes] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [flyToLocation, setFlyToLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editingPinId, setEditingPinId] = useState(null);
  const searchTimeoutRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    message: '',
  });

  // Load pins from Firestore with real-time updates
  useEffect(() => {
    const q = query(collection(db, 'mapPins'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedPins = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPins(loadedPins);
      setIsLoading(false);
    }, (error) => {
      console.error('Error loading pins:', error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Search location using Nominatim (OpenStreetMap)
  const searchLocation = async (query) => {
    if (!query.trim() || query.length < 3) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&countrycodes=ph`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounced search
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      if (searchQuery) {
        searchLocation(searchQuery);
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  const handleSelectLocation = (result) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    
    setTempLocation({ lat, lng });
    setFormData({ ...formData, title: result.display_name.split(',')[0] });
    setFlyToLocation({ center: [lat, lng], zoom: 15 });
    setShowAddModal(true);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleMapClick = (latlng) => {
    setTempLocation(latlng);
    setShowAddModal(true);
    setIsAddingMarker(false);
  };

  const handleAddPin = async (e) => {
    e.preventDefault();
    if (!tempLocation || !formData.title.trim()) return;

    try {
      if (editingPinId) {
        // Update existing pin
        const pinRef = doc(db, 'mapPins', editingPinId);
        await updateDoc(pinRef, {
          lat: tempLocation.lat,
          lng: tempLocation.lng,
          title: formData.title,
          date: formData.date,
          message: formData.message,
        });
        setEditingPinId(null);
      } else {
        // Add new pin
        const newPin = {
          lat: tempLocation.lat,
          lng: tempLocation.lng,
          title: formData.title,
          date: formData.date,
          message: formData.message,
          createdAt: new Date().toISOString(),
          radius: 500,
        };
        await addDoc(collection(db, 'mapPins'), newPin);
      }
      
      setShowAddModal(false);
      setFormData({ title: '', date: new Date().toISOString().split('T')[0], message: '' });
      setTempLocation(null);
    } catch (error) {
      console.error('Error saving pin:', error);
      alert('Failed to save place. Please try again.');
    }
  };

  const handleDeletePin = async (id) => {
    if (!confirm('Are you sure you want to delete this place?')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'mapPins', id));
      setSelectedPin(null);
    } catch (error) {
      console.error('Error deleting pin:', error);
      alert('Failed to delete place. Please try again.');
    }
  };

  const handleEditPin = (pin) => {
    setEditingPinId(pin.id);
    setFormData({
      title: pin.title,
      date: pin.date,
      message: pin.message,
    });
    setTempLocation({ lat: pin.lat, lng: pin.lng });
    setShowAddModal(true);
    setSelectedPin(null);
  };

  const handleCancelEdit = () => {
    setShowAddModal(false);
    setEditingPinId(null);
    setFormData({ title: '', date: new Date().toISOString().split('T')[0], message: '' });
    setTempLocation(null);
  };

  // Generate routes (lines between pins in chronological order)
  const routes = pins.length > 1 ? pins
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(pin => [pin.lat, pin.lng]) : [];

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-spotify-green animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading your journey...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <div className="min-h-screen bg-spotify-black">
      <Navigation />
      
      {/* Hero Section - Matching Home Page Style */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(29, 185, 84) 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }} />
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-spotify-green/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
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
                  <MapPin className="w-10 h-10 sm:w-12 sm:h-12 text-spotify-green" />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-spotify-green/20 rounded-full blur-xl"
                />
              </motion.div>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              Our Map of Memories
            </h1>
            <p className="text-xl sm:text-2xl text-spotify-gray-light font-light max-w-3xl mx-auto leading-relaxed">
              Every place has a story
            </p>
          </motion.div>

          {/* Stats & Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-spotify-gray-medium/30 backdrop-blur-sm border border-spotify-gray-medium/20 rounded-2xl p-6 hover:border-spotify-green/30 transition-all duration-300"
            >
              <p className="text-3xl font-bold text-white mb-1">{pins.length}</p>
              <p className="text-sm text-spotify-gray-light uppercase tracking-wider">Places Saved</p>
            </motion.div>
            
            {pins.length > 1 && (
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-spotify-gray-medium/30 backdrop-blur-sm border border-spotify-gray-medium/20 rounded-2xl p-6 hover:border-spotify-green/30 transition-all duration-300"
              >
                <p className="text-3xl font-bold text-spotify-green mb-1">{pins.length - 1}</p>
                <p className="text-sm text-spotify-gray-light uppercase tracking-wider">Connections</p>
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAddingMarker(true)}
              className="bg-spotify-green/10 backdrop-blur-sm border border-spotify-green/20 rounded-2xl p-6 hover:bg-spotify-green/20 hover:border-spotify-green/30 transition-all duration-300 flex flex-col items-center justify-center gap-2"
            >
              <Plus className="w-8 h-8 text-spotify-green" />
              <span className="text-sm font-semibold text-white uppercase tracking-wider">Add Place</span>
            </motion.button>
          </motion.div>

          {/* Routes Toggle */}
          {pins.length > 1 && (
            <div className="flex justify-center mb-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowRoutes(!showRoutes)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                  showRoutes
                    ? 'bg-spotify-green text-white shadow-lg shadow-spotify-green/30'
                    : 'bg-spotify-gray-medium border border-spotify-gray-light/20 text-gray-300 hover:border-spotify-green/30'
                }`}
              >
                <Navigation className="w-5 h-5" />
                <span>{showRoutes ? 'Hide' : 'Show'} Routes</span>
              </motion.button>
            </div>
          )}

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8 relative max-w-3xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-spotify-gray-light z-10" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a place..."
                className="w-full pl-12 sm:pl-14 pr-12 sm:pr-14 py-3 sm:py-4 rounded-2xl border-2 border-spotify-gray-medium/20 bg-spotify-gray-medium/30 backdrop-blur-sm text-white placeholder-spotify-gray-light focus:ring-2 focus:ring-spotify-green focus:border-spotify-green/50 outline-none transition-all shadow-lg text-sm sm:text-base"
              />
              {isSearching && (
                <Loader2 className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-spotify-green animate-spin" />
              )}
              {searchQuery && !isSearching && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSearchResults([]);
                  }}
                  className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 p-1 hover:bg-spotify-gray-dark rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-spotify-gray-light" />
                </button>
              )}
            </div>

            {/* Search Results Dropdown */}
            <AnimatePresence>
              {searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute z-[9999] w-full mt-2 bg-spotify-gray-medium/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-spotify-gray-light/20 overflow-hidden max-h-60 sm:max-h-80 overflow-y-auto custom-scrollbar"
                >
                  {searchResults.map((result, index) => (
                    <motion.button
                      key={result.place_id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleSelectLocation(result)}
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left hover:bg-spotify-green/10 transition-colors border-b border-spotify-gray-dark/30 last:border-b-0 flex items-start gap-3"
                    >
                      <MapPin className="w-5 h-5 text-spotify-green flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white truncate text-sm sm:text-base">
                          {result.display_name.split(',')[0]}
                        </p>
                        <p className="text-xs sm:text-sm text-spotify-gray-light truncate">
                          {result.display_name.split(',').slice(1).join(',')}
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">

        {/* Adding Marker Notice */}
        <AnimatePresence>
          {isAddingMarker && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 bg-spotify-green/10 border border-spotify-green/30 rounded-xl p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-spotify-green" />
                <p className="text-sm font-medium text-white">
                  Click anywhere on the map to add a new place
                </p>
              </div>
              <button
                onClick={() => setIsAddingMarker(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-spotify-gray-dark"
          style={{ height: '600px' }}
        >
          <MapContainer
            center={pins.length > 0 ? [pins[0].lat, pins[0].lng] : [10.3157, 123.8854]}
            zoom={pins.length > 0 ? 12 : 11}
            style={{ height: '100%', width: '100%' }}
            className="z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            <MapClickHandler onMapClick={handleMapClick} isAddingMarker={isAddingMarker} />
            {flyToLocation && <FlyToLocation center={flyToLocation.center} zoom={flyToLocation.zoom} />}

            {/* Draw routes */}
            {showRoutes && pins.length > 1 && (
              <Polyline
                positions={routes}
                pathOptions={{
                  color: '#1DB954',
                  weight: 4,
                  opacity: 0.8,
                  dashArray: '10, 10',
                  lineCap: 'round',
                  lineJoin: 'round',
                }}
              />
            )}

            {/* Render markers with radius circles - NO POPUPS */}
            {pins.map((pin) => (
              <motion.div key={pin.id}>
                <Circle
                  center={[pin.lat, pin.lng]}
                  radius={pin.radius || 500}
                  pathOptions={{
                    fillColor: '#1DB954',
                    fillOpacity: 0.1,
                    color: '#1DB954',
                    weight: 2,
                    opacity: 0.5,
                  }}
                />
                
                <Marker
                  position={[pin.lat, pin.lng]}
                  icon={customIcon}
                  eventHandlers={{
                    click: () => {
                      setSelectedPin(pin);
                      setFlyToLocation({ center: [pin.lat, pin.lng], zoom: 15 });
                    },
                  }}
                />
              </motion.div>
            ))}
          </MapContainer>
        </motion.div>

        {/* Improved Pin Details Modal */}
        <AnimatePresence>
          {selectedPin && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedPin(null)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              />
              
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-spotify-gray-medium/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden border border-spotify-gray-light/20">
                  {/* Header */}
                  <div className="relative p-6 sm:p-8">
                    <button
                      onClick={() => setSelectedPin(null)}
                      className="absolute top-4 right-4 p-2 hover:bg-spotify-gray-dark rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-spotify-gray-light" />
                    </button>
                    
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-spotify-green/10 rounded-2xl">
                        <MapPin className="w-7 h-7 text-spotify-green" />
                      </div>
                      <div className="flex-1 pr-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 break-words">{selectedPin.title}</h2>
                        <div className="flex items-center gap-2 text-sm text-spotify-gray-light">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(selectedPin.date).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-6 sm:px-8 pb-6 max-h-[50vh] overflow-y-auto custom-scrollbar">
                    {selectedPin.message ? (
                      <div className="bg-spotify-gray-dark/50 border border-spotify-gray-dark rounded-2xl p-4 sm:p-6">
                        <p className="text-gray-300 leading-relaxed whitespace-pre-wrap break-words">
                          {selectedPin.message}
                        </p>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-spotify-gray-light italic">
                          No message for this place yet
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Footer - Minimal Buttons */}
                  <div className="border-t border-spotify-gray-dark/30 p-4 sm:p-6 flex items-center justify-end gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEditPin(selectedPin)}
                      className="flex items-center gap-2 px-4 py-2 bg-spotify-gray-dark hover:bg-spotify-green/20 border border-spotify-gray-light/20 hover:border-spotify-green/30 text-white rounded-xl font-medium transition-all"
                    >
                      <Edit className="w-4 h-4" />
                      <span className="hidden sm:inline">Edit</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDeletePin(selectedPin.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 text-red-400 rounded-xl font-medium transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Delete</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Pin List */}
        {pins.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              All Places ({pins.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pins
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((pin, index) => (
                  <motion.div
                    key={pin.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    onClick={() => {
                      setSelectedPin(pin);
                      setFlyToLocation({ center: [pin.lat, pin.lng], zoom: 15 });
                    }}
                    className="bg-white dark:bg-spotify-gray-medium rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-spotify-gray-dark cursor-pointer hover:border-spotify-green hover:shadow-xl transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">{pin.title}</h3>
                      <div className="p-2 bg-spotify-green/10 rounded-full">
                        <MapPin className="w-5 h-5 text-spotify-green flex-shrink-0" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-spotify-gray-light mb-3 bg-gray-50 dark:bg-spotify-gray-dark px-3 py-2 rounded-lg">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(pin.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}</span>
                    </div>
                    {pin.message && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                        {pin.message}
                      </p>
                    )}
                  </motion.div>
                ))}
            </div>
          </motion.div>
        )}

        {/* Add/Edit Pin Modal */}
        <AnimatePresence>
          {showAddModal && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleCancelEdit}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              />
              
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-spotify-gray-medium/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 border border-spotify-gray-light/20">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-spotify-green/10 rounded-2xl">
                        <MapPin className="w-7 h-7 text-spotify-green" />
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white">
                        {editingPinId ? 'Edit Place' : 'Add New Place'}
                      </h2>
                    </div>
                    <button
                      onClick={handleCancelEdit}
                      className="p-2 hover:bg-spotify-gray-dark rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-spotify-gray-light" />
                    </button>
                  </div>

                  <form onSubmit={handleAddPin} className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-spotify-gray-light uppercase tracking-wide mb-2">
                        Place Name *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g., Ayala Center Cebu"
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-spotify-gray-dark bg-spotify-gray-dark text-white placeholder-spotify-gray-light focus:ring-2 focus:ring-spotify-green focus:border-spotify-green outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-spotify-gray-light uppercase tracking-wide mb-2">
                        Date
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-spotify-gray-dark bg-spotify-gray-dark text-white focus:ring-2 focus:ring-spotify-green focus:border-spotify-green outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-spotify-gray-light uppercase tracking-wide mb-2">
                        Message
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="What happened here? How did you feel?"
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border-2 border-spotify-gray-dark bg-spotify-gray-dark text-white placeholder-spotify-gray-light focus:ring-2 focus:ring-spotify-green focus:border-spotify-green outline-none transition-all resize-none"
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleCancelEdit}
                        className="flex-1 px-5 py-3 rounded-xl bg-spotify-gray-dark border border-spotify-gray-light/20 text-white font-semibold hover:border-spotify-gray-light/40 transition-all"
                      >
                        Cancel
                      </motion.button>
                      
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 px-5 py-3 rounded-xl bg-spotify-green text-white font-semibold shadow-lg hover:shadow-spotify-green/50 transition-all"
                      >
                        {editingPinId ? 'Update' : 'Add Place'}
                      </motion.button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .custom-marker-icon {
          animation: markerBounce 0.6s ease-out;
        }
        @keyframes markerBounce {
          0% { transform: translateY(-100px) scale(0); opacity: 0; }
          50% { transform: translateY(0) scale(1.1); }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #1DB954 #f3f4f6;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #282828;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1DB954;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #10b981;
        }
      `}</style>
    </div>
  );
}
