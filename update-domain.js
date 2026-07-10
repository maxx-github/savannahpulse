const fs = require('fs');
const path = require('path');

console.log('🔍 Scanning for hardcoded domain references...\n');

// Get all source files
const srcDir = path.join(process.cwd(), 'src');
const files = [];

function getFiles(dir) {
  const items = fs.readdirSync(dir);
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getFiles(fullPath);
    } else if (item.endsWith('.tsx') || item.endsWith('.ts') || item.endsWith('.js')) {
      files.push(fullPath);
    }
  });
}

if (fs.existsSync(srcDir)) {
  getFiles(srcDir);
}

let foundCount = 0;
const filesToUpdate = [];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  // Check for old domains
  if (content.includes('savannahpulse.co.ke') || content.includes('savannahpulse.vercel.app')) {
    foundCount++;
    filesToUpdate.push(file);
    
    console.log(`📄 Found in: ${file.replace(process.cwd(), '')}`);
    
    // Show the lines with the old domain
    const lines = content.split('\n');
    lines.forEach((line, index) => {
      if (line.includes('savannahpulse.co.ke') || line.includes('savannahpulse.vercel.app')) {
        console.log(`   Line ${index + 1}: ${line.trim()}`);
      }
    });
    console.log('');
  }
});

console.log(`\n📊 Summary: Found ${foundCount} files with hardcoded domains`);

if (foundCount > 0) {
  console.log('\n🔧 Updating files...\n');
  
  filesToUpdate.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const originalContent = content;
    
    // Replace domains
    content = content.replace(/savannahpulse\.co\.ke/g, 'hospitalityarc.com');
    content = content.replace(/savannahpulse\.vercel\.app/g, 'hospitalityarc.com');
    
    if (content !== originalContent) {
      fs.writeFileSync(file, content);
      console.log(`✅ Updated: ${file.replace(process.cwd(), '')}`);
    }
  });
  
  console.log('\n✅ All files updated successfully!');
  console.log('\n📋 Next steps:');
  console.log('1. Run: git add .');
  console.log('2. Run: git commit -m "Update: Migrate to hospitalityarc.com domain"');
  console.log('3. Run: git push');
} else {
  console.log('\n✅ No hardcoded domains found in source files!');
}