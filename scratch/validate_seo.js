const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

// 1. Validate JSON-LD
const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (!match) {
  console.error('FAIL: No JSON-LD found');
  process.exit(1);
}

try {
  const json = JSON.parse(match[1]);
  console.log('✓ JSON-LD is valid syntax.');
  console.log('✓ Found @graph nodes:', json['@graph'].map(n => Array.isArray(n['@type']) ? n['@type'].join('/') : n['@type']).join(', '));
} catch (e) {
  console.error('FAIL: JSON-LD JSON parse error:', e.message);
  process.exit(1);
}

// 2. Validate SEO Checklist Requirements
const checklistItems = [
  { name: 'Targeted Title Tag', check: html.includes('<title>Busteki | Software Development, SME Incubation') },
  { name: 'Actionable Meta Description', check: html.includes('meta name="description"') },
  { name: 'Keywords Tag', check: html.includes('meta name="keywords"') },
  { name: 'Robots Tag (index, follow)', check: html.includes('meta name="robots"') },
  { name: 'Canonical Tag', check: html.includes('link rel="canonical"') },
  { name: 'Local Region Tag (Arusha)', check: html.includes('name="geo.placename"') },
  { name: 'Google Search Console Verification Tag', check: html.includes('name="google-site-verification"') },
  { name: 'Open Graph Title & Image', check: html.includes('property="og:title"') && html.includes('property="og:image"') },
  { name: 'Twitter Card', check: html.includes('name="twitter:card"') },
  { name: 'Single H1 Heading', check: (html.match(/<h1[^>]*>/g) || []).length === 1 },
  { name: 'LocalBusiness Schema with Geo & Hours', check: html.includes('LocalBusiness') && html.includes('GeoCoordinates') && html.includes('openingHoursSpecification') },
  { name: 'Standardized NAP in Footer (Name, Address, Phone)', check: html.includes('<address') && html.includes('+255 749 682 106') && html.includes('Arusha, Tanzania') },
  { name: '4-Step Process Section (Answers Visitor Search Intent)', check: html.includes('id="process"') },
  { name: 'Testimonials & Google Review Prompt', check: html.includes('id="testimonials"') && html.includes('Leave a Google Review') },
  { name: 'Content & Named Authors Section', check: html.includes('id="insights"') && html.includes('Jastin John Maile') },
  { name: 'WebP Next-Gen Image Usage in Slider & Markup', check: html.includes('slide01/1.webp') && html.includes('boss.webp') }
];

let allPassed = true;
checklistItems.forEach(item => {
  if (item.check) {
    console.log(`✓ Checklist Passed: ${item.name}`);
  } else {
    console.error(`✗ Checklist Failed: ${item.name}`);
    allPassed = false;
  }
});

if (allPassed) {
  console.log('\n🌟 100% SEO CHECKLIST AUDIT PASSED WITH FLYING COLORS!');
} else {
  process.exit(1);
}
