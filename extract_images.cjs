const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');

async function extract() {
  let counter = 1;
  const options = {
    convertImage: mammoth.images.imgElement((image) => {
      return image.read("base64").then((imageBuffer) => {
        const ext = image.contentType.split('/')[1];
        const filename = `oya_image_${counter}.${ext}`;
        // save the image
        fs.writeFileSync(path.join(__dirname, 'public', filename), Buffer.from(imageBuffer, 'base64'));
        counter++;
        return {
          src: `/${filename}`
        };
      });
    })
  };

  const result = await mammoth.convertToHtml({path: path.join(__dirname, 'public', 'oyalar.docx')}, options);
  fs.writeFileSync('mammoth_output.html', result.value);
  console.log('Extraction complete. Output HTML saved to mammoth_output.html');
}

extract().catch(console.error);
