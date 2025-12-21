/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { MusicProvider } from './contexts/MusicContext';
import MusicPlayer from './components/MusicPlayer';
import LandingPage from './pages/LandingPage';
import CardsPage from './pages/CardsPage';
import HomePage from './pages/HomePage';
import MapsPage from './pages/MapsPage';
import MemoriesPage from './pages/MemoriesPage';
import AboutPransinPage from './pages/AboutPransinPage';
import BoyishPransinPage from './pages/BoyishPransinPage';
import MediaPransinPage from './pages/MediaPransinPage';
import OurGalleryPage from './pages/OurGalleryPage';
import SpotifyChatInterface from './components/SpotifyChatInterface';

function App() {
  const [hasEnteredPasscode, setHasEnteredPasscode] = useState(() => {
    return localStorage.getItem('hasEnteredPasscode') === 'true';
  });

  // Check for passcode changes
  useEffect(() => {
    const checkPasscode = () => {
      const passcodePassed = localStorage.getItem('hasEnteredPasscode') === 'true';
      setHasEnteredPasscode(passcodePassed);
    };

    // Listen for storage changes
    const handleStorageChange = (e) => {
      if (e.key === 'hasEnteredPasscode') {
        checkPasscode();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check periodically in case of same-window changes
    const interval = setInterval(checkPasscode, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <ThemeProvider>
      <MusicProvider>
        <Router>
          <AppContent hasEnteredPasscode={hasEnteredPasscode} />
        </Router>
      </MusicProvider>
    </ThemeProvider>
  );
}

function AppContent({ hasEnteredPasscode }) {
  const location = useLocation();
  const isCardsPage = location.pathname === '/cards' || location.pathname === '/';

  return (
    <div className="bg-spotify-black min-h-screen">
      <Routes>
        {/* Landing Page - First entry point (only accessible without passcode) */}
        <Route 
          path="/" 
          element={
            !hasEnteredPasscode ? (
              <LandingPage />
            ) : (
              <Navigate to="/cards" replace />
            )
          } 
        />
        
        {/* Cards Introduction Page - accessible after passcode */}
        <Route 
          path="/cards" 
          element={
            hasEnteredPasscode ? (
              <CardsPage />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        
        {/* Protected Routes - All require passcode */}
        <Route 
          path="/home" 
          element={hasEnteredPasscode ? <HomePage /> : <Navigate to="/" replace />} 
        />
        <Route 
          path="/maps" 
          element={hasEnteredPasscode ? <MapsPage /> : <Navigate to="/" replace />} 
        />
        <Route 
          path="/memories" 
          element={hasEnteredPasscode ? <MemoriesPage /> : <Navigate to="/" replace />} 
        />
        <Route 
          path="/memories/about-pransin" 
          element={hasEnteredPasscode ? <AboutPransinPage /> : <Navigate to="/" replace />} 
        />
        <Route 
          path="/memories/boyish-pransin" 
          element={hasEnteredPasscode ? <BoyishPransinPage /> : <Navigate to="/" replace />} 
        />
        <Route 
          path="/memories/media-pransin" 
          element={hasEnteredPasscode ? <MediaPransinPage /> : <Navigate to="/" replace />} 
        />
        <Route 
          path="/memories/our-gallery" 
          element={hasEnteredPasscode ? <OurGalleryPage /> : <Navigate to="/" replace />} 
        />
        <Route 
          path="/chat" 
          element={hasEnteredPasscode ? <SpotifyChatInterface /> : <Navigate to="/" replace />} 
        />
        
        {/* Redirect any unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      {/* Music Player - Hidden on Landing and Cards pages */}
      {hasEnteredPasscode && !isCardsPage && <MusicPlayer />}
    </div>
  );
}

export default App;