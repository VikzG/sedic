// components/ProjectsSwiper.tsx
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

const coconat: React.CSSProperties = { fontFamily: 'Coconat, Georgia, serif' };
const commissioner: React.CSSProperties = { fontFamily: 'Commissioner, sans-serif' };

const SLIDES = [
  { image: '/images/slider/img_slider_1.png', title: 'Centre International\nde Conférences' },
  { image: '/images/slider/img_slider_2.png', title: 'grand hôtel\nde kintélé' },
  { image: '/images/slider/img_slider_3.png', title: 'tours jumelles\nde mpila' },
  { image: '/images/slider/img_slider_4.png', title: 'brazza\nmall' },
];

interface Props {
  height?: number;
  onNavigate?: () => void;
  onSlideChange?: (index: number) => void;
}

export default function ProjectsSwiper({ height = 300, onNavigate, onSlideChange }: Props) {
  // On gère l'index actif nous-mêmes pour éviter le bug isActive du render-prop avec loop
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full">
      <style>{`
        .swiper-projects-shared {
          padding: 10px 0 6px !important;
          /* PAS de overflow:visible — c'est ça qui cause les disparitions avec loop */
          overflow: hidden !important;
        }
        .swiper-projects-shared .swiper-slide {
          border-radius: 10px;
          overflow: hidden;
          /* Hauteur pilotée par la prop, pas par CSS */
        }
        /* Forcer la visibilité des slides clonés (loop) */
        .swiper-projects-shared .swiper-slide-duplicate {
          visibility: visible !important;
          opacity: 1 !important;
        }
      `}</style>

      <Swiper
        modules={[EffectCoverflow]}
        effect="coverflow"
        centeredSlides
        loopAdditionalSlides={1}
        spaceBetween={50}     /* slides de marge pour éviter les trous */
        slidesPerView={1.4}            /* légèrement réduit pour stabiliser le loop */
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 140,
          modifier: 2.2,
          slideShadows: true,
        }}
        onRealIndexChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
          onSlideChange?.(swiper.realIndex);
        }}
        className="swiper-projects-shared"
      >
        {SLIDES.map((slide, i) => (
          <SwiperSlide key={i} style={{ height: `${height}px` }}>
            {/* On compare avec activeIndex géré en state plutôt que le render-prop isActive */}
            {(() => {
              const isActive = i === activeIndex;
              return (
                <div className="relative w-full h-full">
                  {/* Image */}
                  <img
                    src={slide.image}
                    alt={slide.title.replace('\n', ' ')}
                    className="w-full h-full object-cover"
                  />

                  {/* Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />

                  {/* Titre centré verticalement */}
                  <div className="absolute inset-0 flex items-center justify-center px-4">
                    <h3
                      className="text-center text-white uppercase"
                      style={{
                        ...coconat,
                        fontSize: '15px',
                        fontWeight: 400,
                        letterSpacing: '0.06em',
                        lineHeight: '1.3',
                        whiteSpace: 'pre-line',
                        opacity: isActive ? 1 : 0,
                        transition: 'opacity 0.35s ease',
                      }}
                    >
                      {slide.title}
                    </h3>
                  </div>

                  {/* Bouton Parcourir — collé en bas */}
                  {onNavigate && (
                    <div
                      className="absolute bottom-0 left-0 right-0 px-4 pb-4"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transition: 'opacity 0.35s ease',
                      }}
                    >
                      <button
                        onClick={onNavigate}
                        className="w-full backdrop-blur-md px-5 py-1 border border-white/40 rounded-xl text-white active:bg-white/25"
                        style={{
                          ...coconat,
                          fontSize: '18px',
                          letterSpacing: '-0.01em',
                          background: 'rgba(255,255,255,0.10)',
                        }}
                      >
                        Parcourir
                      </button>
                    </div>
                  )}
                </div>
              );
            })()}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}