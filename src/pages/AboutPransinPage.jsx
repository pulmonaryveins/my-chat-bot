/* eslint-disable no-unused-vars */
import { User } from 'lucide-react';
import CategoryGallery from '../components/CategoryGallery';
import Navigation from '../components/Navigation';

// Get all images from the about-pransin folder
const imageFiles = [
  '1', '4', '6', '9', '10', '11', '12', '13', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
  '33', '34', '38', '42', '43', '44', '45', '46', '59', '62', '63', '64', '68', '69', '70', '72', '73', '79', '80', '81', '82', '84', '85', '86', '87', '88', '89', '90', '91',
  '97', '98', '103', '104', '105', '106', '108', '109', '110', '111', '112', '113', '114', '116', '117', '118', '122', '123', '127', '128', '130', '131', '132', '133', '134', '135', '136', '137', '138', '139', '140', '141', '145', '146', '147', '148',
  '152', '153', '155', '156', '157', '165', '166', '167', '168', '169', '172', '191', '195', '196', '197', '198', '208', '212', '213', '215', '216', '219', '220', '221', '222', '224', '229', '230', '231', '237', '238', '239'
];

const images = imageFiles.map((num, index) => ({
  id: index + 1,
  url: `/memories/about-pransin/${num}.png`,
  caption: `Memory ${index + 1}`,
  date: 'damn i miss u'
}));

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
