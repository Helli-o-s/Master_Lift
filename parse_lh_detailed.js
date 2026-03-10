const fs = require('fs');
const path = 'c:/Master_Lift/webapp/lighthouse-report.json';

if (!fs.existsSync(path)) {
  console.log("No report found at", path);
  process.exit(1);
}

const data = fs.readFileSync(path, 'utf8');
const report = JSON.parse(data);

console.log("==============================");
console.log("   LIGHTHOUSE AUDIT RESULTS   ");
console.log("==============================");

// Category Scores
console.log("\n📊 SCORES:\n");
for (const key in report.categories) {
  const cat = report.categories[key];
  const score = Math.round(cat.score * 100);
  const emoji = score >= 90 ? '🟢' : score >= 50 ? '🟡' : '🔴';
  console.log(`  ${emoji} ${cat.title}: ${score}/100`);
}

// Core Web Vitals
console.log("\n⚡ CORE WEB VITALS:\n");
const vitals = [
  'first-contentful-paint',
  'largest-contentful-paint',
  'total-blocking-time',
  'cumulative-layout-shift',
  'speed-index',
  'interactive'
];
for (const id of vitals) {
  const audit = report.audits[id];
  if (audit && audit.displayValue) {
    const score = audit.score !== null ? Math.round(audit.score * 100) : 'N/A';
    const emoji = score === 'N/A' ? '⚪' : score >= 90 ? '🟢' : score >= 50 ? '🟡' : '🔴';
    console.log(`  ${emoji} ${audit.title}: ${audit.displayValue}`);
  }
}

// Top Opportunities
console.log("\n🔧 TOP OPPORTUNITIES TO FIX:\n");
const opportunities = Object.values(report.audits)
  .filter(a => a.details && a.details.type === 'opportunity' && a.score !== null && a.score < 0.9)
  .sort((a, b) => (a.score || 0) - (b.score || 0))
  .slice(0, 6);

for (const opp of opportunities) {
  console.log(`  ❗ ${opp.title}: ${opp.displayValue || ''}`);
  if (opp.description) {
    console.log(`     → ${opp.description.split('.')[0]}.`);
  }
}

// Accessibility issues
console.log("\n♿ ACCESSIBILITY ISSUES:\n");
const a11y = Object.values(report.audits)
  .filter(a => a.score !== null && a.score < 1 && a.details && a.details.items && a.details.items.length > 0)
  .filter(a => report.categories.accessibility?.auditRefs?.some(r => r.id === a.id))
  .slice(0, 5);
for (const issue of a11y) {
  console.log(`  ⚠️  ${issue.title}: ${issue.displayValue || ''}`);
}

// SEO
console.log("\n🔍 SEO ISSUES:\n");
const seo = Object.values(report.audits)
  .filter(a => a.score !== null && a.score < 1)
  .filter(a => report.categories.seo?.auditRefs?.some(r => r.id === a.id))
  .slice(0, 5);
for (const issue of seo) {
  console.log(`  📌 ${issue.title}: ${issue.displayValue || ''}`);
}

console.log("\n==============================");
