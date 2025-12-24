/* eslint-disable no-unused-vars */
import { Heart } from 'lucide-react';
import CategoryGallery from '../components/CategoryGallery';
import Navigation from '../components/Navigation';

// Get all images from the boyish folder
const imageFiles = [
  '30', '35', '36', '37', '47', '48', '49', '50', '51', '56', '57', '75',
  '124', '125', '129', '140', '149', '150', '151', '158', '159', '162', '163', '164'
];

const images = imageFiles.map((num, index) => ({
  id: index + 1,
  url: `/memories/boyish/${num}.png`,
  caption: `Baddie ${index + 1}`,
  date: 'I miss'
}));

export default function BoyishPransinPage() {
  return (
    <CategoryGallery
      title="Boyish Pransin"
      description="DILI GUD KO MAKA GET OVER SA BOYISH SIDE PRANSIN, I LOVE EVERYSIDE OF YOU COULD BE BOYISH OR GIRLY"
      message=""
      color="from-blue-500 to-cyan-600"
      icon={Heart}
      images={images}
    />
  );
}
