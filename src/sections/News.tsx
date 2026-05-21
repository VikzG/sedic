import { useEffect, useRef, useState } from 'react';

function useIsMobile(breakpoint = 1100) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, [breakpoint]);
  return isMobile;
}

const coconat: React.CSSProperties = { fontFamily: 'Coconat, Georgia, serif' };
const commissioner: React.CSSProperties = { fontFamily: 'Commissioner, sans-serif' };

/* ══════════════════════════════════════════════════════════
   MOBILE
══════════════════════════════════════════════════════════ */
function MobileNews() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTimeout(() => setTriggered(true), 400);
        }
      },
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [triggered]);

  /*
    Reproduction fidèle du desktop en mobile :

    Desktop :
    - Titre z:1 (derrière tout)
    - Cadre 1200×360px en z:2, bg_back dedans (clipé)
    - bg_front z:10 : ancré bottom:0 du cadre, monte de -10px → -160px
      soit ~44% de la hauteur du cadre (160/360). Il dépasse le cadre vers
      le haut et traverse les lettres du titre (z:10 > z:1).

    Mobile : on reproduit la même structure proportionnelle.
    - Hauteur du cadre image : 260px (valeur fixe choisie)
    - Titre au-dessus, hauteur ~70px → total wrapper ~330px
    - bg_front monte de translateY(0) → translateY(-120px)
      soit ~46% de 260px ≈ même proportion que desktop (44%)
    - bg_front en z:10 passe bien devant le titre en z:1
  */

  const FRAME_H = 260; // hauteur du cadre bg_back en px

  return (
    <section ref={sectionRef} id="news" className="bg-white w-full overflow-hidden">

      {/*
        Wrapper global : position relative, hauteur = titre (~70px) + cadre (FRAME_H)
        Le bg_front dépassera vers le haut hors du cadre pour aller dans le titre.
        overflow: visible ici pour laisser bg_front déborder.
      */}
      <div className="relative w-full" style={{ height: `${70 + FRAME_H}px`, overflow: 'visible' }}>

        {/* Titre — z:1, derrière bg_front */}
        <div
          className="absolute top-0 left-0 right-0 flex items-center justify-center"
          style={{ zIndex: 1, height: '70px' }}
        >
          <h2
            className="font-normal leading-none select-none text-center w-full"
            style={{
              ...coconat,
              fontSize: 'clamp(48px, 15vw, 80px)',
              color: '#1e2d6b',
              letterSpacing: '0.03em',
              lineHeight: 1,
            }}
          >
            ACTUALITÉS
          </h2>
        </div>

        {/* Cadre bg_back — z:2, overflow hidden pour clipper bg_back */}
        <div
          className="absolute left-0 right-0 overflow-hidden"
          style={{ top: '70px', height: `${FRAME_H}px`, zIndex: 2 }}
        >
          <img
            src="/images/actu_bg_back.jpg"
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
              transform: triggered ? 'translateY(0px)' : 'translateY(80px)',
              transition: triggered
                ? 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)'
                : 'none',
              willChange: 'transform',
            }}
          />
        </div>

        {/*
          bg_front — même logique que desktop :
          ancré bottom:0 du cadre, monte via translateY négatif en px.
          Position de départ : translateY(-20px) → juste visible au bas du cadre
          Position finale   : translateY(-200px) → dépasse largement en haut,
                              traverse les lettres du titre (z:10 > z:1)
        */}
      </div>

      {/* ── Caption block ── */}
      <div
        className="bg-white px-6 pt-8 pb-10 flex flex-col items-center text-center"
        style={{
          opacity: triggered ? 1 : 0,
          transform: triggered ? 'translateY(0px)' : 'translateY(40px)',
          transition: triggered
            ? 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s'
            : 'none',
        }}
      >
        {/* Date — AVRIL 2026 sur une ligne */}
        <p
          className="text-[#1e2d6b] uppercase mb-5"
          style={{ ...coconat, fontSize: '15px', fontWeight: 400, lineHeight: '1.05', letterSpacing: '0.08em' }}
        >
          Avril 2026
        </p>

        <h3
          className="font-normal text-[#1a1a1a] mb-5"
          style={{ ...coconat, fontSize: 'clamp(22px, 6vw, 30px)', fontWeight: 400, lineHeight: '1.1', letterSpacing: '-0.02em' }}
        >
          Cérémonie d'ouverture du{' '}
          <span className="text-[#1e2d6b]">Musée National</span>
        </h3>

        <p
          className="text-black mb-7"
          style={{ ...commissioner, fontSize: '14.5px', fontWeight: 400, lineHeight: '1.55', letterSpacing: '0', maxWidth: '340px' }}
        >
          La SEDIC a marqué une étape importante avec la cérémonie d'ouverture du Musée national,
          un projet structurant dédié à la valorisation du patrimoine culturel et historique du Congo.
        </p>

        <button
          className="w-full py-3 rounded-xl bg-[#223078] text-white hover:bg-white hover:text-[#223078] border border-[#223078] transition-all duration-300"
          style={{ ...coconat, fontSize: '16px', lineHeight: '1', letterSpacing: '-0.01em', maxWidth: '340px' }}
        >
          Lire les actualités
        </button>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   DESKTOP — code original
