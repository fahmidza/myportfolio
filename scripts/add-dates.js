const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'docs', 'projects');
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.endsWith('.md') || file.endsWith('.mdx')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Only add date if it doesn't already have one
    if (!content.includes('\ndate: ')) {
      // Find where to insert (after title or description)
      content = content.replace(/^(title:.*)$/m, '$1\ndate: 2024-01-01');
      fs.writeFileSync(filePath, content);
      console.log(`Added date to ${file}`);
    }
  }
});
