import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, useMapEvents, useMap } from 'react-leaflet';
import { MapPin, Plus, X, Edit, Trash2, Navigation, Calendar, Search, Loader2 } from 'lucide-react';
import Layout from '../components/Layout';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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
  const searchTimeoutRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    message: '',
  });

  // Load pins from localStorage
  useEffect(() => {
    const savedPins = localStorage.getItem('mapPins');
    if (savedPins) {
      setPins(JSON.parse(savedPins));
    }
  }, []);

  // Save pins to localStorage
  useEffect(() => {
    if (pins.length > 0) {
      localStorage.setItem('mapPins', JSON.stringify(pins));
    }
  }, [pins]);

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

  const handleAddPin = (e) => {
    e.preventDefault();
    if (!tempLocation || !formData.title.trim()) return;

    const newPin = {
      id: Date.now(),
      ...tempLocation,
      ...formData,
      createdAt: new Date().toISOString(),
      radius: 500, // 500 meter radius
    };

    setPins([...pins, newPin]);
    setShowAddModal(false);
    setFormData({ title: '', date: new Date().toISOString().split('T')[0], message: '' });
    setTempLocation(null);
  };

  const handleDeletePin = (id) => {
    setPins(pins.filter(pin => pin.id !== id));
    setSelectedPin(null);
  };

  const handleEditPin = (pin) => {
    setFormData({
      title: pin.title,
      date: pin.date,
      message: pin.message,
    });
    setTempLocation({ lat: pin.lat, lng: pin.lng });
    setShowAddModal(true);
    handleDeletePin(pin.id);
  };

  // Generate routes (lines between pins in chronological order)
  const routes = pins.length > 1 ? pins
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(pin => [pin.lat, pin.lng]) : [];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <MapPin className="w-10 h-10 text-spotify-green" />
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
              Our Journey
            </h1>
          </div>
          <p className="text-lg text-spotify-gray-light">
            Every place has a story. Search or click the map to add yours.
          </p>
        </motion.div>

        {/* Stats & Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white dark:bg-spotify-gray-medium rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-200 dark:border-spotify-gray-dark"
        >
          <div className="flex items-center gap-6">
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{pins.length}</p>
              <p className="text-sm text-spotify-gray-light">Places</p>
            </div>
            {pins.length > 1 && (
              <div>
                <p className="text-2xl font-bold text-spotify-green">{pins.length - 1}</p>
                <p className="text-sm text-spotify-gray-light">Connections</p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {pins.length > 1 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowRoutes(!showRoutes)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                  showRoutes
                    ? 'bg-spotify-green text-white'
                    : 'bg-gray-200 dark:bg-spotify-gray-dark text-gray-700 dark:text-gray-300'
                }`}
              >
                <Navigation className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">Routes</span>
              </motion.button>
            )}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAddingMarker(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-spotify-green to-emerald-500 text-white rounded-full font-medium shadow-lg hover:shadow-spotify-green/50 transition-all"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Add Place</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6 relative"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a place in Philippines... (e.g., Ayala Center Cebu)"
              className="w-full pl-12 pr-12 py-4 rounded-2xl border-2 border-gray-200 dark:border-spotify-gray-dark bg-white dark:bg-spotify-gray-medium text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-spotify-green focus:border-transparent outline-none transition-all shadow-lg"
            />
            {isSearching && (
              <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-spotify-green animate-spin" />
            )}
          </div>

          {/* Search Results Dropdown */}
          <AnimatePresence>
            {searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-10 w-full mt-2 bg-white dark:bg-spotify-gray-medium rounded-2xl shadow-2xl border border-gray-200 dark:border-spotify-gray-dark overflow-hidden"
              >
                {searchResults.map((result, index) => (
                  <motion.button
                    key={result.place_id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSelectLocation(result)}
                    className="w-full px-6 py-4 text-left hover:bg-spotify-green/10 dark:hover:bg-spotify-green/20 transition-colors border-b border-gray-100 dark:border-spotify-gray-dark last:border-b-0 flex items-start gap-3"
                  >
                    <MapPin className="w-5 h-5 text-spotify-green flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white truncate">
                        {result.display_name.split(',')[0]}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {result.display_name.split(',').slice(1).join(',')}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

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
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Click anywhere on the map to add a new place
                </p>
              </div>
              <button
                onClick={() => setIsAddingMarker(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
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

            {/* Render markers with radius circles */}
            {pins.map((pin) => (
              <motion.div key={pin.id}>
                {/* Radius circle */}
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
                
                {/* Marker */}
                <Marker
                  position={[pin.lat, pin.lng]}
                  icon={customIcon}
                  eventHandlers={{
                    click: () => setSelectedPin(pin),
                  }}
                >
                  <Popup
                    className="custom-popup"
                    closeButton={false}
                    maxWidth={320}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-lg text-gray-900 pr-2 break-words">{pin.title}</h3>
                        <button
                          onClick={() => setSelectedPin(null)}
                          className="p-1 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                        >
                          <X className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-gray-600 mb-3 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg">
                        <Calendar className="w-4 h-4 text-spotify-green flex-shrink-0" />
                        <span className="truncate">{new Date(pin.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}</span>
                      </div>
                      
                      {pin.message && (
                        <div className="mb-4 max-h-32 overflow-y-auto custom-scrollbar">
                          <p className="text-sm text-gray-700 leading-relaxed bg-spotify-green/5 p-3 rounded-lg border border-spotify-green/10 break-words whitespace-pre-wrap">
                            {pin.message}
                          </p>
                        </div>
                      )}
                      
                      <div className="flex gap-2 pt-2 border-t border-gray-200">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleEditPin(pin)}
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-500 text-white rounded-lg text-xs font-medium hover:bg-blue-600 transition-colors shadow-sm"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          Edit
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDeletePin(pin.id)}
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-red-500 text-white rounded-lg text-xs font-medium hover:bg-red-600 transition-colors shadow-sm"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </motion.button>
                      </div>
                    </motion.div>
                  </Popup>
                </Marker>
              </motion.div>
            ))}
          </MapContainer>
        </motion.div>

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

        {/* Add Pin Modal */}
        <AnimatePresence>
          {showAddModal && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowAddModal(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              />
              
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
              >
                <div className="bg-white dark:bg-spotify-gray-medium rounded-3xl shadow-2xl max-w-md w-full p-8 border border-gray-200 dark:border-spotify-gray-dark">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-spotify-green/10 rounded-2xl">
                        <MapPin className="w-7 h-7 text-spotify-green" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Add New Place
                      </h2>
                    </div>
                    <button
                      onClick={() => setShowAddModal(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-spotify-gray-dark rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>

                  <form onSubmit={handleAddPin} className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Place Name *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g., Ayala Center Cebu"
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-spotify-gray-dark bg-white dark:bg-spotify-gray-dark text-gray-900 dark:text-white focus:ring-2 focus:ring-spotify-green focus:border-transparent outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Date
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-spotify-gray-dark bg-white dark:bg-spotify-gray-dark text-gray-900 dark:text-white focus:ring-2 focus:ring-spotify-green focus:border-transparent outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Message
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="What happened here? How did you feel?"
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-spotify-gray-dark bg-white dark:bg-spotify-gray-dark text-gray-900 dark:text-white focus:ring-2 focus:ring-spotify-green focus:border-transparent outline-none transition-all resize-none"
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowAddModal(false)}
                        className="flex-1 px-5 py-3 rounded-xl bg-gray-200 dark:bg-spotify-gray-dark text-gray-900 dark:text-white font-semibold hover:bg-gray-300 dark:hover:bg-spotify-black transition-colors"
                      >
                        Cancel
                      </motion.button>
                      
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-spotify-green to-emerald-500 text-white font-semibold shadow-lg hover:shadow-spotify-green/50 transition-all"
                      >
                        Add Place
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
        .custom-popup .leaflet-popup-content-wrapper {
          background: white;
          border-radius: 1rem;
          padding: 0;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          border: 1px solid #e5e7eb;
        }
        .custom-popup .leaflet-popup-content {
          margin: 0;
          width: 100% !important;
          max-width: 320px;
        }
        .custom-popup .leaflet-popup-tip {
          background: white;
          border: 1px solid #e5e7eb;
        }
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
          background: #f3f4f6;
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
    </Layout>
  );
}