const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

console.log('🔄 Syncing CMS tags to Docusaurus format...');

['docs'].forEach(dir => {
  const sourcePath = path.join(__dirname, '..', dir, 'tags-source.yml');
  const destPath = path.join(__dirname, '..', dir, 'tags.yml');
  
  if (fs.existsSync(sourcePath)) {
    try {
      const sourceContent = fs.readFileSync(sourcePath, 'utf8');
      const sourceData = yaml.load(sourceContent);
      
      if (sourceData && Array.isArray(sourceData.tags)) {
        const out = {};
        sourceData.tags.forEach(t => {
          if (t.name) {
            const label = t.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            out[t.name] = { 
              label: label 
            };
          }
        });
        fs.writeFileSync(destPath, yaml.dump(out));
        console.log(`✅ Synced tags for ${dir}`);
      }
    } catch(e) { 
      console.error(`❌ Error syncing tags for ${dir}:`, e.message); 
    }
  } else {
    console.log(`ℹ️ No tags-source.yml found for ${dir}, skipping.`);
  }
});
