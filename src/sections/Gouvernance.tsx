import { useRef, useEffect, useState } from "react";
import ProjectsSwiper from "../components/ProjectsSwiper";
import { useNav } from "../App";
import { projectStore } from "../store/projectStore";
import { projects } from "./Projects";

const coconat: React.CSSProperties = { fontFamily: "Coconat, Georgia, serif" };
const commissioner: React.CSSProperties = {
  fontFamily: "Commissioner, sans-serif",
};

const SLIDES = projects.map((p) => ({
  image: p.images[0],
  title: p.title,
}));

const INTERVAL = 4000;

const sectors = [
  [
    "L'IMMOBILIER\nTERTIAIRE",
    "L'HÔTELLERIE\nINTERNATIONALE",
    "LE COMMERCE\nMODERNE",
  ],
  [
    "LE TOURISME\nD'AFFAIRES",
    "LA FORMATION\nET LA CULTURE",
    "LE RÉSIDENTIEL\nSTRUCTURANT",
  ],
];

const sectors_mob = [
  [
    "L'IMMOBILIER TERTIAIRE",
    "L'HÔTELLERIE INTERNATIONALE",
    "LE COMMERCE MODERNE",
  ],
  [
    "LE TOURISME D'AFFAIRES",
    "LA FORMATION ET LA CULTURE",
    "LE RÉSIDENTIEL STRUCTURANT",
  ],
];

// Flat list for mobile single column
const sectorsList = sectors_mob.flat();

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, [breakpoint]);
  return isMobile;
}

/* ── Carousel (desktop only) ── */
function Carousel({
  onNavigate,
  active,
  onActiveChange,
}: {
  onNavigate: () => void;
  active: number;
  onActiveChange: (i: number) => void;
}) {
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeRef = useRef(active); // ← ref pour éviter les re-créations d'interval

  // Sync la ref à chaque changement
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const next = (activeRef.current + 1) % SLIDES.length; // ← utilise la ref
      setNextIndex(next);
      setAnimating(true);
      setTimeout(() => {
        onActiveChange(next);
        setNextIndex(null);
        setAnimating(false);
      }, 650);
    }, INTERVAL);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {SLIDES.map((slide, i) => {
        const isCurrent = i === active;
        const isNext = i === nextIndex;
        return (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-[650ms] ease-in-out"
            style={{
              opacity: (isCurrent && !animating) || isNext ? 1 : 0,
              zIndex: isNext ? 2 : isCurrent ? 1 : 0,
            }}
          >
            <img
              src={slide.image}
              alt={slide.title.replace("\n", " ")}
              className="w-full h-full object-cover"
              style={{
                transform: isCurrent ? "scale(1.06)" : "scale(1)",
                transition: isCurrent ? "transform 5s ease-out" : "none",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/30 to-black/10" />
          </div>
        );
      })}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-8 pointer-events-none">
        <div
          className="relative w-full flex items-center justify-center"
          style={{ minHeight: "5rem" }}
        >
          {SLIDES.map((slide, i) => {
            const vis = (i === active && !animating) || i === nextIndex;
            return (
              <h2
                key={i}
                className="absolute text-center text-white uppercase"
                style={{
                  ...coconat,
                  fontSize: "20.5px",
                  fontWeight: 400,
                  letterSpacing: "0.02em",
                  lineHeight: "1.05",
                  whiteSpace: "pre-line",
                  opacity: vis ? 1 : 0,
                  transform: vis
                    ? "translateY(0)"
                    : i === nextIndex
                      ? "translateY(10px)"
                      : "translateY(-10px)",
                  transition: "opacity 0.5s ease, transform 0.5s ease",
                }}
              >
                {slide.title}
              </h2>
            );
          })}
        </div>
        <button
          onClick={() => onNavigate()}
          className="pointer-events-auto mt-7 px-6 py-3 border border-white/50 rounded-xl backdrop-blur-md text-white hover:bg-[#E4E4E0] hover:text-[#223078] hover:border-[#E4E4E0] transition-all duration-300"
          style={{
            ...coconat,
            fontSize: "16px",
            lineHeight: "1",
            letterSpacing: "-0.01em",
          }}
        >
          Parcourir tous nos projets
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MOBILE
══════════════════════════════════════════════════════════ */
function MobileGouvernance() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { navigate } = useNav();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gouvernance"
      className="w-full"
      style={{
        backgroundColor: "#f0efea",
        paddingTop: "40px",
        paddingBottom: "40px",
      }}
    >
      {/* ── Titre + texte — colonne centrée ── */}
      <div
        className="flex flex-col items-center text-center px-6 pb-8"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s",
        }}
      >
        <h2
          className="font-normal text-black mb-5"
          style={{
            ...coconat,
            fontSize: "clamp(24px, 7vw, 26px)",
            lineHeight: "1.2",
            letterSpacing: "-0.02em",
          }}
        >
          Une gouvernance solide et une vision à long terme
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
          }}
        >
          Avec une gouvernance rigoureuse et une vision durable, la SEDIC gère
          un portefeuille d'actifs diversifié et à forte valeur ajoutée,
          englobant des secteurs essentiels tels que :
        </p>
      </div>

      {/* ── Sector tags — 1 colonne ── */}
      <div
        className="flex flex-col gap-3 px-6 pb-8"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.9s ease 0.4s",
        }}
      >
        {sectorsList.map((label) => (
          <div
            key={label}
            className="flex items-center justify-center text-center py-4 px-4"
            style={{
              ...coconat,
              backgroundColor: "#B3C2E9",
              border: "2px solid #223078",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: 400,
              letterSpacing: "0.04em",
              lineHeight: "1.1",
              textTransform: "uppercase",
              color: "#223078",
              whiteSpace: "pre-line",
            }}
          >
            {label}
          </div>
        ))}
      </div>

      {/* ── Showcase — texte seul, sans carousel ── */}
      <div
        className="mx-6 rounded-xl overflow-hidden py-4 px-2"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.9s ease 0.7s",
        }}
      >
        <p
          style={{
            fontFamily: "'Charis SIL', Georgia, serif",
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: "14px",
            color: "#223078",
            margin: "0 0 12px 0",
            textAlign: "center",
          }}
        >
          À travers ses projets emblématiques
        </p>
        <p
          style={{
            ...commissioner,
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "1.55",
            color: "black",
            margin: 0,
            textAlign: "center",
          }}
        >
          Comme{" "}
          <strong style={{ color: "#223078", fontWeight: 600 }}>
            les Tours Jumelles de Mpila, le Brazza Mall et le Centre
            international de conférences
          </strong>{" "}
          — la SEDIC joue un rôle actif dans la transformation urbaine et le
          rayonnement économique du pays.
        </p>
      </div>
      <div
        className="mx-0 rounded-xl overflow-hidden"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.9s ease 0.7s",
        }}
      >
        <ProjectsSwiper height={350} onNavigate={() => navigate("projects")} />
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   DESKTOP
══════════════════════════════════════════════════════════ */
function DesktopGouvernance() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [carouselActive, setCarouselActive] = useState(0);
  const carouselActiveRef = useRef(0); // ← ref
  const { navigate } = useNav();
  const handleCarouselChange = (i: number) => {
    carouselActiveRef.current = i; // ← sync ref
    setCarouselActive(i);
  };
