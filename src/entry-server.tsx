import { renderToString } from 'react-dom/server';
import App from './App';
import { seoHead } from './lib/seo';
import { site } from './data/business';
import { services, confirmedServiceIds } from './data/services';
export function render() { return { html: renderToString(<App />), head: seoHead(), site, pendingServices: services.filter(s => !confirmedServiceIds.includes(s.id)).map(s => s.name) }; }
