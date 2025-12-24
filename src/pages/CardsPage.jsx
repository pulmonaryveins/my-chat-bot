/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom';
import SwitchingCards from '../components/SwitchingCards';

export default function CardsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-spotify-black relative overflow-hidden">
      {/* Animated Background Pattern - Matching Home Page */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(29, 185, 84) 1px, transparent 0)',
          backgroundSize: '48px 48px'
        }} />
      </div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-spotify-green/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative z-10">
        <SwitchingCards />
      </div>
      
      {/* Continue Button */}
      <div className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-xs sm:max-w-none sm:w-auto">
        <button
          onClick={() => {
            localStorage.setItem('hasVisitedSite', 'true');
            navigate('/home');
          }}
          className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-spotify-green text-white rounded-full font-semibold hover:bg-spotify-green/90 transition-all hover:shadow-lg hover:shadow-spotify-green/30 shadow-spotify-green/20 shadow-md text-sm sm:text-base"
        >
          Continue to Home →
        </button>
      </div>
    </div>
  );
}