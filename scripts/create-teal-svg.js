const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'public', 'photos', 'bg-element.svg');
const dest = path.join(__dirname, '..', 'public', 'photos', 'bg-element-teal.svg');

const content = fs.readFileSync(src, 'utf8');
const tealContent = content.replace(/fill="#FFFFFF"/g, 'fill="#185d53"');
fs.writeFileSync(dest, tealContent, 'utf8');

console.log('Successfully created bg-element-teal.svg!');
