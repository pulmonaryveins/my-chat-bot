/* eslint-disable no-unused-vars */
import { Image } from 'lucide-react';
import CategoryGallery from '../components/CategoryGallery';
import Navigation from '../components/Navigation';

// Get all images from the gallery folder
const imageFiles = [
  '14', '31', '32', '39', '40', '41', '53', '54', '55', '58', '60', '61', '67', '74', '76', '77', '78', '83', '93', '94', '95', '96', '99',
  '100', '101', '102', '115', '119', '120', '121', '126', '142', '143', '144', '154', '160', '161', '170', '171', '173', '174', '175', '176', '177', '178', '179',
  '180', '181', '182', '183', '184', '185', '186', '187', '188', '189', '190', '192', '193', '194', '199',
  '200', '201', '202', '203', '204', '205', '206', '207', '209', '210', '211', '214', '217', '218', '223', '226', '227', '228', '232', '233', '234', '235', '236', '240', '241', '242'
];

const images = imageFiles.map((num, index) => ({
  id: index + 1,
  url: `/memories/gallery/${num}.png`,
  caption: `Together ${index + 1}`,
  date: 'Our journey'
}));

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
