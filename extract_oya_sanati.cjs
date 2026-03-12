const mammoth = require("mammoth");
const fs = require("fs");
const path = require("path");

const docxPath = path.join(__dirname, "public", "OYA SANATI.docx");

mammoth.extractRawText({path: docxPath})
    .then(function(result){
        var text = result.value; // The raw text
        var messages = result.messages;
        fs.writeFileSync("oya_sanati_text.txt", text);
        console.log("Text extracted to oya_sanati_text.txt");
    })
    .done();
