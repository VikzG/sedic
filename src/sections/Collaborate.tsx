import { useRef, useEffect, useState } from 'react';

const coconat: React.CSSProperties = { fontFamily: 'Coconat, Georgia, serif' };
const commissioner: React.CSSProperties = { fontFamily: 'Commissioner, sans-serif' };

const REASONS = [
  {
    title: 'Un partenaire institutionnel solide',
    body: "Adossée à l'État congolais, la SEDIC offre un cadre sécurisé et une vision alignée avec les priorités nationales.",
  },
  {
    title: 'Des projets structurants',
    body: 'Nous intervenons sur des actifs à fort impact économique dans des secteurs clés.',
  },
  {
    title: 'Une vision long terme',
    body: 'Nos projets sont conçus pour durer et générer de la valeur dans le temps.',
  },
  {
    title: 'Une expertise intégrée',
    body: "De la structuration à l'exploitation, nous maîtrisons l'ensemble du cycle des projets.",
  },
  {
    title: 'Un ancrage local fort',
    body: 'Nous possédons une connaissance approfondie du marché et des enjeux territoriaux.',
  },
];

export default function WhyCollaborate() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-collaborate"
      className="w-full bg-[#E4E4E0]"
      style={{ padding: '80px 64px' }}
    >
      <div className="flex items-center justify-around gap-16">

        {/* ── Left column ── */}
        <div>

          {/* Label */}
          <p
            className="uppercase text-[#1e2d6b] mb-4"
            style={{
              ...coconat,
              fontSize: '20.5px',
              letterSpacing: '0.02em',
              lineHeight: '1.05',
              fontWeight: 400,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(-12px)',
              transition: 'opacity 1s ease 0.1s, transform 1s ease 0.1s',
            }}
          >
            Notre Approche
          </p>

          {/* Title */}
          <h2
            className="font-normal text-black mb-10"
            style={{
              ...coconat,
              fontSize: 'clamp(26px, 3.2vw, 40px)',
              lineHeight: '1.15',
              letterSpacing: '-0.02em',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(-12px)',
              transition: 'opacity 1s ease 0.3s, transform 1s ease 0.3s',
            }}
          >
            Pourquoi{' '}
            <em
              style={{
                fontFamily: "'Charis SIL', Georgia, serif",
                fontStyle: 'italic',
                fontWeight: 700,
                color: '#1e2d6b',
                fontSize: 'clamp(30px, 3.6vw, 44px)',
                lineHeight: '1',
              }}
            >
              collaborer
            </em>
            <br />
            avec la SEDIC ?
          </h2>

          {/* Body text */}
          <p 
          className='max-w-xl'
            style={{
              ...commissioner,
              fontSize: '15px',
              fontWeight: 400,
              lineHeight: '1.55',
              color: '#223078',
              marginBottom: '56px',
              opacity: visible ? 1 : 0,
              transition: 'opacity 1s ease 0.5s',
            }}
          >
            Nous développons des partenariats basés sur la confiance, la transparence et
            une vision commune du développement. Chaque collaboration est pensée
            pour créer de la valeur durable, en combinant expertises locales et standards
            internationaux.
          </p>

          {/* Divider */}
          <div
            style={{
              width: '48px',
              height: '1px',
              backgroundColor: '#1e2d6b',
              marginBottom: '24px',
              opacity: visible ? 1 : 0,
              transition: 'opacity 1s ease 0.7s',
            }}
          />

          {/* Ambition block */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transition: 'opacity 1s ease 0.8s',
            }}
          >
            <p
              className="uppercase text-black mb-4"
              style={{
                ...coconat,
                fontSize: '20.5px',
                letterSpacing: '0.02em',
                lineHeight: '1.05',
                fontWeight: 400,
              }}
            >
              Une Ambition Commune
            </p>
            <p
            className='max-w-xl'
              style={{
                fontFamily: "'Charis SIL', Georgia, serif",
                fontStyle: 'italic',
                fontWeight: 700,
                fontSize: '18px',
                color: '#1e2d6b',
                lineHeight: '1.45',
              }}
            >
              Contribuer au développement d'infrastructures modernes, durables et créatrices d'opportunités pour l'économie congolaise
            </p>
          </div>
        </div>

        {/* ── Right column — reasons card ── */}
        <div
          style={{
            backgroundColor: '#B3C2E9',
            borderRadius: '14px',
            padding: '40px 40px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1s ease 0.4s, transform 1s ease 0.4s',
          }}
        >
          <div className="flex flex-col" style={{ gap: '28px' }}>
            {REASONS.map((reason, i) => (
              <div
                key={reason.title}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(12px)',
                  transition: `opacity 0.7s ease ${0.5 + i * 0.1}s, transform 0.7s ease ${0.5 + i * 0.1}s`,
                }}
              >
                <p
                  style={{
                    fontFamily: "'Charis SIL', Georgia, serif",
                    fontStyle: 'italic',
                    fontWeight: 700,
                    fontSize: '15px',
                    color: '#1e2d6b',
                    lineHeight: '1.2',
                    marginBottom: '6px',
                  }}
                >
                  {reason.title}
                </p>
                <p
                className='max-w-lg'
                  style={{
                    ...commissioner,
                    fontSize: '15px',
                    fontWeight: 400,
                    lineHeight: '1.55',
                    color: '#1a1a2e',
                    margin: 0,
                  }}
                >
                  {reason.body}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}