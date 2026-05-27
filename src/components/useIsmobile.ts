import { useEffect, useState } from "react";

export default function useIsMobile(breakpoint = 1200) {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < breakpoint
  );

  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < breakpoint);

    window.addEventListener("resize", h);

    return () => window.removeEventListener("resize", h);
  }, [breakpoint]);

  return isMobile;
}