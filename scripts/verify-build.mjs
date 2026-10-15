import { readFile, access, readdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
const html = await readFile('dist/index.html', 'utf8');
assert.equal((html.match(/<h1\b/g) || []).length, 1, 'Exatamente um H1');
for (const text of ['Estética facial', 'Aurévyra', 'Limpeza de pele', 'Tratamentos faciais', 'Cuidados com acne', 'application/ld+json', 'name="description"', 'property="og:title"', 'name="twitter:card"', 'lang="pt-BR"']) assert.ok(html.includes(text), `Faltou: ${text}`);
assert.ok(!html.includes('<!--app-html-->') && !html.includes('<!--seo-head-->'));
const json = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
assert.equal(json['@type'], 'WebSite');
assert.ok(!json.telephone && !json.address && !json.sameAs && !json.aggregateRating, 'Sem dados de empresa real no schema');
assert.ok(!/href="https:\/\/(?:wa.me|www.instagram.com|www.google.com\/maps)/.test(html), 'Nenhum contato real no modelo');
assert.ok(!html.includes('<iframe'), 'Mapa decorativo e local');
assert.ok(html.includes('aria-labelledby="contact-title"'), 'Diálogo de contato da demonstração presente');
const robots = await readFile('dist/robots.txt', 'utf8');
if (html.includes('noindex, nofollow')) assert.ok(robots.includes('Disallow: /'));
else { assert.ok(html.includes('rel="canonical" href="https://')); assert.ok(robots.includes('Sitemap: https://')); }
for (const f of ['/images/cuidado.webp','/images/serum.webp','/images/espaco.webp','/images/ritual.webp','/images/og-image.jpg','/brand/logo-aurevyra-principal.svg','/brand/logo-aurevyra-claro.svg','/brand/mapa-conceitual.svg','/fonts/manrope-latin.woff2','/fonts/cormorant-latin.woff2','/fonts/cormorant-italic-latin.woff2','/favicon.svg','/sitemap.xml']) await access('dist' + f);
assert.ok(!(await readdir('dist')).some(f => /server|entry-server/.test(f)));
console.log('Verificação passou: marca fictícia, conteúdo estático, SEO, contatos locais e assets.');
