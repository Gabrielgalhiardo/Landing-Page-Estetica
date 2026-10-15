import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Brand, WhatsAppLink } from './UI';
import WhatsAppIcon from './WhatsAppIcon';
const links = [['#tratamentos', 'Tratamentos'], ['#sobre', 'Sobre a Aurévyra'], ['#localizacao', 'Localização'], ['#duvidas', 'Dúvidas']];
export default function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => { const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); }; window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey); }, []);
  return <header className="header"><div className="container header-inner"><Brand /><nav className="desktop-nav" aria-label="Navegação principal">{links.map(([href, text]) => <a key={href} href={href}>{text}</a>)}</nav><WhatsAppLink label="header" className="header-cta"><WhatsAppIcon size={18} green />Agendar um horário <ArrowUpRight size={16} /></WhatsAppLink><button className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Fechar menu' : 'Abrir menu'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div><nav id="mobile-nav" className="mobile-nav" aria-label="Navegação mobile" hidden={!open}>{links.map(([href, text]) => <a key={href} href={href} onClick={() => setOpen(false)}>{text}</a>)}<WhatsAppLink label="menu-mobile" className="button button-primary">Agendar pelo WhatsApp <ArrowUpRight size={16} /></WhatsAppLink></nav></header>;
}
