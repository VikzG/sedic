import { useState, useEffect } from "react";
import { useNav } from "../App";
import type { PageId } from "../hooks/usePage";

const NAV_LINKS: { label: string; page: PageId }[] = [
  { label: "À PROPOS", page: "about" },
  { label: "PROJETS", page: "projects" },
  { label: "PARTENAIRES", page: "partners" },
  { label: "ACTUALITÉS", page: "news" },
];

const navLinkStyle: React.CSSProperties = {
  fontFamily: "Coconat, Georgia, serif",
  fontWeight: 400,
  fontSize: "13.5px",
  letterSpacing: "0.08em",
};

/*
  ─── Logos ───────────────────────────────────────────────
  Pour changer le logo mobile, modifiez uniquement ces deux
  constantes — le reste du composant n'a pas besoin de changer.
*/
const LOGO_MOBILE = "/logos/logo_nav_mob.svg";

/* Logo desktop (inchangé) */
const LOGO_DESKTOP = "/logos/logo_nav.svg";
const LOGO_DESKTOP_HOVER = "/logos/logo_nav_hover.svg";
const LOGO_DESKTOP_WHITE = "/logos/logo_nav_white.svg";
/* ──────────────────────────────────────────────────────── */

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);
  return isMobile;
}

function BurgerIcon({ open }: { open: boolean }) {
  const lineStyle: React.CSSProperties = {
    display: "block",
    width: "24px",
    height: "2px",
    backgroundColor: "#223078",
    borderRadius: "999px",
    transition: "transform 0.25s ease, opacity 0.2s ease",
    transformOrigin: "center",
    willChange: "transform",
  };

  return (
    <div className="flex flex-col justify-center gap-[5px] w-6 h-6 cursor-pointer">
      <span
        style={{
          ...lineStyle,
          transform: open ? "translateY(7px) rotate(45deg)" : "translateY(0)",
        }}
      />

      <span
        style={{
          ...lineStyle,
          opacity: open ? 0 : 0.92,
        }}
      />

      <span
        style={{
          ...lineStyle,
          transform: open ? "translateY(-7px) rotate(-45deg)" : "translateY(0)",
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
  const [visible, setVisible] = useState(false);

  useEffect(() => setMenuOpen(false), [current]);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(true);
    }, 3400); // 2400ms loader + 500ms

    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      setScrolled(target.scrollTop > 10);
    };
    const slot = document.getElementById(current);
    if (slot) {
      slot.addEventListener("scroll", onScroll, { passive: true });
      setScrolled(slot.scrollTop > 10);
    }
    return () => {
      if (slot) slot.removeEventListener("scroll", onScroll);
    };
  }, [current]);

  /* ════════════════════════════════════════
     MOBILE
  ════════════════════════════════════════ */
  if (isMobile) {
    return (
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-12px)",
          transition: "opacity .6s ease, transform .6s ease",
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        <div
          className="flex items-center justify-between px-5 h-16"
          style={{ backgroundColor: "#fff" }}
        >
          {/* Logo mobile — pas de hover, pas de absolute */}
          <button
            onClick={() => navigate("home")}
            className="flex items-center flex-shrink-0 cursor-pointer"
            aria-label="Accueil"
          >
            <img src={LOGO_MOBILE} alt="Logo" className="h-10 w-auto" />
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            className="p-1"
          >
            <BurgerIcon open={menuOpen} />
          </button>
        </div>

        <div
          style={{
            backgroundColor: "#fff",
            overflow: "hidden",
            maxHeight: menuOpen ? "320px" : "0px",
            transition: "max-height 0.35s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <nav className="flex flex-col items-end px-6 pt-2 pb-6 gap-5">
            {NAV_LINKS.map((link) => (
              <button
                key={link.page}
                onClick={() => {
                  navigate(link.page);
                  setMenuOpen(false);
                }}
                className="transition-all duration-200"
                style={{
                  ...navLinkStyle,
                  color: current === link.page ? "#8fa3d4" : "#223078",
                  textAlign: "right",
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
     DESKTOP
  ════════════════════════════════════════ */
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/10 backdrop-blur-md border-b border-corpo-blue/10 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-12px)",
        transition: "opacity .6s ease, transform .6s ease",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div className="mx-auto px-20 h-20 flex items-center justify-between">
        {/* Logo desktop */}
        <button
          onClick={() => navigate("home")}
          className="relative flex items-center flex-shrink-0 h-8 cursor-pointer"
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
          aria-label="Accueil"
        >
          {/* Logo blanc sur hero */}
          <img
            src={LOGO_DESKTOP_WHITE}
            alt="Logo"
            className="h-12 w-auto absolute top-0 left-0 transition-opacity duration-300 ease-in-out"
            style={{
              opacity: current === "home" && !scrolled && !logoHovered ? 1 : 0,
            }}
          />

          {/* Logo normal */}
          <img
            src={LOGO_DESKTOP}
            alt="Logo"
            className="h-12 w-auto absolute top-0 left-0 transition-opacity duration-300 ease-in-out"
            style={{
              opacity:
                current === "home" && !scrolled ? 0 : logoHovered ? 0 : 1,
            }}
          />

          {/* Logo hover */}
          <img
            src={LOGO_DESKTOP_HOVER}
            alt="Logo"
            className="h-12 w-auto transition-opacity duration-300 ease-in-out"
            style={{
              opacity: logoHovered ? 1 : 0,
            }}
          />
        </button>

        <nav className="flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.page}
              onClick={() => navigate(link.page)}
              className={`hover:translate-y-0.5 transition-all duration-200 ${
                current === link.page ? "opacity-50" : ""
              }`}
              style={{
                ...navLinkStyle,
                color: current === "home" && !scrolled ? "#ffffff" : "#223078",
              }}
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={() => {
              const slot = document.getElementById(current);
              if (slot)
                slot.scrollTo({ top: slot.scrollHeight, behavior: "smooth" });
            }}
            aria-label="Contact"
            className="ml-1 hover:translate-y-0.5 transition-all duration-200 group"
          >
            <img
              src="/logos/contact.svg"
              alt="Contact"
              className={`h-5 w-auto transition-all duration-200 ${
                current === "home" && !scrolled ? "brightness-0 invert" : ""
              }`}
            />
          </button>
        </nav>
      </div>
    </header>
  );
}
