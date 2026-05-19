import { useState, useEffect, useRef } from 'react';
import { useNav } from '../App';

const coconat: React.CSSProperties = { fontFamily: 'Coconat, Georgia, serif' };
const commissioner: React.CSSProperties = { fontFamily: 'Commissioner, sans-serif' };
const charisSil: React.CSSProperties = { fontFamily: "'Charis SIL', Charter, Georgia, serif" };

const SLIDES = [
  {
    image: '/images/slider/img_slider_1.png',
    title: 'Centre International\nde Conférences',
  },
  {
    image: '/images/slider/img_slider_2.png',
    title: 'grand hôtel\nde kintélé',
  },
  {
    image: '/images/slider/img_slider_3.png',
    title: 'tours jumelles\nde mpila',
  },
  {
    image: '/images/slider/img_slider_4.png',
    title: 'brazza\nmall',
  },
];

const INTERVAL = 4000;

export default function HomeCarousel() {
  const { navigate } = useNav();
  const [active, setActive] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [wheelRotation, setWheelRotation] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [wheelPos, setWheelPos] = useState({ right: 0, top: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && step === 0) {
          setStep(1);
          setTimeout(() => setStep(2), 900);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [step]);

  const advance = (to: number) => {
    if (animating) return;
    setAnimating(true);
    setNextIndex(to);
    setWheelRotation(prev => prev + 36);
  };

  useEffect(() => {
    if (!animating || nextIndex === null) return;
    const t = setTimeout(() => {
      setActive(nextIndex);
      setNextIndex(null);
      setAnimating(false);
    }, 650);
    return () => clearTimeout(t);
  }, [animating, nextIndex]);

  const updateWheelPos = () => {
    if (!carouselRef.current || !panelRef.current) return;
    const carousel = carouselRef.current.getBoundingClientRect();
    const panel = panelRef.current.getBoundingClientRect();
    setWheelPos({
      right: panel.right - carousel.right,
      top: carousel.top - panel.top + carousel.height / 2,
    });
  };

  useEffect(() => {
    updateWheelPos();
    const observer = new ResizeObserver(updateWheelPos);
    if (carouselRef.current) observer.observe(carouselRef.current);
    if (panelRef.current) observer.observe(panelRef.current);
    window.addEventListener('resize', updateWheelPos);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateWheelPos);
    };
  }, []);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive(prev => {
        const next = (prev + 1) % SLIDES.length;
        advance(next);
        return prev;
      });
    }, INTERVAL);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []); // eslint-disable-line

  const handleDot = (i: number) => {
    advance(i);
    startTimer();
  };

  return (
    <section ref={sectionRef} className="relative flex flex-col md:flex-row bg-[#F5F4F0] items-stretch py-8 px-4 overflow-hidden min-h-[900px]">

      {/* ── Left — image carousel ────────────────────────────── */}
      <div
        ref={panelRef}
        className="flex-shrink-0 flex items-center justify-center"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: hovered ? '100%' : '760px',
          zIndex: hovered ? 20 : 1,
          paddingTop: '2rem',
          paddingBottom: '2.5rem',
          paddingLeft: '3.5rem',
          paddingRight: '3.5rem',
          transition: 'width 0.7s cubic-bezier(0.22,1,0.36,1)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          ref={carouselRef}
          id="carousel-box"
          className="relative w-full h-full overflow-hidden"
        >

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
                alt={slide.title.replace('\n', ' ')}
                className="w-full h-full object-cover"
                style={{
                  transform: isCurrent ? 'scale(1.06)' : 'scale(1)',
                  transition: isCurrent ? 'transform 5s ease-out' : 'none',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/30 to-black/10" />
            </div>
          );
        })}

        {/* Centered title overlay */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-8 pointer-events-none">
          <div className="relative w-full flex items-center justify-center" style={{ minHeight: '5rem' }}>
            {SLIDES.map((slide, i) => {
              const isCurrent = i === active;
              const isNext = i === nextIndex;
              const visible = (isCurrent && !animating) || isNext;
              return (
                <h2
                  key={i}
                  className="absolute text-center text-white uppercase"
                  style={{
                    ...coconat,
                    fontSize: '20.5px',
                    fontWeight: 400,
                    fontStyle: 'normal',
                    letterSpacing: '0.02em',
                    lineHeight: '1.05',
                    whiteSpace: 'pre-line',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : isNext ? 'translateY(10px)' : 'translateY(-10px)',
                    transition: 'opacity 0.5s ease, transform 0.5s ease',
                  }}
                >
                  {slide.title}
                </h2>
              );
            })}
          </div>

          {/* CTA */}
          <button
            onClick={() => navigate('projects')}
            className="pointer-events-auto bg-white/10 backdrop-blur-md mt-7 px-6 py-3 border border-white/50 rounded-xl text-white hover:bg-[#E4E4E0] hover:text-[#223078] hover:border-[#E4E4E0] transition-all duration-300"
            style={{ ...coconat, fontSize: '18px', lineHeight: '1', letterSpacing: '-0.02em' }}
          >
            Parcourir tous nos projets
          </button>
        </div>

        {/* Counter */}
        <div
          className="absolute top-4 right-4 z-10 text-white/60 tabular-nums"
          style={{ ...commissioner, fontSize: '11px', letterSpacing: '0.1em' }}
        >
          {String(active + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
        </div>
        </div>{/* end relative slider box */}

        {/* Star wheel — calé sur le bord droit du carousel-box, centré verticalement */}
        <div
          className="absolute z-30 pointer-events-none"
          style={{
            right: wheelPos.right,
            top: wheelPos.top,
            transform: 'translateX(50%) translateY(-50%)',
          }}
        >
          <img
            src="/logos/star_wheel.svg"
            alt=""
            width={64}
            height={64}
            style={{
              transform: `rotate(${wheelRotation}deg)`,
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        </div>

      </div>{/* end left panel */}


      {/* Spacer to offset the absolute-positioned left panel */}
      <div className="w-full md:w-[760px] flex-shrink-0" />

      {/* ── Right — editorial text ───────────────────────────── */}
      <div className="flex flex-col justify-between items-end text-right px-6 md:px-10 lg:px-16 py-8 md:py-10 flex-1 min-w-0 self-stretch">

        {/* Titre-Desktop — aligné en haut, même padding que le slider */}
        <div
          className="w-full pt-8 md:pt-14"
          style={{
            opacity: step >= 1 ? 1 : 0,
            transform: step >= 1 ? 'translateX(0)' : 'translateX(-80px)',
            transition: 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <h2
            className="font-normal text-black text-right"
            style={{
              ...coconat,
              fontSize: '38px',
              fontWeight: 400,
              lineHeight: '1',
              letterSpacing: '-0.02em',
            }}
          >
            Derrière les grands projets qui<br />
            transforment{' '}
            <em
              className="text-corpo-blue"
              style={{
                fontFamily: "'Charis SIL', Charter, Georgia, serif",
                fontSize: '38px',
                fontWeight: 700,
                fontStyle: 'italic',
                lineHeight: '1',
                letterSpacing: '-0.02em',
              }}
            >
              Brazzaville…
            </em>
          </h2>
        </div>

        {/* Groupe bas */}
        <div
          className="w-full flex flex-col items-end gap-6"
          style={{
            opacity: step >= 2 ? 1 : 0,
            transform: step >= 2 ? 'translateY(0)' : 'translateY(60px)',
            transition: 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >


          {/* Sous-titre-Desktop */}
          <p
            className="uppercase text-[#223078] text-right"
            style={{
              ...coconat,
              fontSize: '20.5px',
              fontWeight: 400,
              lineHeight: '1.05',
              letterSpacing: '0.02em',
            }}
          >
            L'exigence d'un acteur clé<br className="hidden md:block" /> au service du développement
          </p>

          {/* Legend-Desktop */}
          <p
            className="max-w-xl ml-auto text-right text-[#223078]"
            style={{
              fontFamily: "'Charis SIL', Charter, Georgia, serif",
              fontSize: '15px',
              fontWeight: 700,
              fontStyle: 'italic',
              lineHeight: '1.2',
              letterSpacing: '0',
            }}
          >
            Opérateur public de référence, elle développe, exploite et transforme les grands projets immobiliers structurants de la République du Congo.
          </p>

          {/* Corps-Desktop — noir */}
          <p
            className="max-w-xl ml-auto text-right text-black"
            style={{
              ...commissioner,
              fontSize: '15px',
              fontWeight: 400,
              lineHeight: '1.3',
              letterSpacing: '0',
            }}
          >
            À travers ses initiatives, elle améliore le cadre de vie des populations et concrétise les ambitions des programmes immobiliers commerciaux, en incarnant le pilier 6 du Plan National de Développement 2022–2026, dédié au développement des infrastructures et à l'aménagement du territoire. Portée par des valeurs d'excellence et d'engagement, la SEDIC agit comme un véritable levier de modernisation et de rayonnement économique du pays.
          </p>

          {/* Bouton — défaut : corpo blue bg + blanc / hover : blanc bg + corpo blue */}
          <button
            onClick={() => navigate('about')}
            className="px-6 py-3 border border-[#223078] rounded-xl bg-[#223078] text-white hover:bg-white hover:text-[#223078] transition-all duration-300"
            style={{ ...coconat, fontSize: '18px', lineHeight: '1', letterSpacing: '-0.02em' }}
          >
            Découvrir l'entreprise
          </button>

        </div>
      </div>
    </section>
  );
}
