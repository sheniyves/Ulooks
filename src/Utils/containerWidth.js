import { useEffect, useRef, useState } from "react";

export default function useContainerWidth() {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const updateWidth = () => {
      if (ref.current) {
        setWidth(ref.current.getBoundingClientRect().width);
      }
    };

    updateWidth();

    const resizeObserver = new ResizeObserver(() => updateWidth());
    resizeObserver.observe(ref.current);

    return () => resizeObserver.disconnect();
  }, []);

  return [ref, width];
}
