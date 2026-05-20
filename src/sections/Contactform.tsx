import { useState, useEffect, useRef } from "react";
import HoverDoorImage from "../components/HoverDoorImage";

const coconat: React.CSSProperties = { fontFamily: "Coconat, Georgia, serif" };
const commissioner: React.CSSProperties = {
  fontFamily: "Commissioner, sans-serif",
};

const CATEGORIES = [
  {
    id: "hebergement",
    label: "Hébergement / Réservation",
    options: [
      "Je souhaite réserver une chambre d'hôtel (GHK)",
      "Je souhaite obtenir des informations sur nos programmes de logement (ICAZI+REM+Liens logements)",
      "Je souhaite réserver une visite pour un appartement (ICAZI+REM)",
    ],
  },
  {
    id: "evenementiel",
    label: "Événementiel / Conférences",
    options: [
      "Je souhaite organiser une conférence (CICK)",
      "Je souhaite réserver une salle de réunion (CICK + GHK)",
      "Je souhaite organiser un événement professionnel (GHK)",
      "Je souhaite organiser un mariage ou une réception (GHK)",
    ],
  },
  {
    id: "commerce",
    label: "Commerce / Business",
    options: [
      "Je souhaite louer un espace commercial (BZM)",
      "Je souhaite louer un bureau (BZM + BUSINESS CENTER)",
      "Je souhaite obtenir des informations sur les activités commerciales (BZM)",
    ],
  },
  {
    id: "formation",
    label: "Formation / Éducation",
    options: [
      "Je souhaite des informations sur une formation (VATEL)",
      "Je souhaite louer un bureau (BZM + BUSINESS CENTER)",
      "Je souhaite m'inscrire à une école ou à une formation (VATEL)",
    ],
  },
  {
    id: "culture",
    label: "Culture / Loisirs",
    options: [
      "Je souhaite visiter un musée (Musée)",
      "Je souhaite organiser une activité culturelle (Musée)",
      "Je souhaite obtenir des informations touristiques (Musée)",
    ],
  },
  {
    id: "autre",
    label: "Autre demande",
    options: [],
  },
];

const inputStyle: React.CSSProperties = {
  fontFamily: "Commissioner, sans-serif",
  fontSize: "13.5px",
  color: "#222",
  backgroundColor: "white",
  border: "1.5px solid #e5e7ef",
  borderRadius: "8px",
  padding: "11px 14px",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
};

function OptionButton({
  label,
  onClick,
  delay = 0,
  visible,
}: {
  label: string;
  onClick: () => void;
  delay?: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setMounted(true), delay);
      return () => clearTimeout(t);
    } else {
      setMounted(false);
    }
  }, [visible, delay]);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...commissioner,
        fontSize: "15px",
        fontWeight: 400,
        color: hovered ? "#223078" : "black",
        backgroundColor: hovered ? "#B3C2E9" : "white",
        borderRadius: "8px",
        cursor: "pointer",
        width: "100%",
        textAlign: "left",
        padding: "4px 16px",
        border: "none",
        lineHeight: "1.5",
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(6px)",
        transition: `opacity 0.35s ease, transform 0.35s ease, background-color 0.15s, color 0.15s`,
      }}
    >
      {label}
    </button>
  );
}

/* Animated view wrapper — fades in on mount */
function ViewPane({ children, id }: { children: React.ReactNode; id: string }) {
  const [visible, setVisible] = useState(false);
  const prevId = useRef(id);

  useEffect(() => {
    if (prevId.current !== id) {
      setVisible(false);
      prevId.current = id;
      const t = setTimeout(() => setVisible(true), 20);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setVisible(true), 20);
      return () => clearTimeout(t);
    }
  }, [id]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}
    >
      {children}
    </div>
  );
}

