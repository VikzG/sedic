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
        src="/images/contact_form/door.png"
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
        src="/images/contact_form/door_open.png"
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
    </div>
  );
}