const handleNavigate = () => {
  console.log("carouselActiveRef.current =", carouselActiveRef.current);
  console.log("project id =", projects[carouselActiveRef.current].id);
  projectStore.set(projects[carouselActiveRef.current].id);
  navigate("projects");
};

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gouvernance"
      className="w-full py-8"
      style={{ backgroundColor: "#f0efea" }}
    >
      <div className="flex items-start justify-between gap-12 px-16 pt-8 pb-10">
        <h2
          className="font-normal text-black"
          style={{
            ...coconat,
            flex: "0 0 38%",
            fontSize: "clamp(28px, 3.2vw, 40px)",
            lineHeight: "1.15",
            letterSpacing: "-0.02em",
            margin: 0,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1.2s ease 0.1s, transform 1.2s ease 0.1s",
          }}
        >
          Une gouvernance solide et une vision à long terme
        </h2>
        <p
          className="max-w-lg"
          style={{
            ...commissioner,
            flex: 1,
            fontSize: "15px",
            fontWeight: 400,
            lineHeight: "1.55",
            letterSpacing: "0",
            color: "#222",
            textAlign: "right",
            margin: 0,
            paddingTop: "6px",
            opacity: visible ? 1 : 0,
            transition: "opacity 1.2s ease 0.4s",
          }}
        >
          Avec une gouvernance rigoureuse et une vision durable, la SEDIC gère
          un portefeuille d'actifs diversifié et à forte valeur ajoutée,
          englobant des secteurs essentiels tels que :
        </p>
      </div>

      <div
        className="px-16 pb-10"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 1.2s ease 0.7s",
        }}
      >
        {sectors.map((row, ri) => (
          <div key={ri} className="grid grid-cols-3 gap-3 mb-3">
            {row.map((label) => (
              <div
                key={label}
                className="flex items-center justify-center border-2 border-[#223078] text-center py-5 px-4"
                style={{
                  ...coconat,
                  backgroundColor: "#B3C2E9",
                  borderRadius: "10px",
                  fontSize: "20.5px",
                  fontWeight: 400,
                  letterSpacing: "0.02em",
                  lineHeight: "1.05",
                  textTransform: "uppercase",
                  color: "#223078",
                  whiteSpace: "pre-line",
                }}
              >
                {label}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div
        className="mx-16 mb-10 flex overflow-hidden"
        style={{
          backgroundColor: "#1e2d6b",
          height: "250px",
          opacity: visible ? 1 : 0,
          transition: "opacity 1.2s ease 1.1s",
        }}
      >
        <div
          className="flex flex-col justify-center gap-1 px-20 py-9"
          style={{ flex: "0 0 50%" }}
        >
          <p
            style={{
              fontFamily: "'Charis SIL', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: "15px",
              color: "#b3c2e9",
              margin: 0,
            }}
          >
            À travers ses projets emblématiques
          </p>
          <p
            className="max-w-xl"
            style={{
              ...commissioner,
              fontSize: "15px",
              fontWeight: 400,
              lineHeight: "1.55",
              color: "#e8edf8",
              margin: 0,
            }}
          >
            Comme{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>
              les Tours Jumelles de Mpila, le Brazza Mall et le Centre
              international de conférences
            </strong>{" "}
            — la SEDIC joue un rôle actif dans la transformation urbaine et le
            rayonnement économique du pays.
          </p>
        </div>
        <div
          style={{
            flex: "0 0 50%",
            position: "relative",
            overflow: "hidden",
            borderRadius: "0 14px 14px 0",
          }}
        >
          <Carousel
            active={carouselActive}
            onActiveChange={handleCarouselChange}
            onNavigate={handleNavigate}
          />
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   Export
══════════════════════════════════════════════════════════ */
export default function Gouvernance() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileGouvernance /> : <DesktopGouvernance />;
}
