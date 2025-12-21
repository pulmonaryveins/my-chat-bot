import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { MusicProvider } from './contexts/MusicContext';
import MusicPlayer from './components/MusicPlayer';
import SwitchingCards from './components/SwitchingCards';
import HomePage from './pages/HomePage';
import MapsPage from './pages/MapsPage';
import MemoriesPage from './pages/MemoriesPage';
import AboutPransinPage from './pages/AboutPransinPage';
import BoyishPransinPage from './pages/BoyishPransinPage';
import MediaPransinPage from './pages/MediaPransinPage';
import OurGalleryPage from './pages/OurGalleryPage';
import SpotifyChatInterface from './components/SpotifyChatInterface';

function App() {
  const [hasVisited, setHasVisited] = useState(() => {
    return localStorage.getItem('hasVisitedSite') === 'true';
  });

  const handleCardsComplete = () => {
    localStorage.setItem('hasVisitedSite', 'true');
    setHasVisited(true);
  };

  return (
    <ThemeProvider>
      <MusicProvider>
        <Router>
          <MusicPlayer />
          <Routes>
            {/* First-time visit: show switching cards */}
            <Route 
              path="/" 
              element={
                !hasVisited ? (
                  <div>
                    <SwitchingCards />
                    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
                      <button
                        onClick={handleCardsComplete}
                        className="px-6 py-3 bg-spotify-green text-white rounded-full font-medium hover:bg-spotify-green-dark transition-colors shadow-lg"
                      >
                        Continue to Website →
                      </button>
                    </div>
                  </div>
                ) : (
                  <HomePage />
                )
              } 
            />
            
            {/* Main pages */}
            <Route path="/home" element={<HomePage />} />
            <Route path="/maps" element={<MapsPage />} />
            <Route path="/memories" element={<MemoriesPage />} />
            <Route path="/memories/about-pransin" element={<AboutPransinPage />} />
            <Route path="/memories/boyish-pransin" element={<BoyishPransinPage />} />
            <Route path="/memories/media-pransin" element={<MediaPransinPage />} />
            <Route path="/memories/our-gallery" element={<OurGalleryPage />} />
            <Route path="/chat" element={<SpotifyChatInterface />} />
            <Route path="/cards" element={<SwitchingCards />} />
            
            {/* Redirect any unknown routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </MusicProvider>
    </ThemeProvider>
  );
}

export default App;