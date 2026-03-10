const fs = require('fs');
const pdfjs = require('pdfjs-dist/legacy/build/pdf.js');

async function extractText() {
  try {
    const dataBuffer = fs.readFileSync('c:\\Master_Lift\\Master_Profile.pdf');
    const loadingTask = pdfjs.getDocument(dataBuffer);
    const pdf = await loadingTask.promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const numItems = textContent.items.length;
        let lastY = -1;
        let text = '';
        
        for (let j = 0; j < numItems; j++) {
            const item = textContent.items[j];
            if (lastY == item.transform[5] || !lastY){
                text += item.str;
            } else {
                text += '\n' + item.str;
            }
            lastY = item.transform[5];
        }
        fullText += `\n--- PAGE ${i} ---\n` + text;
    }
    
    fs.writeFileSync('c:\\Master_Lift\\pdf_text.txt', fullText);
    console.log('PDF text successfully extracted to pdf_text.txt');
  } catch (error) {
    console.error('Error parsing PDF:', error);
  }
}

extractText();
