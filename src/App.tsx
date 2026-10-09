import { createContext, useContext, useEffect } from 'react';
import Navbar from './components/Navbar';
import PageTransition from './components/PageTransition';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Heronews from './sections/Heronews';
import HomePartners from './sections/HomePartners';
import { usePage } from './hooks/usePage';
import { getPageSlot, mountSmoothScroll } from './lib/smoothScroll';
import type { PageId } from './hooks/usePage';

interface NavContextValue {
  current: PageId;
  navigate: (id: PageId) => void;
}

export const NavContext = createContext<NavContextValue>({
  current: 'home',
  navigate: () => {},
});

export function useNav() {
  return useContext(NavContext);
}

const PAGES: { id: PageId; component: React.ReactNode; withFooter?: boolean }[] = [
  { id: 'home',      component: <Hero /> },
  { id: 'about',     component: <About /> },
  { id: 'projects',  component: <Projects /> },
  { id: 'partners',      component: <HomePartners /> },
  { id: 'news',      component: <Heronews /> },
];

export default function App() {
  const { state, navigate } = usePage();

  const current = state.current;

  // Scroll fluide (Lenis) sur la page active uniquement
  useEffect(() => {
    const slot = getPageSlot(current);
    if (!slot) return;
    return mountSmoothScroll(slot);
  }, [current]);

  return (
    <NavContext.Provider value={{ current: state.current, navigate }}>
      <Navbar />
      <div id="page-root">
        {PAGES.map(({ id, component }) => (
          <PageTransition
            key={id}
            id={id}
            isActive={state.current === id}
            direction={state.direction}
            transition={state.transition}
          >
            {component}
          </PageTransition>
        ))}
      </div>
    </NavContext.Provider>
  );
}
