const { execSync } = require('child_process');
const fs = require('fs');

const images = [
  { in: 'boss.jpg', out: 'boss.webp', q: 80 },
  { in: 'slide01/1.PNG', out: 'slide01/1.webp', q: 75 },
  { in: 'slide01/2.PNG', out: 'slide01/2.webp', q: 75 },
  { in: 'slide01/3.PNG', out: 'slide01/3.webp', q: 75 },
  { in: 'slide01/4.PNG', out: 'slide01/4.webp', q: 75 },
  { in: 'slide01/5.PNG', out: 'slide01/5.webp', q: 75 },
  { in: 'slide02/saut.PNG', out: 'slide02/saut.webp', q: 75 },
  { in: 'slide02/sing.jpg', out: 'slide02/sing.webp', q: 75 }
];

let totalOrig = 0;
let totalWebp = 0;

images.forEach(img => {
  if (fs.existsSync(img.in)) {
    console.log(`Compressing ${img.in} -> ${img.out}...`);
    execSync(`ffmpeg -y -i "${img.in}" -c:v libwebp -quality ${img.q} "${img.out}"`);
    const origSize = fs.statSync(img.in).size;
    const newSize = fs.statSync(img.out).size;
    totalOrig += origSize;
    totalWebp += newSize;
    const savings = Math.round((1 - newSize / origSize) * 100);
    console.log(`✓ ${img.in} (${(origSize/1024).toFixed(0)} KB) -> ${img.out} (${(newSize/1024).toFixed(0)} KB) [Saved ${savings}%]`);
  }
});

console.log(`\n🎉 Total Size Reduced from ${(totalOrig/1024/1024).toFixed(2)} MB to ${(totalWebp/1024/1024).toFixed(2)} MB!`);
console.log(`🚀 Total Payload Savings: ${Math.round((1 - totalWebp/totalOrig)*100)}% bandwidth reduction!`);
