// scripts/removeStandardFonts.js
const path = require('path');
const fs = require('fs');

const destinationPath = path.join(__dirname, '..', 'public', 'standard_fonts');

if (fs.existsSync(destinationPath)) {
  fs.rmSync(destinationPath, { recursive: true, force: true });
  console.log('Standard fonts removed from public directory.');
} else {
  console.log('No standard fonts found in public directory.');
}
