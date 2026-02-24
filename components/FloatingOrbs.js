"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ORB_POSITIONS = [
  { top: "10%", left: "15%" },
  { top: "60%", left: "75%" },
  { top: "30%", left: "50%" },
  { top: "80%", left: "20%" },
  { top: "20%", left: "80%" },
  { top: "70%", left: "40%" },
];

export default function FloatingOrbs() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {ORB_POSITIONS.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 160,
            height: 160,
            background:
              i % 2 === 0
                ? "radial-gradient(circle, rgba(0,245,212,0.35), transparent)"
                : "radial-gradient(circle, rgba(124,58,237,0.35), transparent)",
            filter: "blur(40px)",
            top: pos.top,
            left: pos.left,
          }}
          animate={{ y: [0, -60, 0], x: [0, 40, 0] }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
