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
  caption: `Cutie ${index + 1}`,
  date: 'AHHHHHHHHHH VERY PRETYYYY'
}));

export default function AboutPransinPage() {
  return (
    <CategoryGallery
      title="About Pransin"
      description="WHAT MAKES YOU PRANSIN, ILL MISS EVERYTHING ABOUT YOU :(("
      message="The most amazing person that I have ever met. Everything about you is so special—you’re different from anyone else, you’re truly unique. I love the way you are, Cyn. Mao lisud kayka e-let go (which I will never do HAHAHA sorry, pero I can’t hehe). Please never change, Cyn. You’re already perfect just the way you are.

      I’m very proud of what you’ve accomplished in life, Cyn. I really look up to you—knowing someone who’s living alone in a big city, away from loved ones, yet still managing to survive and be independent, that’s already a huge achievement. I’ll always be proud of you, Cyn—not only me, but everyone who cares for you esp. your mommy Hera.

      Please do take care always, Cyn, especially OJT naka. I know it will be tough—1k hours is a lot. That’s why you really need to take care of yourself. Please eat properly, drink tons of water, if maglain na imong lawas, inum dayon ug meds. If dili na kaya, don’t push yourself too much. Please remember to take breaks, and don’t forget to smile—kay dili gud maingon nga si Pransin ka if dili ka mosmile or wala imong energetic side.

      I’ll damn sure miss everything about you. Scent pa lang daan, mura na kog mabuang HAHAHA. I’ll miss your cutie face, your voice, imong pagka-kiatan, imong mga tampo, your presence, and most especially your love and our memories together.

      Bitaw, I would really miss you, Cyn. I know you’ve slowly removed me na sa imo life, and that’s okay—but I’ll keep on loving you in secret and keep all these memories. I really hope you’ll achieve everything you’ve dreamed of in the future, Cyn. I’ll pray for that every time—for your happiness, peace, and good health."
      color="from-purple-500 to-indigo-600"
      icon={User}
      images={images}
    />
  );
}
