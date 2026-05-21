import { useEffect, useState } from "react";

const coconat: React.CSSProperties = { fontFamily: "Coconat, Georgia, serif" };

/*
  Animations via @keyframes CSS — fluides, sans saccade React.
  Le SEDIC reste visible jusqu'au démontage pour se superposer
  parfaitement avec le watermark final du Hero.
*/

interface LoaderProps {
  onComplete: () => void;
}

const styles = `
  @keyframes logoIn {
    0%   { opacity: 0; transform: scale(0.55); }
    60%  { opacity: 1; transform: scale(1); }
    100% { opacity: 1; transform: scale(1); }
  }

  @keyframes logoOut {
    0%   { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(1.5); }
  }

  @keyframes sedicIn {
    0%   { opacity: 0; transform: translateX(0) scale(0.55); }
    100% { opacity: 1; transform: scale(1); }
  }

@keyframes sedicOut {
  0% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }

  100% {
    opacity: 1;
    transform: translateX(var(--sedic-shift, 25vw)) scale(1);
  }
}
`;

export default function Loader({ onComplete }: LoaderProps) {
  /* 
    logoPhase: 'in' → joue logoIn, puis 'out' → joue logoOut
    sedicPhase: 'hidden' → 'in' → 'out'
    mounted: false → démonte tout
  */
  const [logoPhase, setLogoPhase] = useState<"in" | "out">("in");
  const [sedicPhase, setSedicPhase] = useState<"hidden" | "in" | "out">(
    "hidden",
  );
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    // 0.0s : logo fade-in démarre (keyframe logoIn, durée 0.7s)
    const t1 = setTimeout(() => setLogoPhase("out"), 200); // logo commence à sortir
    const t2 = setTimeout(() => setSedicPhase("in"), 400); // SEDIC entre en même temps
    const t3 = setTimeout(() => setSedicPhase("out"), 1400); // SEDIC glisse vers la droite
    const t4 = setTimeout(() => {
      onComplete();
      // On attend que le Hero ait rendu son watermark avant de démonter
      setTimeout(() => setMounted(false), 500);
    }, 1900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  if (!mounted) return null;

  return (
    <>
      <style>{styles}</style>

      <div
        className="fixed mix-blend-overlay inset-0 z-[100] flex items-center justify-center pointer-events-none"
        style={{
          isolation: "auto",
          ["--sedic-shift" as any]: window.innerWidth < 1200 ? "0vw" : "25vw",
        }}
      >
        {/* ── Logo hero anim ── */}
        <img
          src="/images/logo_hero_anim.svg"
          alt="SEDIC"
          style={{
            position: "absolute",
            width: "clamp(120px, 18vw, 240px)",
            mixBlendMode: "overlay",
            animation:
              logoPhase === "in"
                ? "logoIn 0.9s cubic-bezier(0.22,1,0.36,1) forwards"
                : "logoOut 0.6s cubic-bezier(0.4,0,0.6,1) forwards",
          }}
        />

        {/* ── SEDIC centered title ── */}
        {sedicPhase !== "hidden" && (
          <span
            aria-hidden
            className="absolute uppercase leading-none select-none"
            style={{
              ...coconat,
              color: "white",
              fontSize: "clamp(6rem, 16vw, 16rem)",
              lineHeight: "0.85",
              whiteSpace: "nowrap",
              mixBlendMode: "overlay",
              animation:
                sedicPhase === "in"
                  ? "sedicIn 0.4s cubic-bezier(0.22,1,0.36,1) forwards"
                  : "sedicOut 0.55s cubic-bezier(0.22,1,0.36,1) forwards",
            }}
          >
            SEDIC
          </span>
        )}
      </div>
    </>
  );
}
