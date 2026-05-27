import { useEffect, useRef, useState } from "react";
import { useNav } from "../App";

const coconat: React.CSSProperties = { fontFamily: "Coconat, Georgia, serif" };
const commissioner: React.CSSProperties = {
  fontFamily: "Commissioner, sans-serif",
};

const CARDS = [
  {
    icon: "/images/icons_details_cards/card_1.svg",
    label: "INVESTISSEMENT &\nCO-INVESTISSEMENT",
  },
  {
    icon: "/images/icons_details_cards/card_2.svg",
    label: "DÉVELOPPEMENT\nIMMOBILIER",
  },
  {
    icon: "/images/icons_details_cards/card_3.svg",
    label: "EXPLOITATION HÔTELIÈRE\n& COMMERCIALE",
  },
  { icon: "/images/icons_details_cards/card_4.svg", label: "GESTION D'ACTIFS" },
  {
    icon: "/images/icons_details_cards/card_5.svg",
    label: "FORMATION &\nDÉVELOPPEMENT DES\nCOMPÉTENCES",
  },
  {
    icon: "/images/icons_details_cards/card_6.svg",
    label: "CULTURE & INDUSTRIES\nCRÉATIVES",
  },
];

function useIsMobile(breakpoint = 1200) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, [breakpoint]);
  return isMobile;
}

