"use client";
import { motion } from "framer-motion";

export default function ResultCard({ result, loading }) {
  const getRisk = () => {
    if (!result?.issues_detected) return null;
    if (result.issues_detected.some(i => i.risk_level === "High")) return "High";
    if (result.issues_detected.some(i => i.risk_level === "Moderate")) return "Moderate";
    return "Low";
  };

  const risk = getRisk();

  const riskStyle = {
    High: "bg-red-500/20 text-red-400 border-red-500/30",
    Moderate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    Low: "bg-green-500/20 text-green-400 border-green-500/30",
  };

  return (
    <motion.aside
      initial={{ y: 25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="card-glass p-6 tilt relative"
      style={{ minHeight: 280 }}
    >
      <div className="holo-scan" aria-hidden />

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="kicker">Analysis</div>
          <div className="font-semibold text-base">Quick Summary</div>
        </div>
        <div className="hud">Realtime</div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="subtle animate-pulse">
          Running AI medical analysis…
        </div>
      )}

      {/* Idle */}
      {!loading && !result && (
        <div className="subtle">
          Upload a medical report to view analysis.
        </div>
      )}

      {/* Error */}
      {result?.error && (
        <div className="mt-4 text-sm text-red-400">
          {result.error}
        </div>
      )}

      {/* Result */}
      {!loading && result && !result.error && (
        <div className="space-y-4">

          {/* Overall Status */}
          <div className="rounded-lg p-3 bg-gradient-to-r from-primary/10 to-accent/10">
            <p className="text-sm leading-relaxed">
              <span className="font-medium">Overall Status:</span>{" "}
              {result.overall_status || "Unavailable"}
            </p>
          </div>

          {/* Risk Badge */}
          {risk && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs ${riskStyle[risk]}`}
            >
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              Risk Level: {risk}
            </motion.div>
          )}

          {/* Key Findings */}
          {result.issues_detected?.length > 0 && (
            <div>
              <div className="hud mb-2">Key Observations</div>
              <div className="space-y-2 text-xs">
                {result.issues_detected.slice(0, 3).map((issue, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center gap-3 border-b border-white/5 pb-1"
                  >
                    <span className="subtle">{issue.parameter}</span>
                    <span className="opacity-90">{issue.issue}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </motion.aside>
  );
}
