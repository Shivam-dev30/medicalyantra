"use client";
import { motion } from "framer-motion";

const orbs = Array.from({ length: 6 });

export default function FloatingOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {orbs.map((_, i) => (
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
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 80}%`
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, 40, 0]
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}
