import { business } from '../data/business';
import { Eyebrow } from './UI';
import { MessageCircle, Sparkles, CalendarCheck2 } from 'lucide-react';
export default function Differentials() {
  if (!business.differentiators.length) return <section className="care-strip" aria-label="Como entrar em contato"><div className="container care-strip-inner"><span className="care-intro" data-motion="rise">Seu próximo passo,<br /><em>com tranquilidade.</em></span>{[{ Icon: MessageCircle, title: 'Conte o que você procura', desc: 'Compartilhe suas dúvidas pelo WhatsApp.' }, { Icon: Sparkles, title: 'Conheça as possibilidades', desc: 'Consulte serviços, valores e disponibilidade.' }, { Icon: CalendarCheck2, title: 'Combine seu atendimento', desc: 'Confirme o agendamento com a empresa.' }].map(({ Icon, title, desc }, i) => <div className="care-step" data-motion="rise" data-motion-order={i} key={title}><span aria-hidden="true"><Icon size={20} strokeWidth={1.4} /></span><h3>{title}</h3><p>{desc}</p></div>)}</div></section>;
  return <section className="section container"><Eyebrow>NOSSOS DIFERENCIAIS</Eyebrow><h2>O cuidado em cada detalhe.</h2><div className="services-grid">{business.differentiators.map(d => <article key={d.title}><h3>{d.title}</h3><p>{d.description}</p></article>)}</div></section>;
}