══════════════════════════════════════════════════════════ */
function DesktopNews() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTimeout(() => setTriggered(true), 1500);
        }
      },
      { threshold: 0.6 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [triggered]);

  return (
    <section id="news" style={{ minHeight: '1000px' }} className="bg-white" ref={sectionRef}>
      <div className="relative w-full overflow-hidden">

        <div
          className="relative flex items-center justify-center"
          style={{ zIndex: 1, paddingTop: '40px', paddingBottom: '40px' }}
        >
          <h2
            className="font-normal leading-none select-none text-center"
            style={{
              fontSize: '180px',
              fontFamily: 'Coconat, Georgia, serif',
              color: '#1e2d6b',
              letterSpacing: '0.03em',
            }}
          >
            ACTUALITÉS
          </h2>
        </div>

        <div
          style={{
            position: 'relative',
            width: '1200px',
            height: '360px',
            margin: '0 auto',
            zIndex: 2,
          }}
        >
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            <img
              src="/images/actu_bg_back.jpg"
              alt=""
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
                transform: triggered ? 'translateY(0px)' : 'translateY(150px)',
                transition: triggered ? 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
                willChange: 'transform',
              }}
            />
          </div>

          <img
            src="/images/actu_bg_front.png"
            alt=""
            className="pointer-events-none"
            style={{
              position: 'absolute',
              bottom: 0,
              left: '598.5px',
              width: '858px',
              height: 'auto',
              display: 'block',
              zIndex: 10,
              transform: triggered
                ? 'translateX(-50%) translateY(-160px)'
                : 'translateX(-50%) translateY(-10px)',
              transition: triggered ? 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
              willChange: 'transform',
            }}
          />
        </div>
      </div>

      <div
        className="bg-white px-8 md:px-16 py-10"
        style={{
          opacity: triggered ? 1 : 0,
          transform: triggered ? 'translateY(0px)' : 'translateY(150px)',
          transition: triggered
            ? 'opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1), transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)'
            : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <span className="text-[#1e2d6b] uppercase" style={{ fontFamily: 'Coconat, Georgia, serif', fontSize: '20.5px', fontWeight: 400, lineHeight: '1.05', letterSpacing: '0.02em' }}>
            AVRIL
          </span>

          <div className="flex-1 text-center px-0 md:px-12">
            <h3 className="font-normal text-[#1a1a1a] mb-6 text-center" style={{ fontFamily: 'Coconat, Georgia, serif', fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 400, lineHeight: '1', letterSpacing: '-0.02em' }}>
              Cérémonie d&apos;ouverture du{' '}
              <span className="text-[#1e2d6b]">Musée National</span>
            </h3>
            <p className="max-w-3xl mx-auto mb-6 text-center text-black" style={{ fontFamily: 'Commissioner, sans-serif', fontSize: '15px', fontWeight: 400, lineHeight: '1.3', letterSpacing: '0' }}>
              La SEDIC a marqué une étape importante avec la cérémonie d&apos;ouverture du Musée national,
              un projet structurant dédié à la valorisation du patrimoine culturel et historique du Congo.
            </p>
            <button
              className="px-6 py-3 border border-[#223078] rounded-xl bg-[#223078] text-white hover:bg-white hover:text-[#223078] transition-all duration-300"
              style={{ fontFamily: 'Coconat, Georgia, serif', fontSize: '18px', lineHeight: '1', letterSpacing: '-0.02em' }}
            >
              Lire les actualités
            </button>
          </div>

          <span className="text-[#1e2d6b] uppercase self-start md:self-auto" style={{ fontFamily: 'Coconat, Georgia, serif', fontSize: '20.5px', fontWeight: 400, lineHeight: '1.05', letterSpacing: '0.02em' }}>
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
export default function News() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileNews /> : <DesktopNews />;
}