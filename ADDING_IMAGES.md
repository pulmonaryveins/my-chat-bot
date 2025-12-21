# Adding Your Own Images to the Memory Folders

## Overview
This guide will help you add your own images to each memory category.

## Steps to Add Images

### 1. Prepare Your Images
- Place your images in the `public` folder
- Create a subfolder for better organization (e.g., `public/memories/`)
- Supported formats: JPG, PNG, GIF, WebP

### 2. Update Each Category Page

#### About Pransin (`src/pages/AboutPransinPage.jsx`)
Replace the sample images array with your own:

```javascript
const images = [
  {
    id: 1,
    url: '/memories/about-pransin/photo1.jpg', // Path to your image
    caption: 'Your caption here',
    date: 'December 2024'
  },
  // Add more images...
];
```

#### Boyish Pransin (`src/pages/BoyishPransinPage.jsx`)
```javascript
const images = [
  {
    id: 1,
    url: '/memories/boyish/photo1.jpg',
    caption: 'Your caption here',
    date: 'January 2025'
  },
  // Add more images...
];
```

#### Media Pransin (`src/pages/MediaPransinPage.jsx`)
```javascript
const images = [
  {
    id: 1,
    url: '/memories/media/video-thumbnail.jpg',
    caption: 'Your video caption',
    date: 'November 2024'
  },
  // Add more images...
];
```

#### Our Gallery (`src/pages/OurGalleryPage.jsx`)
```javascript
const images = [
  {
    id: 1,
    url: '/memories/gallery/us-photo1.jpg',
    caption: 'Our special moment',
    date: 'December 22, 2023'
  },
  // Add more images...
];
```

### 3. Update Folder Preview Images

In `src/pages/MemoriesPage.jsx`, update the `preview` property for each folder:

```javascript
const folders = [
  {
    id: 'about-pransin',
    title: 'About Pransin',
    // ...
    preview: '/memories/about-pransin/preview.jpg', // Your preview image
    // ...
  },
  // Update other folders similarly
];
```

## Tips

1. **Image Sizes**: For best performance, resize images to reasonable dimensions (e.g., 1200x1200px max)
2. **File Names**: Use lowercase, no spaces (use hyphens: `my-photo.jpg`)
3. **Organization**: Keep images organized in subfolders
4. **Captions**: Add meaningful captions to make memories more special
5. **Dates**: Use consistent date formats

## Example Folder Structure

```
public/
  memories/
    about-pransin/
      photo1.jpg
      photo2.jpg
      preview.jpg
    boyish/
      photo1.jpg
      photo2.jpg
      preview.jpg
    media/
      video1-thumb.jpg
      video2-thumb.jpg
      preview.jpg
    gallery/
      us1.jpg
      us2.jpg
      preview.jpg
```

## Adding Music Tracks

To add more music tracks, edit `src/contexts/MusicContext.jsx`:

```javascript
const tracks = [
  {
    id: 1,
    title: 'About You',
    artist: 'The 1975',
    src: '/music/about-you.mp3'  // Place MP3 files in public/music/
  },
  {
    id: 2,
    title: 'Your Song Title',
    artist: 'Artist Name',
    src: '/music/your-song.mp3'
  },
  // Add more tracks...
];
```

Then place your MP3 files in the `public/music/` folder.

## Need Help?

If you have questions or need assistance, feel free to ask!
