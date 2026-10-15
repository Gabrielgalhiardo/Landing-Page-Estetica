// Identidade fictícia. Os canais ficam vazios até a personalização do modelo.
export const business = {
  name: 'Aurévyra Estética & Bem-estar',
  shortName: 'Aurévyra',
  phone: '',
  displayPhone: 'Contato a configurar',
  street: '',
  neighborhood: '',
  city: '',
  state: '',
  postalCode: '',
  instagram: '',
  maps: '',
  mapsEmbed: '',
  professional: { photo: '/images/espaco.webp', biography: '', education: '', philosophy: '' },
  differentiators: [] as { title: string; description: string }[],
  testimonials: [] as { name: string; quote: string; authorized: boolean }[],
};
export const site = {
  official: import.meta.env.VITE_OFFICIAL_SITE === 'true',
  url: (import.meta.env.VITE_SITE_URL || '').replace(/\/$/, ''),
  gaId: import.meta.env.VITE_GA_ID || '',
  showCredits: import.meta.env.VITE_SHOW_CREDITS === 'true',
};
