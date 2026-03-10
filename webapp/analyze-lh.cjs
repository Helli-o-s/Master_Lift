const fs = require('fs');
const filepath = process.argv[2];

try {
  const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
  
  console.log("=== LIGHTHOUSE SCORES ===");
  const categories = data.categories;
  for (const cat in categories) {
    if (categories[cat].score !== null) {
      console.log(`${categories[cat].title}: ${Math.round(categories[cat].score * 100)}`);
    } else {
      console.log(`${categories[cat].title}: N/A`);
    }
  }
  
  console.log("\n=== KEY METRICS ===");
  const metrics = ['first-contentful-paint', 'speed-index', 'largest-contentful-paint', 'interactive', 'total-blocking-time', 'cumulative-layout-shift'];
  metrics.forEach(m => {
    if (data.audits[m] && data.audits[m].displayValue) {
      console.log(`${data.audits[m].title}: ${data.audits[m].displayValue}`);
    }
  });
  
  console.log("\n=== TOP OPPORTUNITIES ===");
  const opps = Object.values(data.audits)
    .filter(a => a.details && a.details.type === 'opportunity' && a.score !== 1 && a.score !== null)
    .sort((a, b) => (b.details.overallSavingsMs || 0) - (a.details.overallSavingsMs || 0))
    .slice(0, 5);
    
  if (opps.length > 0) {
    opps.forEach(o => {
      console.log(`- ${o.title}`);
      if (o.displayValue) console.log(`  Savings: ${o.displayValue}`);
    });
  } else {
    console.log("None");
  }
  
  console.log("\n=== TOP DIAGNOSTICS ===");
  const diags = [
    'mainthread-work-breakdown',
    'bootup-time',
    'network-requests',
    'total-byte-weight',
    'dom-size'
  ];
  
  diags.forEach(d => {
    if (data.audits[d] && data.audits[d].score !== 1 && data.audits[d].displayValue) {
      console.log(`- ${data.audits[d].title}`);
      console.log(`  Value: ${data.audits[d].displayValue}`);
    }
  });

} catch(e) {
  console.error("Error parsing JSON:", e);
}
