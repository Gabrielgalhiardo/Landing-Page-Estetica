import { business, site } from '../data/business';
export const title = 'Aurévyra | Estética & Bem-estar';
export const description = 'Um convite para desacelerar e cuidar de si. Conheça o universo Aurévyra: um conceito de estética facial, leveza e bem-estar.';
export function schema() {
  return { '@context': 'https://schema.org', '@type': 'WebSite', name: business.name, description, inLanguage: 'pt-BR', ...(site.url ? { url: site.url + '/' } : {}) };
}
const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
export function seoHead() {
  const base = site.url;
  return `<title>${escape(title)}</title>
  <meta name="description" content="${escape(description)}" />
  <meta name="robots" content="${site.official ? 'index, follow' : 'noindex, nofollow'}" />
  ${base ? `<link rel="canonical" href="${escape(base)}/" /><meta property="og:url" content="${escape(base)}/" />` : ''}
  <meta property="og:type" content="website" /><meta property="og:locale" content="pt_BR" />
  <meta property="og:site_name" content="${escape(business.name)}" />
  <meta property="og:title" content="${escape(title)}" /><meta property="og:description" content="${escape(description)}" />
  <meta property="og:image" content="${escape(base)}/images/og-image.jpg" /><meta property="og:image:width" content="1200" /><meta property="og:image:height" content="630" /><meta property="og:image:alt" content="Aurévyra. Estética e bem-estar. Um tempo para você." />
  <meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content="${escape(title)}" /><meta name="twitter:description" content="${escape(description)}" /><meta name="twitter:image" content="${escape(base)}/images/og-image.jpg" />
  <script type="application/ld+json">${JSON.stringify(schema()).replace(/</g, '\\u003c')}</script>`;
}
