import { useEffect, useRef, useState } from 'react';
import Lastnews from './Lastnews';
import ContactForm from './Contactform';

export default function News() {
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
    <div>
    <section style={{ minHeight: '1000px' }} className="bg-white pt-32" ref={sectionRef}>
      {/*
        Outer wrapper: centres the fixed-width composition and clips overflow.
        The entire image composition is fixed at 1200px wide (= 80% of 1500px,
        the viewport width where the layout is perfect). Nothing scales.
      */}
      <div className="relative w-full overflow-hidden">

        {/* Title — sits behind bg_front (z:1) */}
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

        {/*
          Fixed-size composition frame: 1200 × 360px, centred.
          bg_back fills it exactly. bg_front overflows upward (no clip here).
        */}
        <div
          style={{
            position: 'relative',
            width: '1200px',
            height: '360px',
            margin: '0 auto',
            zIndex: 2,
          }}
        >
          {/* bg_back — clipped to the frame */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              overflow: 'hidden',
            }}
          >
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
                /* starts 120px below its resting position */
                transform: triggered ? 'translateY(0px)' : 'translateY(150px)',
                transition: triggered
                  ? 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)'
                  : 'none',
                willChange: 'transform',
              }}
            />
          </div>

          {/*
            bg_front travels the same 120px at the start, then continues
            an extra -198px upward so the building top clears the frame
            and reaches the title letters above.
            translateY values are stacked on translateX(-50%) for centering.

            start : same +120px as bg_back (in sync at bottom)
            end   : -198px (building top overshoots frame by ~55% of 360px)
          */}
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
              transition: triggered
                ? 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)'
                : 'none',
              willChange: 'transform',
            }}
          />
        </div>
      </div>

      {/* Caption block */}
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
          <span
            className="text-[#1e2d6b] uppercase"
            style={{
              fontFamily: 'Coconat, Georgia, serif',
              fontSize: '20.5px',
              fontWeight: 400,
              lineHeight: '1.05',
              letterSpacing: '0.02em',
            }}
          >
            AVRIL
          </span>

          <div className="flex-1 text-center px-0 md:px-12">
            <h3
              className="font-normal text-[#1a1a1a] mb-6 text-center"
              style={{
                fontFamily: 'Coconat, Georgia, serif',
                fontSize: 'clamp(24px, 3vw, 38px)',
                fontWeight: 400,
                lineHeight: '1',
                letterSpacing: '-0.02em',
              }}
            >
              Cérémonie d&apos;ouverture du{' '}
              <span className="text-[#1e2d6b]">Musée National</span>
            </h3>
          </div>

          <span
            className="text-[#1e2d6b] uppercase self-start md:self-auto"
            style={{
              fontFamily: 'Coconat, Georgia, serif',
              fontSize: '20.5px',
              fontWeight: 400,
              lineHeight: '1.05',
              letterSpacing: '0.02em',
            }}
          >
            2026
          </span>
        </div>
      </div>
    </section>
    <Lastnews />
    <ContactForm />
    </div>
  );
}
