import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
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

export default function Navbar() {
  const { current, navigate } = useNav();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);

  useEffect(() => {
    const onScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      setScrolled(target.scrollTop > 10);
    };

    // listen on the active page slot instead of window
    const slot = document.getElementById(current);
    if (slot) {
      slot.addEventListener('scroll', onScroll, { passive: true });
      setScrolled(slot.scrollTop > 10);
    }
    return () => {
      if (slot) slot.removeEventListener('scroll', onScroll);
    };
  }, [current]);

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
        <nav className="hidden md:flex items-center gap-8">
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

        {/* Mobile burger */}
        <button
          className="md:hidden text-corpo-blue p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-96 border-t border-corpo-blue/10' : 'max-h-0'
        } bg-white/90 backdrop-blur-md`}
      >
        <nav className="flex flex-col px-6 py-4 gap-5">
          {NAV_LINKS.map((link) => (
            <button
              key={link.page}
              onClick={() => { navigate(link.page); setMenuOpen(false); }}
              className={`text-left text-corpo-blue hover:text-grey-blue hover:translate-y-0.5 transition-all duration-200 ${
                current === link.page ? 'opacity-50' : ''
              }`}
              style={navLinkStyle}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => { navigate('contact'); setMenuOpen(false); }}
            className="flex items-center gap-2 group hover:translate-y-0.5 transition-all duration-200"
          >
            <img
              src="/logos/contact.svg"
              alt="Contact"
              className="h-4 w-auto transition-all duration-200 group-hover:[filter:invert(69%)_sepia(25%)_saturate(500%)_hue-rotate(186deg)_brightness(100%)_contrast(90%)]"
            />
            <span className="text-corpo-blue group-hover:text-grey-blue transition-colors duration-200" style={navLinkStyle}>
              CONTACT
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
}
