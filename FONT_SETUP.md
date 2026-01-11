# Self-Hosted Inter Font Setup

## Overview

This project uses self-hosted Inter fonts instead of Google Fonts for:
- **Offline compatibility**: Builds work without internet connection
- **CI/CD reliability**: No dependency on external services
- **Production optimization**: Fonts are optimized and preloaded
- **Deterministic builds**: Consistent builds across environments

## Font Files Location

Font files are stored in: `/fonts/inter/`

Required files:
- `Inter-Regular.woff2` (400 weight)
- `Inter-Medium.woff2` (500 weight)
- `Inter-Bold.woff2` (700 weight)
- `Inter-ExtraBold.woff2` (800 weight)

## Font Configuration

### 1. Font Import in `app/layout.tsx`

```typescript
import localFont from "next/font/local";

const inter = localFont({
  src: [
    {
      path: "../fonts/inter/Inter-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/inter/Inter-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/inter/Inter-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/inter/Inter-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});
```

### 2. HTML Application

The font variable is applied to the body element:

```tsx
<body className={`${inter.variable} font-sans antialiased`}>
```

### 3. Tailwind CSS Configuration

Tailwind is already configured to use the font variable:

```typescript
// tailwind.config.ts
fontFamily: {
  sans: ["var(--font-inter)", "system-ui", "sans-serif"],
},
```

All `font-sans` classes automatically use the Inter font.

## Downloading Fonts

### Method 1: Bash Script

```bash
bash scripts/download-fonts.sh
```

### Method 2: Node.js Script

```bash
node scripts/download-fonts.js
```

### Method 3: Manual Download

1. Visit: https://github.com/rsms/inter/releases
2. Download the latest release
3. Extract the `.woff2` files
4. Place them in `/fonts/inter/`

### Method 4: Direct Download (GitHub Raw)

```bash
mkdir -p fonts/inter
cd fonts/inter

curl -L -o Inter-Regular.woff2 "https://github.com/rsms/inter/raw/master/docs/font-files/Inter-Regular.woff2"
curl -L -o Inter-Medium.woff2 "https://github.com/rsms/inter/raw/master/docs/font-files/Inter-Medium.woff2"
curl -L -o Inter-Bold.woff2 "https://github.com/rsms/inter/raw/master/docs/font-files/Inter-Bold.woff2"
curl -L -o Inter-ExtraBold.woff2 "https://github.com/rsms/inter/raw/master/docs/font-files/Inter-ExtraBold.woff2"
```

## Verification

After downloading fonts, verify the build works:

```bash
npm run build
```

You should see:
```
✓ Compiled successfully
✓ Generating static pages
```

## Font Usage in Components

The Inter font is automatically applied via Tailwind's `font-sans` class:

```tsx
<h1 className="font-sans font-bold">Heading</h1>
<p className="font-sans">Body text</p>
```

Font weights available:
- `font-normal` (400)
- `font-medium` (500)
- `font-bold` (700)
- `font-extrabold` (800)

## Production Optimization

Next.js automatically:
- Optimizes font files
- Adds preload links in `<head>`
- Uses `font-display: swap` for better loading performance
- Generates optimized CSS

## Troubleshooting

### Build fails with "Cannot find module"
- Ensure font files exist in `/fonts/inter/`
- Check file names match exactly (case-sensitive)
- Verify paths in `layout.tsx` are correct

### Fonts not loading
- Clear `.next` cache: `rm -rf .next`
- Rebuild: `npm run build`
- Check browser console for 404 errors

### Font weights not working
- Verify all four font files are present
- Check weight values match file names (400, 500, 700, 800)
- Ensure Tailwind config includes the font family

## License

Inter font is licensed under the SIL Open Font License 1.1.
Source: https://github.com/rsms/inter
