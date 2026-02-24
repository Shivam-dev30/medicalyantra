"use client";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <>
      {/* Top Left: Logo & Protocol */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="fixed top-12 left-12 z-[100] flex items-center gap-6"
      >
        <div className="w-14 h-14 bio-orb flex items-center justify-center border-emerald-500/20">
          <div className="w-6 h-6 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_20px_#00ff9f]" />
        </div>
        <div>
          <h1 className="text-2xl font-black italic tracking-tighter text-white uppercase leading-none">Medical Yantra</h1>
          <div className="glitch-mono text-[9px] mt-1 opacity-40">AI HEALTH ANALYSIS</div>
        </div>
      </motion.div>

      {/* Top Right: Status HUD */}
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="fixed top-12 right-12 z-[100] flex items-center gap-10"
      >
        <div className="hidden md:flex gap-8">
          {["NEURAL", "ARCHIVE", "INTEL"].map((item) => (
            <a
              key={item}
              href="#"
              className="glitch-mono text-[11px] font-bold text-slate-500 hover:text-emerald-500 transition-colors tracking-[0.2em]"
            >
              {item}
            </a>
          ))}
        </div>
        <div className="h-10 w-px bg-white/10 hidden md:block" />
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <div className="glitch-mono text-[8px] opacity-40">SYSTEM_TIME</div>
            <div className="text-[10px] font-bold text-emerald-500 font-mono tracking-wider">00:48:51_GMT</div>
          </div>
          <div className="w-10 h-10 border border-white/10 flex items-center justify-center group cursor-pointer hover:border-emerald-500/40 transition-colors">
            <div className="w-1.5 h-1.5 bg-white/20 group-hover:bg-emerald-500 transition-colors" />
          </div>
        </div>
      </motion.div>

      {/* Background Static Lines */}
      <div className="fixed top-0 left-[20%] w-px h-24 bg-gradient-to-b from-emerald-500/20 to-transparent z-[90]" />
      <div className="fixed top-0 right-[20%] w-px h-16 bg-gradient-to-b from-emerald-500/10 to-transparent z-[90]" />
    </>
  );
}
