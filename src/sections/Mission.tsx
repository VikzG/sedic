import { useRef, useState, useEffect } from 'react';


const coconat: React.CSSProperties = { fontFamily: 'Coconat, Georgia, serif' };
const commissioner: React.CSSProperties = { fontFamily: 'Commissioner, sans-serif' };
const charisSIL: React.CSSProperties = { fontFamily: "'Charis SIL', 'Georgia', serif" };

const pillars = [
  {
    num: '01',
    label: 'DÉVELOPPER',
    align: 'left' as const,
    desc: 'Concevoir et structurer des programmes immobiliers stratégiques générateurs de revenus durables, au service des besoins du territoire congolais.',
  },
  {
    num: '02',
    label: 'EXPLOITER',
    align: 'center' as const,
    desc: 'Gérer et valoriser un patrimoine immobilier public avec rigueur, en maximisant la performance opérationnelle et la satisfaction des usagers.',
  },
  {
    num: '03',
    label: 'RAYONNER',
    align: 'center' as const,
    desc: "Positionner la SEDIC comme un acteur incontournable du développement territorial, porteur d'une vision moderne et durable pour le Congo.",
  },
  {
    num: '04',
    label: 'PILOTER',
    align: 'right' as const,
    desc: 'Assurer une gouvernance exemplaire des actifs publics grâce à des outils de pilotage performants et une transparence totale dans la gestion.',
  },
];

export default function Mission() {
  const [hovered, setHovered] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const pillarCellRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [cardTop, setCardTop] = useState(0);
  const [pillarHeights, setPillarHeights] = useState<number[]>([0, 0, 0, 0]);

  const [step, setStep] = useState(0);

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
      { threshold: 0.4 }
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

        const heights = pillarCellRefs.current.map(el => el ? el.getBoundingClientRect().height : 0);
        setPillarHeights(heights);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <section
      id="mission"
      ref={sectionRef}
      className="relative flex flex-col overflow-hidden"
      style={{ background: '#0a1628', minHeight: '90vh' }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-bottom bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/images/bg_mission.png')" }}
      />

      {/* Full-column hover zones — cover entire card area including pillar row */}
      {pillars.map(({ num }, i) => (
        <div
          key={`hover-zone-${num}`}
          className="absolute"
          style={{
            left: `${i * 25}%`,
            width: '25%',
            top: cardTop,
            bottom: 0,
            zIndex: 20,
            cursor: 'pointer',
          }}
          onMouseEnter={() => setHovered(num)}
          onMouseLeave={() => setHovered(null)}
        />
      ))}

      {/* Hover cards — positioned from pillars row top to section bottom */}
      {pillars.map(({ num, desc, align }, i) => (
        <div
          key={`card-${num}`}
          className="absolute flex flex-col pointer-events-none"
          style={{
            left: `${i * 25}%`,
            width: '25%',
            top: cardTop,
            bottom: 0,
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            opacity: hovered === num ? 1 : 0,
            transition: 'opacity 0.35s ease',
            zIndex: 1,
          }}
        >
          {/* Transparent spacer matching exact pillar cell height so content starts right below */}
          <div style={{ height: pillarHeights[i] || 0, flexShrink: 0 }} />

          {/* Middle zone: line + text centered, fade in on hover */}
          <div className="flex-1 relative">
            <div
              className="absolute left-0 right-0 px-12"
              style={{
                top: '50%',
                transform: 'translateY(-50%)',
                opacity: hovered === num ? 1 : 0,
                transition: 'opacity 0.4s ease',
              }}
            >
              <div style={{ width: '100%', borderTop: '2px solid #7A9BBF', marginBottom: '1.5rem' }} />
              <p
                style={{
                  ...commissioner,
                  fontSize: '15px',
                  fontWeight: 400,
                  lineHeight: '1.3',
                  letterSpacing: '0',
                  color: 'rgba(255,255,255,0.75)',
                  textAlign: align === 'center' ? 'center' : align === 'right' ? 'right' : 'left',
                }}
              >
                {desc}
              </p>
            </div>
          </div>

          <div className="px-12 pb-10" style={{ position: 'relative', zIndex: 25 }}>
            <button
              className="pointer-events-auto w-full py-3 rounded-xl text-center transition-all duration-300 hover:bg-[#E4E4E0]"
              style={{ ...coconat, fontSize: '18px', lineHeight: '1', letterSpacing: '-0.02em', background: '#7A9BBF', color: '#223078', border: 'none' }}
            >
              En savoir +
            </button>
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
              transform: step >= 1 ? 'translateX(0)' : 'translateX(-80px)',
              transition: 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <h2
              className="font-normal text-white mb-8"
              style={{ ...coconat, fontSize: '38px', lineHeight: '1', letterSpacing: '-0.02em' }}
            >
              Notre mission.
            </h2>
            <button
              className="px-8 py-3 backdrop-blur-md border border-white/50 rounded-xl text-white hover:bg-[#E4E4E0] hover:text-[#223078] hover:border-[#E4E4E0] transition-all duration-300"
              style={{ ...coconat, fontSize: '18px', lineHeight: '1', letterSpacing: '-0.02em' }}
            >
              Découvrir notre vision
            </button>
          </div>

          <div
            className="flex flex-col gap-5 md:text-right"
            style={{
              opacity: step >= 2 ? 1 : 0,
              transform: step >= 2 ? 'translateX(0)' : 'translateX(80px)',
              transition: 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <p
              className="uppercase text-white"
              style={{ ...coconat, fontSize: '20.5px', lineHeight: '1.05', letterSpacing: '0.02em' }}
            >
              <span style={{ color: '#7A9BBF' }}>des actions ciblées</span> pour un impact<br />économique, social et territorial durable
            </p>
            <p
              className="text-white/80 md:ml-auto"
              style={{ ...commissioner, fontSize: '15px', lineHeight: '1.30', letterSpacing: '0' }}
            >
              La SEDIC aspire à devenir l'acteur de référence dans la gestion et le
              développement des infrastructures au<br />Congo, en garantissant la durabilité,
              la valorisation et la performance de ses actifs publics.
            </p>
          </div>
        </div>

        {/* Four pillars — z-30 so num+label always render above the hover cards */}
        <div ref={pillarsRef} className="grid grid-cols-2 md:grid-cols-4">
          {pillars.map(({ num, label, align }, i) => (
            <div
              key={num}
              ref={el => { pillarCellRefs.current[i] = el; }}
              className={`relative z-30 pt-10 pr-8 pb-8 ${i !== 0 ? 'pl-8' : ''} cursor-pointer flex flex-col`}
              style={{
                alignItems: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
                opacity: step >= 3 + i ? 1 : 0,
                transform: step >= 3 + i ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <span
                className="block mb-4 font-bold italic"
                style={{ ...charisSIL, fontSize: '38px', lineHeight: '1', letterSpacing: '-0.02em', color: '#7A9BBF' }}
              >
                {num}
              </span>
              <span
                className="block text-white uppercase"
                style={{ ...coconat, fontSize: '20.5px', lineHeight: '1.05', letterSpacing: '0.02em' }}
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
