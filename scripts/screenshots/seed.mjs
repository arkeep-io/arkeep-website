// Seeds the isolated demo through the public REST API. Run once per fresh .demo/ directory.
import { randomBytes } from 'node:crypto';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const API = 'http://127.0.0.1:18080/api/v1';
// Sources and repositories live under a neutral path: it shows up in screenshots, so it must not
// reveal the local username or checkout location.
const DATA = '/tmp/arkeep-demo';
export const ADMIN = { name: 'Alex Rivera', email: 'alex@example.com', password: 'demo-Password-2026!' };

let token = '';
async function call(method, path, body) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${path}: ${res.status} ${text}`);
  return text ? JSON.parse(text).data : null; // every success is wrapped in {"data": ...}
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const status = await call('GET', '/setup/status');
if (!status.completed) await call('POST', '/setup/complete', ADMIN);
token = (await call('POST', '/auth/login', { email: ADMIN.email, password: ADMIN.password })).access_token;

// Realistic files for each host so restic has something to back up. Sizes are MiB of random bytes,
// so deduplication does not shrink them to nothing.
await rm(DATA, { recursive: true, force: true });
const files = {
  'web-01': { 'etc/nginx/nginx.conf': 'server { listen 443 ssl; }\n', 'srv/www/index.html': '<h1>ok</h1>\n', 'srv/www/assets/app.js': 2, 'srv/www/assets/hero.webp': 4 },
  'db-01': { 'var/backups/appdb.sql': 18, 'var/backups/users.sql': 3, 'etc/postgresql/postgresql.conf': 'max_connections = 200\n' },
  'nas-01': { 'photos/2026/IMG_0412.raw': 24, 'photos/2026/IMG_0413.raw': 22, 'documents/invoices-2026.pdf': 2 },
};
for (const [host, tree] of Object.entries(files)) {
  for (const [rel, content] of Object.entries(tree)) {
    const full = join(DATA, 'sources', host, rel);
    await mkdir(join(full, '..'), { recursive: true });
    await writeFile(full, typeof content === 'number' ? randomBytes(content * 1024 * 1024) : content);
  }
}

// Agents enroll on their own; wait until all three are registered.
let agents = [];
for (let i = 0; i < 30 && agents.length < 3; i++) {
  agents = (await call('GET', '/agents')).items;
  if (agents.length < 3) await sleep(1000);
}
if (agents.length < 3) throw new Error(`expected 3 agents, found ${agents.length}`);
const byHost = Object.fromEntries(agents.map((a) => [a.hostname, a.id]));

const dest = (name, sub, retention) =>
  call('POST', '/destinations', {
    name,
    type: 'local',
    config: JSON.stringify({ path: join(DATA, 'repos', sub) }),
    credentials: '{}',
    retention_enabled: true,
    retention_schedule: '0 3 * * *',
    retention_agent_id: byHost['nas-01'],
    ...retention,
  });

const nas = await dest('NAS (local)', 'nas', { retention_last: 7, retention_daily: 14, retention_weekly: 8, retention_monthly: 12 });
const offsite = await dest('Offsite copy', 'offsite', { retention_daily: 7, retention_weekly: 4 });

const policies = [];
for (const [host, label, paths] of [
  ['web-01', 'Web server', ['etc/nginx', 'srv/www']],
  ['db-01', 'Postgres', ['var/backups', 'etc/postgresql']],
  ['nas-01', 'Home NAS', ['photos', 'documents']],
]) {
  policies.push(
    await call('POST', '/policies', {
      name: label,
      agent_id: byHost[host],
      schedule: '0 */6 * * *',
      sources: JSON.stringify(paths.map((p) => ({ type: 'directory', path: join(DATA, 'sources', host, p), label: p }))),
      repo_password: 'demo-repo-password-2026',
      exclude_patterns: JSON.stringify(['*.tmp']),
      destinations: [
        { destination_id: nas.id, priority: 1 },
        { destination_id: offsite.id, priority: 2 },
      ],
    }),
  );
}

// Two runs per policy so dashboards, jobs and snapshots have history.
async function waitIdle() {
  for (let i = 0; i < 120; i++) {
    const jobs = (await call('GET', '/jobs?limit=50')).items;
    if (jobs.every((j) => !['pending', 'running', 'waiting'].includes(j.status))) return jobs;
    await sleep(1000);
  }
  throw new Error('jobs did not finish in 2 minutes');
}
// Round 1 runs one policy at a time: the first backup initialises each fresh repository, and
// three agents initialising the same repository at once leave it with conflicting keys.
for (const p of policies) {
  await call('POST', `/policies/${p.id}/trigger`, {});
  await sleep(2000);
  await waitIdle();
}
for (const p of policies) await call('POST', `/policies/${p.id}/trigger`, {});
await sleep(2000);
const jobs = await waitIdle();
console.log(jobs.map((j) => `${j.policy_name}=${j.status}`).join(', '));
console.log('Seeded. Next: node scripts/screenshots/capture.mjs');
