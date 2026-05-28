import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState,useRef } from "react";
import useIsMobile from "../components/useIsmobile";
import ContactForm from "./Contactform";

const coconat: React.CSSProperties = { fontFamily: "Coconat, Georgia, serif" };
const commissioner: React.CSSProperties = {
  fontFamily: "Commissioner, sans-serif",
};

type Project = {
  id: number;
  title: string;
  description: string;
  cover: string;
  images: string[];
  url: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "TOURS JUMELLES DE MPILA",
    description: `Projet emblématique de Brazzaville, les Tours Jumelles de Mpila
constituent un pôle moderne intégrant bureaux, services et hôtellerie de
standard international. Véritable hub économique, elles contribuent à
renforcer l’attractivité de la capitale et à structurer un nouveau centre
d’affaires.`,
    cover:
      "https://res.cloudinary.com/dynpasxkm/image/upload/v1779795159/TOUR_1_a7q1hu.png",
    images: [
      "https://res.cloudinary.com/dynpasxkm/image/upload/v1779795159/TOUR_1_a7q1hu.png",
      "https://res.cloudinary.com/dynpasxkm/image/upload/v1779795160/TOUR_2_dnucyl.png",
      "https://res.cloudinary.com/dynpasxkm/image/upload/v1779795160/TOUR_3_b2qqbc.png",
    ],
    url: "https://www.rem-cg.com/fr-fr",
  },
  {
    id: 2,
    title: "CENTRE INTERNATIONAL DE CONFÉRENCES",
    description: `Ce complexe stratégique dédié aux grands événements accueille
conférences, sommets et rencontres internationales. Associé au Grand
Hôtel de Kintélé, il positionne le Congo comme une destination majeure
pour le tourisme d’affaires en Afrique centrale.`,
    cover:
      "https://res.cloudinary.com/dynpasxkm/image/upload/v1779795019/CIC_1_e2rchb.png",
    images: [
      "https://res.cloudinary.com/dynpasxkm/image/upload/v1779795019/CIC_1_e2rchb.png",
      "https://res.cloudinary.com/dynpasxkm/image/upload/v1779795018/CIC_2_xdh7rd.png",
      "https://res.cloudinary.com/dynpasxkm/image/upload/v1779795019/CIC_3_uyqrae.png",
    ],
    url: "http://www.cick-grandhotelkintele.com",
  },
  {
    id: 3,
    title: "BRAZZA MALL",
    description: `Brazza Mall est un centre commercial moderne qui redéfinit l’expérience
du shopping à Brazzaville. En réunissant enseignes locales et
internationales, il dynamise le commerce urbain en proposant offre
commerciale de qualité.`,
    cover:
      "https://res.cloudinary.com/dynpasxkm/image/upload/v1779794701/BRAZZA_1_rfl2xk.jpg",
    images: [
      "https://res.cloudinary.com/dynpasxkm/image/upload/v1779794701/BRAZZA_1_rfl2xk.jpg",
      "https://res.cloudinary.com/dynpasxkm/image/upload/v1779797192/BRAZZA_2_hdlu1f.png",
      "https://res.cloudinary.com/dynpasxkm/image/upload/v1779794702/BRAZZA_3_syol4p.jpg",
    ],
    url: "https://brazza-mall.com",
  },
  {
    id: 4,
    title: "MUSÉE DE L'HISTOIRE NATIONALE",
    description: `Ce projet culturel majeur valorise le patrimoine historique et artistique du Congo.

Il participe au rayonnement culturel du pays et constitue un espace de transmission, de mémoire et d’attractivité touristique.`,
    cover:
      "https://res.cloudinary.com/dynpasxkm/image/upload/v1779795458/MNB_3_vlgnrs.jpg",
    images: [
      "https://res.cloudinary.com/dynpasxkm/image/upload/v1779795458/MNB_3_vlgnrs.jpg",
      "https://res.cloudinary.com/dynpasxkm/image/upload/v1779794608/MNB_1_tcdezq.png",
      "https://res.cloudinary.com/dynpasxkm/image/upload/v1779794608/MNB_2_dyemu0.png",
    ],
    url: "",
  },
  {
    id: 5,
    title: "Vatel Brazzaville",
    description: `Établissement de formation d’excellence, Vatel Brazzaville contribue au
développement des compétences locales dans les métiers de l’hôtellerie
et du tourisme. Il accompagne la professionnalisation du secteur et
soutient l’employabilité des jeunes.`,
    cover:
      "https://res.cloudinary.com/dynpasxkm/image/upload/v1779796357/VATEL_1_hwtxcm.png",
    images: [
      "https://res.cloudinary.com/dynpasxkm/image/upload/v1779796357/VATEL_1_hwtxcm.png",
      "https://res.cloudinary.com/dynpasxkm/image/upload/v1779797188/VATEL_2_sq0uat.png",
      "https://res.cloudinary.com/dynpasxkm/image/upload/v1779797189/VATEL_3_h7xbkz.png",
    ],
    url: "https://www.vatel.cg",
  },
  {
    id: 6,
    title: "Programmes résidentiels de Mpila",
    description: `Ces programmes résidentiels proposent des logements modernes
adaptés aux besoins urbains actuels. Conçus selon des standards
contemporains, ils contribuent à améliorer le cadre de vie et à structurer
le développement de nouveaux quartiers.`,
    cover:
      "https://res.cloudinary.com/dynpasxkm/image/upload/v1779797704/PRM_1_jgnun7.png",
    images: [
      "https://res.cloudinary.com/dynpasxkm/image/upload/v1779797704/PRM_1_jgnun7.png",
      "https://res.cloudinary.com/dynpasxkm/image/upload/v1779797705/PRM_2_prilgj.png",
      "https://res.cloudinary.com/dynpasxkm/image/upload/v1779797706/PRM_3_d6qtye.png",
    ],
    url: "https://icazi.com",
  },
  {
    id: 7,
    title: "Résidence Les Flamboyants",
    description: `La résidence Les Flamboyants offre un cadre de vie alliant confort,
modernité et qualité. Ce projet s’inscrit dans la dynamique de d’expansion
d’une offre résidentielle durable et qualitative à Brazzaville.`,
    cover:
      "https://res.cloudinary.com/dynpasxkm/image/upload/v1779796358/RLF_1_pnrpb6.png",
    images: [
      "https://res.cloudinary.com/dynpasxkm/image/upload/v1779796358/RLF_1_pnrpb6.png",
      "https://res.cloudinary.com/dynpasxkm/image/upload/v1779797191/RLF_2_facsrs.png",
      "https://res.cloudinary.com/dynpasxkm/image/upload/v1779797190/RLF_3_d1b2fm.png",
    ],
    url: "https://icazi.com",
  },
];

