import { useEffect } from 'react';

/** Anima uma vez por seção, preservando conteúdo estático e foco por teclado. */
export function useMotion() {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const root = document.documentElement;
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-motion]'));
    let observer: IntersectionObserver | undefined;
    const show = (element: HTMLElement, immediate = false) => {
      if (immediate) element.classList.add('motion-immediate');
      element.classList.remove('motion-pending');
      element.classList.add('motion-visible');
      observer?.unobserve(element);
    };
    const disable = () => {
      observer?.disconnect();
      delete root.dataset.motionReady;
      elements.forEach(element => show(element, true));
    };
    const initialize = () => {
      if (preference.matches || !('IntersectionObserver' in window)) {
        disable();
        return;
      }
      root.dataset.motionReady = 'true';
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) show(entry.target as HTMLElement);
        });
      }, { threshold: 0.06, rootMargin: '0px 0px -6% 0px' });
      elements.forEach(element => {
        const bounds = element.getBoundingClientRect();
        // O conteúdo já visível nunca é escondido para começar uma animação.
        if (bounds.top < window.innerHeight && bounds.bottom > 0) show(element, true);
        else {
          element.classList.add('motion-pending');
          observer!.observe(element);
        }
      });
    };
    const revealFocus = (event: FocusEvent) => {
      // O foco por ponteiro não deve interromper o movimento entre pressionar e soltar.
      // A revelação imediata fica reservada à navegação por teclado.
      if (!(event.target instanceof HTMLElement) || !event.target.matches(':focus-visible')) return;
      let element: HTMLElement | null = event.target;
      while (element) {
        if (element.hasAttribute('data-motion')) show(element, true);
        element = element.parentElement;
      }
    };
    const revealAnchor = () => {
      if (!location.hash) return;
      try {
        const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
        if (target?.hasAttribute('data-motion')) show(target, true);
        target?.querySelectorAll<HTMLElement>('[data-motion]').forEach(element => show(element, true));
      } catch { /* Âncoras inválidas não afetam a navegação. */ }
    };
    initialize();
    revealAnchor();
    preference.addEventListener('change', disable);
    document.addEventListener('focusin', revealFocus);
    window.addEventListener('hashchange', revealAnchor);
    return () => {
      observer?.disconnect();
      delete root.dataset.motionReady;
      elements.forEach(element => {
        element.classList.remove('motion-pending', 'motion-visible', 'motion-immediate');
      });
      preference.removeEventListener('change', disable);
      document.removeEventListener('focusin', revealFocus);
      window.removeEventListener('hashchange', revealAnchor);
    };
  }, []);
}
