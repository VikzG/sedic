import { useState } from "react";


export default function HoverDoorImage() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%",
        maxWidth: "500px",
        maxHeight: "80vh",
        borderRadius: "16px",
        overflow: "hidden",
        position: "relative",
        flexShrink: 0,
        cursor: "pointer",
      }}
    >
      {/* Image normale */}
      <img
        src="/images/contact_form/door.webp"
        loading="lazy"
        decoding="async"
        alt="Porte fermée"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          display: "block",
          opacity: hovered ? 0 : 1,
          transition: "opacity 0.5s ease",
        }}
      />

      {/* Image hover */}
      <img
        src="/images/contact_form/door_open.webp"
        loading="lazy"
        decoding="async"
        alt="Porte ouverte"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.5s ease",
          pointerEvents: "none",
        }}
      />
{/* Wrapper overlay */}
<div
  style={{
    position: "absolute",
    top: "45%",
    left: "50%",

    transform: hovered
      ? "translate(-50%, -50%)"
      : "translate(-50%, -48%)",

    opacity: hovered ? 1 : 0,

    transition:
      "opacity 0.45s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1)",

    zIndex: 5,
    pointerEvents: "none",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }}
>
  {/* Titre OUTSIDE */}
  <div
    style={{
      fontFamily: "Coconat, Georgia, serif",
      fontWeight: 400,
      fontSize: "20.5px",
      lineHeight: "105%",
      letterSpacing: "0.02em",
      textTransform: "uppercase",
      textAlign: "center",
      color: "#223078",

      marginBottom: "18px",

      textShadow: "0 2px 10px rgba(255,255,255,0.25)",
    }}
  >
    CONTACT
  </div>

  {/* Overlay glass */}
  <div
    style={{
      background: "rgba(255,255,255,0.22)",
      backdropFilter: "blur(1px)",

      border: "1px solid rgba(255,255,255,0.18)",

      borderRadius: "18px",

      padding: "22px 24px",


      boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
    }}
  >
    {/* Infos */}
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",

        fontFamily: "Commissioner, sans-serif",
        fontWeight: 600,
        fontSize: "15px",
        lineHeight: "130%",
        letterSpacing: "0",

        color: "#223078",
      }}
    >
      {/* Téléphone */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <img
          src="/images/contact_form/form_icon_call.svg"
          alt=""
          style={{
            width: "20px",
            height: "20px",
            flexShrink: 0,
          }}
        />

        <span>+242 06 848 13 10</span>
      </div>

      {/* Mail */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <img
          src="/images/contact_form/form_icon_contact.svg"
          alt=""
          style={{
            width: "20px",
            height: "20px",
            flexShrink: 0,
          }}
        />

        <span>roannic.ololo@sedic.cg</span>
      </div>

      {/* Adresse */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
        }}
      >
        <img
          src="/images/contact_form/form_icon_map.svg"
          alt=""
          style={{
            width: "20px",
            height: "20px",
            flexShrink: 0,
            marginTop: "1px",
          }}
        />

        <span>
          Business Center,
          <br/>
          Tours Jumelles,
          <br />
          Brazzaville, 28e étage
        </span>
      </div>
    </div>
  </div>
</div>
    </div>
  );
}