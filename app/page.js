"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "@/components/Navbar";
import UploadCard from "@/components/UploadCard";
import ResultCard from "@/components/ResultCard";
import DetailedResult from "@/components/DetailedResult";
import Footer from "@/components/Footer";

export default function Home() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const hasValidResult =
    result &&
    typeof result === "object" &&
    !result.error &&
    (result.overall_status ||
      result.issues_detected?.length > 0 ||
      result.modern_medical_insights?.length > 0);

  return (
    <div className="relative min-h-screen bg-[#030303] overflow-x-hidden">
      <div className="bio-mesh" />

      <Navbar />

      <main className="relative z-10 pt-40 md:pt-60 px-6 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {!hasValidResult && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.4 } }}
              className="relative grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
            >
              {/* Hero Text */}
              <div className="relative">
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h1 className="giant-title">
                    <span className="block">Visualize</span>
                    <span className="stroke-text block pl-[0.1em]">Your</span>
                    <span className="text-emerald-400 block">Health.</span>
                  </h1>
                </motion.div>

                <motion.div
                  className="mt-12 pl-6 border-l-2 border-emerald-500/30 max-w-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <p className="text-slate-400 text-lg leading-relaxed font-light">
                    Our AI engine transforms complex clinical data into simple, actionable insights for your wellbeing.
                  </p>
                  <div className="glitch-mono mt-4">AI_HEALTH_ANALYSIS_v4.2</div>
                </motion.div>
              </div>

              {/* Upload Card */}
              <div className="relative flex justify-center lg:justify-end">
                <motion.div
                  className="w-full max-w-xl"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <UploadCard
                    setLoading={setLoading}
                    onResult={(data) => setResult(data)}
                  />
                </motion.div>
              </div>
            </motion.div>
          )}

          {hasValidResult && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-40"
            >
              {/* Main Detail Panel */}
              <div className="lg:col-span-8 space-y-16">
                <div className="relative pt-10">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="h-[1px] w-64 bg-emerald-500/40 mb-10 origin-left"
                  />
                  <h2 className="text-6xl font-black text-white italic tracking-tighter uppercase">Health Insights</h2>
                  <div className="glitch-mono mt-4 opacity-100 flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse inline-block" />
                    <span>ANALYSIS_STATION_ACTIVE</span>
                  </div>
                </div>

                <DetailedResult result={result} />

                {/* Reset Button */}
                <button
                  onClick={() => setResult(null)}
                  className="kinetic-btn"
                >
                  ANALYZE ANOTHER REPORT
                </button>
              </div>

              {/* Sidebar Summary */}
              <div className="lg:col-span-4 lg:pt-40">
                <ResultCard loading={loading} result={result} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading Overlay */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-3xl flex flex-col items-center justify-center p-6 text-center"
            >
              <div className="relative w-80 h-px bg-white/5 overflow-hidden mb-12">
                <motion.div
                  className="absolute inset-0 bg-emerald-500"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <div className="glitch-mono text-[11px] animate-pulse">
                Analyzing your medical report...
              </div>
              <div className="mt-4 text-emerald-500/30 text-[8px] tracking-[0.5em] font-mono">
                [ SECURE_TRANSFER_ACTIVE ]
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
