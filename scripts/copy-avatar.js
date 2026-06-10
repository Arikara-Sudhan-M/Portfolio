import fs from 'fs';
import path from 'path';

const source = "C:\\Users\\ArikaraSudhan\\.gemini\\antigravity-ide\\brain\\a2f298ce-fd08-4283-9a82-189255a01c4d\\media__1781083343491.jpg";
const destDir = path.resolve('public');
const dest = path.join(destDir, 'sudhan.jpg');

try {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  fs.copyFileSync(source, dest);
  console.log(`Successfully copied ${source} to ${dest}`);
} catch (err) {
  console.error('Error copying file:', err);
  process.exit(1);
}
