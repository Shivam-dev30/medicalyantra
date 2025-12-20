"use client";
import { useEffect, useRef } from "react";

export default function ParallaxScene({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * -20;
      el.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.1s linear"
      }}
    >
      {children}
    </div>
  );
}
