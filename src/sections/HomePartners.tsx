import { useRef, useEffect, useState } from "react";
import Contactform from "./Contactform";
import Collaborate from "./Collaborate";
import Details from "./Details";

const coconat: React.CSSProperties = { fontFamily: "Coconat, Georgia, serif" };
const commissioner: React.CSSProperties = {
  fontFamily: "Commissioner, sans-serif",
};

const PARTNERS = [
  {
    id: "icazi",
    image: "/images/partners_page/partners_1.png",
    logo: "/images/partners_page/icazi_logo.png",
    name: "ICAZI Immobilier",
    link: "https://icazi.com/brazzaville-gestion-locative",
  },
  {
    id: "brazza",
    image: "/images/partners_page/partners_2.png",
    logo: "/images/partners_page/brazza_logo.jpg",
    name: "Brazza Mall",
    link: "https://brazza-mall.com",
  },
  {
    id: "business",
    image: "/images/partners_page/partners_3.png",
    logo: "/images/partners_page/business_logo.png",
    name: "Business Center",
    link: "https://businesscenter-tj.com/nos-evenements/",
  },
  {
    id: "vatel",
    image: "/images/partners_page/partners_4.png",
    logo: "/images/partners_page/vatel_logo.svg",
    name: "Vatel Hotel & Tourism Business School",
    link: "https://www.vatel.cg/fr/ecole-hoteliere-congo/presentation-vatel-brazzaville",
  },
];

/* ── Partner card ── */
function PartnerCard({
  partner,
  index,
  visible,
}: {
  partner: (typeof PARTNERS)[0];
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const content = (
    <div
      className="relative w-full h-full"
      style={{ cursor: partner.link ? "pointer" : "default" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Full image */}
      <img
        src={partner.image}
        alt={partner.name}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transform: hovered ? "scale(1.04)" : "scale(1)",
          transition: "transform 0.5s ease",
        }}
      />

      {/* Centered white logo band — absolute over the image */}
      <div
        className="absolute left-0 right-0 flex items-center justify-center"
        style={{
          top: "50%",
          transform: "translateY(-50%)",
          height: "90px",
          backgroundColor: "#fff",
          borderTop: "1px solid #e8e8e6",
          borderBottom: "1px solid #e8e8e6",
          padding: "12px 24px",
          zIndex: 2,
        }}
      >
        <img
          src={partner.logo}
          alt={`Logo ${partner.name}`}
          style={{
            maxHeight: "80px",
            maxWidth: "160px",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Hover overlay */}
      {partner.link && (
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "rgba(34, 48, 120, 0.12)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
            zIndex: 1,
          }}
        />
      )}
    </div>
  );

  return (
    <div
      style={{
        height: "490px",
        overflow: "hidden",
        position: "relative",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.8s ease ${0.2 + index * 0.12}s, transform 0.8s ease ${0.2 + index * 0.12}s`,
      }}
    >
      {partner.link ? (
        <a
          href={partner.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "block", width: "100%", height: "100%" }}
        >
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
}

/* ── Main section ── */
export default function Partners() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
    <section ref={sectionRef} id="partners" className="w-full bg-white mt-16">
      {/* ── Header ── */}
      <div className="text-center px-16 pt-20 pb-16">
        <p
          className="uppercase text-[#1e2d6b] mb-4"
          style={{
            ...coconat,
            fontSize: "20.5px",
            letterSpacing: "0.02em",
            lineHeight: "1.05",
            fontWeight: 400,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(-12px)",
            transition: "opacity 1s ease 0.1s, transform 1s ease 0.1s",
          }}
        >
          Partenariats
        </p>

        <h2
          className="font-normal text-black mb-6"
          style={{
            ...coconat,
            fontSize: "clamp(30px, 4vw, 38px)",
            lineHeight: "1.1",
            letterSpacing: "-0.02em",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(-12px)",
            transition: "opacity 1s ease 0.3s, transform 1s ease 0.3s",
          }}
        >
          Construire{" "}
          <em
            style={{
              fontFamily: "'Charis SIL', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 700,
              color: "#1e2d6b",
              fontSize: "clamp(34px, 4.5vw, 38px)",
              lineHeight: "1",
            }}
          >
            ensemble
          </em>
          <br />
          les infrastructures de{" "}
          <em
            style={{
              fontFamily: "'Charis SIL', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 700,
              color: "#1e2d6b",
              fontSize: "clamp(34px, 4.5vw, 38px)",
              lineHeight: "1",
            }}
          >
            demain.
          </em>
        </h2>

        <div
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 1s ease 0.6s",
          }}
        >
          <p
            style={{
              fontFamily: "'Charis SIL', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: "15px",
              color: "#1e2d6b",
              lineHeight: "1.2",
              marginBottom: "10px",
            }}
          >
            La SEDIC place la collaboration au cœur de son action.
          </p>
          <p
            className="max-w-xl"
            style={{
              ...commissioner,
              fontSize: "15px",
              fontWeight: 400,
              lineHeight: "1.55",
              color: "#222",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            Nous travaillons avec des partenaires publics et privés pour
            concevoir, financer, développer et exploiter des projets
            structurants en République du Congo.
          </p>
        </div>
      </div>

      {/* ── "NOS PARTENAIRES" label ── */}
      <div
        style={{
          backgroundColor: "#f0efea",
          padding: "18px 0",
          textAlign: "center",
          opacity: visible ? 1 : 0,
          transition: "opacity 1s ease 0.8s",
        }}
      >
        <p
          className="uppercase text-[#1e2d6b]"
          style={{
            ...coconat,
            fontSize: "20.5px",
            letterSpacing: "0.02em",
            lineHeight: "1.05",
            fontWeight: 400,
            margin: 0,
          }}
        >
          Nos Partenaires
        </p>
      </div>

      {/* ── Partners grid ── */}
      <div className="grid grid-cols-4 gap-4">
        {PARTNERS.map((partner, i) => (
          <PartnerCard
            key={partner.id}
            partner={partner}
            index={i}
            visible={visible}
          />
        ))}
      </div>
    </section>
    <Collaborate />
    <Details />
    <Contactform />
    </div>
  );
}
