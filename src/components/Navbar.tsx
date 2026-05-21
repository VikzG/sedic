import { useState, useEffect } from 'react';
import { useNav } from '../App';
import type { PageId } from '../hooks/usePage';

const NAV_LINKS: { label: string; page: PageId }[] = [
  { label: 'À PROPOS',    page: 'about' },
  { label: 'PROJETS',     page: 'projects' },
  { label: 'PARTENAIRES', page: 'partners' },
  { label: 'ACTUALITÉS',  page: 'news' },
];

const navLinkStyle: React.CSSProperties = {
  fontFamily: 'Coconat, Georgia, serif',
  fontWeight: 400,
  fontSize: '13.5px',
  letterSpacing: '0.08em',
};

/* ── Hook isMobile ── */
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [breakpoint]);
  return isMobile;
}

/* ── Burger icon (3 lignes) ── */
function BurgerIcon({ open }: { open: boolean }) {
  return (
    <div className="flex flex-col justify-center items-end gap-[5px] w-6 h-6 cursor-pointer">
      <span
        style={{
          display: 'block',
          height: '1.5px',
          backgroundColor: '#223078',
          borderRadius: '2px',
          width: open ? '100%' : '100%',
          transform: open ? 'translateY(6.5px) rotate(45deg)' : 'none',
          transition: 'transform 0.25s ease, width 0.25s ease',
        }}
      />
      <span
        style={{
          display: 'block',
          height: '1.5px',
          backgroundColor: '#223078',
          borderRadius: '2px',
          width: '75%',
          opacity: open ? 0 : 1,
          transition: 'opacity 0.2s ease',
        }}
      />
      <span
        style={{
          display: 'block',
          height: '1.5px',
          backgroundColor: '#223078',
          borderRadius: '2px',
          width: '100%',
          transform: open ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
          transition: 'transform 0.25s ease',
        }}
      />
    </div>
  );
}

export default function Navbar() {
  const { current, navigate } = useNav();
  const isMobile = useIsMobile();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);

  /* Close menu on page change */
  useEffect(() => setMenuOpen(false), [current]);

  useEffect(() => {
    const onScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      setScrolled(target.scrollTop > 10);
    };
    const slot = document.getElementById(current);
    if (slot) {
      slot.addEventListener('scroll', onScroll, { passive: true });
      setScrolled(slot.scrollTop > 10);
    }
    return () => { if (slot) slot.removeEventListener('scroll', onScroll); };
  }, [current]);

  /* ════════════════════════════════════════
     MOBILE
  ════════════════════════════════════════ */
  if (isMobile) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50">

        {/* Top bar — toujours blanc sur mobile */}
        <div
          className="flex items-center justify-between px-5 h-16"
          style={{ backgroundColor: '#fff' }}
        >
          {/* Logo */}
          <button
            onClick={() => navigate('home')}
            className="relative flex items-center flex-shrink-0 h-8 cursor-pointer"
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
            aria-label="Accueil"
          >
            <img
              src="/logos/logo_nav.svg"
              alt="Logo"
              className="h-10 w-auto absolute top-0 left-0 transition-opacity duration-300"
              style={{ opacity: logoHovered ? 0 : 1 }}
            />
            <img
              src="/logos/logo_nav_hover.svg"
              alt="Logo"
              className="h-10 w-auto transition-opacity duration-300"
              style={{ opacity: logoHovered ? 1 : 0 }}
            />
          </button>

          {/* Burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            className="p-1"
          >
            <BurgerIcon open={menuOpen} />
          </button>
        </div>

        {/* Drawer — liens alignés à droite, fond transparent sur le hero */}
        <div
          style={{
            backgroundColor: '#fff',
            overflow: 'hidden',
            maxHeight: menuOpen ? '320px' : '0px',
            transition: 'max-height 0.35s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <nav className="flex flex-col items-end px-6 pt-2 pb-6 gap-5">
            {NAV_LINKS.map((link) => (
              <button
                key={link.page}
                onClick={() => { navigate(link.page); setMenuOpen(false); }}
                className="transition-all duration-200"
                style={{
                  ...navLinkStyle,
                  color: current === link.page ? '#8fa3d4' : '#223078',
                  textAlign: 'right',
                }}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

      </header>
    );
  }

  /* ════════════════════════════════════════
     DESKTOP (code original)
  ════════════════════════════════════════ */
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/10 backdrop-blur-md border-b border-corpo-blue/10 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto px-20 h-20 flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => navigate('home')}
          className="relative flex items-center flex-shrink-0 h-8 cursor-pointer"
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
          aria-label="Accueil"
        >
          <img
            src="/logos/logo_nav.svg"
            alt="Logo"
            className="h-12 w-auto absolute top-0 left-0 transition-opacity duration-300 ease-in-out"
            style={{ opacity: logoHovered ? 0 : 1 }}
          />
          <img
            src="/logos/logo_nav_hover.svg"
            alt="Logo"
            className="h-12 w-auto transition-opacity duration-300 ease-in-out"
            style={{ opacity: logoHovered ? 1 : 0 }}
          />
        </button>

        {/* Desktop nav */}
        <nav className="flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.page}
              onClick={() => navigate(link.page)}
              className={`text-corpo-blue hover:text-grey-blue hover:translate-y-0.5 transition-all duration-200 ${
                current === link.page ? 'opacity-50' : ''
              }`}
              style={navLinkStyle}
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={() => navigate('contact')}
            aria-label="Contact"
            className="ml-1 hover:translate-y-0.5 transition-all duration-200 group"
          >
            <img
              src="/logos/contact.svg"
              alt="Contact"
              className="h-5 w-auto transition-all duration-200 group-hover:[filter:invert(69%)_sepia(25%)_saturate(500%)_hue-rotate(186deg)_brightness(100%)_contrast(90%)]"
            />
          </button>
        </nav>

      </div>
    </header>
  );
}