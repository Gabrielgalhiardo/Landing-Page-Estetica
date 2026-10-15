import { business } from '../data/business';
import { Eyebrow } from './UI';
export default function Testimonials() {
  const approved = business.testimonials.filter(t => t.authorized);
  if (!approved.length) return null;
  return <section className="section container" aria-labelledby="testimonials-title"><Eyebrow>EXPERIÊNCIAS REAIS</Eyebrow><h2 id="testimonials-title">Palavras de quem esteve aqui.</h2><div className="services-grid">{approved.map(t => <figure className="testimonial" key={t.name + t.quote}><blockquote>{t.quote}</blockquote><figcaption>{t.name}</figcaption></figure>)}</div></section>;
}
