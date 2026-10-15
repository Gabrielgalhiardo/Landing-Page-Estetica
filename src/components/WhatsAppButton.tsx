import WhatsAppIcon from './WhatsAppIcon';
import { WhatsAppLink } from './UI';
export default function WhatsAppButton() { return <WhatsAppLink label="flutuante" className="floating-whatsapp"><WhatsAppIcon size={28} green /><span className="sr-only">Conversar com a Aurévyra pelo WhatsApp</span><span className="floating-tooltip">Vamos conversar?</span></WhatsAppLink>; }
