# Complete Vercel Deployment Guide

## Table of Contents
1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Environment Variables Setup](#environment-variables-setup)
3. [Vercel Deployment Steps](#vercel-deployment-steps)
4. [Post-Deployment Verification](#post-deployment-verification)
5. [Troubleshooting Common Issues](#troubleshooting-common-issues)

---

## Pre-Deployment Checklist

### 1. Local Testing (CRITICAL)

#### Test All Pages Functionality
Run your development server and thoroughly test each page:

```bash
npm run dev
```

**Pages to Test:**
- ✅ **Home Page** (`/`)
  - Hero section loads with animations
  - Card-switching carousel works (arrows, dots, swipe)
  - Infinite moving cards scroll smoothly
  - Navigation works

- ✅ **Chatbot Page** (`/chatbot`)
  - ChatHeader displays correctly
  - Messages load from Firebase
  - Can send new messages
  - AI responses generate properly
  - Clear chat modal works
  - Back button navigation works

- ✅ **Maps Page** (`/maps`)
  - Map loads correctly (Leaflet integration)
  - Search bar finds locations (Nominatim API)
  - Can add new pins
  - Can view pin details
  - Can edit/delete pins
  - Routes toggle works
  - Firebase saves pins correctly

- ✅ **Memories Page** (`/memories`)
  - All folder cards display
  - Item counts show correctly
  - Navigation to subpages works

- ✅ **Cards Page** (`/cards`)
  - All feature cards display
  - Card switching works

- ✅ **Memory Subpages**
  - `/memories/about-pransin` - Gallery loads
  - `/memories/boyish` - Gallery loads
  - `/memories/media` - Gallery loads
  - `/memories/gallery` - Gallery loads

#### Test Mobile Responsiveness
Open Chrome DevTools (F12) and test:
- Mobile viewport (375px - iPhone)
- Tablet viewport (768px - iPad)
- Desktop viewport (1440px)

**Critical Mobile Checks:**
- Maps search dropdown doesn't overlap
- Chatbot input area is accessible
- Navigation menu works
- All buttons are touch-friendly
- Images load properly

### 2. Production Build Test

Build your project to catch any errors:

```bash
npm run build
```

**Expected Output:**
```
✓ built in [time]
✓ [number] modules transformed
```

**Common Build Errors to Fix:**
- Unused imports
- Missing dependencies
- Image path issues
- Environment variable references

Preview the production build locally:

```bash
npm run preview
```

Test all pages again on `http://localhost:4173` (or the preview port shown).

### 3. Environment Variables Check

#### Create `.env` file (if not exists)
Your `.env` file should contain:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Gemini AI API
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

#### Verify Firebase Config
Check `src/config/firebase.js` uses environment variables:

```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

#### Verify Chatbot Service
Check `src/services/chatService.js` uses Groq API key:

```javascript
const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
```

### 4. Git Repository Setup

Ensure your code is pushed to GitHub:

```bash
git status
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

**Important Files to Check:**
- ✅ `.gitignore` includes `.env` (to keep secrets safe)
- ✅ `package.json` has correct dependencies
- ✅ `vite.config.js` is properly configured
- ✅ All image files are committed to `/public`

---

## Environment Variables Setup

### Firebase Configuration

1. **Get Firebase Credentials:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project
   - Click gear icon → Project Settings
   - Scroll to "Your apps" → Web app
   - Copy all configuration values

2. **Verify Firebase Services:**
   - ✅ Firestore Database is enabled
   - ✅ Firestore rules allow read/write (or configure security rules)
   - ✅ Collections exist: `messages`, `mapPins`

### Groq AI API

1. **Get Groq API Key:**
   - Go to [Groq Console](https://console.groq.com/keys)
   - Click "Create API Key"
   - Copy the key

2. **Test API Key Locally:**
   Run a quick test in your browser console or chatbot to ensure it works.

### Environment Variables List

Prepare these values for Vercel (you'll need them in the next section):

| Variable Name | Description | Where to Find |
|--------------|-------------|---------------|
| `VITE_FIREBASE_API_KEY` | Firebase API Key | Firebase Console → Project Settings |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain | Firebase Console → Project Settings |
| `VITE_FIREBASE_PROJECT_ID` | Firebase Project ID | Firebase Console → Project Settings |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket | Firebase Console → Project Settings |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase Messaging Sender ID | Firebase Console → Project Settings |
| `VITE_FIREBASE_APP_ID` | Firebase App ID | Firebase Console → Project Settings |
| `VITE_GROQ_API_KEY` | Groq AI API Key | Groq Console |

---

## Vercel Deployment Steps

### Method 1: Deploy via Vercel Dashboard (Recommended)

#### Step 1: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Sign up with GitHub (recommended for easy integration)

#### Step 2: Import Your Project
1. Click "Add New..." → "Project"
2. Import your GitHub repository
3. Select the repository containing your chatbot project
4. Click "Import"

#### Step 3: Configure Project Settings

**Framework Preset:**
- Vercel should auto-detect "Vite"
- If not, select "Vite" from dropdown

**Root Directory:**
- Leave as `./` (root)

**Build Command:**
```bash
npm run build
```

**Output Directory:**
```bash
dist
```

**Install Command:**
```bash
npm install
```

#### Step 4: Add Environment Variables

In the deployment configuration page:

1. Click "Environment Variables" section
2. Add each variable one by one:

```
Name: VITE_FIREBASE_API_KEY
Value: [paste your Firebase API key]
```

```
Name: VITE_FIREBASE_AUTH_DOMAIN
Value: [paste your Firebase auth domain]
```

```
Name: VITE_FIREBASE_PROJECT_ID
Value: [paste your Firebase project ID]
```

```
Name: VITE_FIREBASE_STORAGE_BUCKET
Value: [paste your Firebase storage bucket]
```

```
Name: VITE_FIREBASE_MESSAGING_SENDER_ID
Value: [paste your Firebase messaging sender ID]
```

```
Name: VITE_FIREBASE_APP_ID
Value: [paste your Firebase app ID]
```

```
Name: VITE_GROQ_API_KEY
Value: [paste your Groq API key]
```

**Important:** 
- ✅ Select "Production, Preview, and Development" for all variables
- ✅ Double-check spelling of variable names (must match exactly)
- ✅ No quotes around values

#### Step 5: Deploy

1. Click "Deploy"
2. Wait for build to complete (1-3 minutes)
3. Watch the build logs for errors

**Successful Build Output:**
```
✓ Building production bundle...
✓ Build completed
✓ Deployment ready
```

#### Step 6: Get Your Live URL

After successful deployment:
- Vercel will provide a URL like: `https://your-project-name.vercel.app`
- Click "Visit" to open your live site

---

### Method 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? [Select your account]
# - Link to existing project? No
# - Project name? [Enter name or press Enter]
# - Directory? ./
# - Override settings? No

# Add environment variables via CLI
vercel env add VITE_FIREBASE_API_KEY
vercel env add VITE_FIREBASE_AUTH_DOMAIN
# ... (repeat for all variables)

# Deploy to production
vercel --prod
```

---

## Post-Deployment Verification

### Critical Functionality Tests

Visit your live Vercel URL and test:

#### 1. Home Page (`https://your-app.vercel.app/`)
- ✅ Hero section displays with animations
- ✅ "Still Playing" title visible
- ✅ Card carousel works (arrows, dots)
- ✅ Infinite moving cards scroll
- ✅ All images load
- ✅ Navigation menu works

#### 2. Chatbot Page (`/chatbot`)
- ✅ Chat interface loads
- ✅ Welcome message displays
- ✅ Can send a test message
- ✅ AI responds within 5-10 seconds
- ✅ Messages save to Firebase (refresh page to verify)
- ✅ Clear chat works
- ✅ Back button navigates correctly

**Test Messages:**
- "Hello, how are you?"
- "Kumusta ka?"
- "Tell me a joke"

#### 3. Maps Page (`/maps`)
- ✅ Map tiles load (OpenStreetMap)
- ✅ Search bar works (try "Ayala Cebu")
- ✅ Can add a new pin
- ✅ Pin saves to Firebase
- ✅ Can view pin details
- ✅ Can edit pin
- ✅ Can delete pin
- ✅ Routes toggle works (if multiple pins)

**Test Flow:**
1. Search for a location
2. Select from dropdown
3. Fill in place details
4. Submit
5. Verify pin appears on map
6. Click pin to view details
7. Edit the pin
8. Delete the pin

#### 4. Memories Page (`/memories`)
- ✅ All 4 folder cards display
- ✅ Preview images load
- ✅ Item counts show correctly
- ✅ Click each folder to verify navigation

#### 5. Cards Page (`/cards`)
- ✅ All 6 feature cards display
- ✅ Click to switch cards
- ✅ All icons and text visible

### Mobile Testing

Test on real devices or browser DevTools:

**iPhone (375px):**
- ✅ Navigation hamburger works
- ✅ Search dropdown doesn't overlap
- ✅ Chat input is accessible
- ✅ All buttons are touchable
- ✅ Images scale properly

**iPad (768px):**
- ✅ Layout adjusts correctly
- ✅ Card grid displays properly
- ✅ Map controls are accessible

**Desktop (1440px+):**
- ✅ Content centers properly
- ✅ Max-width constraints work
- ✅ No horizontal scroll

### Performance Checks

Use [PageSpeed Insights](https://pagespeed.web.dev/):
1. Enter your Vercel URL
2. Run test
3. Check scores:
   - Performance: 70+ (good), 90+ (excellent)
   - Accessibility: 90+
   - Best Practices: 90+
   - SEO: 90+

### Console Errors Check

1. Open browser DevTools (F12)
2. Go to Console tab
3. Refresh page
4. ✅ No red errors (warnings are usually okay)

**Common Warnings to Ignore:**
- React DevTools extension warnings
- Firebase SDK version notices
- Favicon 404 (if you haven't added one)

---

## Troubleshooting Common Issues

### Issue 1: Blank Page / White Screen

**Symptoms:**
- Site loads but shows blank page
- No content visible

**Solutions:**

1. **Check Browser Console:**
   ```
   F12 → Console → Look for red errors
   ```

2. **Check Environment Variables:**
   - Go to Vercel Dashboard → Project → Settings → Environment Variables
   - Verify all 7 variables are set correctly
   - Check for typos in variable names

3. **Redeploy:**
   ```bash
   # In Vercel Dashboard:
   Deployments → Click "..." → Redeploy
   ```

4. **Check Build Logs:**
   - Deployments → Click on deployment → View build logs
   - Look for failed imports or missing modules

### Issue 2: Chatbot Not Responding

**Symptoms:**
- Can send messages but no AI response
- "Failed to send message" error

**Solutions:**

1. **Verify Groq API Key:**
   - Check it's correctly set in Vercel environment variables
   - Test key in Groq Console
   - Check API quota hasn't been exceeded

2. **Check Firebase Connection:**
   ```javascript
   // Open browser console and test:
   import { db } from './config/firebase.js';
   console.log(db); // Should show Firebase instance
   ```

3. **Check Network Tab:**
   - F12 → Network → Send message
   - Look for failed requests to Groq API (api.groq.com)
   - Check CORS errors

4. **Verify Service File:**
   - Ensure `chatService.js` has correct API initialization
   - Check error handling isn't swallowing errors

### Issue 3: Maps Not Loading / Search Not Working

**Symptoms:**
- Gray box instead of map
- Search doesn't return results
- Pins don't save

**Solutions:**

1. **Check Internet Connection:**
   - Maps require external API (OpenStreetMap)
   - Test on different network

2. **Check Console for Errors:**
   ```
   Access to fetch blocked by CORS policy
   ```
   - Nominatim API has rate limits
   - Wait a few minutes and retry
   - Consider adding User-Agent header

3. **Verify Leaflet CSS:**
   - Check that Leaflet CSS is imported in `index.html` or component
   - Map tiles need proper CSS to display

4. **Firebase Connection:**
   - Test creating a pin manually in Firebase Console
   - Verify Firestore rules allow writes

### Issue 4: Images Not Loading

**Symptoms:**
- Broken image icons
- Missing gallery photos

**Solutions:**

1. **Check Image Paths:**
   ```jsx
   // Correct (from public folder):
   <img src="/featured/card/image1.jpg" />
   
   // Incorrect:
   <img src="./featured/card/image1.jpg" />
   <img src="featured/card/image1.jpg" />
   ```

2. **Verify Images in Public Folder:**
   ```bash
   # Check structure:
   public/
     featured/
       card/
       moving/
     memories/
       about-pransin/
       # etc.
   ```

3. **Check Build Output:**
   - Vercel build logs should show images being copied
   - Verify images are in Git repository

4. **Clear Cache:**
   - Hard refresh: `Ctrl + Shift + R`
   - Clear browser cache
   - Try incognito mode

### Issue 5: Routes Not Working / 404 Errors

**Symptoms:**
- Direct URL navigation shows 404
- Refresh on `/chatbot` shows "Page Not Found"

**Solutions:**

1. **Create `vercel.json` (if not exists):**
   ```json
   {
     "rewrites": [
       { "source": "/(.*)", "destination": "/" }
     ]
   }
   ```

2. **Commit and Redeploy:**
   ```bash
   git add vercel.json
   git commit -m "Add Vercel routing config"
   git push origin main
   ```

3. **Verify Router Setup:**
   - Check `BrowserRouter` is used (not HashRouter)
   - Verify all routes in `App.jsx` are defined

### Issue 6: Build Failing

**Symptoms:**
- Deployment fails during build
- "Build failed" message

**Solutions:**

1. **Check Build Logs:**
   - Look for specific error messages
   - Common issues:
     - Missing dependencies
     - Import errors
     - Type errors

2. **Test Build Locally:**
   ```bash
   npm run build
   ```
   - Fix any errors shown
   - Push fixes to GitHub

3. **Check Node Version:**
   ```json
   // Add to package.json:
   "engines": {
     "node": "18.x"
   }
   ```

4. **Clear Vercel Cache:**
   - Deployments → Click "..." → "Redeploy" → Check "Clear cache"

### Issue 7: Slow Performance

**Symptoms:**
- Pages load slowly
- Animations lag
- Images take long to load

**Solutions:**

1. **Optimize Images:**
   - Compress images before uploading
   - Use WebP format if possible
   - Recommended max size: 500KB per image

2. **Code Splitting:**
   - React.lazy for route-based splitting:
   ```jsx
   const HomePage = lazy(() => import('./pages/HomePage'));
   ```

3. **Check Network Tab:**
   - Identify large resources
   - Optimize or lazy-load heavy components

4. **Enable Compression:**
   - Vercel automatically compresses, but verify in Network tab
   - Check "Content-Encoding: gzip"

### Issue 8: Firebase Quota Exceeded

**Symptoms:**
- "Quota exceeded" errors
- Database operations fail

**Solutions:**

1. **Check Firebase Console:**
   - Usage tab shows current quota
   - Free tier limits:
     - 50K reads/day
     - 20K writes/day
     - 1GB storage

2. **Upgrade Plan (if needed):**
   - Firebase Console → Upgrade to Blaze (pay-as-you-go)

3. **Optimize Queries:**
   - Add indexes for faster queries
   - Limit real-time listeners
   - Use pagination for large datasets

---

## Advanced Configuration

### Custom Domain Setup

1. **Purchase Domain:**
   - Namecheap, Google Domains, etc.

2. **Add to Vercel:**
   - Project Settings → Domains
   - Add domain
   - Follow DNS configuration steps

3. **SSL Certificate:**
   - Vercel automatically provisions SSL
   - HTTPS enabled by default

### Analytics Setup

1. **Vercel Analytics:**
   ```bash
   npm install @vercel/analytics
   ```

2. **Add to App:**
   ```jsx
   import { Analytics } from '@vercel/analytics/react';
   
   function App() {
     return (
       <>
         <YourApp />
         <Analytics />
       </>
     );
   }
   ```

### Preview Deployments

- Every Git push creates a preview deployment
- Great for testing before merging to main
- Each PR gets unique preview URL

---

## Final Verification Checklist

Before announcing your site is live:

- [ ] All pages load correctly
- [ ] Chatbot responds to messages
- [ ] Maps search and pins work
- [ ] All galleries display images
- [ ] Mobile responsive on all pages
- [ ] No console errors
- [ ] Environment variables secured
- [ ] Firebase permissions configured
- [ ] Performance scores acceptable
- [ ] All links work correctly
- [ ] Back/navigation buttons work
- [ ] Forms submit properly
- [ ] Modals open and close
- [ ] Animations smooth
- [ ] Tested on Chrome, Firefox, Safari
- [ ] Tested on mobile devices

---

## Maintenance Tips

### Regular Updates

```bash
# Update dependencies
npm update

# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

### Monitor Usage

- Check Firebase Console for quota usage
- Monitor Gemini API usage
- Review Vercel Analytics

### Backup Data

- Export Firestore data regularly
- Keep local backups of images
- Document environment variables securely

---

## Support Resources

- **Vercel Documentation:** https://vercel.com/docs
- **Vite Documentation:** https://vitejs.dev/guide/
- **Firebase Documentation:** https://firebase.google.com/docs
- **React Documentation:** https://react.dev/
- **Vercel Support:** support@vercel.com

---

## Deployment Completed! 🎉

Your website is now live and accessible to the world!

**Share your URL:**
```
https://your-project-name.vercel.app
```

**Quick Access Links:**
- 🏠 Home: `https://your-project-name.vercel.app/`
- 💬 Chatbot: `https://your-project-name.vercel.app/chatbot`
- 🗺️ Maps: `https://your-project-name.vercel.app/maps`
- 📸 Memories: `https://your-project-name.vercel.app/memories`

Congratulations on your deployment! 🚀
