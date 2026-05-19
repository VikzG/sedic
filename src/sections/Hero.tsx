import { useNav } from '../App';
import HomeCarousel from './HomeCarousel';
import Mission from './Mission';
import Partners from './Partners';
import Details from './Details';
import News from './News';

const coconat: React.CSSProperties = { fontFamily: 'Coconat, Georgia, serif' };
const commissioner: React.CSSProperties = { fontFamily: 'Commissioner, sans-serif' };

export default function Hero() {
  const { navigate } = useNav();
  return (
    <div>
    <section
      className="relative min-h-screen flex flex-col justify-end py-8 px-8"
    >
      {/* Background image */}
<div className="absolute inset-0 overflow-hidden">
  <img
    src="/images/bg_hero__1.png"
    alt=""
    className="
      absolute
      top-0
      right-0
      h-full
      w-auto
      min-w-full
      object-cover
      scale-[1.7]
      origin-top-right
    "
  />
</div>


      {/* "SEDIC" watermark — occupies right half, sized to always fit */}
      <div className="absolute inset-0 pointer-events-none select-none flex items-center justify-end pr-[4vw]">
        <span
          aria-hidden
          className="text-white uppercase leading-none"
          style={{ ...coconat, fontSize: 'clamp(6rem, 16vw, 16rem)', lineHeight: '0.85', whiteSpace: 'nowrap' }}
        >
          SEDIC
        </span>
      </div>

      {/* Bottom content row */}
      <div className="relative z-10 w-full pb-14 md:pb-16 px-6 md:px-12">
        <div className="mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-end">

          {/* Left — headline + CTA */}
          <div>
            <h1
              className="font-normal text-white mb-8 tracking-tighter"
              style={{
                ...coconat,
                fontSize: '38px',
                lineHeight: '1.15',
              }}
            >
              Développer, exploiter &amp;<br />
              transformer{' '}
              <em className="italic font-bold text-[#B3C2E9]">durablement</em>
            </h1>

            <div className="flex flex-wrap items-center gap-4">
              {/* Contact envelope — same SVG as nav, beige tint, scale + grey-blue on hover */}
              <button
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
                onClick={() => navigate('contact')}
                className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/50 rounded-xl text-white hover:bg-[#E4E4E0] hover:text-[#223078] hover:border-[#E4E4E0] transition-all duration-300"
                style={{ ...coconat, fontSize: '18px', lineHeight: '1', letterSpacing: '-0.02em' }}
              >
                Investir avec nous
              </button>

              <button
                onClick={() => navigate('projects')}
                className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/50 rounded-xl text-white hover:bg-[#223078] hover:text-[#E4E4E0] hover:border-[#223078] transition-all duration-300"
                style={{ ...coconat, fontSize: '18px', lineHeight: '1', letterSpacing: '-0.02em' }}
              >
                Parcourir nos projets
              </button>
            </div>
          </div>

          {/* Right — tagline + descriptor */}
          <div className="md:text-right">
            {/* "La Sedic bâtit le Congo de demain" */}
            <p
              className="uppercase text-white mb-8"
              style={{
                ...coconat,
                fontSize: '20.5px',
                lineHeight: '1.05',
                letterSpacing: '0.02em',
              }}
            >
              La Sedic bâtit le Congo de demain
            </p>

            {/* Descriptor */}
            <p
              className="text-white max-w-lg md:ml-auto"
              style={{
                ...commissioner,
                fontSize: '15px',
                lineHeight: '1.30',
                letterSpacing: '0',
              }}
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
    </div>
  );
}
