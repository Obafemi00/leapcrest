# Leapcrest Workforce Solutions Landing Page

Enterprise-grade, conversation-driven landing page for Leapcrest Workforce Solutions.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (subtle, professional animations)
- **React Hook Form + Zod** (form validation)
- **Deployed on Vercel**

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
leapcrest/
├── app/
│   ├── layout.tsx       # Root layout with metadata and font configuration
│   ├── page.tsx         # Main page component
│   └── globals.css      # Global styles
├── components/
│   ├── Header.tsx       # Sticky navigation header
│   ├── Hero.tsx         # Hero section
│   ├── TheProblem.tsx   # Problem section with statistics
│   ├── ProblemReframe.tsx # Problem reframe section
│   ├── IntroducingCAP.tsx # CAP introduction
│   ├── WhyLeapcrestCAP.tsx # Why Leapcrest section
│   ├── CAPFramework.tsx # Three-phase framework
│   ├── CallToAction.tsx # Contact form section
│   └── Footer.tsx       # Footer component
├── fonts/
│   └── inter/           # Self-hosted Inter font files (woff2)
│       ├── Inter-Regular.woff2
│       ├── Inter-Medium.woff2
│       ├── Inter-Bold.woff2
│       └── Inter-ExtraBold.woff2
├── lib/
│   └── validation.ts    # Zod validation schemas
├── scripts/
│   ├── download-fonts.js  # Node.js script to download fonts
│   └── download-fonts.sh  # Bash script to download fonts
└── public/              # Static assets
```

## Features

- ✅ Fully responsive design
- ✅ Accessible (ARIA labels, proper semantic HTML)
- ✅ SEO optimized (metadata, structured data)
- ✅ Smooth scroll navigation
- ✅ Form validation with React Hook Form + Zod
- ✅ Subtle animations with Framer Motion
- ✅ Enterprise-grade design system

## Fonts

This project uses **self-hosted Inter fonts** for offline compatibility and reliable CI/CD builds.

### Font Files

Font files are located in `/fonts/inter/` and include:
- Inter-Regular.woff2 (400)
- Inter-Medium.woff2 (500)
- Inter-Bold.woff2 (700)
- Inter-ExtraBold.woff2 (800)

### Downloading Fonts

If font files are missing, you can download them using one of these methods:

**Option 1: Using the bash script**
```bash
bash scripts/download-fonts.sh
```

**Option 2: Using the Node.js script**
```bash
node scripts/download-fonts.js
```

**Option 3: Manual download**
Download from [GitHub Inter Repository](https://github.com/rsms/inter/releases) and place files in `fonts/inter/`.

### Font Configuration

Fonts are configured in `app/layout.tsx` using `next/font/local` with:
- `display: "swap"` for optimal loading performance
- `preload: true` for faster initial render
- CSS variable `--font-inter` used throughout the application

## Design System

- **Primary Color**: Aqua/Teal (#2EE6C5)
- **Background**: Dark gradient (deep navy → muted teal)
- **Font**: Inter (self-hosted, weights: 400, 500, 700, 800)
- **Animations**: Subtle fade-ins and slide-ups only

## Deployment

This project is optimized for deployment on Vercel. Simply connect your repository to Vercel for automatic deployments.

## License

Proprietary - All rights reserved.
# leapcrest
