const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'docs', 'about.md');
let content = fs.readFileSync(filePath, 'utf8');

// Replace newlines followed immediately by `  ---` with `\n\n---`
content = content.replace(/\n\s*---\n/g, '\n\n---\n');

fs.writeFileSync(filePath, content);
console.log('Fixed markdown Setext headings in about.md');
