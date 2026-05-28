import { useEffect, useState } from "react";

const coconat: React.CSSProperties = { fontFamily: "Coconat, Georgia, serif" };

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
    0%   { opacity: 1; transform: translateX(0) scale(1); }
    100% { opacity: 1; transform: translateX(var(--sedic-shift, 25vw)) scale(1); }
  }
  /* Fond qui disparaît une fois les assets prêts */
  @keyframes backdropFadeOut {
    0%   { opacity: 1; }
    100% { opacity: 0; }
  }
`;

export default function Loader({ onComplete }: LoaderProps) {
  const [logoPhase, setLogoPhase] = useState<"in" | "out">("in");
  const [sedicPhase, setSedicPhase] = useState<"hidden" | "in" | "out">(
    "hidden",
  );
  const [mounted, setMounted] = useState(true);
  // Attend que tous les assets soient chargés avant de lancer la séquence
  const [ready, setReady] = useState(false);

  /* ── Attendre document.readyState complete ── */
  useEffect(() => {
    if (document.readyState === "complete") {
      setReady(true);
    } else {
      const onLoad = () => setReady(true);
      window.addEventListener("load", onLoad);
      return () => window.removeEventListener("load", onLoad);
    }
  }, []);

  /* ── Séquence d'animation — ne démarre qu'une fois ready ── */
  useEffect(() => {
    if (!ready) return;

    const t1 = setTimeout(() => setLogoPhase("out"), 200);

    const t2 = setTimeout(() => setSedicPhase("in"), 900);

    const t3 = setTimeout(() => setSedicPhase("out"), 1900);

    const t4 = setTimeout(() => {
      onComplete();
      setTimeout(() => setMounted(false), 500);
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [ready, onComplete]);

  if (!mounted) return null;

  return (
    <>
      <style>{styles}</style>

      {/*
        Fond sombre plein écran — visible pendant le chargement des assets.
        Garantit que mix-blend-mode:overlay fonctionne dès le début
        (overlay sur noir = noir, sur blanc = invisible).
        Disparaît dès que ready=true avec un court fondu.
      */}
      <div
        className="fixed inset-0 z-[99] pointer-events-none"
        style={{
          backgroundColor: "#0a0f1e",
          opacity: ready ? 0 : 1,
          transition: ready ? "opacity 0.4s ease" : "none",
        }}
      />

      {/* Overlay mix-blend */}
      <div
        className="fixed mix-blend-overlay inset-0 z-[100] flex items-center justify-center pointer-events-none"
        style={{
          isolation: "auto",
          ["--sedic-shift" as any]: window.innerWidth < 1200 ? "0vw" : "25vw",
        }}
      >
        {/* Logo hero anim */}
        <img
          src="/images/logo_hero_anim.svg"
          alt="SEDIC"
          style={{
            position: "absolute",
            width: "clamp(120px, 18vw, 240px)",
            mixBlendMode: "overlay",
            animation: ready
              ? logoPhase === "in"
                ? "logoIn 0.9s cubic-bezier(0.22,1,0.36,1) forwards"
                : "logoOut 0.6s cubic-bezier(0.4,0,0.6,1) forwards"
              : undefined,
            opacity: ready ? undefined : 0,
          }}
        />

        {/* SEDIC centered title */}
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
