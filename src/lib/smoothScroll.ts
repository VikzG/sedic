import Lenis from 'lenis';

// Une seule instance Lenis, attachée au conteneur de la page active (.page-slot).
let lenis: Lenis | null = null;

// Conteneur scrollable d'une page. Certaines sections réutilisent le même id
// (ex. la section « news » de l'accueil), d'où le ciblage explicite de .page-slot.
export function getPageSlot(pageId: string) {
  return document.querySelector<HTMLElement>(`.page-slot[id="${pageId}"]`);
}

export function mountSmoothScroll(wrapper: HTMLElement) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};

  const instance = new Lenis({
    wrapper,
    content: wrapper,
    // Molette captée partout (y compris au-dessus de la navbar fixe)
    eventsTarget: window,
    autoRaf: true,
    lerp: 0.1,
    // Laisse défiler les blocs scrollables internes (textes d'actualités, etc.)
    allowNestedScroll: true,
  });
  lenis = instance;

  return () => {
    instance.destroy();
    if (lenis === instance) lenis = null;
  };
}

// Défilement doux vers une position ou un élément de la page active.
export function scrollPageTo(slot: HTMLElement, target: number | HTMLElement) {
  if (lenis && lenis.rootElement === slot) {
    lenis.scrollTo(target);
    return;
  }
  if (typeof target === 'number') slot.scrollTo({ top: target, behavior: 'smooth' });
  else target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Raccourci utilisé par les boutons « Contact » : bas de la page active.
export function scrollPageToBottom(pageId: string) {
  const slot = getPageSlot(pageId);
  if (slot) scrollPageTo(slot, slot.scrollHeight);
}
