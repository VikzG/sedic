import { useNav } from '../App';
import { useState, useCallback, useEffect } from 'react';
import Loader from './Loader';
import HomeCarousel from './HomeCarousel';
import Mission from './Mission';
import Partners from './Partners';
import Details from './Details';
import News from './News';
import Contactform from './Contactform';

const coconat: React.CSSProperties = { fontFamily: 'Coconat, Georgia, serif' };
const commissioner: React.CSSProperties = { fontFamily: 'Commissioner, sans-serif' };

function useIsMobile(breakpoint = 1200) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, [breakpoint]);
  return isMobile;
}

export default function Hero() {
  const { navigate } = useNav();
  const isMobile = useIsMobile();
  const [loaderDone, setLoaderDone] = useState(false);
  const handleLoaderComplete = useCallback(() => setLoaderDone(true), []);

  /* ════════════════════════════════
     MOBILE
  ════════════════════════════════ */
  if (isMobile) {
    return (
      <div>
        <section className="relative min-h-screen flex flex-col justify-end gap-6 pt-24">

          <Loader onComplete={handleLoaderComplete} />

          {/* Background */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              filter: loaderDone ? 'blur(0px)' : 'blur(12px)',
              transition: 'filter 1s ease',
            }}
          >
            <img
              src="/images/bg_hero__1.png"
              alt=""
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center center' }}
            />
          </div>

          {/* ── SEDIC + titre groupés ── */}
          <div
            className="relative z-10 mb-24 flex flex-col items-center px-6"
            style={{
              opacity: loaderDone ? 1 : 0,
              transform: loaderDone ? 'translateY(0)' : 'translateY(20px)',
              transition: loaderDone
                ? 'opacity 0.65s ease 0.1s, transform 0.65s cubic-bezier(0.22,1,0.36,1) 0.1s'
                : 'none',
            }}
          >
            <span
              aria-hidden
              className="text-white uppercase leading-none select-none"
              style={{
                ...coconat,
                fontSize: 'clamp(5rem, 22vw, 8rem)',
                lineHeight: '0.9',
                whiteSpace: 'nowrap',
              }}
            >
              SEDIC
            </span>
            <h1
              className="text-center font-normal text-white tracking-tighter mt-3"
              style={{ ...coconat, fontSize: 'clamp(22px, 7vw, 32px)', lineHeight: '1.2' }}
            >
              Développer, exploiter &amp;<br />
              transformer{' '}
              <em className="italic font-bold text-[#B3C2E9]">durablement</em>
            </h1>
          </div>

          {/* ── Bottom : tagline + description + boutons ── */}
          <div
            className="relative z-10 flex flex-col items-center px-6 pb-12"
            style={{
              opacity: loaderDone ? 1 : 0,
              transform: loaderDone ? 'translateY(0)' : 'translateY(32px)',
              transition: loaderDone
                ? 'opacity 0.65s ease 0.2s, transform 0.65s cubic-bezier(0.22,1,0.36,1) 0.2s'
                : 'none',
            }}
          >
            <p
              className="uppercase text-white text-center mb-3"
              style={{ ...coconat, fontSize: '13px', lineHeight: '1.05', letterSpacing: '0.08em' }}
            >
              La Sedic bâtit le Congo de demain
            </p>
            <p
              className="text-white text-center mb-8"
              style={{ ...commissioner, fontSize: '13.5px', lineHeight: '1.5', letterSpacing: '0', maxWidth: '320px' }}
            >
              Acteur stratégique de référence, nous développons, exploitons et transformons des infrastructures immobilières modernes au service des territoires et des populations de la République du Congo.
            </p>

            {/* Boutons full-width empilés */}
            <div className="flex flex-col gap-3 w-full" style={{ maxWidth: '340px' }}>
              <button
                onClick={() => navigate('contact')}
                disabled
                className="w-full py-3 bg-white/10 backdrop-blur-md border border-white/50 rounded-xl text-white hover:bg-[#E4E4E0] hover:text-[#223078] hover:border-[#E4E4E0] transition-all duration-300"
                style={{ ...coconat, fontSize: '16px', lineHeight: '1', letterSpacing: '-0.01em' }}
              >
                Investir avec nous
              </button>
              <button
                onClick={() => navigate('projects')}
                disabled
                className="w-full py-3 bg-white/10 backdrop-blur-md border border-white/50 rounded-xl text-white hover:bg-[#223078] hover:text-[#E4E4E0] hover:border-[#223078] transition-all duration-300"
                style={{ ...coconat, fontSize: '16px', lineHeight: '1', letterSpacing: '-0.01em' }}
              >
                Parcourir nos projets
              </button>
            </div>
          </div>

        </section>

        <HomeCarousel />
        <Mission />
        <Details />
        <News />
        <Contactform />
      </div>
    );
  }

  /* ════════════════════════════════
     DESKTOP
  ════════════════════════════════ */
  return (
    <div>
      <section className="relative min-h-screen flex flex-col justify-end py-8 px-8">

        <Loader onComplete={handleLoaderComplete} />

        {/* Background image */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            filter: loaderDone ? 'blur(0px)' : 'blur(12px)',
            transition: 'filter 1s ease',
          }}
        >
          <img
            src="/images/bg_hero__1.png"
            alt=""
            className="absolute top-0 right-0 h-full w-auto min-w-full object-cover scale-[1.7] origin-top-right"
          />
        </div>

        {/* SEDIC watermark */}
        <div
          className="absolute inset-0 pointer-events-none select-none flex items-center justify-end pr-[4vw]"
          style={{
            zIndex: 5,
            opacity: loaderDone ? 1 : 0,
            transition: 'opacity 1s ease',
          }}
        >
          <span
            aria-hidden
            className="text-white uppercase leading-none"
            style={{
              ...coconat,
              fontSize: 'clamp(6rem, 16vw, 16rem)',
              lineHeight: '0.85',
              whiteSpace: 'nowrap',
            }}
          >
            SEDIC
          </span>
        </div>

        {/* Bottom content */}
        <div className="relative z-10 w-full pb-14 md:pb-16 px-6 md:px-12">
          <div className="mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-end">

            {/* Left — arrive de gauche */}
            <div
              style={{
                opacity: loaderDone ? 1 : 0,
                transform: loaderDone ? 'translateX(0)' : 'translateX(-40px)',
                transition: loaderDone
                  ? 'opacity 0.65s ease 0.15s, transform 0.65s cubic-bezier(0.22,1,0.36,1) 0.15s'
                  : 'none',
              }}
            >
              <h1
                className="font-normal text-white mb-8 tracking-tighter"
                style={{ ...coconat, fontSize: '38px', lineHeight: '1.15' }}
              >
                Développer, exploiter &amp;<br />
                transformer{' '}
                <em className="italic font-bold text-[#B3C2E9]">durablement</em>
              </h1>

              <div className="flex flex-wrap items-center gap-4">
                <button
                disabled
                  onClick={() => navigate('contact')}
                  aria-label="Contact"
                  className="flex items-center justify-center transition-transform duration-200 hover:scale-110 group"
                >
                  <img
                    src="/logos/contact.svg"
                    alt="Contact"
                    className="h-[30px] w-auto transition-all duration-200"
                    style={{ filter: 'brightness(0) saturate(100%) invert(93%) sepia(10%) saturate(300%) hue-rotate(10deg) brightness(105%)' }}
                    onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(0) saturate(100%) invert(76%) sepia(20%) saturate(600%) hue-rotate(195deg) brightness(105%)')}
                    onMouseLeave={e => (e.currentTarget.style.filter = 'brightness(0) saturate(100%) invert(93%) sepia(10%) saturate(300%) hue-rotate(10deg) brightness(105%)')}
                  />
                </button>
                <button
                disabled
                  onClick={() => navigate('contact')}
                  className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/50 rounded-xl text-white hover:bg-[#E4E4E0] hover:text-[#223078] hover:border-[#E4E4E0] transition-all duration-300"
                  style={{ ...coconat, fontSize: '18px', lineHeight: '1', letterSpacing: '-0.02em' }}
                >
                  Investir avec nous
                </button>
                <button
                disabled
                  onClick={() => navigate('projects')}
                  className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/50 rounded-xl text-white hover:bg-[#223078] hover:text-[#E4E4E0] hover:border-[#223078] transition-all duration-300"
                  style={{ ...coconat, fontSize: '18px', lineHeight: '1', letterSpacing: '-0.02em' }}
                >
                  Parcourir nos projets
                </button>
              </div>
            </div>

            {/* Right — arrive du bas en premier */}
            <div
              className="md:text-right"
              style={{
                opacity: loaderDone ? 1 : 0,
                transform: loaderDone ? 'translateY(0)' : 'translateY(32px)',
                transition: loaderDone
                  ? 'opacity 0.65s ease 0s, transform 0.65s cubic-bezier(0.22,1,0.36,1) 0s'
                  : 'none',
              }}
            >
              <p
                className="uppercase text-white mb-8"
                style={{ ...coconat, fontSize: '20.5px', lineHeight: '1.05', letterSpacing: '0.02em' }}
              >
                La Sedic bâtit le Congo de demain
              </p>
              <p
                className="text-white max-w-lg md:ml-auto"
                style={{ ...commissioner, fontSize: '15px', lineHeight: '1.30', letterSpacing: '0' }}
              >
                Acteur stratégique de référence, nous développons, exploitons et transformons des infrastructures immobilières modernes au service des territoires et des populations de la République du Congo.
              </p>
            </div>

          </div>
        </div>
      </section>

      <HomeCarousel />
      <Mission />
      <Partners />
      <Details />
      <News />
      <Contactform />
    </div>
  );
}