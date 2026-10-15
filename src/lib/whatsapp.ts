import { business } from '../data/business';
export function whatsappUrl(message = 'Olá! Vim pelo site da Aurévyra e gostaria de conhecer os cuidados disponíveis.') {
  if (!business.phone) return '#contato';
  return `https://wa.me/${business.phone}?text=${encodeURIComponent(message)}`;
}
