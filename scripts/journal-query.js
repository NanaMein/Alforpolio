const fs = require('node:fs');
const path = require('node:path');

function getArgValue(args, name) {
  const idx = args.findIndex((a) => a === name);
  if (idx === -1) return undefined;
  return args[idx + 1];
}

function getArgFlag(args, name) {
  return args.includes(name);
}

function pickFirst(m, fallback = '') {
  return m && m[1] ? m[1].trim() : fallback;
}

const argv = process.argv.slice(2);
const match = getArgValue(argv, '--match') || '';
const n = Math.max(1, parseInt(getArgValue(argv, '--n') || '3', 10));
const type = getArgValue(argv, '--type'); // baseline | verdict | task
const json = getArgFlag(argv, '--json') || getArgValue(argv, '--format') === 'json';

const journalPath = path.join(__dirname, '..', 'docs', 'JOURNAL.md');
const text = fs.readFileSync(journalPath, 'utf8');

// Entry headers are the reliable anchor.
// Example: ### JRN-0011 · 2026-09-25 · verdict
const headerRe = /^###\s+(JRN-\d{4})\s+·\s+(\d{4}-\d{2}-\d{2})\s+·\s+(baseline|verdict|task)\s*$/gm;

const entries = [];
let lastIndex = 0;
let m;

// Build entries by slicing between headers.
const headerMatches = [];
while ((m = headerRe.exec(text)) !== null) {
  headerMatches.push({
    id: m[1],
    date: m[2],
    type: m[3],
    startIndex: m.index,
  });
}

for (let i = 0; i < headerMatches.length; i++) {
  const cur = headerMatches[i];
  const next = headerMatches[i + 1];
  const endIndex = next ? next.startIndex : text.length;
  const block = text.slice(cur.startIndex, endIndex);

  const topic = pickFirst(block.match(/\*\*Topic:\*\*\s*(.+)$/m));
  const decision = pickFirst(block.match(/\*\*Decision:\*\*\s*(.+)$/m));
  const executed = pickFirst(block.match(/\*\*Executed:\*\*\s*(.+)$/m));
  const facts = pickFirst(block.match(/\*\*Facts:\*\*\s*(.+)$/m));
  const files = (block.match(/\*\*Files:\*\*\s*(.+)$/m) || [])[1]?.trim();

  entries.push({
    id: cur.id,
    date: cur.date,
    type: cur.type,
    topic,
    decision,
    executed,
    facts,
    files: files || undefined,
    raw: block,
  });

  lastIndex = cur.startIndex;
}

const matchLower = match.toLowerCase();

const filtered = entries.filter((e) => {
  if (type && e.type !== type) return false;
  if (!matchLower) return true;

  // Search within the block, but we also check the extracted fields.
  const inRaw = e.raw.toLowerCase().includes(matchLower);
  const inFields = [e.topic, e.decision, e.executed, e.facts, e.files]
    .filter(Boolean)
    .some((v) => v.toLowerCase().includes(matchLower));
  return inRaw || inFields;
});

const lastMatches = filtered.slice(-n);

if (json) {
  // Drop raw to keep output small.
  const compact = lastMatches.map(({ raw, ...rest }) => rest);
  process.stdout.write(JSON.stringify(compact, null, 2));
  process.stdout.write('\n');
  process.exit(0);
}

if (!matchLower) {
  console.log(`Last ${n} JOURNAL entries:`);
} else {
  console.log(`Last ${n} JOURNAL matches for match=${JSON.stringify(match)}:`);
}

for (const e of lastMatches) {
  const headline = `${e.id} · ${e.date} · ${e.type}`;
  const line2 = e.topic ? `- Topic: ${e.topic}` : '';
  let line3 = '';
  if (e.type === 'verdict' && e.decision) line3 = `- Decision: ${e.decision}`;
  else if (e.type === 'task' && e.executed) line3 = `- Executed: ${e.executed}`;
  else if (e.type === 'baseline' && e.facts) line3 = `- Facts: ${e.facts}`;
  const line4 = e.files ? `- Files: ${e.files}` : '';

  console.log(headline);
  if (line2) console.log(line2);
  if (line3) console.log(line3);
  if (line4) console.log(line4);
  console.log('');
}
