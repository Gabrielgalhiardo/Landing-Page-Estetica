import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const staged = process.argv.includes('--staged');
const ignored = new Set(['.git', 'node_modules', 'dist', '.prerender', '.openai', '.sites-runtime', '.sites-cache', '.vercel', '.netlify', '.wrangler', '.codex', '.agents', '.aws', '.ssh', '.azure', '.gcloud', '.kube']);
const rules = [
  ['chave privada', /-----BEGIN (?:RSA |EC |DSA |OPENSSH |ENCRYPTED )?PRIVATE KEY-----/],
  ['token GitHub', /(?:gh[pousr]_[A-Za-z0-9_]{30,}|github_pat_[A-Za-z0-9_]{50,})/],
  ['chave AWS', /(?:AKIA|ASIA)[A-Z0-9]{16}/],
  ['chave Google', /AIza[0-9A-Za-z_-]{35}/],
  ['token Slack', /xox[baprs]-[A-Za-z0-9-]{20,}/],
  ['chave OpenAI', /sk-(?:proj-|svcacct-)?[A-Za-z0-9_-]{32,}/],
  ['credencial em URL', /https?:\/\/[^\s/@:]+:[^\s/@]+@/],
  ['segredo atribuído no código', /(?:api[_-]?key|access[_-]?token|password|client[_-]?secret)\s*[:=]\s*["'][A-Za-z0-9_.\/=+-]{20,}["']/i],
  ['identificação de implantação anterior', /appg(?:prj|dep|ver|repo)_[A-Za-z0-9]+|git\.chatgpt-team\.site|[A-Za-z0-9-]+\.[A-Za-z0-9-]+\.chatgpt\.site/],
  ['caminho de usuário local', /C:[\\/]Users[\\/]/i],
];
const forbidden = name => /(^|\/)(?:\.openai|\.sites-runtime|\.sites-cache|\.vercel|\.netlify|\.wrangler|\.aws|\.ssh|\.azure|\.gcloud|\.kube)(\/|$)/.test(name)
  || /(^|\/)\.env[^/]*$/.test(name) && name !== '.env.example'
  || /(^|\/)(?:\.npmrc|\.netrc|\.pypirc)$|\.(?:pem|key|p12|pfx)$/i.test(name);
const issues = [];
let names;
try { names = execFileSync('git', ['ls-files', '--cached', '-z'], { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).split('\0').filter(Boolean); }
catch { if (staged) { console.error('Não foi possível ler o índice Git. Commit bloqueado.'); process.exit(1); } }
if (!names?.length && !staged) {
  names = [];
  const walk = folder => {
    for (const entry of readdirSync(folder, { withFileTypes: true })) {
      if (entry.isDirectory() && !ignored.has(entry.name)) walk(path.join(folder, entry.name));
      else if (entry.isFile() && (!entry.name.startsWith('.env') || entry.name === '.env.example')) names.push(path.relative(root, path.join(folder, entry.name)).replaceAll('\\', '/'));
    }
  };
  walk(root);
}
for (const name of names) {
  if (forbidden(name)) { issues.push({ file: name, reason: 'arquivo que não deve ser versionado' }); continue; }
  let buffer;
  try { buffer = staged ? execFileSync('git', ['show', `:${name}`], { cwd: root, maxBuffer: 12 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'] }) : readFileSync(path.join(root, name)); }
  catch { issues.push({ file: name, reason: 'arquivo não pôde ser inspecionado' }); continue; }
  if (buffer.includes(0)) continue;
  const text = buffer.toString('utf8');
  for (const [reason, regex] of rules) {
    const match = regex.exec(text);
    if (match) issues.push({ file: name, line: text.slice(0, match.index).split('\n').length, reason });
  }
  if (name === '.env.example' && /^VITE_(?:SITE_URL|GA_ID)[ \t]*=[ \t]*\S/m.test(text)) issues.push({ file: name, reason: 'exemplo de ambiente deve manter domínio e Analytics vazios' });
}
if (issues.length) {
  console.error('Commit/checagem bloqueado. Nenhum valor de credencial é exibido.');
  issues.forEach(issue => console.error(`${issue.file}${issue.line ? ':' + issue.line : ''} — ${issue.reason}`));
  process.exitCode = 1;
} else console.log(`Checagem concluída: ${names.length} arquivos inspecionados; nenhum padrão de segredo ou metadado privado encontrado.`);
