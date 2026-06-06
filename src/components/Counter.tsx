import { useEffect, useState } from "react";
import { animate } from "framer-motion";

export default function Counter({
  end,
  visible,
}: {
  end: number;
  visible: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;

    const controls = animate(0, end, {
      duration: 3,
      onUpdate(value) {
        setCount(Math.round(value));
      },
    });

    return () => controls.stop();
  }, [end, visible]);

  return <>{count}</>;
}