const fs = require('fs');
const html = fs.readFileSync('mammoth_output.html', 'utf8');
const paragraphs = html.split('</p>');
let curImg = '';
const result = {};

for (const p of paragraphs) {
  if (p.includes('<img')) {
    const match = p.match(/src="([^"]+)"/);
    if (match) curImg = match[1];
  }
  
  if (p.includes('Oyas\u0131')) {
    const text = p.replace(/<[^>]+>/g, '').trim();
    if (text.length > 5 && text.length < 50 && curImg) {
      result[text] = curImg;
    }
  }
}

console.log(JSON.stringify(result, null, 2));
