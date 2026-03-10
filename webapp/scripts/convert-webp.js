const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const convertDir = async (dir) => {
  const fullPath = path.join(__dirname, '..', 'public', 'images', dir);
  if (!fs.existsSync(fullPath)) return;
  
  const files = fs.readdirSync(fullPath);
  for (const file of files) {
    if (file.endsWith('.png')) {
      const inPath = path.join(fullPath, file);
      const outPath = path.join(fullPath, file.replace('.png', '.webp'));
      await sharp(inPath).webp({ quality: 80 }).toFile(outPath);
      console.log(`Converted ${file} to webp`);
    }
  }
};

(async () => {
  try {
    await convertDir('');
    await convertDir('services');
  } catch(e) {
    console.error(e);
  }
})();