export default function ContactForm() {
  const [view, setView] = useState<"main" | "sub" | "form">("main");
  const [selectedCategory, setSelectedCategory] = useState<
    (typeof CATEGORIES)[0] | null
  >(null);
  const [freeText, setFreeText] = useState({
    objet: "",
    nom: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  /* Animate border on view change */
  const [borderActive, setBorderActive] = useState(true);
  const triggerBorder = () => {
    setBorderActive(false);
    setTimeout(() => setBorderActive(true), 50);
  };

  const isAutre = selectedCategory?.id === "autre";
  const canSubmit = !!(
    freeText.objet &&
    freeText.nom &&
    freeText.email &&
    freeText.message
  );

  const navigate = (next: "main" | "sub" | "form") => {
    triggerBorder();
    setTimeout(() => setView(next), 50);
  };

  const handleCategoryClick = (cat: (typeof CATEGORIES)[0]) => {
    setSelectedCategory(cat);
    if (cat.id === "autre") {
      setFreeText({ objet: "", nom: "", email: "", message: "" });
      navigate("form");
    } else {
      navigate("sub");
    }
  };

  const handleOptionClick = (opt: string) => {
    setFreeText({ objet: opt, nom: "", email: "", message: "" });
    navigate("form");
  };

  const handleBack = () => {
    if (view === "form" && !isAutre) navigate("sub");
    else navigate("main");
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      navigate("main");
      setSelectedCategory(null);
      setFreeText({ objet: "", nom: "", email: "", message: "" });
    }, 3000);
  };

  const headerLabel =
    view === "form" && !isAutre
      ? selectedCategory?.label
      : view === "sub"
        ? selectedCategory?.label
        : "Autre demande";

  /* viewKey drives the ViewPane re-mount animation */
  const viewKey = view + (selectedCategory?.id ?? "");

  return (
    <section className="w-full" style={{ backgroundColor: "#f0efea" }}>
      <div
        className="flex items-center justify-center pt-20"
        style={{ minHeight: "680px" }}
      >
        {/* ── Image gauche — réduite et centrée ── */}
        <div className="flex items-end justify-center px-12 py-0">
          <HoverDoorImage />
        </div>

        {/* ── Colonne droite ── */}
        <div className="flex flex-col items-center justify-center self-start py-12 px-12">
          {/* Titre + description */}
          <div className="text-center px-8 pb-10">
            <h2
              className="font-normal text-[#223078] mb-5"
              style={{
                ...coconat,
                fontSize: "clamp(32px, 4vw, 38px)",
                lineHeight: "1.1",
                letterSpacing: "-0.02em",
              }}
            >
              Entrons en contact
            </h2>
            <p
              style={{
                ...commissioner,
                fontSize: "15px",
                lineHeight: "1.55",
                color: "black",
                maxWidth: "560px",
                margin: "0 auto",
                textAlign: "center",
              }}
            >
              La SEDIC est à votre disposition pour répondre à vos demandes,
              qu'il s'agisse d'un projet de partenariat, d'une opportunité
              d'investissement ou d'une simple prise de contact. Notre équipe
              vous répondra dans les meilleurs délais.
            </p>
          </div>

          {/* Card formulaire — border animée */}
          <div
            className="rounded-xl max-w-xl"
            style={{
              width: "100%",
              padding: "32px 28px",
              border: `1.5px solid #223078`,
              opacity: borderActive ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            <ViewPane id={viewKey}>
              {/* ════ MAIN ════ */}
              {view === "main" && (
                <>
                  <p
                    className="uppercase text-[#223078] mb-8"
                    style={{
                      ...coconat,
                      fontSize: "20px",
                      letterSpacing: "0.15em",
                      lineHeight: "1.05",
                      fontWeight: 400,
                    }}
                  >
                    Quel est l'objet de votre demande ?
                  </p>
                  <div className="flex flex-col gap-3">
                    {CATEGORIES.map((cat, i) => (
                      <OptionButton
                        key={cat.id}
                        label={cat.label}
                        onClick={() => handleCategoryClick(cat)}
                        delay={i * 55}
                        visible={view === "main"}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* ════ SUB ════ */}
              {view === "sub" && selectedCategory && (
                <>
                  <div className="flex justify-between items-center gap-3 mb-6">
                    <button
                      onClick={handleBack}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#223078",
                        fontSize: "25px",
                        lineHeight: 1,
                        padding: 0,
                        flexShrink: 0,
                      }}
                    >
                      ‹
                    </button>
                    <p
                      className="uppercase text-[#223078]"
                      style={{
                        ...coconat,
                        fontSize: "20px",
                        letterSpacing: "0.15em",
                        lineHeight: "1.05",
                        fontWeight: 400,
                        margin: 0,
                      }}
                    >
                      {selectedCategory.label}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    {selectedCategory.options.map((opt, i) => (
                      <OptionButton
                        key={opt}
                        label={opt}
                        onClick={() => handleOptionClick(opt)}
                        delay={i * 60}
                        visible={view === "sub"}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* ════ FORM ════ */}
              {view === "form" && (
                <>
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <button
                      onClick={handleBack}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#223078",
                        fontSize: "25px",
                        lineHeight: 1,
                        padding: 0,
                        flexShrink: 0,
                      }}
                    >
                      ‹
                    </button>
                    <p
                      className="uppercase text-[#223078]"
                      style={{
                        ...coconat,
                        fontSize: "20px",
                        letterSpacing: "0.15em",
                        lineHeight: "1.05",
                        fontWeight: 400,
                        margin: 0,
                      }}
                    >
                      {headerLabel}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 mb-6">
                    <input
                      type="text"
                      placeholder="Saisissez l'objet de votre demande"
                      value={freeText.objet}
                      readOnly={!isAutre}
                      onChange={(e) =>
                        setFreeText((p) => ({ ...p, objet: e.target.value }))
                      }
                      style={{
                        ...inputStyle,
                        color: !isAutre ? "#223078" : "#222",
                        fontWeight: !isAutre ? 500 : 400,
                        cursor: !isAutre ? "default" : "text",
                      }}
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Votre nom"
                        value={freeText.nom}
                        onChange={(e) =>
                          setFreeText((p) => ({ ...p, nom: e.target.value }))
                        }
                        style={{ ...inputStyle, flex: 1, width: "auto" }}
                      />
                      <input
                        type="email"
                        placeholder="Votre e-mail"
                        value={freeText.email}
                        onChange={(e) =>
                          setFreeText((p) => ({ ...p, email: e.target.value }))
                        }
                        style={{ ...inputStyle, flex: 1, width: "auto" }}
                      />
                    </div>
                    <textarea
                      placeholder="Tapez votre message…"
                      rows={5}
                      value={freeText.message}
                      onChange={(e) =>
                        setFreeText((p) => ({ ...p, message: e.target.value }))
                      }
                      style={{ ...inputStyle, resize: "vertical" }}
                    />
                  </div>

                  <button
                    className="py-1"
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                    style={{
                      ...coconat,
                      width: "100%",
                      fontSize: "18px",
                      fontWeight: 400,
                      letterSpacing: "0.02em",
                      color: "#fff",
                      backgroundColor: canSubmit ? "#223078" : "#b3c2e9",
                      borderRadius: "8px",
                      border: "none",
                      cursor: canSubmit ? "pointer" : "not-allowed",
                      transition: "background-color 0.2s ease",
                    }}
                  >
                    {submitted ? "Message envoyé ✓" : "Envoyer"}
                  </button>
                </>
              )}
            </ViewPane>
          </div>
        </div>
      </div>
    </section>
  );
}
