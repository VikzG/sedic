import { useEffect, useRef, useState } from "react";
import { useNav } from "../App";

function useIsMobile(breakpoint = 1100) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, [breakpoint]);
  return isMobile;
}

const coconat: React.CSSProperties = { fontFamily: "Coconat, Georgia, serif" };
const commissioner: React.CSSProperties = {
  fontFamily: "Commissioner, sans-serif",
};

/* ══════════════════════════════════════════════════════════
   MOBILE
══════════════════════════════════════════════════════════ */
interface MobileNewsProps {
  compact?: boolean; // true → titre "ACTUALITÉS" visible, bouton masqué
}

function MobileNews({ compact = false }: MobileNewsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  const { navigate } = useNav();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTimeout(() => setTriggered(true), 400);
        }
      },
      { threshold: 0.25 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [triggered]);

  const FRAME_H = 260;

  return (
    <section
      ref={sectionRef}
      id="news"
      className="bg-white w-full overflow-hidden"
    >
      <div
        className="relative w-full"
        style={{ height: `${70 + FRAME_H}px`, overflow: "visible" }}
      >
        {/* Titre — toujours visible en mode compact, caché sinon */}
        <div
          className="absolute top-0 left-0 right-0 flex items-center justify-center"
          style={{
            zIndex: 1,
            height: "70px",
            // En mode normal (page d'accueil) le titre est décoratif/en fond
            // En mode compact (autre section) il est mis en avant
            opacity: compact ? 1 : 1,
          }}
        >
          <h2
            className="font-normal leading-none select-none text-center w-full"
            style={{
              ...coconat,
              fontSize: "clamp(48px, 15vw, 80px)",
              color: "#1e2d6b",
              letterSpacing: "0.03em",
              lineHeight: 1,
            }}
          >
            ACTUALITÉS
          </h2>
        </div>

        {/* Cadre bg_back */}
        <div
          className="absolute left-0 right-0 overflow-hidden"
          style={{ top: "70px", height: `${FRAME_H}px`, zIndex: 2 }}
        >
          <img
            src="/images/actu_bg_back.jpg"
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
              transform: triggered ? "translateY(0px)" : "translateY(80px)",
              transition: triggered
                ? "transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)"
                : "none",
              willChange: "transform",
            }}
          />
        </div>
      </div>

      {/* ── Caption block ── */}
      <div
        className="bg-white px-6 pt-8 pb-10 flex flex-col items-center text-center"
        style={{
          opacity: triggered ? 1 : 0,
          transform: triggered ? "translateY(0px)" : "translateY(40px)",
          transition: triggered
            ? "opacity 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s"
            : "none",
        }}
      >
        <p
          className="text-[#1e2d6b] uppercase mb-5"
          style={{
            ...coconat,
            fontSize: "15px",
            fontWeight: 400,
            lineHeight: "1.05",
            letterSpacing: "0.08em",
          }}
        >
          Avril 2026
        </p>

        <h3
          className="font-normal text-[#1a1a1a] mb-5"
          style={{
            ...coconat,
            fontSize: "clamp(22px, 6vw, 30px)",
            fontWeight: 400,
            lineHeight: "1.1",
            letterSpacing: "-0.02em",
          }}
        >
          Cérémonie d'ouverture du{" "}
          <span className="text-[#1e2d6b]">Musée National</span>
        </h3>

        <p
          className="text-black mb-7"
          style={{
            ...commissioner,
            fontSize: "14.5px",
            fontWeight: 400,
            lineHeight: "1.55",
            letterSpacing: "0",
            maxWidth: "340px",
          }}
        >
          La SEDIC a marqué une étape importante avec la cérémonie d'ouverture
          du Musée national, un projet structurant dédié à la valorisation du
          patrimoine culturel et historique du Congo.
        </p>

        {/* Bouton — masqué en mode compact */}
        {!compact && (
          <button
            onClick={() => navigate("news")}
            className="w-full py-3 rounded-xl bg-[#223078] text-white hover:bg-white hover:text-[#223078] border border-[#223078] transition-all duration-300"
            style={{
              ...coconat,
              fontSize: "16px",
              lineHeight: "1",
              letterSpacing: "-0.01em",
              maxWidth: "340px",
            }}
          >
            Lire les actualités
          </button>
        )}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   DESKTOP — code original inchangé
