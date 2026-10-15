import { execFileSync } from 'node:child_process';
import { chmodSync, realpathSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = realpathSync(fileURLToPath(new URL('../', import.meta.url)));
const normalized = value => path.resolve(value).toLowerCase();
try {
  const gitRoot = execFileSync('git', ['rev-parse', '--show-toplevel'], { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  if (normalized(realpathSync(gitRoot)) !== normalized(root)) throw new Error('Inicialize um repositório Git independente nesta pasta.');
  chmodSync(path.join(root, '.githooks/pre-commit'), 0o755);
  execFileSync('git', ['config', '--local', 'core.hooksPath', '.githooks'], { cwd: root });
  console.log('Proteção pre-commit ativada somente neste repositório.');
} catch (error) {
  console.error(error.message.includes('Inicialize') ? error.message : 'Execute git init -b main nesta pasta antes de npm run setup:git.');
  process.exitCode = 1;
}
