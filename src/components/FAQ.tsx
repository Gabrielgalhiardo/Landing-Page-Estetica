import { Plus } from 'lucide-react';
import { Eyebrow, WhatsAppLink } from './UI';
export const faqs = [
  ['Como funciona o agendamento?', 'Neste modelo, os botões mostram uma prévia do contato. Ao personalizar o site com um número de WhatsApp, eles passam a abrir uma conversa para consultar horários e combinar o atendimento.'],
  ['Quais cuidados posso conhecer?', 'Limpeza de pele, rituais faciais e cuidados com acne ilustram as possibilidades deste modelo. A disponibilidade e a indicação de cada cuidado devem ser confirmadas com a equipe responsável.'],
  ['Como consultar valores e informações?', 'Os valores, a duração e as condições de atendimento podem ser apresentados pelo canal de contato após sua configuração. Nenhuma reserva ou cobrança é realizada por esta página.'],
  ['Onde fica a Aurévyra?', 'Aurévyra é uma marca fictícia criada para este projeto. O mapa é uma composição decorativa; nenhum endereço real está associado ao modelo.'],
];
export default function FAQ() { return <section id="duvidas" className="section faq" aria-labelledby="faq-title"><div className="container faq-grid"><div data-motion="rise"><Eyebrow>ANTES DO SEU PRIMEIRO CUIDADO</Eyebrow><h2 id="faq-title">Uma conversa<br />resolve <em>suas dúvidas.</em></h2><p>Reunimos algumas informações para facilitar seu primeiro contato.</p><WhatsAppLink label="faq" className="text-link">Ainda tenho uma dúvida <Plus size={16} /></WhatsAppLink></div><div className="faq-list" data-motion="rise" data-motion-order="1">{faqs.map(([q, a]) => <details key={q}><summary>{q}<Plus size={20} aria-hidden="true" /></summary><p>{a}</p></details>)}</div></div></section>; }
