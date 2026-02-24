"use client";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 py-24 px-12 border-t border-white/5 bg-[#030303]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">

          {/* Brand Brutalism */}
          <div className="md:col-span-4 space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-black italic tracking-tighter text-white uppercase leading-none">Medical_Yantra</h2>
              <div className="glitch-mono text-[9px] opacity-100 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                AI_HEALTH_RECONSTRUCTION_ENGINE
              </div>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed uppercase tracking-widest font-bold max-w-sm">
              Empowering healthcare through biometric clarity. We decode clinical complexity into actionable intelligence.
            </p>
          </div>

          {/* Navigation Nodes */}
          <div className="md:col-span-2 space-y-6">
            <div className="glitch-mono text-[10px] opacity-40">RESOURCES</div>
            <div className="flex flex-col gap-4">
              {["ARCHIVE", "TECHNOLOGY", "API_DOCS"].map(link => (
                <a key={link} href="#" className="text-[11px] font-bold text-slate-400 hover:text-emerald-500 transition-all italic tracking-tighter hover:pl-2">
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Social Nodes */}
          <div className="md:col-span-2 space-y-6">
            <div className="glitch-mono text-[10px] opacity-40">CONNECT</div>
            <div className="flex flex-col gap-4">
              <a href="https://github.com/Shivam-dev30" target="_blank" className="text-[11px] font-bold text-slate-400 hover:text-emerald-500 transition-all italic tracking-tighter hover:pl-2">GITHUB_NODE</a>
              <a href="https://www.linkedin.com/in/shivammaurya01" target="_blank" className="text-[11px] font-bold text-slate-400 hover:text-emerald-500 transition-all italic tracking-tighter hover:pl-2">LINKEDIN_STATION</a>
              <a href="#" className="text-[11px] font-bold text-slate-400 hover:text-emerald-500 transition-all italic tracking-tighter hover:pl-2">X_CHRONICLE</a>
            </div>
          </div>

          {/* Status & Legal */}
          <div className="md:col-span-4 flex flex-col justify-between items-end space-y-12">
            <div className="w-full space-y-4">
              <div className="glitch-mono text-[10px] opacity-40 border-b border-white/5 pb-2">SYSTEM_TELEMETRY</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-[8px] opacity-40 glitch-mono">SERVER_LATENCY</div>
                  <div className="text-[10px] font-bold text-emerald-500">14MS_OPTIMAL</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[8px] opacity-40 glitch-mono">ENCRYPTION_v4</div>
                  <div className="text-[10px] font-bold text-emerald-500">AES_ACTIVE</div>
                </div>
              </div>
            </div>
            <div className="text-right space-y-2">
              <div className="glitch-mono text-[9px] opacity-20">© {currentYear} MEDICAL_YANTRA_SYSTEMS</div>
              <div className="text-[8px] font-bold text-slate-700 uppercase tracking-[0.4em]">All rights reserved. Physical labs restricted.</div>
            </div>
          </div>

        </div>

        {/* Bottom Accent */}
        <div className="mt-24 pt-8 border-t border-white/5 flex justify-between items-center opacity-40">
          <div className="glitch-mono text-[8px]">BUILD_2026.02.21.001</div>
          <div className="flex gap-4">
            <div className="w-1 h-1 bg-emerald-500 rounded-full" />
            <div className="w-1 h-1 bg-emerald-500/40 rounded-full" />
            <div className="w-1 h-1 bg-emerald-500/10 rounded-full" />
          </div>
        </div>
      </div>

      {/* Background HUD Accents */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-emerald-500/[0.02] blur-[150px] rounded-full" />
    </footer>
  );
}
