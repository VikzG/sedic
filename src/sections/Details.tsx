import { useEffect, useRef, useState } from 'react';

const coconat: React.CSSProperties = { fontFamily: 'Coconat, Georgia, serif' };

const CARDS = [
  { icon: '/images/icons_details_cards/card_1.svg', label: 'INVESTISSEMENT &\nCO-INVESTISSEMENT' },
  { icon: '/images/icons_details_cards/card_2.svg', label: 'DÉVELOPPEMENT\nIMMOBILIER' },
  { icon: '/images/icons_details_cards/card_3.svg', label: 'EXPLOITATION HÔTELIÈRE\n& COMMERCIALE' },
  { icon: '/images/icons_details_cards/card_4.svg', label: "GESTION D'ACTIFS" },
  { icon: '/images/icons_details_cards/card_5.svg', label: 'FORMATION &\nDÉVELOPPEMENT DES\nCOMPÉTENCES' },
  { icon: '/images/icons_details_cards/card_6.svg', label: 'CULTURE & INDUSTRIES\nCRÉATIVES' },
];

export default function Details() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) {
          setVisible(true);
        }
      },
      { threshold: 0.9 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-start overflow-hidden"
      style={{ minHeight: '80vh' }}
    >
      {/* Background image */}
      <img
        src="/images/bg_details.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
      />

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(200,215,235,0.45) 0%, transparent 45%)',
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center pt-20 px-8 text-center w-full"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0px)' : 'translateY(30px)',
          transition: 'opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1), transform 1.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >

        {/* Heading */}
        <h2 className="mb-8" style={{ lineHeight: 1 }}>
          <em
            style={{
              fontFamily: "'Charis SIL', Georgia, serif",
              fontStyle: 'italic',
              fontWeight: 700,
              fontSize: '38px',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              display: 'block',
            }}
          >
            Nous recherchons
          </em>
          <span
            style={{
              ...coconat,
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '38px',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              display: 'block',
            }}
          >
            des partenariats solides.
          </span>
        </h2>

        {/* Button — default: corpo blue bg + beige text / hover: beige bg + corpo blue text */}
        <button
          className="group px-32 py-3 rounded-xl bg-[#223078] text-[#E4E4E0] hover:bg-[#E4E4E0] hover:text-[#223078] transition-all duration-300"
          style={{ ...coconat, fontSize: '18px', lineHeight: 1, letterSpacing: '-0.02em', marginBottom: '56px' }}
        >
          Devenir partenaire
        </button>

        {/* Cards grid */}
        <div className="grid grid-cols-3 gap-5 w-full pb-20 px-8">
          {CARDS.map((card) => (
            <div
              key={card.label}
              className="flex flex-col items-center justify-center text-center px-2 py-20 rounded-lg cursor-pointer transition-all duration-300"
              style={{
                background: 'rgba(34, 48, 150, 0.12) ',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '2px solid white',
              }}
            >
              <img
                src={card.icon}
                alt=""
                className="mb-5 select-none"
                style={{ width: '70px', height: '70px', objectFit: 'contain' }}
              />
              <p
                style={{
                  ...coconat,
                  fontSize: '20.5px',
                  fontWeight: 400,
                  fontStyle: 'normal',
                  letterSpacing: '0.02em',
                  lineHeight: '1.05',
                  color: '#ffffff',
                  whiteSpace: 'pre-line',
                  textTransform: 'uppercase',
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
