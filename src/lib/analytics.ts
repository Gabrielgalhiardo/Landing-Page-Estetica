import { site } from '../data/business';
declare global { interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void } }
export type Consent = 'accepted' | 'rejected';
export const consentKey = 'aurevyra-analytics-consent-v1';
let active = false;
export function savedConsent(): Consent | null {
  try { const value = localStorage.getItem(consentKey); return value === 'accepted' || value === 'rejected' ? value : null; } catch { return null; }
}
export function enableAnalytics() {
  if (active || !/^G-[A-Z0-9]+$/.test(site.gaId) || savedConsent() !== 'accepted') return;
  active = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function (..._args: unknown[]) { window.dataLayer!.push(arguments); };
  window.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  window.gtag('js', new Date());
  window.gtag('config', site.gaId, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false });
  window.gtag('event', 'page_view', { page_location: window.location.origin + window.location.pathname, page_title: document.title });
  const script = document.createElement('script');
  script.id = 'aurevyra-ga'; script.async = true; script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(site.gaId)}`;
  document.head.append(script);
}
export function setConsent(value: Consent) {
  try { localStorage.setItem(consentKey, value); } catch { /* Permite navegar sem armazenamento. */ }
  if (value === 'accepted') enableAnalytics();
  else {
    window.gtag?.('consent', 'update', { analytics_storage: 'denied' });
    active = false;
    // Recarrega para remover script, fila e cookies de medição após revogação.
    document.cookie.split(';').forEach(cookie => { const name = cookie.split('=')[0].trim(); if (name === '_ga' || name.startsWith('_ga_')) { const host = location.hostname; document.cookie = `${name}=; Max-Age=0; path=/`; const parts = host.split('.'); for (let i = 0; i < parts.length - 1; i++) document.cookie = `${name}=; Max-Age=0; path=/; domain=.${parts.slice(i).join('.')}`; } });
    if (document.getElementById('aurevyra-ga')) window.location.reload();
  }
}
export function track(event: 'whatsapp_click' | 'treatment_click' | 'instagram_click' | 'maps_click', label: string) {
  if (active && savedConsent() === 'accepted') window.gtag?.('event', event, { link_label: label });
}
