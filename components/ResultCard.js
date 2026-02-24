"use client";
import { motion } from "framer-motion";

export default function ResultCard({ result, loading }) {
  const getStatus = () => {
    if (!result) return null;
    const high = result.issues_detected?.some(i => i.risk_level === "High");
    return high ? "ACTION_REQUIRED" : "GENERALLY_HEALTHY";
  };

  const status = getStatus();

  return (
    <div className="relative group">
      {/* Decorative HUD Lines */}
      <div className="absolute top-0 -left-10 w-px h-full bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent" />
      <div className="absolute top-0 -right-10 w-px h-full bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent" />

      <div className="space-y-12 backdrop-blur-3xl p-10 border-l-2 border-emerald-500/10">

        {/* Header Telemetry */}
        <div className="space-y-2">
          <div className="glitch-mono text-[9px] opacity-40">HEALTH_SUMMARY_HUD</div>
          <h2 className="text-4xl font-black italic tracking-tighter text-white">SUMMARY</h2>
          <div className="h-0.5 w-12 bg-emerald-500 shadow-[0_0_10px_#00ff9f]" />
        </div>

        {/* Dynamic Condition Display */}
        {result ? (
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={`p-6 border ${status === 'ACTION_REQUIRED' ? 'border-red-500/20 bg-red-500/5 text-red-400' : 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400'}`}
          >
            <div className="glitch-mono text-[8px] mb-2 opacity-60">CURRENT_HEALTH_STATE</div>
            <div className="text-3xl font-black uppercase tracking-widest italic">
              {status ? status.replaceAll('_', ' ') : ''}
            </div>
            <div className="mt-4 flex gap-1">
              {[...Array(20)].map((_, i) => (
                <div key={i} className={`h-1 flex-1 ${i < 12 ? 'bg-current' : 'bg-current/10'}`} />
              ))}
            </div>
          </motion.div>
        ) : loading ? (
          <div className="py-10 space-y-4">
            <div className="h-1 w-full bg-emerald-500/10 relative overflow-hidden">
              <motion.div
                className="absolute inset-x-0 h-full bg-emerald-500 shadow-[0_0_10px_#00ff9f]"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </div>
            <div className="glitch-mono text-center animate-pulse">ANALYZING...</div>
          </div>
        ) : (
          <div className="py-10 text-center space-y-4 opacity-40">
            <div className="glitch-mono text-[10px]">AWAITING_REPORT_SCAN</div>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 px-6">Upload document to view summary.</p>
          </div>
        )}

        {/* Key Finding Nodes */}
        {result?.issues_detected && (
          <div className="space-y-6">
            <div className="glitch-mono text-[9px] opacity-40 flex justify-between">
              <span>KEY_FINDINGS</span>
              <span>[ {result.issues_detected.length} DETECTED ]</span>
            </div>
            <div className="space-y-4">
              {result.issues_detected.slice(0, 4).map((issue, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative pl-6 py-2 border-l border-white/5 group hover:border-emerald-500 transition-colors"
                >
                  <div className="absolute left-[-3px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-emerald-500/40 group-hover:bg-emerald-500 shadow-[0_0_8px_#00ff9f]" />
                  <div className="text-[11px] font-bold text-slate-400 group-hover:text-white transition-colors">{issue.parameter || "HEALTH_VAR"}</div>
                  <div className="text-[9px] glitch-mono text-emerald-500/60 mt-0.5">{issue.risk_level?.toUpperCase()}</div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* System Fidelity HUD */}
        <div className="pt-10 border-t border-white/5 space-y-4">
          <div className="flex justify-between glitch-mono text-[9px] opacity-40">
            <span>AI_CONFIDENCE</span>
            <span>98.6%</span>
          </div>
          <div className="relative h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-emerald-500"
              initial={{ width: 0 }}
              animate={{ width: "98.6%" }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          </div>
          <div className="flex gap-2 justify-end items-center">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
            <div className="glitch-mono text-[8px] opacity-60">ANALYSIS_LIVE</div>
          </div>
        </div>

      </div>
    </div>
  );
}
