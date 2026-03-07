# 🌲 Nature Landing Page

A beautiful, responsive landing page with nature vibes and ambient music. Built with modern web technologies for an immersive user experience.

> 💚 A passion project created in my free time. Enjoy exploring nature through music and design!

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=flat-square&logo=vite)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.18-06B6D4?style=flat-square&logo=tailwindcss)

## ✨ Features

- 🎵 **Ambient Music Player** - Immersive nature soundscapes with audio visualization
- 🎨 **Custom Typography** - Beautiful custom fonts optimized for performance
- 📱 **Fully Responsive** - Seamless experience across all devices and screen sizes
- 🌿 **Nature-Inspired Design** - Calming aesthetics and organic visuals
- ⚡ **Lightning Fast** - Powered by Vite for instant feedback and optimal performance
- 🎭 **Smooth Animations** - Engaging transitions using Motion library
- 🎯 **Modern Stack** - React 19, TypeScript, and Tailwind CSS

## 🌐 Live Demo

Check out the deployed version on Vercel: [View Live](https://github.com/fareedzafar657/nature-landing-page) (link available in GitHub repo)

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and Yarn installed

### Installation

```bash
# Clone the repository
git clone https://github.com/fareedzafar657/nature-landing-page.git
cd nature-landing-page

# Install dependencies
yarn install

# Start development server
yarn dev
```

The app will be available at `http://localhost:5173`

yarn build

# Preview production build
yarn preview

```

### Deployed on Vercel

This project is deployed on **Vercel** for fast, reliable hosting. For deployment link, check the GitHub repository. run preview

# Run linting
npm lint
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── AudioVisualizer.tsx      # Music visualization component
│   ├── background-image.tsx     # Animated background
│   ├── header.tsx               # Navigation header
│   ├── hero-content.tsx         # Hero section
│   ├── music-player.tsx         # Audio player controls
│   └── ui/
│       └── meteors.tsx          # Decorative meteor animation
├── lib/
│   └── utils.ts                 # Utility functions
├── styles/
│   ├── fonts.css                # Custom font definitions
│   └── index.css                # Global styles
├── App.tsx                       # Main app component
└── main.tsx                      # React entry point

public/
├── background/                   # Background assets
└── fonts/                       # Custom font files
```

## 🎨 Customization

### Custom Fonts

Custom fonts are located in `public/fonts/` and defined in `src/styles/fonts.css`. Font files are optimized using `ttf2woff2` for best performance.

To add new fonts:
1. Place font files in `public/fonts/`
2. Add `@font-face` declarations to `src/styles/fonts.css`
3. Use in your components via Tailwind or CSS

### Styling

This project uses **Tailwind CSS** for styling. Configuration can be found in `tailwind.config.js`.

###yarn dev` | Start development server with hot reload |
| `yarn build` | Build optimized production bundle |
| `yarn preview` | Preview production build locally |
| `yar
## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite 7
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS 4 + Sass
- **Animations**: Motion
- **Icons**: React Icons, Lucide React
- **Utilities**: clsx, tailwind-merge
- **Linting**: ESLint

## 🌐 Browser Support

Works on all modern browsers that support ES2020 and CSS Grid/Flexbox:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Font Optimization

Custom fonts are converted to WOFF2 format for optimal performance. The font conversion script is available at `scripts/font-convert-script.js`.

---

Made with 🌿 and ☕
