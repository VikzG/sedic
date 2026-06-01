import { useRef, useEffect, useState } from 'react';

const coconat: React.CSSProperties = { fontFamily: 'Coconat, Georgia, serif' };
const commissioner: React.CSSProperties = { fontFamily: 'Commissioner, sans-serif' };

export default function Partners() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.45 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex overflow-hidden bg-white px-16"
      style={{ height: '1000px' }}
    >
      {/* Left — single image masked into 3 strips, bars animate height */}
      <div className="relative w-1/2" style={{ height: '1000px' }}>
        <svg className="absolute" style={{ width: 0, height: 0 }}>
          <defs>
            <mask id="strips-mask" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
              <rect
                x="0.01" width="0.31" rx="0.005" fill="white"
                y={visible ? '0.67' : '1'}
                height={visible ? '0.32' : '0'}
                style={{ transition: 'y 1.8s cubic-bezier(0.22,1,0.36,1) 0s, height 1.8s cubic-bezier(0.22,1,0.36,1) 0s' }}
              />
              <rect
                x="0.345" width="0.31" rx="0.005" fill="white"
                y={visible ? '0.34' : '1'}
                height={visible ? '0.65' : '0'}
                style={{ transition: 'y 1.8s cubic-bezier(0.22,1,0.36,1) 0.4s, height 1.8s cubic-bezier(0.22,1,0.36,1) 0.4s' }}
              />
              <rect
                x="0.68" width="0.31" rx="0.005" fill="white"
                y={visible ? '0.01' : '1'}
                height={visible ? '0.98' : '0'}
                style={{ transition: 'y 1.8s cubic-bezier(0.22,1,0.36,1) 0.8s, height 1.8s cubic-bezier(0.22,1,0.36,1) 0.8s' }}
              />
            </mask>
          </defs>
        </svg>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://res.cloudinary.com/dynpasxkm/image/upload/q_auto:good/v1780141454/bg_partenaires_gvl5u8.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mask: 'url(#strips-mask)',
            WebkitMask: 'url(#strips-mask)',
          }}
        />
      </div>

      {/* Right — text with staggered fade-in */}
      <div className="w-1/2 flex flex-col px-16 py-24">
        <p
          className="uppercase text-[#1e2d6b] text-center"
          style={{
            ...coconat,
            fontSize: '20.5px',
            lineHeight: '1.05',
            letterSpacing: '0.02em',
            fontWeight: 400,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(-20px)',
            transition: 'opacity 1.2s ease 0.3s, transform 1.2s ease 0.3s',
          }}
        >
          Partenariats
        </p>

        <div className="flex-1 flex flex-col items-center justify-center">
          <h2
            className="font-normal text-black mb-10 text-center"
            style={{
              ...coconat,
              fontSize: 'clamp(32px, 3.5vw, 52px)',
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(-20px)',
              transition: 'opacity 1.2s ease 0.9s, transform 1.2s ease 0.9s',
            }}
          >
            Construire{' '}
            <em style={{ fontFamily: "'Charis SIL', Georgia, serif", fontStyle: 'italic', fontWeight: 700, color: '#1e2d6b', fontSize: '50px', lineHeight: '1', letterSpacing: '-0.02em' }}>ensemble</em>
            <br />
            les infrastructures de
            <br />
            <em style={{ fontFamily: "'Charis SIL', Georgia, serif", fontStyle: 'italic', fontWeight: 700, color: '#1e2d6b', fontSize: '50px', lineHeight: '1', letterSpacing: '-0.02em' }}>demain</em>.
          </h2>

          <p
            className="max-w-lg"
            style={{
              ...commissioner,
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: '1.30',
              letterSpacing: '0.02em',
              textAlign: 'justify',
              color: 'black',
              opacity: visible ? 1 : 0,
              transition: 'opacity 1.2s ease 1.6s',
            }}
          >
            La SEDIC place la collaboration au cœur de son action. Nous travaillons avec des
            partenaires publics et privés pour concevoir, financer, développer et exploiter des
            projets structurants en République du Congo. Forte d'une expertise intégrée sur
            l'ensemble du cycle de projet, la SEDIC est votre interlocuteur privilégié pour
            développer des opportunités durables et créatrices de valeur.
          </p>
        </div>
      </div>
    </section>
  );
}