/* ══════════════════════════════════════════════════════════
   MOBILE
══════════════════════════════════════════════════════════ */
function MobileDetails() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);
  const { current } = useNav();
  const touchStartX = useRef(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const goTo = (i: number) =>
    setActive(Math.max(0, Math.min(CARDS.length - 1, i)));

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? active + 1 : active - 1);
  };

  return (
    /* Un seul conteneur — bg image unique couvre toute la section */
    <div
      ref={sectionRef}
      className="relative w-full flex flex-col overflow-hidden py-4"
    >
      {/* ── Background image unique ── */}
      <img
        src="/images/bg_details.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
      />

      {/* ── Bloc texte haut ── */}
      <div
        className="relative z-10 w-full flex flex-col items-center text-center px-6 pt-12 pb-4"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        <p
          className="uppercase text-[#1e2d6b] mb-3"
          style={{
            ...coconat,
            fontSize: "16px",
            letterSpacing: "0.15em",
            lineHeight: "1.05",
            fontWeight: 400,
          }}
        >
          Partenariats
        </p>

        <h2
          className="font-normal text-black mb-6"
          style={{
            ...coconat,
            fontSize: "clamp(26px, 7vw, 26px)",
            lineHeight: "1.1",
            letterSpacing: "-0.02em",
          }}
        >
          Construire{" "}
          <em
            style={{
              fontFamily: "'Charis SIL', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 700,
              color: "#1e2d6b",
            }}
          >
            ensemble
          </em>
          <br />
          les infrastructures de{" "}
          <em
            style={{
              fontFamily: "'Charis SIL', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 700,
              color: "#1e2d6b",
            }}
          >
            demain.
          </em>
        </h2>

        <p
          style={{
            ...commissioner,
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "1.55",
            color: "#222",
            textAlign: "center",
          }}
        >
          La SEDIC place la collaboration au cœur de son action. Nous
          travaillons avec des partenaires publics et privés pour concevoir,
          financer, développer et exploiter des projets structurants en RDC.
          Forte d'une expertise intégrée sur l'ensemble du cycle de projet, la
          SEDIC est votre interlocuteur privilégié pour développer des
          opportunités durables et créatrices de valeur.
        </p>
      </div>

      {/* ── Swiper cards ── */}
      <div
        className="relative z-10 w-full flex flex-col items-center"
        style={{ minHeight: "320px" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full" style={{ height: "320px" }}>
          {CARDS.map((card, i) => {
            const offset = i - active;
            const isCenter = offset === 0;
            const isAdjacent = Math.abs(offset) === 1;
            const translateX = offset * 52;
            const scale = isCenter ? 1 : 0.8;
            const opacity = Math.abs(offset) > 1.5 ? 0 : isCenter ? 1 : 0.55;
            const zIndex = isCenter ? 10 : isAdjacent ? 5 : 0;

            return (
              <div
                key={card.label}
                onClick={() => !isCenter && goTo(i)}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "58vw",
                  maxWidth: "220px",
                  height: "260px",
                  borderRadius: "10px",
                  overflow: "hidden",
                  cursor: isCenter ? "default" : "pointer",
                  transform: `translateX(calc(-50% + ${translateX}vw)) translateY(-50%) scale(${scale})`,
                  opacity,
                  zIndex,
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "2px solid white",
                  transition:
                    "transform 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.45s ease",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "24px 16px",
                }}
              >
                <img
                  src={card.icon}
                  alt=""
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "contain",
                    marginBottom: "16px",
                  }}
                />
                <p
                  style={{
                    ...coconat,
                    fontSize: "13px",
                    fontWeight: 400,
                    letterSpacing: "0.08em",
                    lineHeight: "1.2",
                    color: "#fff",
                    whiteSpace: "pre-line",
                    textTransform: "uppercase",
                    textAlign: "center",
                  }}
                >
                  {card.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Bas — texte + bouton ── */}
      <div
        className="relative z-10 w-full flex flex-col items-center px-6 pt-4 pb-10"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.8s ease 0.3s",
        }}
      >
        <p
          style={{
            fontFamily: "'Charis SIL', Georgia, serif",
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: "15px",
            color: "#B3C2E9",
            lineHeight: "1.4",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Nous recherchons des partenariats solides…
        </p>

        <button
          onClick={() => {
            document.getElementById(current)?.scrollTo({
              top: document.getElementById(current)!.scrollHeight,
              behavior: "smooth",
            });
          }}
          className="w-full py-2 rounded-xl bg-[#223078] text-[#E4E4E0] hover:bg-[#E4E4E0] hover:text-[#223078] transition-all duration-300"
          style={{
            ...coconat,
            fontSize: "16px",
            lineHeight: "1",
            letterSpacing: "-0.01em",
            maxWidth: "340px",
          }}
        >
          Devenir partenaire
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   DESKTOP — code original
══════════════════════════════════════════════════════════ */
function DesktopDetails() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { current } = useNav();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) setVisible(true);
      },
      { threshold: 0.7 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-start overflow-hidden"
      style={{ minHeight: "80vh" }}
    >
      <img
        src="/images/bg_details.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(200,215,235,0.45) 0%, transparent 45%)",
        }}
      />

      <div
        className="relative z-10 flex flex-col items-center pt-20 px-8 text-center w-full"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0px)" : "translateY(30px)",
          transition:
            "opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1), transform 1.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <h2 className="mb-8" style={{ lineHeight: 1 }}>
          <em
            style={{
              fontFamily: "'Charis SIL', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: "38px",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: "#ffffff",
              display: "block",
            }}
          >
            Nous recherchons
          </em>
          <span
            style={{
              ...coconat,
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "38px",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: "#ffffff",
              display: "block",
            }}
          >
            des partenariats solides.
          </span>
        </h2>
        
        <button
          onClick={() => {
            document.getElementById(current)?.scrollTo({
              top: document.getElementById(current)!.scrollHeight,
              behavior: "smooth",
            });
          }}
          className="group px-32 py-3 rounded-xl bg-[#223078] text-[#E4E4E0] hover:bg-[#E4E4E0] hover:text-[#223078] transition-all duration-300"
          style={{
            ...coconat,
            fontSize: "18px",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            marginBottom: "56px",
          }}
        >
          Devenir partenaire
        </button>

        <div className="grid grid-cols-3 gap-5 w-full pb-20 px-8">
          {CARDS.map((card) => (
            <div
              key={card.label}
              className="flex flex-col items-center justify-center text-center px-2 py-20 rounded-lg cursor-pointer transition-all duration-300"
              style={{
                background: "rgba(34, 48, 150, 0.12)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "2px solid white",
              }}
            >
              <img
                src={card.icon}
                alt=""
                className="mb-5 select-none"
                style={{ width: "70px", height: "70px", objectFit: "contain" }}
              />
              <p
                style={{
                  ...coconat,
                  fontSize: "20.5px",
                  fontWeight: 400,
                  letterSpacing: "0.02em",
                  lineHeight: "1.05",
                  color: "#ffffff",
                  whiteSpace: "pre-line",
                  textTransform: "uppercase",
                }}
              >
                {card.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   Export
══════════════════════════════════════════════════════════ */
export default function Details() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileDetails /> : <DesktopDetails />;
}
