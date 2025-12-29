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
  caption: `Memories ${index + 1}`,
  date: 'noob vins'
}));

export default function OurGalleryPage() {
  return (
    <CategoryGallery
      title="Our Gallery"
      description="SMOL GALLARY OF OUR MEMORIES TOGETHER :(("
      message="I would say you’re the kind of person who will stay with me for the rest of my life.

It hurts knowing that we never really got the chance to become an actual couple—not because we lacked feelings, but because I didn’t make the move and failed to give you the assurance you needed. It’s painful how you only realize the weight of things once the other person has already let go. I made a huge mistake in how I treated you, Cyn. I wasn’t there when you needed me most. I wasn’t there when you cried yourself to sleep, and that’s something I’ll always regret.

I know healing takes time, and I understand why forgiving what I did is so difficult and maybe in the future It  might still lingers. I’m sorry that I’ve always struggled with communication. I know I lacked words when they mattered most, and that’s something I’m actively trying to change.

I’m also sorry for all the moments I held back—every time you asked us to take pictures, every time you wanted to go to photo booths together. I was insecure back then. When I looked in the mirror, all I could think was, “Why are you with me when you could be with someone better?” I overthought everything—what your friends and family might think of me, whether I was enough. I was too hard on myself, and I didn’t believe in who I was.

I should’ve stopped and truly listened to you. You loved me despite all my flaws and lapses. You were there—not just for 11 months, but for three whole years. I’m sorry for the late replies, for the messages that didn’t make sense anymore. At that time, I thought the best thing I could do for you was to let you go, because I saw how much you were struggling. I believed that your happiness mattered more than my fear of losing you.

But the truth is, if I truly loved you the way I should have, I would’ve fought for you—even when things were difficult, even when we had so many problems. I should’ve fought for us. It hurts knowing that I only began changing when everything was already over. There was never any competition after we ended—I only wanted to take care of you and make you happy, even if it was for the last time.

I will forever cherish every memory we shared, from the very first day I laid my eyes on you. I’ll miss our Saturday dates. I’ll miss everything about you, Cyn—especially our matching outfits. You shaped me into the person I am today. I used to wear my cap everywhere, hiding myself, but when you told me I looked good without it, you gave me the confidence to embrace who I am. That’s something I’ll always be thankful for.

I’m grateful that we met. It was one heck of a ride, but I wouldn’t trade it for anything. Thank you for the love and memories we shared. I’m sorry if it takes me a long time to move on. For the last time, please let me love you quietly.

I don’t think I’ll ever truly unlove you, Cyn. Even if our paths take us to different places, even if we both find new lives and partners, a part of me will always remember you. Not now, not ever will that change. Because in every universe—if there are many—I would still choose you, and I would never let you go again.

I genuinely hope you find happiness wherever life takes you. I hope you achieve all your dreams, even the ones that have changed along the way. I’ll carry and fulfill the dreams we once talked about, and I know I’ll do it with pride and gratitude.

I wish you nothing but the best, Cyn. I won’t ask for anything in return—only that you continue choosing yourself, living freely, doing what you love, and moving forward without regrets. and I’ll do the same.

I’ll always be here, rooting for you, proud of you for finally choosing yourself. Keep doing that. And if you ever need me, I’ll be here—as a friend.

I’ll see you soon, wherever the wind takes us. Thank you for everything, my GATO. I'll still keep on loving you, until the day that I die. I LOVE YOU, Pransin!"
      color="from-emerald-500 to-teal-600"
      icon={Image}
      images={images}
    />
  );
}
