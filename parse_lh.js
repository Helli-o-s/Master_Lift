const fs = require('fs');
const data = fs.readFileSync('c:/Master_Lift/webapp/lighthouse-report.json', 'utf8');
const report = JSON.parse(data);

console.log("== Lighthouse Results ==");
for(const key in report.categories) {
  const cat = report.categories[key];
  console.log(`${cat.title}: ${Math.round(cat.score * 100)}%`);
}
