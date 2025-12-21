/* eslint-disable no-unused-vars */
import { Heart } from 'lucide-react';
import CategoryGallery from '../components/CategoryGallery';

// Sample images - replace with your actual images
const images = [
  {
    id: 1,
    url: 'https://via.placeholder.com/600x600/3B82F6/FFFFFF?text=Boyish+1',
    caption: 'His playful grin',
    date: 'December 2024'
  },
  {
    id: 2,
    url: 'https://via.placeholder.com/600x600/2563EB/FFFFFF?text=Boyish+2',
    caption: 'Being silly',
    date: 'January 2025'
  },
  {
    id: 3,
    url: 'https://via.placeholder.com/600x600/1D4ED8/FFFFFF?text=Boyish+3',
    caption: 'That charming look',
    date: 'November 2024'
  },
  {
    id: 4,
    url: 'https://via.placeholder.com/600x600/1E40AF/FFFFFF?text=Boyish+4',
    caption: 'Making me laugh',
    date: 'October 2024'
  },
  // Add more images here
];

export default function BoyishPransinPage() {
  return (
    <CategoryGallery
      title="Boyish Pransin"
      description="His playful and charming side"
      message="The way you make me laugh, the way you're unapologetically yourself - that's the Pransin I adore."
      color="from-blue-500 to-cyan-600"
      icon={Heart}
      images={images}
    />
  );
}