function ProjectsDesktop() {
  const [activeId, setActiveId] = useState(1);

  const activeProject = useMemo(
    () => projects.find((p) => p.id === activeId)!,
    [activeId],
  );

  const [selectedImage, setSelectedImage] = useState(activeProject.cover);

  const handleOpen = (project: Project) => {
    setActiveId(project.id);
    setSelectedImage(project.cover);
  };

  return (
    <div>
      <section className="w-full bg-white pt-32">
        {/* HEADER */}
        <div className="mx-auto mb-16 max-w-6xl px-6 text-center">
          <p
            className="mb-3 text-sm uppercase tracking-[0.25em] text-[#304674]"
            style={{
              ...coconat,
              fontSize: "20.5px",
              letterSpacing: "0.02em",
              lineHeight: "1.05",
              textTransform: "uppercase",
              fontWeight: 400,
              transition: "margin-bottom 0.45s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            NOS PROJETS
          </p>

          <h2
            style={{
              ...coconat,
              fontSize: "clamp(30px, 4vw, 38px)",
              lineHeight: "1.1",
              letterSpacing: "-0.02em",
              transition: "opacity 1.2s ease 0.4s, transform 1.2s ease 0.4s",
            }}
            className="text-3xl font-light text-[#0f1720] md:text-5xl"
          >
            Des infrastructures qui façonnent{" "}
            <span
              style={{
                fontFamily: "'Charis SIL', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 700,
                color: "#1e2d6b",
                fontSize: "clamp(34px, 4.5vw, 38px)",
                lineHeight: "1",
                letterSpacing: "-0.02em",
              }}
              className="italic text-[#304674]"
            >
              le Congo de demain.
            </span>
          </h2>
        </div>

        {/* ACCORDION */}
        <div className="mx-auto flex h-[1500px] w-full flex-col overflow-hidden rounded-none">
          {projects.map((project) => {
            const isActive = activeId === project.id;

            return (
              <motion.div
                key={project.id}
                layout
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`relative overflow-hidden border-b border-white/10 ${
                  isActive ? "flex-[7]" : "flex-1"
                }`}
              >
                {/* CLOSED */}
                {!isActive && (
                  <motion.button
                    whileHover="hover"
                    initial="rest"
                    animate="rest"
                    onClick={() => handleOpen(project)}
                    className="group relative h-full w-full cursor-pointer overflow-hidden"
                  >
                    <motion.img
                      variants={{
                        rest: { scale: 1 },
                        hover: { scale: 1.05 },
                      }}
                      transition={{ duration: 0.5 }}
                      src={project.cover}
                      className="absolute inset-0 h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/45 transition-all duration-700 group-hover:bg-black/30" />

                    <motion.div
                      variants={{
                        rest: { y: 0 },
                        hover: { y: -6 },
                      }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <h3
                        style={{
                          ...coconat,
                          fontSize: "clamp(18px, 4vw, 20.5px)",
                          lineHeight: "1.1",
                          letterSpacing: "-0.02em",
                          transition:
                            "opacity 1.2s ease 0.4s, transform 1.2s ease 0.4s",
                        }}
                        className="px-4 text-center text-sm font-light uppercase tracking-[0.18em] text-white md:text-lg"
                      >
                        {project.title}
                      </h3>
                    </motion.div>
                  </motion.button>
                )}

                {/* OPEN */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      key="open"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.6,
                      }}
                      className="relative h-full"
                    >
                      {/* LEFT PANEL */}
                      {/* LEFT PANEL */}
                      <motion.div
                        initial={{ x: -60, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-0 top-0 z-20 flex h-full w-full max-w-[520px] flex-col overflow-hidden border-r border-white/10 bg-white/10 backdrop-blur-2xl"
                      >
                        {/* subtle dark overlay */}
                        <div className="absolute inset-0 bg-black/20" />

                        {/* CONTENT — 2/3 supérieurs, centré */}
                        <div className="relative z-10 flex flex-[2] flex-col items-start justify-center p-8 md:p-12">
                          <div className="max-w-md">
                            <motion.h3
                              initial={{ y: 30, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.1 }}
                              className="mb-6 text-xl font-light uppercase tracking-[0.15em] text-white md:text-3xl"
                              style={{
                                ...coconat,
                                fontSize: "clamp(18px, 4vw, 20.5px)",
                                lineHeight: "1.1",
                                letterSpacing: "-0.02em",
                              }}
                            >
                              {project.title}
                            </motion.h3>

                            <motion.p
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.2 }}
                              className="mb-8 text-sm leading-relaxed text-white/85 md:text-base"
                              style={{
                                ...commissioner,
                                fontSize: "15px",
                                lineHeight: "1.30",
                                letterSpacing: "0",
                              }}
                            >
                              {project.description}
                            </motion.p>

                            <motion.a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.04 }}
                              whileTap={{ scale: 0.98 }}
                              className="inline-block rounded-xl border border-white/40 px-6 py-2 text-sm text-white backdrop-blur-md transition-all hover:border-none hover:bg-[#223078]"
                              style={{
                                ...coconat,
                                fontSize: "18px",
                                lineHeight: "1.1",
                                letterSpacing: "-0.02em",
                              }}
                            >
                              Voir le site
                            </motion.a>
                          </div>
                        </div>

                        {/* THUMBNAILS — 1/3 inférieur, pleine largeur */}
                        <div className="relative z-10 flex flex-[1] items-center bg-white px-4 gap-3">
                          {project.images.map((img, index) => {
                            const isSelected = selectedImage === img;
                            return (
                              <motion.button
                                key={index}
                                layout
                                transition={{
                                  duration: 0.55,
                                  ease: [0.22, 1, 0.36, 1],
                                }}
                                onMouseEnter={() => setSelectedImage(img)}
                                onClick={() => setSelectedImage(img)}
                                className={`relative overflow-hidden bg-neutral-200 h-4/5 ${
                                  isSelected ? "flex-[2]" : "flex-1"
                                }`}
                              >
                                <motion.img
                                  whileHover={{ scale: 1.06 }}
                                  transition={{ duration: 0.7 }}
                                  src={img}
                                  className="h-full w-full object-cover"
                                />
                                {!isSelected && (
                                  <div className="absolute inset-0 bg-black/10" />
                                )}
                              </motion.button>
                            );
                          })}
                        </div>
                        {/* RIGHT EDGE SVG — centré verticalement sur la bordure droite */}
                      </motion.div>
                      <motion.div
                        className="absolute left-[500px] top-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
                        animate={{
                          rotate: selectedImage === project.cover ? 0 : 180,
                        }}
                        transition={{
                          duration: 0.7,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <img
                          src="/logos/star_wheel.svg"
                          className="h-10 w-10"
                          style={{ filter: "brightness(0) invert(1)" }}
                          alt=""
                        />
                      </motion.div>

                      {/* RIGHT IMAGE */}
                      <motion.div
                        initial={{ scale: 1.08 }}
                        animate={{ scale: 1 }}
                        transition={{
                          duration: 0.8,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="relative h-full overflow-hidden"
                      >
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={selectedImage}
                            src={selectedImage}
                            initial={{ opacity: 0, scale: 1.06 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                              duration: 0.8,
                            }}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        </AnimatePresence>

                        {/* cinematic overlay */}
                        <div className="absolute inset-0" />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>
      <ContactForm />
    </div>
  );
}

function ProjectsMobile() {
  const [activeId, setActiveId]       = useState(0);
  const [selectedImage, setSelectedImage] = useState(projects[0].cover);
  const [direction, setDirection]     = useState(1); // 1 = next, -1 = prev
 
  // Touch swipe
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
 
  const project = projects[activeId];
  const total   = projects.length;
 
  const goTo = (idx: number, dir: number) => {
    const next = (idx + total) % total;
    setDirection(dir);
    setActiveId(next);
    setSelectedImage(projects[next].cover);
  };
 
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
 
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    const dy = Math.abs(touchStartY.current - e.changedTouches[0].clientY);
    // Swipe horizontal seulement si dx > 40px et plus horizontal que vertical
    if (Math.abs(dx) > 40 && Math.abs(dx) > dy) {
      dx > 0 ? goTo(activeId + 1, 1) : goTo(activeId - 1, -1);
    }
  };
 
  /* Variants pour le slide */
  const variants = {
    enter:  (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };
 
  return (
    <div>
      <section className="bg-white pt-20">
 
        {/* HEADER */}
        <div className="px-6 mb-8 text-center">
          <p className="uppercase text-[#1e2d6b] mb-3" style={{ ...coconat, fontSize: "16px", letterSpacing: "0.08em" }}>
            NOS PROJETS
          </p>
          <h2 style={{ ...coconat, fontSize: "26px", lineHeight: "0.95", letterSpacing: "-0.04em" }}>
            Des infrastructures qui façonnent{" "}
            <em style={{ fontFamily: "'Charis SIL', Georgia, serif", fontStyle: "italic", fontWeight: 700, color: "#1e2d6b" }}>
              le Congo de demain.
            </em>
          </h2>
        </div>
 
        {/* CARD SLIDER */}
        <div
          className="relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={project.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col"
            >
              {/* MAIN IMAGE */}
              <div className="relative w-full overflow-hidden" style={{ height: "350px" }}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={selectedImage}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0  flex items-start justify-center pt-6 px-6">
                  <h3 className="uppercase text-center text-white"
                    style={{ ...coconat, fontSize: "16px", lineHeight: "1.15", letterSpacing: "-0.01em" }}>
                    {project.title}
                  </h3>
                </div>
              </div>
 
              {/* BLOC BAS — fond flouté + overlay + contenu */}
              <div className="relative overflow-hidden">
 
                {/* Fond flouté */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={selectedImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
                    style={{ filter: "blur(18px)", transform: "scale(1.15)" }}
                  />
                </AnimatePresence>
 
                {/* Overlay sombre */}
                <div className="absolute inset-0 bg-black/50 pointer-events-none" />
 
                {/* ── Tout le contenu en relative z-10 ── */}
                <div className="relative z-10 flex flex-col">
 
                  {/* THUMBNAILS */}
                  <div
                    style={{
                      overflowX: "auto",
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                      paddingTop: "10px",
                      paddingLeft: "8px",
                      paddingRight: "8px",
                    }}
                  >
                    <div className="flex gap-2" style={{ width: "max-content" }}>
                      {project.images.map((img, i) => {
                        const active = selectedImage === img;
                        return (
                          <motion.button
                            key={i}
                            onClick={() => setSelectedImage(img)}
                            className="overflow-hidden rounded-sm flex-shrink-0"
                            animate={{ opacity: active ? 1 : 0.55, scale: active ? 1 : 0.95 }}
                            transition={{ duration: 0.3 }}
                            style={{ width: "140px", height: "100px" }}
                          >
                            <img src={img} className="w-full h-full object-cover" />
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
 
                  {/* TEXTE + BOUTON SITE */}
                  <div className="px-5 py-5 text-center">
                    <p style={{ ...commissioner, fontSize: "13px", lineHeight: "1.45", color: "white" }}>
                      {project.description}
                    </p>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex py-1 items-center justify-center border border-white rounded-lg w-full backdrop-blur-sm"
                        style={{ color: "white", background: "rgba(255,255,255,0.08)", ...coconat, fontSize: "16px" }}
                      >
                        Voir le site
                      </a>
                    )}
                  </div>
 
                  {/* NAVIGATION */}
                  <div className="flex items-center justify-between px-5 pb-5">
                    <button
                      onClick={() => goTo(activeId - 1, -1)}
                      className="rounded-full border border-white transition-all active:scale-95 backdrop-blur-md"
                      style={{ width: "25px", height: "25px", background: "rgba(255,255,255,0.1)" }}
                      aria-label="Projet précédent"
                    />
                    <span className="text-white/70 tabular-nums"
                      style={{ ...commissioner, fontSize: "15px", letterSpacing: "0.1em" }}>
                      {activeId + 1}/{total}
                    </span>
                    <button
                      onClick={() => goTo(activeId + 1, 1)}
                      className="rounded-full border border-white transition-all active:scale-95 backdrop-blur-md"
                      style={{ width: "25px", height: "25px", background: "rgba(255,255,255,0.1)" }}
                      aria-label="Projet suivant"
                    />
                  </div>
 
                </div>{/* fin relative z-10 */}
              </div>{/* fin bloc bas */}
 
            </motion.div>
          </AnimatePresence>
        </div>
 
      </section>
      <ContactForm />
    </div>
  );
}


export default function ProjectsSection() {
  const isMobile = useIsMobile();

  return isMobile ? <ProjectsMobile /> : <ProjectsDesktop />;
}
