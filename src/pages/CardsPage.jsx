/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom';
import SwitchingCards from '../components/SwitchingCards';

export default function CardsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-spotify-black">
      <SwitchingCards />
      
      {/* Continue Button */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <button
          onClick={() => {
            localStorage.setItem('hasVisitedSite', 'true');
            navigate('/home');
          }}
          className="px-8 py-4 bg-spotify-green text-white rounded-full font-semibold hover:bg-spotify-green/90 transition-all hover:shadow-lg hover:shadow-spotify-green/30 shadow-spotify-green/20 shadow-md"
        >
          Continue to Home →
        </button>
      </div>
    </div>
  );
}