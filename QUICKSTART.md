# Quick Start Guide

## 🚀 Running the Project

```bash
# Install dependencies (if not already done)
npm install

# Start the development server
npm run dev
```

The app will open at `http://localhost:5173`

## 🎵 Testing the Music Player

1. Navigate to any page
2. Look for the **floating music player** in the bottom right
3. Click the **play button** to start music
4. Click the **expand icon** (↑) to see the full player with playlist
5. Try **previous/next** buttons to switch tracks
6. Navigate to different pages - **music continues playing!**

## 📁 Testing the Memories Feature

1. Click **"Memories"** in the navigation
2. You'll see **4 folder cards** with different colors
3. **Hover** over each folder to see animations
4. **Click** any folder to open its gallery
5. Click on any **image** to view it in full-screen lightbox
6. Use the **back button** to return to folders

## 🎨 Testing the Chatbot

1. Click **"Talk"** in the navigation
2. Type a message and press Enter
3. See the **improved UI** with:
   - Clean gradient background
   - Better message bubbles
   - Smooth animations
   - Proper spacing

## 📱 Testing Responsive Design

1. **Resize your browser window** to test different screen sizes
2. Or use **Chrome DevTools**:
   - Press `F12`
   - Click the **device toggle** icon (📱)
   - Select different devices (iPhone, iPad, etc.)
3. Everything should look great on all sizes!

## ⚙️ Customization Quick Links

### Add Images
See [`ADDING_IMAGES.md`](ADDING_IMAGES.md)

### Add Music
Edit `src/contexts/MusicContext.jsx` - line 20

### Change Messages
- About Pransin: `src/pages/AboutPransinPage.jsx` - line 30
- Boyish Pransin: `src/pages/BoyishPransinPage.jsx` - line 30
- Media Pransin: `src/pages/MediaPransinPage.jsx` - line 30
- Our Gallery: `src/pages/OurGalleryPage.jsx` - line 50

### Change Folder Previews
Edit `src/pages/MemoriesPage.jsx` - line 12

## 🎯 What to Test

- ✅ Music plays and continues across pages
- ✅ Music player can expand/collapse
- ✅ Previous/Next buttons work
- ✅ All 4 memory folders open correctly
- ✅ Images display in galleries
- ✅ Lightbox opens when clicking images
- ✅ Back button returns to folders
- ✅ Chatbot messages look clean
- ✅ Everything is responsive
- ✅ Animations are smooth

## 🐛 Common Issues

### Music doesn't autoplay
- **Normal!** Browsers block autoplay until user interaction
- Just click the play button once

### Images show placeholder
- **Expected!** Replace with your actual images
- Follow instructions in `ADDING_IMAGES.md`

### Missing audio files
- Add your MP3 files to the `public` folder
- Or update paths in `MusicContext.jsx`

## 📦 Deployment Ready

When you're ready to deploy:

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

## 🎉 Enjoy!

Everything is set up and ready to use. Just add your personal touches:
- Your images
- Your music
- Your messages
- Your memories

**Have fun! 💜**
