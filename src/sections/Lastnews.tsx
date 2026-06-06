import { useState, useEffect, useRef } from "react";

const coconat: React.CSSProperties = { fontFamily: "Coconat, Georgia, serif" };
const commissioner: React.CSSProperties = {
  fontFamily: "Commissioner, sans-serif",
};

const NEWS = [
  {
    id: 1,
    label: "ANNONCE",
    title: "Mot de la Directrice Générale",
    description: `Chers visiteurs, chers partenaires,
C'est avec un réel plaisir que je vous souhaite la bienvenue sur le site officiel de la Société d'Exploitation et de Développement des Infrastructures du Congo (SEDIC).

À la SEDIC, nous portons la conviction profonde que le développement des infrastructures constitue l'un des piliers essentiels de la transformation économique et sociale de notre pays. Chaque jour, nos équipes se mobilisent avec passion, professionnalisme et engagement pour donner vie à des projets structurants qui façonnent le visage d'un Congo moderne, attractif et inclusif.

Notre mission s'articule autour de trois ambitions fortes : valoriser le patrimoine immobilier et culturel, stimuler les investissements et les partenariats durables, et offrir aux Congolais des espaces de vie, de loisirs et d'affaires répondant aux standards les plus élevés de qualité et d'innovation.

Bénédicte Myriam DENGUET-ATTICKY
Directrice Générale`,
    photo:
      "https://res.cloudinary.com/dynpasxkm/image/upload/f_auto/v1780405972/news_1_mwxzle.webp",
    thumb:
      "https://res.cloudinary.com/dynpasxkm/image/upload/f_auto/v1780405972/news_1_mwxzle.webp",
  },
  {
    id: 2,
    label: "CULTURE",
    title: "Réception complète du Musée de l'Histoire nationale",
    description: `La SEDIC a marqué une étape importante avec la cérémonie d'ouverture du Musée de l'Histoire nationale de Mpila, un projet structurant dédié à la valorisation du patrimoine culturel et historique du Congo.

Les travaux ont été achevés à 100% et réceptionnés le 15 avril. L'ouverture au public est prévue dans les prochains mois.`,
    photo:
      "https://res.cloudinary.com/dynpasxkm/image/upload/f_auto/v1780405971/news_2_bkklpl.webp",
    thumb:
      "https://res.cloudinary.com/dynpasxkm/image/upload/f_auto/v1780405971/news_2_bkklpl.webp",
  },
  {
    id: 3,
    label: "PARTENARIAT STRATÉGIQUE",
    title: "L'enseigne Franprix s'installe à Brazza Mall",
    description: `La Société d'Exploitation et de Développement des Infrastructures du Congo (SEDIC) poursuit activement sa mission de valorisation et de dynamisation de ses infrastructures commerciales à travers la signature d'un partenariat stratégique avec l'enseigne Franprix.

La signature officielle de ce partenariat est intervenue le 25 février 2025, dans les locaux de la SEDIC, lors d'une cérémonie réunissant les deux dirigeants.`,
    photo:
      "https://res.cloudinary.com/dynpasxkm/image/upload/f_auto/v1780405971/news_3_m1sjt9.webp",
    thumb:
      "https://res.cloudinary.com/dynpasxkm/image/upload/f_auto/v1780405971/news_3_m1sjt9.webp",
  },
  {
    id: 4,
    label: "STRATÉGIE",
    title: "Conseil d'Administration du 23 décembre 2025",
    description: `Conseil d'Administration – des Tours Jumelles Hôtel & Résidences

Le Conseil d'administration des Tours Jumelles s'est tenu le 23 décembre dernier aux Tours Jumelles de Brazzaville.

Cette session stratégique a porté sur deux points majeurs : la clôture de l'exercice 2024 des Tours Jumelles et l'adoption du budget 2026 des Tours Jumelles.`,
    photo:
      "https://res.cloudinary.com/dynpasxkm/image/upload/f_auto/v1780405971/news_4_i3gqrw.webp",
    thumb:
      "https://res.cloudinary.com/dynpasxkm/image/upload/f_auto/v1780405971/news_4_i3gqrw.webp",
  },
  {
    id: 5,
    label: "STRATÉGIE",
    title: "Conseil d'Administration du 29 août 2025",
    description: `Le Conseil d'Administration de la SEDIC s'est réuni en session ordinaire le 29 août 2025, dans le cadre de ses activités de pilotage stratégique et de supervision de la performance des entités sous sa responsabilité.`,
    photo:
      "https://res.cloudinary.com/dynpasxkm/image/upload/f_auto/v1780405972/news_5_o7elm7.webp",
    thumb:
      "https://res.cloudinary.com/dynpasxkm/image/upload/f_auto/v1780405972/news_5_o7elm7.webp",
  },
  {
    id: 6,
    label: "STRATÉGIE",
    title:
      "Signature d'un contrat de franchise entre la SEDIC et le groupe Doubletree",
    description: `Dans le cadre de sa stratégie de valorisation et de dynamisation du patrimoine hôtelier national, la SEDIC a procédé à la signature d'un important contrat de franchise avec le groupe international HILTON.`,
    photo:
      "https://res.cloudinary.com/dynpasxkm/image/upload/f_auto/v1780405972/news_6_pyrtis.webp",
    thumb:
      "https://res.cloudinary.com/dynpasxkm/image/upload/f_auto/v1780405972/news_6_pyrtis.webp",
  },
  {
    id: 7,
    label: "STRATÉGIE",
    title:
      "Participation de la SEDIC à la Rencontre des Entrepreneurs Francophones",
    description: `La SEDIC a pris part, du 26 au 28 juin 2025 à Brazzaville, à la cinquième édition de la Rencontre des Entrepreneurs Francophones (REF).`,
    photo:
      "https://res.cloudinary.com/dynpasxkm/image/upload/f_auto/v1780405972/news_7_xxzwat.webp",
    thumb:
      "https://res.cloudinary.com/dynpasxkm/image/upload/f_auto/v1780405972/news_7_xxzwat.webp",
  },
  {
    id: 8,
    label: "STRATÉGIE",
    title: "La SEDIC accueille 2 membres du Gouvernement en visite de terrain",
    description: `Le 15 mai 2025, Monsieur Christian Yoka, Ministre des Finances, accompagné de Madame Lydie Pongault, Ministre de l'Industrie culturelle, a effectué une visite conjointe sur trois sites emblématiques.`,
    photo:
      "https://res.cloudinary.com/dynpasxkm/image/upload/f_auto/v1780405972/news_8_kvbfaw.webp",
    thumb:
      "https://res.cloudinary.com/dynpasxkm/image/upload/f_auto/v1780405972/news_8_kvbfaw.webp",
  },
  {
    id: 9,
    label: "STRATÉGIE",
    title:
      "Visite des membres de la Commission Économique et Financière de l'Assemblée Nationale",
    description: `Une délégation de la Commission Économique et Financière de l'Assemblée Nationale a effectué une visite de travail au siège de la société.`,
    photo:
      "https://res.cloudinary.com/dynpasxkm/image/upload/f_auto/v1780405972/news_9_zynpbw.webp",
    thumb:
      "https://res.cloudinary.com/dynpasxkm/image/upload/f_auto/v1780405972/news_9_zynpbw.webp",
  },
  {
    id: 10,
    label: "STRATÉGIE",
    title:
      "La participation de la SEDIC à la réunion des dirigeants du Groupe Hilton à Dubaï",
    description: `Une délégation conduite par Mme Bénédicte Myriam DENGUET ATTICKY a séjourné au Maroc afin de rencontrer des partenaires techniques et financiers.`,
    photo:
      "https://res.cloudinary.com/dynpasxkm/image/upload/f_auto/v1780405972/news_10_ospsgj.webp",
    thumb:
      "https://res.cloudinary.com/dynpasxkm/image/upload/f_auto/v1780405972/news_10_ospsgj.webp",
  },
  {
    id: 11,
    label: "ANNONCE",
    title:
      "Ouverture du Hilton Brazzaville Les Tours Jumelles Hotel & Residences",
    description: `Hilton a annoncé l'ouverture très attendue du Hilton Brazzaville Les Tours Jumelles Hotel & Residences, fruit d'un partenariat scellé en 2024 entre Hilton et la SEDIC.`,
    photo:
      "https://res.cloudinary.com/dynpasxkm/image/upload/f_auto/v1780405973/news_11_hgdokr.webp",
    thumb:
      "https://res.cloudinary.com/dynpasxkm/image/upload/f_auto/v1780405973/news_11_hgdokr.webp",
  },
    {
    id: 12,
    label: "ANNONCE",
    title:
      "La SEDIC reçoit le Prix du Partenariat Stratégique des Assises de la BAD 2026",
    description: `La Société d'Équipement, de Développement Immobilier et de Construction (SEDIC) a été honorée lors des Assises de la Banque Africaine de Développement (BAD) 2026 en recevant le Prix du Partenariat Stratégique, une distinction qui vient saluer la qualité de son engagement et de sa collaboration dans le cadre de cet événement d'envergure internationale.

Cette reconnaissance témoigne de la confiance accordée à la SEDIC en tant qu'acteur engagé dans le développement et la promotion de projets au service des populations. Elle souligne également la contribution active de l'entreprise à la réussite des Assises ainsi que sa capacité à développer des partenariats durables avec les institutions nationales et internationales.

Durant les cinq jours de l'événement, la SEDIC a eu l'opportunité de présenter ses missions, ses réalisations et ses perspectives de développement à un public composé de décideurs, d'institutions financières, de partenaires techniques, d'entreprises et de représentants diplomatiques. Cette présence a permis de renforcer sa visibilité, de développer de nouvelles relations professionnelles et d'identifier plusieurs opportunités de collaboration.

La remise du Prix du Partenariat Stratégique constitue l'un des temps forts de cette participation. 

La SEDIC adresse ses sincères remerciements à la Banque Africaine de Développement pour cette marque de confiance.

Cette distinction constitue une source de fierté pour l'ensemble des collaborateurs de la SEDIC et un encouragement à poursuivre avec ambition sa mission au service du développement.`,
    photo:
      "https://res.cloudinary.com/dynpasxkm/image/upload/f_auto/v1780652901/bad_img_lh24me.webp",
    thumb:
      "https://res.cloudinary.com/dynpasxkm/image/upload/f_auto/v1780652901/bad_img_lh24me.webp",
  },
];

