"use client";
import { motion } from "framer-motion";

export default function ECGWave({ active }) {
  return (
    <div className="glass-panel hud-border p-6 relative overflow-hidden">
      {/* Scan lines */}
      <div className="scan-line opacity-20" />

      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-[10px] font-orbitron text-cyan-400 tracking-[0.2em] uppercase">Biometric_Feed</span>
          <h3 className="text-sm font-bold font-orbitron text-white mt-1">
            {active ? "LIVE_NEURAL_PULSE" : "SYSTOLIC_HEART_RHYTHM"}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping"></span>
          <span className="hud text-[10px] font-orbitron uppercase text-cyan-400 border-cyan-400/20">Active_Signal</span>
        </div>
      </div>

      {/* ECG SVG */}
      <div className="relative h-24 w-full bg-slate-950/30 rounded border border-white/5 p-2 overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

        <svg
          viewBox="0 0 600 100"
          className="w-full h-full relative z-10"
          preserveAspectRatio="none"
          fill="none"
        >
          <motion.path
            d="
              M0 50 
              L50 50 
              L65 30 
              L80 70 
              L100 50 
              L150 50
              L170 10 
              L190 90
              L210 50
              L270 50
              L290 40
              L310 50
              L370 50
              L390 20
              L410 80
              L430 50
              L490 50
              L510 35
              L530 50
              L600 50
            "
            stroke="url(#ecgGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          <defs>
            <linearGradient id="ecgGradient" x1="0" y1="0" x2="600" y2="0">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="30%" stopColor="#00f5d4" />
              <stop offset="70%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>

        {/* Scan dot */}
        <motion.div
          className="absolute top-0 bottom-0 w-1 bg-cyan-400/30 shadow-[0_0_15px_rgba(0,245,212,0.5)] z-20"
          animate={{ left: ["0%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="mt-4 flex justify-between items-center text-[9px] font-orbitron text-slate-500 uppercase tracking-widest">
        <span>BPM: {active ? "READING..." : "72.4"}</span>
        <span>Signal_Strength: 94%</span>
      </div>
    </div>
  );
}
