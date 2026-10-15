import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Differentials from './components/Differentials';
import Testimonials from './components/Testimonials';
import Location from './components/Location';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Privacy from './components/Privacy';
import ContactDialog from './components/ContactDialog';
import { useMotion } from './hooks/useMotion';
export default function App() {
  useMotion();
  const [privacyOpen, setPrivacyOpen] = useState(false);
  return <><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><Header /><main id="conteudo"><Hero /><div className="hero-divider container"><span>ESTÉTICA QUE ACOLHE VOCÊ</span><span className="divider-flower">✳</span><span>UM CONVITE AO AUTOCUIDADO</span></div><Services /><About /><Differentials /><Testimonials /><Location /><FAQ /><CTA /></main><Footer onPrivacy={() => setPrivacyOpen(true)} /><WhatsAppButton /><ContactDialog /><Privacy open={privacyOpen} onClose={() => setPrivacyOpen(false)} /></>;
}