// ── Détection mobile ──────────────────────────────────────────
function useIsMobile(bp = 768) {
  const [v, setV] = useState(window.innerWidth < bp);
  useEffect(() => {
    const h = () => setV(window.innerWidth < bp);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, [bp]);
  return v;
}

// ── Composant mobile ──────────────────────────────────────────
function MobileLastnews() {
  const [selectedNews, setSelectedNews] = useState(NEWS[0]);
  const [animating, setAnimating] = useState(false);
  const [displayedNews, setDisplayedNews] = useState(NEWS[0]);
  const cardRef = useRef<HTMLDivElement>(null);

  const selectNews = (news: (typeof NEWS)[0]) => {
    if (news.id === selectedNews.id) return;
    setAnimating(true);
    setTimeout(() => {
      setSelectedNews(news);
      setDisplayedNews(news);
      setAnimating(false);
      // scroll card to top
      cardRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }, 220);
  };

  return (
    <section
      className="w-full flex flex-col"
      style={{ backgroundColor: "#efeeeb" }}
    >
      {/* ── Header ── */}
      {/* ── Card actualité active ── */}
      <div
        className="mb-1 overflow-hidden flex flex-col"
        style={{
          backgroundColor: "#efeeeb",
          border: "1px solid rgba(34,48,120,0.12)",
          opacity: animating ? 0 : 1,
          transform: animating ? "translateY(8px)" : "translateY(0)",
          transition: "opacity 0.22s ease, transform 0.22s ease",
          boxShadow: "0 2px 16px rgba(34,48,120,0.08)",
        }}
      >
        {/* Photo en haut de la card — pleine largeur */}
        <div
          style={{
            width: "100%",
            height: "220px",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <img
            loading="lazy"
            decoding="async"
            src={displayedNews.photo}
            alt={displayedNews.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              display: "block",
              transition: "opacity 0.3s ease",
            }}
          />
        </div>

        {/* Badge + titre + texte */}
        <div className="px-5 pt-5 pb-6 flex flex-col gap-4">
          {/* Badge */}
          <div
            className="inline-flex self-center items-center px-4 py-1.5"
            style={{ backgroundColor: "#223078" }}
          >
            <span
              style={{
                ...coconat,
                color: "white",
                fontSize: "16px",
                letterSpacing: "0.10em",
              }}
            >
              {displayedNews.label}
            </span>
          </div>

          {/* Titre */}
          <h3
            className="text-center"
            style={{
              ...coconat,
              color: "#223078",
              fontSize: "26px",
              lineHeight: "1.1",
              fontWeight: 400,
              margin: 0,
            }}
          >
            {displayedNews.title}
          </h3>

          {/* Texte scrollable avec fade bas */}
          <div style={{ position: "relative" }}>
            <div
              ref={cardRef}
              style={{
                maxHeight: "180px",
                overflowY: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                paddingBottom: "32px",
              }}
              className="hide-scrollbar"
            >
              <p
                className="text-center"
                style={{
                  ...commissioner,
                  color: "#1e1e1e",
                  fontSize: "14px",
                  lineHeight: "1.65",
                  whiteSpace: "pre-line",
                  margin: 0,
                }}
              >
                {displayedNews.description}
              </p>
            </div>
            {/* Fade bas */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "52px",
                pointerEvents: "none",
                background:
                  "linear-gradient(to bottom, rgba(239,238,235,0) 0%, rgba(239,238,235,1) 100%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Thumbnails scroll horizontal — 2 colonnes fixes ── */}
      <div
        style={{
          backgroundColor: "white",
          padding: "14px 0 18px",
          marginTop: "8px",
        }}
      >
        <style>{`
          .news-thumb-scroll::-webkit-scrollbar { display: none; }
        `}</style>

        <div
          className="news-thumb-scroll"
          style={{
            display: "flex",
            gap: "12px",
            overflowX: "auto",
            scrollbarWidth: "none",
            padding: "0 16px",
          }}
        >
          {NEWS.map((news) => {
            const active = selectedNews.id === news.id;
            return (
              <button
                key={news.id}
                onClick={() => selectNews(news)}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  padding: 0,
                  flexShrink: 0,
                  width: "calc(50vw - 28px)", // 2 colonnes visibles + peek
                  textAlign: "left",
                }}
              >
                {/* Thumbnail image */}
                <div
                  style={{
                    overflow: "hidden",
                    marginBottom: "8px",
                    borderBottom: active
                      ? "3px solid #223078"
                      : "3px solid transparent",
                    transition: "border-color 0.25s ease",
                  }}
                >
                  <img
                    loading="lazy"
                    decoding="async"
                    src={news.thumb}
                    alt={news.title}
                    style={{
                      width: "100%",
                      height: "100px",
                      objectFit: "cover",
                      opacity: active ? 1 : 0.65,
                      transform: active ? "scale(1.03)" : "scale(1)",
                      transition: "opacity 0.25s ease, transform 0.35s ease",
                      display: "block",
                    }}
                  />
                </div>

                {/* Titre thumbnail */}
                <p
                  className="text-center"
                  style={{
                    ...commissioner,
                    color: "#223078",
                    fontSize: "14px",
                    fontWeight: active ? 700 : 500,
                    lineHeight: "1.35",
                    margin: 0,
                    padding: "0 2px",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {news.title}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Composant desktop (inchangé) ─────────────────────────────
function DesktopLastnews() {
  const [selectedNews, setSelectedNews] = useState(NEWS[0]);
  const [displayedNews, setDisplayedNews] = useState(NEWS[0]);
  const [animating, setAnimating] = useState(false);

  const selectNews = (news: (typeof NEWS)[0]) => {
    if (news.id === selectedNews.id) return;
    setAnimating(true);
    setTimeout(() => {
      setSelectedNews(news);
      setDisplayedNews(news);
      setAnimating(false);
    }, 250);
  };

  return (
    <section className="w-full" style={{ backgroundColor: "#efeeeb" }}>
      {/* Header */}
      <div
        className="w-full flex items-center justify-center"
        style={{ backgroundColor: "#223078", padding: "22px 20px" }}
      >
        <h2
          style={{
            ...coconat,
            color: "white",
            fontSize: "20px",
            letterSpacing: "0.04em",
          }}
        >
          NOS DERNIÈRES ACTUALITÉS
        </h2>
      </div>

      {/* Main content */}
      <div
        className="grid"
        style={{ gridTemplateColumns: "1fr 1fr", minHeight: "610px" }}
      >
        {/* LEFT */}
        <div
          className="flex items-center"
          style={{
            padding: "60px",
            backgroundColor: "#efeeeb",
            height: "610px",
            opacity: animating ? 0 : 1,
            transform: animating ? "translateY(10px)" : "translateY(0)",
            transition: "opacity 0.25s ease, transform 0.25s ease",
          }}
        >
          <div
            style={{
              maxWidth: "620px",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                width: "fit-content",
                alignSelf: "flex-start",
                backgroundColor: "#223078",
                padding: "10px 20px",
                marginBottom: "24px",
              }}
            >
              <span
                style={{
                  ...coconat,
                  color: "white",
                  fontSize: "20px",
                  letterSpacing: "0.05em",
                }}
              >
                {selectedNews.label}
              </span>
            </div>
            <h3
              style={{
                ...coconat,
                color: "#223078",
                fontSize: "38px",
                lineHeight: "1.05",
                marginBottom: "42px",
                fontWeight: 400,
              }}
            >
              {selectedNews.title}
            </h3>
            <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  overflowY: "auto",
                  paddingRight: "12px",
                  scrollbarWidth: "none",
                }}
                className="hide-scrollbar"
              >
                <p
                  style={{
                    ...commissioner,
                    color: "#1e1e1e",
                    fontSize: "15px",
                    lineHeight: "1.7",
                    whiteSpace: "pre-line",
                    margin: 0,
                    paddingBottom: "80px",
                  }}
                >
                  {selectedNews.description}
                </p>
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "90px",
                  pointerEvents: "none",
                  background:
                    "linear-gradient(to bottom, rgba(239,238,235,0) 0%, rgba(239,238,235,0.75) 45%, rgba(239,238,235,1) 100%)",
                }}
              />
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            height: "610px",
            backgroundColor: "#d9d9d9",
            opacity: animating ? 0 : 1,
            transition: "opacity 0.25s ease",
          }}
        >
          <img
            loading="lazy"
            decoding="async"
            src={displayedNews.photo}
            alt={displayedNews.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
          />
        </div>
      </div>

      {/* Bottom cards */}
      <div
        style={{
          backgroundColor: "white",
          padding: "18px",
          position: "relative",
        }}
      >
        <button
          onClick={() =>
            document
              .getElementById("news-scroll")
              ?.scrollBy({ left: -300, behavior: "smooth" })
          }
          style={{
            position: "absolute",
            left: "0",
            top: "40%",
            transform: "translateY(-50%)",
            zIndex: 10,
            backgroundColor: "#223078",
            color: "white",
            border: "none",
            width: "40px",
            height: "60px",
            cursor: "pointer",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ‹
        </button>
        <button
          onClick={() =>
            document
              .getElementById("news-scroll")
              ?.scrollBy({ left: 300, behavior: "smooth" })
          }
          style={{
            position: "absolute",
            right: "0",
            top: "40%",
            transform: "translateY(-50%)",
            zIndex: 10,
            backgroundColor: "#223078",
            color: "white",
            border: "none",
            width: "40px",
            height: "60px",
            cursor: "pointer",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ›
        </button>
        <div
          id="news-scroll"
          style={{
            display: "flex",
            gap: "18px",
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            padding: "0 48px",
          }}
          className="hide-scrollbar"
        >
          {NEWS.map((news) => {
            const active = selectedNews.id === news.id;
            return (
              <button
                key={news.id}
                onClick={() => selectNews(news)}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  textAlign: "center",
                  padding: 0,
                  width: "calc(25% - 14px)",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    overflow: "hidden",
                    marginBottom: "14px",
                    opacity: active ? 1 : 0.75,
                    transition: "all 0.25s ease",
                  }}
                >
                  <img
                    loading="lazy"
                    decoding="async"
                    src={news.thumb}
                    alt={news.title}
                    style={{
                      width: "100%",
                      height: "160px",
                      objectFit: "cover",
                      transform: active ? "scale(1.02)" : "scale(1)",
                      transition: "transform 0.35s ease",
                    }}
                  />
                </div>
                <div
                  style={{
                    minHeight: "52px",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    padding: "0 8px",
                  }}
                >
                  <p
                    style={{
                      ...commissioner,
                      color: "#223078",
                      fontSize: "15px",
                      fontWeight: active ? 700 : 600,
                      lineHeight: "1.35",
                      maxWidth: "280px",
                      margin: 0,
                      textAlign: "center",
                    }}
                  >
                    {news.title}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Restez informés */}
      <div className="flex flex-col items-center text-center bg-white px-20 py-16">
        <p
          className="uppercase text-[#1e2d6b] mb-5"
          style={{
            ...coconat,
            fontSize: "20.5px",
            letterSpacing: "0.02em",
            lineHeight: "1.05",
            fontWeight: 400,
          }}
        >
          restez informés
        </p>
        <p
          className="max-w-2xl mb-8"
          style={{
            ...commissioner,
            fontSize: "15px",
            fontWeight: 400,
            lineHeight: "1.30",
            color: "#222",
            textAlign: "center",
          }}
        >
          La SEDIC continue de développer de nouveaux projets et de franchir des
          étapes clés. Suivez régulièrement nos actualités pour ne rien manquer
          de nos avancées.
        </p>
        <a
          className="inline-block px-6 py-2 rounded-lg bg-[#223078] text-white hover:bg-[#B3C2E9] hover:text-[#223078] transition-all duration-300"
          href="mailto:armel.samoue@sedic.cg"
          style={{
            ...coconat,
            fontSize: "18px",
            lineHeight: "1",
            letterSpacing: "-0.02em",
          }}
        >
          Nous contacter
        </a>
      </div>
    </section>
  );
}

// ── Export ────────────────────────────────────────────────────
export default function Lastnews() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileLastnews /> : <DesktopLastnews />;
}
