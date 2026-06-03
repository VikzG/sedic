import { useRef, useEffect, useState } from "react";
import { useNav } from "../App";
import Gouvernance from "./Gouvernance";
import DirectionGenerale from "./DirectionGenerale";
import Contacform from "./Contactform";

const coconat: React.CSSProperties = { fontFamily: "Coconat, Georgia, serif" };
const commissioner: React.CSSProperties = {
  fontFamily: "Commissioner, sans-serif",
};

const values = [
  {
    label: "Engagement",
    image: "/images/about_page/about_hero_1.webp",
    texte:
      "Concevoir des projets à fort impact économique et social, contribuant directement à l'amélioration du cadre de vie des populations.",
  },
  {
    label: "Excellence",
    image: "/images/about_page/about_hero_2.webp",
    texte:
      "Garantir des standards élevés dans la conception, la gestion et la valorisation des infrastructures afin d'offrir des espaces modernes, sûrs et performants.",
  },
  {
    label: "Innovation",
    image: "/images/about_page/about_hero_3.webp",
    texte:
      "Encourager des solutions modernes et adaptées dans la construction, la gestion et l'exploitation des infrastructures.",
  },
  {
    label: "Transparence",
    image: "/images/about_page/about_hero_4.webp",
    texte:
      "Assurer une gestion rigoureuse, intègre et conforme aux normes en vigueur dans toutes nos opérations et partenariats.",
  },
];

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, [breakpoint]);
  return isMobile;
}

