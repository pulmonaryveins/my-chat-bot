/* eslint-disable no-unused-vars */
import { Camera } from 'lucide-react';
import CategoryGallery from '../components/CategoryGallery';

// Sample images - replace with your actual images (can include video thumbnails)
const images = [
  {
    id: 1,
    url: 'https://via.placeholder.com/600x600/EC4899/FFFFFF?text=Video+1',
    caption: 'Our first video together',
    date: 'December 2024'
  },
  {
    id: 2,
    url: 'https://via.placeholder.com/600x600/DB2777/FFFFFF?text=Video+2',
    caption: 'Dancing in the rain',
    date: 'January 2025'
  },
  {
    id: 3,
    url: 'https://via.placeholder.com/600x600/BE185D/FFFFFF?text=Video+3',
    caption: 'Singing our song',
    date: 'November 2024'
  },
  {
    id: 4,
    url: 'https://via.placeholder.com/600x600/9F1239/FFFFFF?text=Video+4',
    caption: 'Just being us',
    date: 'October 2024'
  },
  // Add more videos/media here
];

export default function MediaPransinPage() {
  return (
    <CategoryGallery
      title="Media Pransin"
      description="Videos and special moments captured"
      message="Every video, every moment in motion - they all capture the magic of us in ways photos can't."
      color="from-pink-500 to-rose-600"
      icon={Camera}
      images={images}
    />
  );
}
