"use client";
import { motion } from "framer-motion";

export default function ECGWave() {
  return (
    <div className="card-glass neon-outline mt-8 p-6 relative overflow-hidden">
      {/* Scan lines */}
      <div className="holo-scan" />

      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Live ECG Signal</h3>
        <span className="hud">Normal Rhythm</span>
      </div>

      {/* ECG SVG */}
      <svg
        viewBox="0 0 600 120"
        className="w-full h-32"
        fill="none"
      >
        <motion.path
          d="
            M0 60 
            L40 60 
            L55 40 
            L70 80 
            L90 60 
            L140 60
            L160 20 
            L180 100
            L200 60
            L260 60
            L280 50
            L300 60
            L360 60
            L380 30
            L400 90
            L420 60
            L480 60
            L500 45
            L520 60
            L600 60
          "
          stroke="url(#ecgGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Gradient */}
        <defs>
          <linearGradient id="ecgGradient" x1="0" y1="0" x2="600" y2="0">
            <stop offset="0%" stopColor="#00f5d4" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#00f5d4" />
          </linearGradient>
        </defs>
      </svg>

      {/* Glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: "0 0 40px rgba(0,245,212,0.15)"
        }}
      />
    </div>
  );
}