══════════════════════════════════════════════════════════ */
function DesktopNews() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  const { navigate } = useNav();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTimeout(() => setTriggered(true), 1500);
        }
      },
      { threshold: 0.6 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [triggered]);

  return (
    <section
      id="news"
      style={{ minHeight: "1000px" }}
      className="bg-white"
      ref={sectionRef}
    >
      <div className="relative w-full overflow-hidden">
        <div
          className="relative flex items-center justify-center"
          style={{ zIndex: 1, paddingTop: "40px", paddingBottom: "40px" }}
        >
          <h2
            className="font-normal leading-none select-none text-center"
            style={{
              fontSize: "180px",
              fontFamily: "Coconat, Georgia, serif",
              color: "#1e2d6b",
              letterSpacing: "0.03em",
            }}
          >
            ACTUALITÉS
          </h2>
        </div>

        <div
          style={{
            position: "relative",
            width: "1200px",
            height: "360px",
            margin: "0 auto",
            zIndex: 2,
          }}
        >
          <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
            <img
              src="/images/actu_bg_back.jpg"
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
                transform: triggered ? "translateY(0px)" : "translateY(150px)",
                transition: triggered
                  ? "transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)"
                  : "none",
                willChange: "transform",
              }}
            />
          </div>

          <img
            src="/images/actu_bg_front.png"
            alt=""
            className="pointer-events-none"
            style={{
              position: "absolute",
              bottom: 0,
              left: "598.5px",
              width: "858px",
              height: "auto",
              display: "block",
              zIndex: 10,
              transform: triggered
                ? "translateX(-50%) translateY(-160px)"
                : "translateX(-50%) translateY(-10px)",
              transition: triggered
                ? "transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)"
                : "none",
              willChange: "transform",
            }}
          />
        </div>
      </div>

      <div
        className="bg-white px-8 md:px-16 py-10"
        style={{
          opacity: triggered ? 1 : 0,
          transform: triggered ? "translateY(0px)" : "translateY(150px)",
          transition: triggered
            ? "opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1), transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)"
            : "none",
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <span
            className="text-[#1e2d6b] uppercase"
            style={{
              fontFamily: "Coconat, Georgia, serif",
              fontSize: "20.5px",
              fontWeight: 400,
              lineHeight: "1.05",
              letterSpacing: "0.02em",
            }}
          >
            AVRIL
          </span>

          <div className="flex-1 text-center px-0 md:px-12">
            <h3
              className="font-normal text-[#1a1a1a] mb-6 text-center"
              style={{
                fontFamily: "Coconat, Georgia, serif",
                fontSize: "clamp(24px, 3vw, 38px)",
                fontWeight: 400,
                lineHeight: "1",
                letterSpacing: "-0.02em",
              }}
            >
              Cérémonie d&apos;ouverture du{" "}
              <span className="text-[#1e2d6b]">Musée National</span>
            </h3>
            <p
              className="max-w-3xl mx-auto mb-6 text-center text-black"
              style={{
                fontFamily: "Commissioner, sans-serif",
                fontSize: "15px",
                fontWeight: 400,
                lineHeight: "1.3",
                letterSpacing: "0",
              }}
            >
              La SEDIC a marqué une étape importante avec la cérémonie
              d&apos;ouverture du Musée national, un projet structurant dédié à
              la valorisation du patrimoine culturel et historique du Congo.
            </p>
            <button
              onClick={() => navigate("news")}
              className="px-6 py-3 border border-[#223078] rounded-xl bg-[#223078] text-white hover:bg-white hover:text-[#223078] transition-all duration-300"
              style={{
                fontFamily: "Coconat, Georgia, serif",
                fontSize: "18px",
                lineHeight: "1",
                letterSpacing: "-0.02em",
              }}
            >
              Lire les actualités
            </button>
          </div>

          <span
            className="text-[#1e2d6b] uppercase self-start md:self-auto"
            style={{
              fontFamily: "Coconat, Georgia, serif",
              fontSize: "20.5px",
              fontWeight: 400,
              lineHeight: "1.05",
              letterSpacing: "0.02em",
            }}
          >
            2026
          </span>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   Export
══════════════════════════════════════════════════════════ */
interface NewsProps {
  compact?: boolean;
}

export default function News({ compact = false }: NewsProps) {
  const isMobile = useIsMobile();
  return isMobile ? <MobileNews compact={compact} /> : <DesktopNews />;
}