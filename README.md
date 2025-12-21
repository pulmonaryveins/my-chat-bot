# Project Pransin - Personal Chatbot & Memory Map

A beautiful, Spotify-inspired web application featuring an AI chatbot, interactive memory map, and photo galleries.

## 🌟 Features

- **🤖 AI Chatbot**: Conversational AI powered by Groq (Llama 3.3 70B) with personalized responses
- **🗺️ Interactive Maps**: Save and explore memories on an interactive map with location search
- **📸 Photo Galleries**: Browse organized photo collections with smooth animations
- **🎨 Modern UI**: Clean, minimal design inspired by Spotify's dark theme
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Firebase account
- Groq API account

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd my-chatbot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example file
   cp .env.example .env
   
   # Edit .env and add your API keys
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   - Navigate to `http://localhost:5173`

## 🔧 Environment Variables

Create a `.env` file with these variables:

```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_GROQ_API_KEY=your_groq_key
```

See [.env.example](.env.example) for details.

## 📦 Project Structure

```
my-chatbot/
├── public/              # Static assets
│   ├── featured/        # Featured card images
│   └── memories/        # Gallery images
├── src/
│   ├── components/      # React components
│   ├── config/          # Firebase & personality configs
│   ├── contexts/        # React contexts
│   ├── pages/           # Page components
│   ├── services/        # API services
│   └── utils/           # Utility functions
├── .env.example         # Environment template
├── vercel.json          # Vercel configuration
└── VERCEL_DEPLOYMENT_GUIDE.md  # Deployment guide
```

## 🎨 Pages

- **Home** (`/`) - Hero section with featured cards
- **Chatbot** (`/chatbot`) - AI conversation interface
- **Maps** (`/maps`) - Interactive memory map
- **Memories** (`/memories`) - Photo gallery navigation
- **Cards** (`/cards`) - Feature showcase

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, TailwindCSS, Framer Motion
- **Backend**: Firebase Firestore
- **AI**: Groq API (Llama 3.3 70B)
- **Maps**: Leaflet.js, OpenStreetMap
- **Deployment**: Vercel

## 📱 Deployment

### Pre-Deployment Checklist

Run the verification script:
```bash
.\verify-deployment.ps1
```

Or manually check [PRE_DEPLOYMENT_CHECKLIST.md](PRE_DEPLOYMENT_CHECKLIST.md)

### Deploy to Vercel

**Option 1: Via Dashboard**
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Add environment variables
4. Click "Deploy"

**Option 2: Via CLI**
```bash
npm i -g vercel
vercel login
vercel --prod
```

See complete guide: [VERCEL_DEPLOYMENT_GUIDE.md](VERCEL_DEPLOYMENT_GUIDE.md)

## 🧪 Testing

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Run verification script
.\verify-deployment.ps1
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔒 Security Notes

- Never commit `.env` file to Git
- Keep API keys secure
- Configure Firebase security rules
- Use environment variables for all secrets

## 📚 Documentation

- [Deployment Guide](VERCEL_DEPLOYMENT_GUIDE.md)
- [Pre-Deployment Checklist](PRE_DEPLOYMENT_CHECKLIST.md)
- [Environment Setup](.env.example)

## 🐛 Troubleshooting

See [VERCEL_DEPLOYMENT_GUIDE.md](VERCEL_DEPLOYMENT_GUIDE.md#troubleshooting-common-issues) for common issues and solutions.

## 📄 License

This is a personal project.

## 🙏 Acknowledgments

- Built with React + Vite
- Styled with TailwindCSS
- AI powered by Groq
- Maps by Leaflet & OpenStreetMap
- Deployed on Vercel
