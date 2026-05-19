import { createContext, useContext } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import Hero from './sections/Hero';
import About from './sections/About';
import Mission from './sections/Mission';
import Projects from './sections/Projects';
import Partners from './sections/Partners';
import News from './sections/News';
import Contact from './sections/Contact';
import { usePage, PAGE_ORDER } from './hooks/usePage';
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
  { id: 'mission',   component: <Mission /> },
  { id: 'projects',  component: <Projects /> },
  { id: 'news',      component: <News /> },
  { id: 'contact',   component: <Contact />, withFooter: true },
];

export default function App() {
  const { state, navigate } = usePage();

  return (
    <NavContext.Provider value={{ current: state.current, navigate }}>
      <Navbar />

      <div id="page-root">
        {PAGES.map(({ id, component, withFooter }) => (
          <PageTransition
            key={id}
            id={id}
            isActive={state.current === id}
            direction={state.direction}
            transition={state.transition}
          >
            {component}
            {withFooter && <Footer />}
          </PageTransition>
        ))}
      </div>
    </NavContext.Provider>
  );
}
