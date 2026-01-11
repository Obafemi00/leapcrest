/**
 * Script to download Inter font files from GitHub releases
 * Run: node scripts/download-fonts.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const fontDir = path.join(process.cwd(), 'fonts', 'inter');

// Ensure directory exists
if (!fs.existsSync(fontDir)) {
  fs.mkdirSync(fontDir, { recursive: true });
}

// Inter font files from GitHub (rsms/inter repository)
// Using raw.githubusercontent.com for direct access
const baseUrl = 'https://github.com/rsms/inter/raw/master/docs/font-files';
const fonts = [
  { name: 'Inter-Regular.woff2', weight: '400' },
  { name: 'Inter-Medium.woff2', weight: '500' },
  { name: 'Inter-Bold.woff2', weight: '700' },
  { name: 'Inter-ExtraBold.woff2', weight: '800' },
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Follow redirect
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlinkSync(dest);
      reject(err);
    });
  });
}

async function downloadFonts() {
  console.log('Downloading Inter font files...\n');
  
  for (const font of fonts) {
    const url = `${baseUrl}/${font.name}`;
    const dest = path.join(fontDir, font.name);
    
    try {
      console.log(`Downloading ${font.name} (weight: ${font.weight})...`);
      await downloadFile(url, dest);
      console.log(`✓ Downloaded ${font.name}\n`);
    } catch (error) {
      console.error(`✗ Failed to download ${font.name}:`, error.message);
      console.log(`\nAlternative: Download manually from https://github.com/rsms/inter/releases`);
      console.log(`Place files in: ${fontDir}\n`);
    }
  }
  
  console.log('Font download complete!');
}

downloadFonts().catch(console.error);