/* ── Value card desktop (hover interactions) ── */
function ValueCard({
  v,
  i,
  visible,
}: {
  v: (typeof values)[0];
  i: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative overflow-hidden"
      style={{
        opacity: visible ? 1 : 0,
        transition: `opacity 1s ease ${1.6 + i * 0.15}s`,
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        loading="lazy"
        decoding="async"
        src={v.image}
        alt={v.label}
        className="w-full h-full object-cover"
        style={{
          filter: hovered ? "brightness(0.45)" : "brightness(1)",
          transform: hovered ? "scale(1.04)" : "scale(1)",
          transition: "filter 0.5s ease, transform 0.5s ease",
        }}
      />
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-6"
        style={{ pointerEvents: "none" }}
      >
        <span
          className="text-center text-white w-full"
          style={{
            ...coconat,
            fontSize: "20.5px",
            letterSpacing: "0.02em",
            lineHeight: "1.05",
            textTransform: "uppercase",
            fontWeight: 400,
            marginBottom: hovered ? "12px" : "0px",
            transition: "margin-bottom 0.45s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {v.label}
        </span>
        <p
          className="text-center text-white max-w-sm"
          style={{
            ...commissioner,
            fontSize: "15px",
            fontWeight: 400,
            lineHeight: "1.30",
            letterSpacing: "0",
            margin: 0,
            maxHeight: hovered ? "200px" : "0px",
            opacity: hovered ? 1 : 0,
            overflow: "hidden",
            transition: hovered
              ? "opacity 0.4s ease 0.18s, max-height 0.45s cubic-bezier(0.22,1,0.36,1)"
              : "opacity 0.25s ease, max-height 0.3s ease",
          }}
        >
          {v.texte}
        </p>
      </div>
    </div>
  );
}

/* ── Value card mobile — clic pour ouvrir ── */
function ValueCardMobile({
  v,
  i,
  visible,
  isOpen,
  onToggle,
}: {
  v: (typeof values)[0];
  i: number;
  visible: boolean;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="relative overflow-hidden w-full"
      style={{
        height: isOpen ? "170px" : "120px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `height 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.8s ease ${0.2 + i * 0.12}s, transform 0.8s ease ${0.2 + i * 0.12}s`,
        cursor: "pointer",
      }}
      onClick={onToggle}
    >
      {/* Image — s'assombrit à l'ouverture */}
      <img
        loading="lazy"
        decoding="async"
        src={v.image}
        alt={v.label}
        className="w-full h-full object-cover"
        style={{
          filter: isOpen ? "brightness(0.45)" : "brightness(0.8)",
          transform: isOpen ? "scale(1.04)" : "scale(1)",
          transition: "filter 0.45s ease, transform 0.45s ease",
        }}
      />

      {/* Contenu — label + texte */}
      <div
        className="absolute inset-0 flex flex-col px-8"
        style={{
          justifyContent: isOpen ? "flex-start" : "center",
          paddingTop: isOpen ? "24px" : "0",
          transition: "padding-top 0.45s cubic-bezier(0.22,1,0.36,1)",
          pointerEvents: "none",
        }}
      >
        {/* Label */}
        <span
          className="text-center text-white"
          style={{
            ...coconat,
            fontSize: "16px",
            letterSpacing: "0.02em",
            lineHeight: "1.05",
            textTransform: "uppercase",
            fontWeight: 400,
            marginBottom: isOpen ? "14px" : "0",
            transition: "margin-bottom 0.45s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {v.label}
        </span>

        {/* Texte — fade in à l'ouverture */}
        <p
          className="text-center text-white"
          style={{
            ...commissioner,
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "1.50",
            letterSpacing: "0",
            margin: 0,
            opacity: isOpen ? 1 : 0,
            maxHeight: isOpen ? "200px" : "0px",
            overflow: "hidden",
            transition: isOpen
              ? "opacity 0.35s ease 0.2s, max-height 0.45s cubic-bezier(0.22,1,0.36,1)"
              : "opacity 0.2s ease, max-height 0.35s ease",
          }}
        >
          {v.texte}
        </p>
      </div>
    </div>
  );
}

/* ── Main section ── */
export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const isMobile = useIsMobile();
  const { navigate, current } = useNav();
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* ════════════════════════════════════════
     MOBILE
  ════════════════════════════════════════ */
  if (isMobile) {
    return (
      <div>
        <section ref={sectionRef} id="about" className="bg-white w-full">
          {/* ── Top block ── */}
          <div className="flex flex-col items-center text-center px-6 pt-24 pb-8">
            <p
              className="uppercase text-[#1e2d6b] mb-4"
              style={{
                ...coconat,
                fontSize: "16px",
                letterSpacing: "0.15em",
                lineHeight: "1.05",
                fontWeight: 400,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(-12px)",
                transition: "opacity 1s ease 0.1s, transform 1s ease 0.1s",
              }}
            >
              À Propos
            </p>

            <h2
              className="font-normal text-black mb-5"
              style={{
                ...coconat,
                fontSize: "clamp(26px, 7vw, 26px)",
                lineHeight: "1.15",
                letterSpacing: "-0.02em",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(-12px)",
                transition: "opacity 1s ease 0.3s, transform 1s ease 0.3s",
              }}
            >
              Un acteur public au service du{" "}
              <em
                style={{
                  fontFamily: "'Charis SIL', Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 700,
                  color: "#1e2d6b",
                  fontSize: "clamp(28px, 7.5vw, 26px)",
                  lineHeight: "1",
                  letterSpacing: "-0.02em",
                }}
              >
                Congo
              </em>
            </h2>

            <p
              style={{
                ...commissioner,
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "1.55",
                letterSpacing: "0",
                color: "#222",
                textAlign: "center",
                opacity: visible ? 1 : 0,
                transition: "opacity 1s ease 0.6s",
              }}
            >
              Créée en 2022, la{" "}
              <strong style={{ fontWeight: 600, color: "#223078" }}>
                Société d'Exploitation et de Développement des Infrastructures
                du Congo
              </strong>{" "}
              (SEDIC) est une société anonyme à Conseil d'administration,
              entièrement détenue par l'État congolais. Elle constitue un
              véhicule patrimonial stratégique, se consacrant à la
              structuration, à la valorisation et au développement des actifs
              immobiliers publics à fort potentiel en République du Congo.
            </p>
          </div>

          {/* ── Banner ── */}
          <div
            className="w-full px-6 py-5 text-center"
            style={{
              backgroundColor: "#f0efea",
              opacity: visible ? 1 : 0,
              transition: "opacity 1s ease 0.9s",
            }}
          >
            <p
              style={{
                fontFamily: "'Charis SIL', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 700,
                fontSize: "14px",
                lineHeight: "1.30",
                letterSpacing: "0",
                color: "#1e2d6b",
                textAlign: "center",
                margin: 0,
              }}
            >
              Quatre valeurs fondamentales, qui guident chacune de nos décisions
              et engagements.
            </p>
          </div>

          {/* ── Values — vertical stack, une seule ouverte ── */}
          <div className="flex flex-col w-full">
            {values.map((v, i) => (
              <ValueCardMobile
                key={v.label}
                v={v}
                i={i}
                visible={visible}
                isOpen={activeCard === i}
                onToggle={() => setActiveCard(activeCard === i ? null : i)}
              />
            ))}
          </div>

          {/* ── Positioning ── */}
          <div
            className="flex flex-col items-center text-center px-6 py-12"
            style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 1s ease 1.2s",
            }}
          >
            <p
              className="uppercase text-[#1e2d6b] mb-6"
              style={{
                ...coconat,
                fontSize: "16px",
                letterSpacing: "0.15em",
                lineHeight: "1.05",
                fontWeight: 400,
              }}
            >
              Notre Positionnement
            </p>
            <p
              className="mb-7"
              style={{
                ...commissioner,
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "1.55",
                letterSpacing: "0",
                color: "#222",
                textAlign: "center",
              }}
            >
              Acteur public stratégique, la SEDIC joue un rôle central dans la
              structuration et la valorisation du patrimoine immobilier de
              l'État. Elle agit comme un levier de développement, en combinant
              vision long terme, rigueur de gestion et impact économique
              concret.
            </p>
            <button
              onClick={() => {
                document.getElementById(current)?.scrollTo({
                  top: document.getElementById(current)!.scrollHeight,
                  behavior: "smooth",
                });
              }}
              className="w-full py-3 rounded-xl bg-[#223078] text-white hover:bg-[#B3C2E9] hover:text-[#223078] transition-all duration-300"
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
        </section>
        <Gouvernance />
        <DirectionGenerale />
        <Contacform />
      </div>
    );
  }

  /* ════════════════════════════════════════
     DESKTOP
  ════════════════════════════════════════ */
  return (
    <div>
      <section ref={sectionRef} id="about" className="bg-white w-full">
        <div className="flex flex-col items-center text-center px-20 pt-32 pb-10">
          <p
            className="uppercase text-[#1e2d6b] mb-5"
            style={{
              ...coconat,
              fontSize: "20.5px",
              letterSpacing: "0.02em",
              lineHeight: "1.05",
              fontWeight: 400,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(-16px)",
              transition: "opacity 1.2s ease 0.1s, transform 1.2s ease 0.1s",
            }}
          >
            À Propos
          </p>
          <h2
            className="font-normal text-black mb-7"
            style={{
              ...coconat,
              fontSize: "clamp(30px, 4vw, 38px)",
              lineHeight: "1.1",
              letterSpacing: "-0.02em",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(-16px)",
              transition: "opacity 1.2s ease 0.4s, transform 1.2s ease 0.4s",
            }}
          >
            Un acteur public au service du{" "}
            <em
              style={{
                fontFamily: "'Charis SIL', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 700,
                color: "#1e2d6b",
                fontSize: "clamp(34px, 4.5vw, 40px)",
                lineHeight: "1",
                letterSpacing: "-0.02em",
              }}
            >
              Congo
            </em>
          </h2>
          <p
            className="max-w-3xl"
            style={{
              ...commissioner,
              fontSize: "15px",
              fontWeight: 400,
              lineHeight: "1.30",
              letterSpacing: "0",
              color: "#222",
              textAlign: "center",
              opacity: visible ? 1 : 0,
              transition: "opacity 1.2s ease 0.9s",
            }}
          >
            Créée en 2022, la{" "}
            <strong style={{ fontWeight: 600, color: "#223078" }}>
              Société d'Exploitation et de Développement des Infrastructures du
              Congo
            </strong>{" "}
            (SEDIC) est une société anonyme à Conseil d'administration,
            entièrement détenue par l'État congolais. Elle constitue un véhicule
            patrimonial stratégique, se consacrant à la structuration, à la
            valorisation et au développement des actifs immobiliers publics à
            fort potentiel en République du Congo.
          </p>
        </div>

        <div
          className="w-full px-20 py-6 text-center"
          style={{
            backgroundColor: "#f0efea",
            opacity: visible ? 1 : 0,
            transition: "opacity 1.2s ease 1.3s",
          }}
        >
          <p
            style={{
              fontFamily: "'Charis SIL', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: "15px",
              lineHeight: "1.20",
              letterSpacing: "0",
              color: "#1e2d6b",
              textAlign: "center",
              margin: 0,
            }}
          >
            La SEDIC construit son action sur quatre valeurs fondamentales, qui
            guident chacune de ses décisions et engagements.
          </p>
        </div>

        <div className="grid grid-cols-4" style={{ height: "550px" }}>
          {values.map((v, i) => (
            <ValueCard key={v.label} v={v} i={i} visible={visible} />
          ))}
        </div>

        <div
          className="flex flex-col items-center text-center px-20 py-16"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 1.2s ease 2.2s",
          }}
        >
          <p
            className="uppercase text-[#1e2d6b] mb-5"
            style={{
              ...coconat,
              fontSize: "20.5px",
              letterSpacing: "0.02em",
              lineHeight: "1.05",
              fontWeight: 400,
            }}
          >
            Notre Positionnement
          </p>
          <p
            className="max-w-2xl mb-8"
            style={{
              ...commissioner,
              fontSize: "15px",
              fontWeight: 400,
              lineHeight: "1.30",
              letterSpacing: "0",
              color: "#222",
              textAlign: "center",
            }}
          >
            Acteur public stratégique, la SEDIC joue un rôle central dans la
            structuration et la valorisation du patrimoine immobilier de l'État.
            Elle agit comme un levier de développement, en combinant vision long
            terme, rigueur de gestion et impact économique concret.
          </p>
          <button
            onClick={() => {
              document.getElementById(current)?.scrollTo({
                top: document.getElementById(current)!.scrollHeight,
                behavior: "smooth",
              });
            }}
            className="px-6 py-2 rounded-lg bg-[#223078] text-white hover:bg-[#B3C2E9] hover:text-[#223078] transition-all duration-300"
            style={{
              ...coconat,
              fontSize: "18px",
              lineHeight: "1",
              letterSpacing: "-0.02em",
            }}
          >
            Devenir partenaire
          </button>
        </div>
      </section>
      <Gouvernance />
      <DirectionGenerale />
      <Contacform />
    </div>
  );
}
