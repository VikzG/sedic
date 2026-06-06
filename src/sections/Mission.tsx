import { useRef, useState, useEffect } from "react";
import { useNav } from "../App";

const coconat: React.CSSProperties = { fontFamily: "Coconat, Georgia, serif" };
const commissioner: React.CSSProperties = {
  fontFamily: "Commissioner, sans-serif",
};
const charisSIL: React.CSSProperties = {
  fontFamily: "'Charis SIL', 'Georgia', serif",
};

const pillars = [
  {
    num: "01",
    label: "EXPLOITER",
    align: "left" as const,
    desc: "Optimiser la performance et la valorisation durable des infrastructures",
  },
  {
    num: "02",
    label: "GÉRER",
    align: "center" as const,
    desc: "Assurer la gestion rigoureuse, efficace et pérenne de nos actifs",
  },
  {
    num: "03",
    label: "CONCEVOIR",
    align: "center" as const,
    desc: "Imaginer des infrastructures innovantes répondant aux besoin de demain",
  },
  {
    num: "04",
    label: "DÉVELOPPER",
    align: "right" as const,
    desc: "Créer des projets à fort impact économique et social",
  },
];

export default function Mission({ current }: { current: string }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const pillarCellRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [cardTop, setCardTop] = useState(0);
  const [pillarHeights, setPillarHeights] = useState<number[]>([0, 0, 0, 0]);
  const [step, setStep] = useState(0);
  const { navigate } = useNav();

  // ── Détection mobile ──────────────────────────────────────
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Accordion state — pilier actif (ouvert par défaut : '01')
  const [openPillar, setOpenPillar] = useState<string>("01");

  // ── Animation de transition de la grande carte ─────────────
  const [displayedPillar, setDisplayedPillar] = useState<string>("01");
  const [cardAnim, setCardAnim] = useState<"idle" | "exit" | "enter">("idle");

  const selectPillar = (num: string) => {
    if (num === openPillar || cardAnim !== "idle") return;
    setCardAnim("exit");
    setTimeout(() => {
      setOpenPillar(num);
      setDisplayedPillar(num);
      setCardAnim("enter");
      setTimeout(() => setCardAnim("idle"), 400);
    }, 260);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && step === 0) {
          setStep(1);
          setTimeout(() => setStep(2), 800);
          setTimeout(() => setStep(3), 1600);
          setTimeout(() => setStep(4), 2000);
          setTimeout(() => setStep(5), 2400);
          setTimeout(() => setStep(6), 2800);
        }
      },
      { threshold: 0.4 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [step]);

  useEffect(() => {
    const measure = () => {
      if (sectionRef.current && pillarsRef.current) {
        const sectionRect = sectionRef.current.getBoundingClientRect();
        const pillarsRect = pillarsRef.current.getBoundingClientRect();
        setCardTop(pillarsRect.top - sectionRect.top);
        const heights = pillarCellRefs.current.map((el) =>
          el ? el.getBoundingClientRect().height : 0,
        );
        setPillarHeights(heights);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // ── Layout MOBILE ─────────────────────────────────────────
  if (isMobile) {
    const activePillar =
      pillars.find((p) => p.num === displayedPillar) ?? pillars[0];
    const smallPillars = pillars.filter((p) => p.num !== openPillar);

    return (
      <section
        id="mission"
        ref={sectionRef}
        className="relative flex flex-col overflow-hidden min-h-[850px]"
        style={{ background: "#0a1628" }}
      >
        <img
          src="/images/bg_mission.webp"
          alt="fond mission"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none"
        />

        <div className="relative z-10 flex flex-col px-5 pt-14 pb-10 gap-7">
          {/* ── En-tête ── */}
          <div
            className="flex flex-col gap-3 text-center"
            style={{
              opacity: step >= 1 ? 1 : 0,
              transform: step >= 1 ? "translateY(0)" : "translateY(-24px)",
              transition:
                "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <p
              className="uppercase"
              style={{
                ...commissioner,
                fontSize: "14px",
                letterSpacing: "0.18em",
                color: "white",
              }}
            >
              Notre Mission
            </p>
            <h2
              className="text-white font-normal"
              style={{
                ...coconat,
                fontSize: "27px",
                lineHeight: "1.1",
                letterSpacing: "-0.01em",
              }}
            >
              <span style={{ color: "#7A9BBF" }}>
                Des infrastructures créatrices
              </span>{" "}
              de valeur économique, sociale et territoriale.
            </h2>
          </div>

          {/* ── Grande carte active ── */}
          <div
            className="w-full rounded-lg px-6 py-8 flex flex-col items-center gap-5"
            style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              opacity: step >= 2 ? (cardAnim === "exit" ? 0 : 1) : 0,
              transform:
                step >= 2
                  ? cardAnim === "exit"
                    ? "translateY(14px) scale(0.98)"
                    : cardAnim === "enter"
                      ? "translateY(-10px) scale(0.99)"
                      : "translateY(0) scale(1)"
                  : "translateY(20px) scale(1)",
              transition:
                cardAnim === "exit"
                  ? "opacity 0.26s cubic-bezier(0.4,0,1,1), transform 0.26s cubic-bezier(0.4,0,1,1)"
                  : cardAnim === "enter"
                    ? "opacity 0.40s cubic-bezier(0,0,0.2,1), transform 0.40s cubic-bezier(0,0,0.2,1)"
                    : "opacity 0.5s ease, transform 0.5s ease",
              willChange: "opacity, transform",
            }}
          >
            {/* Numéro */}
            <span
              style={{
                ...charisSIL,
                fontSize: "26px",
                fontWeight: 700,
                fontStyle: "italic",
                lineHeight: "1",
                color: "#7A9BBF",
                letterSpacing: "-0.02em",
              }}
            >
              {activePillar.num}
            </span>

            {/* Label */}
            <span
              className="text-white uppercase text-center"
              style={{
                ...coconat,
                fontSize: "17px",
                lineHeight: "1",
                letterSpacing: "0.06em",
              }}
            >
              {activePillar.label}
            </span>

            {/* Description */}
            <p
              className="text-center"
              style={{
                ...commissioner,
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "1.6",
                color: "rgba(255,255,255,0.78)",
              }}
            >
              {activePillar.desc}
            </p>
          </div>

          {/* ── 3 petites cartes (ordre croissant) ── */}
          <div
            className="grid grid-cols-3 gap-3"
            style={{
              opacity: step >= 2 ? 1 : 0,
              transition: "opacity 0.6s ease 0.15s",
            }}
          >
            {smallPillars
              .slice()
              .sort((a, b) => a.num.localeCompare(b.num))
              .map(({ num, label }, idx) => (
                <button
                  key={num}
                  onClick={() => selectPillar(num)}
                  className="flex flex-col items-center justify-center gap-2 rounded-lg py-5 px-2"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    cursor: "pointer",
                    opacity: cardAnim === "exit" ? 0.5 : 1,
                    transform:
                      cardAnim === "enter"
                        ? "translateY(4px)"
                        : "translateY(0)",
                    transition: `opacity 0.26s ease ${idx * 40}ms, transform 0.40s cubic-bezier(0,0,0.2,1) ${idx * 40}ms`,
                  }}
                >
                  <span
                    style={{
                      ...charisSIL,
                      fontSize: "28px",
                      fontWeight: 700,
                      fontStyle: "italic",
                      lineHeight: "1",
                      color: "#7A9BBF",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {num}
                  </span>
                  <span
                    className="text-white uppercase text-center"
                    style={{
                      ...coconat,
                      fontSize: "13px",
                      lineHeight: "1.2",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {label}
                  </span>
                </button>
              ))}
          </div>
        </div>
      </section>
    );
  }

  // ── Layout DESKTOP (inchangé) ─────────────────────────────
  return (
    <section
      id="mission"
      ref={sectionRef}
      className="relative flex flex-col overflow-hidden"
      style={{ background: "#0a1628", minHeight: "90vh" }}
    >
      {/* Background image */}
      <img
        src="/images/bg_mission.webp"
        alt="fond mission"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none"
      />

      {/* Full-column hover zones */}
      {pillars.map(({ num }, i) => (
        <button
          key={`hover-zone-${num}`}
          onClick={() => navigate("about")}
          className="absolute"
          style={{
            left: `${i * 25}%`,
            width: "25%",
            top: cardTop,
            bottom: 0,
            zIndex: 20,
            cursor: "pointer",
            background: "transparent",
            border: "none",
            padding: 0,
          }}
          onMouseEnter={() => setHovered(num)}
          onMouseLeave={() => setHovered(null)}
        />
      ))}

      {/* Hover cards */}
      {pillars.map(({ num, desc, align }, i) => (
        <div
          key={`card-${num}`}
          className="absolute flex flex-col pointer-events-none"
          style={{
            left: `${i * 25}%`,
            width: "25%",
            top: cardTop,
            bottom: 0,
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            opacity: hovered === num ? 1 : 0,
            transition: "opacity 0.35s ease",
            zIndex: 1,
          }}
        >
          <div style={{ height: pillarHeights[i] || 0, flexShrink: 0 }} />
          <div className="flex-1 relative">
            <div
              className="absolute left-0 right-0 px-12"
              style={{
                top: "50%",
                transform: "translateY(-50%)",
                opacity: hovered === num ? 1 : 0,
                transition: "opacity 0.4s ease",
              }}
            >
              <div
                style={{
                  width: "100%",
                  borderTop: "2px solid #7A9BBF",
                  marginBottom: "1.5rem",
                }}
              />
              <p
                style={{
                  ...commissioner,
                  fontSize: "15px",
                  fontWeight: 400,
                  lineHeight: "1.3",
                  letterSpacing: "0",
                  color: "rgba(255,255,255,0.75)",
                  textAlign:
                    align === "center"
                      ? "center"
                      : align === "right"
                        ? "right"
                        : "left",
                }}
              >
                {desc}
              </p>
            </div>
          </div>
          <div
            className="px-12 pb-10"
            style={{ position: "relative", zIndex: 25 }}
          >
            {" "}
            <button
              className="pointer-events-auto w-full py-2 rounded-lg text-center transition-all duration-300 hover:bg-[#E4E4E0]"
              style={{
                ...coconat,
                fontSize: "18px",
                lineHeight: "1",
                letterSpacing: "-0.02em",
                background: "#7A9BBF",
                color: "#223078",
                border: "none",
              }}
            >
              {" "}
              En savoir +{" "}
            </button>{" "}
          </div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 mx-auto w-full px-8 md:px-16 pt-24 pb-16 flex flex-col flex-1">
        {/* Top row */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div
            style={{
              opacity: step >= 1 ? 1 : 0,
              transform: step >= 1 ? "translateX(0)" : "translateX(-80px)",
              transition:
                "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <h2
              className="font-normal text-white mb-8"
              style={{
                ...coconat,
                fontSize: "38px",
                lineHeight: "1",
                letterSpacing: "-0.02em",
              }}
            >
              Notre mission.
            </h2>
            <button
              onClick={() => {
                document.getElementById(current)?.scrollTo({
                  top: document.getElementById(current)!.scrollHeight,
                  behavior: "smooth",
                });
              }}
              className="px-8 py-2 backdrop-blur-md border border-white/50 rounded-lg text-white hover:bg-[#E4E4E0] hover:text-[#223078] hover:border-[#E4E4E0] transition-all duration-300"
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

          <div
            className="flex flex-col gap-5 md:text-right"
            style={{
              opacity: step >= 2 ? 1 : 0,
              transform: step >= 2 ? "translateX(0)" : "translateX(80px)",
              transition:
                "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <p
              className="uppercase text-white"
              style={{
                ...coconat,
                fontSize: "20.5px",
                lineHeight: "1.05",
                letterSpacing: "0.02em",
              }}
            >
              <span style={{ color: "#7A9BBF" }}>
                Des infrastructures créatrices
              </span>{" "}
              de valeur
              <br />
              économique, sociale et territoriale.
            </p>
            <p
              className="text-white/80 md:ml-auto"
              style={{
                ...commissioner,
                fontSize: "15px",
                lineHeight: "1.30",
                letterSpacing: "0",
              }}
            >
              La SEDIC aspire à devenir un acteur régional de référence en
              matière d'exploitation, de gestion et de développement des
              infrastructures.
            </p>
          </div>
        </div>

        {/* Four pillars */}
        <div ref={pillarsRef} className="grid grid-cols-2 md:grid-cols-4">
          {pillars.map(({ num, label, align }, i) => (
            <div
              key={num}
              ref={(el) => {
                pillarCellRefs.current[i] = el;
              }}
              className={`relative z-30 pt-10 pr-8 pb-8 ${i !== 0 ? "pl-8" : ""} cursor-pointer flex flex-col`}
              style={{
                alignItems:
                  align === "center"
                    ? "center"
                    : align === "right"
                      ? "flex-end"
                      : "flex-start",
                opacity: step >= 3 + i ? 1 : 0,
                transform: step >= 3 + i ? "translateY(0)" : "translateY(30px)",
                transition:
                  "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <span
                className="block mb-4 font-bold italic"
                style={{
                  ...charisSIL,
                  fontSize: "38px",
                  lineHeight: "1",
                  letterSpacing: "-0.02em",
                  color: "#7A9BBF",
                }}
              >
                {num}
              </span>
              <span
                className="block text-white uppercase"
                style={{
                  ...coconat,
                  fontSize: "20.5px",
                  lineHeight: "1.05",
                  letterSpacing: "0.02em",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
