/* eslint-disable no-unused-vars */
import { User } from 'lucide-react';
import CategoryGallery from '../components/CategoryGallery';

// Sample images - replace with your actual images
const images = [
  {
    id: 1,
    url: 'https://via.placeholder.com/600x600/8B5CF6/FFFFFF?text=Pransin+1',
    caption: 'His infectious smile',
    date: 'December 2024'
  },
  {
    id: 2,
    url: 'https://via.placeholder.com/600x600/7C3AED/FFFFFF?text=Pransin+2',
    caption: 'Looking thoughtful',
    date: 'January 2025'
  },
  {
    id: 3,
    url: 'https://via.placeholder.com/600x600/6D28D9/FFFFFF?text=Pransin+3',
    caption: 'Casual day out',
    date: 'November 2024'
  },
  {
    id: 4,
    url: 'https://via.placeholder.com/600x600/5B21B6/FFFFFF?text=Pransin+4',
    caption: 'His favorite spot',
    date: 'October 2024'
  },
  // Add more images here
];

export default function AboutPransinPage() {
  return (
    <CategoryGallery
      title="About Pransin"
      description="Photos that capture who Pransin is"
      message="These photos show the person I fell in love with - genuine, thoughtful, and always himself."
      color="from-purple-500 to-indigo-600"
      icon={User}
      images={images}
    />
  );
}
