import { readFile, writeFile } from 'node:fs/promises';
import { render } from '../.prerender/entry-server.js';
const { html, head, site, pendingServices } = render();
if (site.official && pendingServices.length) throw new Error('Confirme os serviços em confirmedServiceIds antes da publicação oficial: ' + pendingServices.join(', '));
if (site.official && (!site.url || !/^https:\/\//.test(site.url))) throw new Error('Publicação oficial exige VITE_SITE_URL com domínio HTTPS real.');
if (site.url) { const url = new URL(site.url); if (url.pathname !== '/' || url.search || url.hash) throw new Error('VITE_SITE_URL deve conter somente a origem HTTPS do site.'); }
const template = await readFile('dist/index.html', 'utf8');
await writeFile('dist/index.html', template.replace('<!--app-html-->', html).replace('<!--seo-head-->', head));
await writeFile('dist/robots.txt', site.official ? `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n` : 'User-agent: *\nDisallow: /\n');
// Não inventar domínio: sem URL configurada, o sitemap é vazio e não anunciado.
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${site.url ? `\n  <url><loc>${site.url.replace(/&/g, '&amp;')}/</loc></url>\n` : ''}</urlset>\n`);
console.log('HTML pré-renderizado; metadados, JSON-LD, robots e sitemap gerados. Modo:', site.official ? 'oficial' : 'demonstração noindex');
