import { useEffect, useRef, useState } from 'react';

const coconat: React.CSSProperties = {
  fontFamily: 'Coconat, Georgia, serif',
};

const commissioner: React.CSSProperties = {
  fontFamily: 'Commissioner, sans-serif',
};

export default function DirectionGenerale() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // ── Détection mobile ──────────────────────────────────────
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ── Layout MOBILE ─────────────────────────────────────────
  if (isMobile) {
    return (
      <section
        ref={sectionRef}
        className="w-full bg-white flex flex-col"
      >
        {/* ── Bloc texte ── */}
        <div
          className="flex flex-col px-6 pt-12 pb-8"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.9s ease, transform 0.9s ease',
          }}
        >
          {/* Badge */}
          <div
            className="inline-flex self-center items-center px-5 py-1 mb-5"
            style={{ backgroundColor: '#223078' }}
          >
            <span
              style={{
                ...coconat,
                color: '#fff',
                fontSize: '16px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Directrice Générale
            </span>
          </div>

          {/* Nom */}
          <h2
            className="mb-7 text-center"
            style={{
              ...coconat,
              fontSize: '26px',
              lineHeight: '0.95',
              letterSpacing: '-0.00em',
              color: '#111',
            }}
          >
            Bénédicte Myriam
            <br />
            Denguet-Atticky
          </h2>

          {/* Paragraphe 1 */}
          <p
            className="mb-5"
            style={{
              ...commissioner,
              color: '#223078',
              fontSize: '14px',
              lineHeight: '1.6',
              fontWeight: 400,
              textAlign: 'justify',
            }}
          >
            Nommée Directrice Générale de la Société
            d'Exploitation et de Développement des
            Infrastructures du Congo (SEDIC) en 2022,
            elle s'est donné pour mission de transformer
            les infrastructures nationales en véritables
            leviers de diversification économique et de
            progrès social.
          </p>

          {/* Paragraphe 2 */}
          <p
            style={{
              ...commissioner,
              color: '#111',
              fontSize: '14px',
              lineHeight: '1.6',
              fontWeight: 400,
              textAlign: 'justify',
            }}
          >
            Son parcours d'excellence débute dans
            l'audit international chez{' '}
            <strong>Ernst & Young</strong>, où elle forge
            son expertise en tant que Directrice de
            mission. Animée par la volonté de contribuer
            au rayonnement de la République du Congo,
            elle poursuit son ascension au sein de la{' '}
            <strong>
              Société Nationale des Pétroles du Congo
            </strong>{' '}
            (SNPC), puis à la{' '}
            <strong>
              Délégation Générale des Grands Travaux
            </strong>.
            Aujourd'hui à la tête de la{' '}
            <strong>SEDIC</strong>, elle impose une
            gestion lucide et performante, plaçant
            l'attractivité du territoire au cœur de
            l'action publique.
          </p>

          {/* Citation */}
          <div
            className="mt-7 text-center"
            style={{
              fontFamily: "'Charis SIL', Georgia, serif",
              fontStyle: 'italic',
              fontWeight: 700,
              fontSize: '18px',
              lineHeight: '1.2',
              letterSpacing: '-0.03em',
              color: '#223078',
            }}
          >
            Bénédicte Myriam Denguet-Atticky incarne une
            nouvelle génération de leaders africains qui
            savent allier rigueur méthodologique et vision
            stratégique.
          </div>
        </div>

        {/* ── Photo pleine largeur en bas ── */}
        <div
          className="w-full"
          style={{
            opacity: visible ? 1 : 0,
            transition: 'opacity 1.1s ease 0.3s',
          }}
        >
          <img
            src="/images/about_page/directrice_generale.webp"
            alt="Bénédicte Myriam Denguet-Atticky"
            className="w-full object-cover object-top"
            style={{ maxHeight: '480px' }}
          />
        </div>
      </section>
    );
  }

  // ── Layout DESKTOP (inchangé) ─────────────────────────────
  return (
    <section
      ref={sectionRef}
      className="w-full py-20 px-10 md:px-16 bg-white"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">

        {/* LEFT CONTENT */}
        <div
          className="max-w-xl"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0px)' : 'translateY(30px)',
            transition: 'opacity 1s ease, transform 1s ease',
          }}
        >
          {/* Label */}
          <div
            className="inline-flex items-center justify-center px-6 py-1 mb-6"
            style={{ backgroundColor: '#223078' }}
          >
            <span
              style={{
                ...coconat,
                color: '#fff',
                fontSize: '20.5px',
                fontWeight: 500,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Directrice Générale
            </span>
          </div>

          {/* Name */}
          <h2
            className="mb-32"
            style={{
              ...coconat,
              fontSize: 'clamp(38px, 4vw, 42px)',
              lineHeight: '0.95',
              letterSpacing: '-0.04em',
              color: '#111',
            }}
          >
            Bénédicte Myriam
            <br />
            Denguet-Atticky
          </h2>

          {/* Body text */}
          <div
            className="max-w-[620px]"
            style={{
              ...commissioner,
              color: '#223078',
              fontSize: '15px',
              lineHeight: '1.55',
              fontWeight: 400,
            }}
          >
            <p className="mb-8 text-justify">
              Nommée Directrice Générale de la Société
              d'Exploitation et de Développement des
              Infrastructures du Congo (SEDIC) en 2022,
              elle s'est donné pour mission de transformer
              les infrastructures nationales en véritables
              leviers de diversification économique et de
              progrès social.
            </p>

            <p className="text-black text-justify">
              Son parcours d'excellence débute dans
              l'audit international chez{' '}
              <strong>Ernst & Young</strong>, où elle forge
              son expertise en tant que Directrice de
              mission. Animée par la volonté de contribuer
              au rayonnement de la République du Congo,
              elle poursuit son ascension au sein de la{' '}
              <strong>
                Société Nationale des Pétroles du Congo
              </strong>{' '}
              (SNPC), puis à la{' '}
              <strong>
                Délégation Générale des Grands Travaux
              </strong>.
              Aujourd'hui à la tête de la{' '}
              <strong>SEDIC</strong>, elle impose une
              gestion lucide et performante, plaçant
              l'attractivité du territoire au cœur de
              l'action publique.
            </p>
          </div>

          {/* Quote */}
          <div
            className="mt-32 max-w-[680px]"
            style={{
              fontFamily: "'Charis SIL', Georgia, serif",
              fontStyle: 'italic',
              fontWeight: 700,
              fontSize: '20px',
              lineHeight: '1.1',
              letterSpacing: '-0.03em',
              color: '#223078',
            }}
          >
            Bénédicte Myriam Denguet-Atticky incarne une
            nouvelle génération de leaders africains qui
            savent allier rigueur méthodologique et vision
            stratégique.
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div
          className="h-full flex flex-col"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0px)' : 'translateY(40px)',
            transition: 'opacity 1.2s ease 0.2s, transform 1.2s ease 0.2s',
          }}
        >
          <div className="overflow-hidden h-full w-full">
            <img
              src="/images/about_page/directrice_generale.webp"
              alt="Bénédicte Myriam Denguet-Atticky"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}