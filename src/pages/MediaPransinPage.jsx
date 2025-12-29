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
      message="The only person I could truly talk to about media stuff my media partner from another department. I’ve always been amazed by how you handle people and responsibilities. I’ve told you this before, but I genuinely look up to you, especially when it comes to media work. Your standards, your discipline, and how strict you are about publishing quality output really inspire me.

I am so proud of you, Cyn—very proud. The fact that you carried SJH Media almost entirely on your own for years is honestly incredible. From being a video director, graphic designer, photographer, content creator, actor, and tech writer—you literally took on every role. Never doubt yourself. SJH would not be what it is today without you, and you deserve to be proud of that.

I know some officers may never fully see or understand the struggles behind the scenes, and that’s one of the hardest parts of being a student leader. It feels unfair when your sacrifices go unnoticed—but even so, those experiences shaped us, and they taught us lessons we’ll carry for life.

There’s a saying: sometimes no one sees the dragon you fought, no one hears the battle, and no one knows how hard it was—but the dragon is gone nonetheless. The victory doesn’t disappear just because it wasn’t witnessed.

We share the same journey in media, Cyn. We both helped build and improve our respective media organizations. And yes, one day new people will come, and some of the work we poured our hearts into may slowly be forgotten. It’s painful, and it feels unfair—but we already knew this could happen when we chose to serve. Because in the end, our purpose was never recognition—it was service to the student community.

So even if no one saw the dragon fall, it was slain. We did our job. We served. And that is what truly matters.

Always be proud of what you’ve done, Cyn—because you genuinely deserve it. Thank you for everything, my media partner.

PSITS × SJH Media"
      color="from-pink-500 to-rose-600"
      icon={Camera}
      images={images}
    />
  );
}
