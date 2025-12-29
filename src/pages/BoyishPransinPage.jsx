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
      message="I know I’ve always talked about how much I love your boyish side, Cyn—and yes, I really do. But the truth is, I love every side of you. No matter which version it is, I love you for who you are.

I don’t love you just because of your beautiful face. I love you because you’re pransin—because you’re yourself. I love the way you don’t sugarcoat things, you’re straightforward, and you stay true to what you believe in. Please never change that. That’s what makes you you. Don’t ever feel the need to change yourself just because others might not like it. I know you won’t anyway, because you always choose what’s best for yourself—and I hope you continue doing that, always.

You always say you’re “maldita,” but you’re really not. I’ve known you for three years now, and you’re the most friendly and loving people I know. You’ve never been “maldita” to me—not even once.

I’ll surely miss this version of you. But always remember this: every version of you is beautiful, my newbie."
      color="from-blue-500 to-cyan-600"
      icon={Heart}
      images={images}
    />
  );
}
