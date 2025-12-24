/* eslint-disable no-unused-vars */
import { Camera } from 'lucide-react';
import CategoryGallery from '../components/CategoryGallery';
import Navigation from '../components/Navigation';

// Get all images from the media folder
const imageFiles = [
  '2', '3', '5', '7', '8', '52', '65', '66', '71', '92', '107'
];

const images = imageFiles.map((num, index) => ({
  id: index + 1,
  url: `/memories/media/${num}.png`,
  caption: `cutie ${index + 1}`,
  date: 'BEST MEDIA'
}));

export default function MediaPransinPage() {
  return (
    <CategoryGallery
      title="Media Pransin"
      description="BEST PHOTOGRAPHER, GRAPHIC DESIGNER, VIDEOGRAPHER, EDITOR, CONTENT CREATOR, TECH WRITER. BEST PUBLIC REATIONS OFFICER EVER, ME NEXT."
      message=""
      color="from-pink-500 to-rose-600"
      icon={Camera}
      images={images}
    />
  );
}
