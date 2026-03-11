const sharp = require('sharp');

async function processLogo() {
  try {
    const inputPath = 'C:\\Users\\Win11\\.gemini\\antigravity\\brain\\7c640547-06b3-4e57-9f21-fc49044fcba6\\media__1773197909940.jpg';
    const outputPath = 'c:\\Master_Lift\\webapp\\public\\master_logo.webp';
    
    await sharp(inputPath)
      .resize({ height: 120 }) // Resize the logo to a reasonable height
      .webp({ quality: 90 }) // Optimize format
      .toFile(outputPath);
      
    console.log('Logo optimized successfully!');
  } catch (error) {
    console.error('Error optimizing logo:', error);
  }
}

processLogo();
