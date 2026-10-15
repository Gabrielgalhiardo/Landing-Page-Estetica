export default function WhatsAppIcon({ size = 20, green = false }: { size?: number; green?: boolean }) {
  return <img src={`/images/whatsapp-${green ? 'green' : 'white'}.svg`} width={size} height={size} style={{ width: size, height: size }} alt="" aria-hidden="true" className="whatsapp-icon" />;
}
