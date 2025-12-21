/* eslint-disable no-unused-vars */
import { Image } from 'lucide-react';
import CategoryGallery from '../components/CategoryGallery';

// Sample images - replace with your actual images
const images = [
  {
    id: 1,
    url: 'https://via.placeholder.com/600x600/10B981/FFFFFF?text=Us+1',
    caption: 'First date',
    date: 'December 22, 2023'
  },
  {
    id: 2,
    url: 'https://via.placeholder.com/600x600/059669/FFFFFF?text=Us+2',
    caption: 'Movie night',
    date: 'January 2024'
  },
  {
    id: 3,
    url: 'https://via.placeholder.com/600x600/047857/FFFFFF?text=Us+3',
    caption: 'Sinulog 2024',
    date: 'January 2024'
  },
  {
    id: 4,
    url: 'https://via.placeholder.com/600x600/065F46/FFFFFF?text=Us+4',
    caption: 'Beach day',
    date: 'March 2024'
  },
  {
    id: 5,
    url: 'https://via.placeholder.com/600x600/10B981/FFFFFF?text=Us+5',
    caption: 'Sunset together',
    date: 'May 2024'
  },
  {
    id: 6,
    url: 'https://via.placeholder.com/600x600/059669/FFFFFF?text=Us+6',
    caption: 'Intramurals 2024',
    date: 'November 2024'
  },
  {
    id: 7,
    url: 'https://via.placeholder.com/600x600/047857/FFFFFF?text=Us+7',
    caption: 'New Years Eve',
    date: 'December 31, 2024'
  },
  {
    id: 8,
    url: 'https://via.placeholder.com/600x600/065F46/FFFFFF?text=Us+8',
    caption: 'Sinulog 2025',
    date: 'January 2025'
  },
  // Add more images here
];

export default function OurGalleryPage() {
  return (
    <CategoryGallery
      title="Our Gallery"
      description="Beautiful moments we share together"
      message="Every photo here is a piece of our story - the laughter, the adventures, the quiet moments. This is us, Cyn and Pransin, building something beautiful together."
      color="from-emerald-500 to-teal-600"
      icon={Image}
      images={images}
    />
  );
}
