import { useState } from "react";

const coconat: React.CSSProperties = {
  fontFamily: "Coconat, Georgia, serif",
};

const commissioner: React.CSSProperties = {
  fontFamily: "Commissioner, sans-serif",
};

const NEWS = [
  {
    id: 1,
    label: "ANNONCE",
    title: "Mot de la Directrice Générale",
    description: `Chers visiteurs, chers partenaires,
C’est avec un réel plaisir que je vous souhaite la bienvenue sur le site officiel de la Société d’Exploitation et de Développement des Infrastructures du Congo (SEDIC).

À la SEDIC, nous portons la conviction profonde que le développement des infrastructures constitue l’un des piliers essentiels de la transformation économique et sociale de notre pays. Chaque jour, nos équipes se mobilisent avec passion, professionnalisme et engagement pour donner vie à des projets structurants qui façonnent le visage d’un Congo moderne, attractif et inclusif.

Notre mission s’articule autour de trois ambitions fortes : valoriser le patrimoine immobilier et culturel, stimuler les investissements et les partenariats durables, et offrir aux Congolais des espaces de vie, de loisirs et d’affaires répondant aux standards les plus élevés de qualité et d’innovation.

À travers la réalisation et l’exploitation d’infrastructures emblématiques — qu’il s’agisse des complexes hôteliers, des centres commerciaux comme le Brazza Mall, des pôles culturels tels que le Musée de l’Art et de l’histoire, ou encore des programmes de logements modernes à Mpila — nous œuvrons à créer de véritables moteurs de croissance, sources d’emplois et de dynamisme local. « Développer, exploiter, transformer. »

Nous plaçons également au cœur de nos priorités la promotion de partenariats publics-privés solides, la transparence dans notre gouvernance, et la satisfaction de nos parties prenantes. Car c’est ensemble, avec l’État, les investisseurs, les entreprises et les citoyens, que nous bâtissons des infrastructures qui traversent le temps et participent au rayonnement du Congo.

Ce site se veut une fenêtre ouverte sur nos actions, nos projets en cours et nos perspectives. Vous y trouverez des informations détaillées sur nos activités, des actualités, des appels à manifestation d’intérêt, ainsi qu’un espace de contact pour mieux nous connaître et envisager des collaborations. Je vous invite donc à parcourir nos pages, à découvrir la richesse de notre vision et à partager avec nous cette formidable aventure du développement.

Au nom de toute l’équipe de la SEDIC, je vous remercie pour l’intérêt que vous portez à notre institution et vous assure de notre entière disponibilité pour répondre à vos attentes et construire ensemble un avenir prospère pour le Congo.


Bénédicte Myriam DENGUET-ATTICKY
Directrice Générale

-`,
    photo: "/images/news_page/news_1.png",
    thumb: "/images/news_page/news_1.png",
  },
  {
    id: 2,
    label: "CULTURE",
    title: "Réception complète du Musée de l’Histoire nationale",
    description: `La SEDIC a marqué une étape importante avec la cérémonie d’ouverture du Musée de l’Histoire nationale de Mpila, un projet structurant dédié à la valorisation du patrimoine culturel et historique du Congo.

Les travaux ont été achevés à 100% et réceptionnés le 15 avril. L’ouverture au public est prévue dans les prochains mois.`,
    photo: "/images/news_page/news_2.png",
    thumb: "/images/news_page/news_2.png",
  },
  {
    id: 3,
    label: "PARTENARIAT STRATÉGIQUE",
    title: "L’enseigne Franprix s’installe à Brazza Mall",
    description: `La Société d’Exploitation et de Développement des Infrastructures du Congo (SEDIC) poursuit activement sa mission de valorisation et de dynamisation de ses infrastructures commerciales à travers la signature d’un partenariat stratégique avec l’enseigne Franprix.

La signature officielle de ce partenariat est intervenue le 25 février 2025, dans les locaux de la SEDIC, lors d’une cérémonie réunissant les deux dirigeants. Le contrat a été conclu entre Madame Bénédicte Myriam DENGUET ATTICKY, représentant la SEDIC, et Monsieur Prakash, représentant Franprix. Cette collaboration marque une nouvelle étape dans le développement et l’attractivité du Brazza Mall, l’un des pôles commerciaux majeurs de Brazzaville.

Une ouverture prévue dans les prochaines semaines
L’ouverture de Franprix au sein du Centre Commercial Brazza Mall interviendra dans les prochaines semaines. Cette implantation viendra enrichir l’offre commerciale existante et répondre aux attentes croissantes des consommateurs en matière de produits accessibles, diversifiés et de qualité.

Un partenariat au service du développement économique
À travers cette signature, la SEDIC confirme son engagement à attirer des enseignes structurantes capables de générer de la valeur ajoutée, de favoriser la création d’emplois et de participer activement à la vitalité économique locale. L’arrivée de Franprix s’inscrit pleinement dans la stratégie de développement du Brazza Mall, visant à consolider son positionnement en tant qu’espace moderne, sécurisé et compétitif, au service des commerçants et des usagers.

Une vision partagée
Ce partenariat illustre la convergence de visions entre la SEDIC et Franprix : offrir aux populations une expérience commerciale améliorée, dans un cadre attractif et conforme aux standards modernes de gestion et d’exploitation des infrastructures commerciales. La SEDIC se félicite de cette nouvelle collaboration et réaffirme sa volonté de multiplier les partenariats structurants afin de renforcer durablement la performance et la visibilité de ses infrastructures.

-`,
    photo: "/images/news_page/news_3.png",
    thumb: "/images/news_page/news_3.png",
  },
  {
    id: 4,
    label: "STRATÉGIE",
    title: "Conseil d’Administration du 23 décembre 2025",
    description: `Conseil d’Administration – des Tours Jumelles Hôtel & Résidences

Le Conseil d’administration des Tours Jumelles s’est tenu le 23 décembre dernier aux Tours Jumelles de Brazzaville.

Cette session stratégique a porté sur deux points majeurs :
la clôture de l’exercice 2024 des Tours Jumelles ;
l’adoption du budget 2026 des Tours Jumelles.

Cette étape clé traduit l’engagement constant de la SEDIC en faveur d’une gouvernance rigoureuse, d’une planification efficiente et d’un développement durable des infrastructures stratégiques de la République du Congo.

Le portefeuille d’actifs de la SEDIC comprend notamment :

les Tours Jumelles de Mpila, abritant le Business Center de Mpila ainsi que le Hilton Brazzaville – Les Tours Jumelles Hôtel & Résidences ;
le centre commercial Brazza Mall ;
le Centre international de conférences, abritant le Grand Hôtel de Kintélé ;
l’École de management de l’hôtellerie Vatel Brazzaville ;
le Musée de l’Art et de l’Histoire ;
les programmes immobiliers de Mpila (Résidences Les Jardins de Mpila, Les Pionniers, Les Balcons de Yoro et du Fleuve) ;
la résidence Les Flamboyants.

-`,
    photo: "/images/news_page/news_4.png",
    thumb: "/images/news_page/news_4.png",
  },
];

