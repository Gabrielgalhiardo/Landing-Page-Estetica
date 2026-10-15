import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { business } from '../data/business';
import { track } from '../lib/analytics';
import { whatsappUrl } from '../lib/whatsapp';
import { openDemoContact } from './ContactDialog';
export function WhatsAppLink({ children, message, label, className = '', treatment = false }: { children: ReactNode; message?: string; label: string; className?: string; treatment?: boolean }) {
  if (!business.phone) return <button type="button" className={className} onClick={openDemoContact}>{children}</button>;
  return <a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" className={className} onClick={() => { track('whatsapp_click', label); if (treatment) track('treatment_click', label); }}>{children}</a>;
}
export function ScheduleButton({ label = 'Agendar pelo WhatsApp', className = '', source = 'agendamento' }: { label?: string; className?: string; source?: string }) {
  return <WhatsAppLink label={source} className={`button button-primary ${className}`}><WhatsAppIcon size={20} /><span>{label}</span><ArrowUpRight size={17} /></WhatsAppLink>;
}
export function Eyebrow({ children }: { children: ReactNode }) { return <p className="eyebrow"><span />{children}</p>; }
export function Brand({ dark = false }: { dark?: boolean }) { return <a href="#inicio" title="Voltar ao início" className={`brand ${dark ? 'brand-light' : ''}`}><img src={`/brand/logo-aurevyra-${dark ? 'claro' : 'principal'}.svg`} width="560" height="200" className="brand-image" alt={business.name} /></a>; }
