const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'docs', 'projects');
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.endsWith('.md') || file.endsWith('.mdx')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Split by lines to carefully remove dangling list items that were left behind
    const lines = content.split(/\r?\n/);
    let inFrontmatter = false;
    let newLines = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line === '---') {
        inFrontmatter = !inFrontmatter;
        newLines.push(line);
        continue;
      }
      
      if (inFrontmatter) {
        // If the line starts with `- ` or `  - `, it's a dangling tag item. Drop it.
        // Also drop `tags:` if it exists.
        if (line.match(/^\s*-\s+/) || line.startsWith('tags:')) {
          continue; 
        }
      }
      
      newLines.push(line);
    }
    
    fs.writeFileSync(filePath, newLines.join('\n'));
    console.log(`Fixed frontmatter in ${file}`);
  }
});