export default function Lastnews() {
  const [selectedNews, setSelectedNews] = useState(NEWS[0]);

  return (
    <section
      className="w-full"
      style={{
        backgroundColor: "#efeeeb",
      }}
    >
      {/* Header */}
      <div
        className="w-full flex items-center justify-center"
        style={{
          backgroundColor: "#223078",
          padding: "22px 20px",
        }}
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
        style={{
          gridTemplateColumns: "1fr 1fr",
          minHeight: "610px",
        }}
      >
        {/* LEFT */}
        <div
          className="flex items-center"
          style={{
            padding: "60px",
            backgroundColor: "#efeeeb",
            height: "610px",
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
            {/* LABEL */}
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

            {/* TITLE */}
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

            {/* DESCRIPTION */}
            <div
              style={{
                position: "relative",
                flex: 1,
                overflow: "hidden",
              }}
            >
              {/* Scrollable content */}
              <div
                style={{
                  height: "100%",
                  overflowY: "auto",
                  paddingRight: "12px",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
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

              {/* Blur / fade bottom */}
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
                  backdropFilter: "blur(0.5px)",
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
          }}
        >
          <img
            src={selectedNews.photo}
            alt={selectedNews.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
              transition: "opacity 0.4s ease",
            }}
          />
        </div>
      </div>

      {/* Bottom cards */}
      <div
        className="grid bg-white"
        style={{
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "18px",
          padding: "18px",
        }}
      >
        {NEWS.map((news) => {
          const active = selectedNews.id === news.id;

          return (
            <button
              key={news.id}
              onClick={() => setSelectedNews(news)}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                textAlign: "center",
                padding: 0,
              }}
            >
              {/* Thumbnail */}
              <div
                style={{
                  overflow: "hidden",
                  marginBottom: "14px",
                  opacity: active ? 1 : 0.75,
                  transition: "all 0.25s ease",
                }}
              >
                <img
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

              {/* Title */}
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
      {/* ── Positioning ── */}
      <div className="flex flex-col items-center text-center bg-white px-20 py-16">
        {/* Label — Sous-titre-Desktop */}
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

        {/* Body — Corps-Desktop */}
        <p
          className="max-w-2xl mb-8"
          style={{
            ...commissioner,
            fontSize: "15px",
            fontWeight: 400,
            lineHeight: "1.30",
            letterSpacing: "0",
            color: "#222",
            textAlign: "center",
          }}
        >
          La SEDIC continue de développer de nouveaux projets et de franchir des
          étapes clés. Suivez régulièrement nos actualités pour ne rien manquer
          de nos avancées.
        </p>

        <button
          className="px-6 py-3 rounded-xl bg-[#223078] text-white hover:bg-[#B3C2E9] hover:text-[#223078] transition-all duration-300"
          style={{
            ...coconat,
            fontSize: "18px",
            lineHeight: "1",
            letterSpacing: "-0.02em",
          }}
        >
          Nous contacter
        </button>
      </div>
    </section>
  );
}
