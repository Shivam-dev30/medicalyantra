"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "@/lib/api";

export default function UploadCard({ onResult, setLoading }) {
  const [file, setFile] = useState(null);
  const [language, setLanguage] = useState("English");
  const [drag, setDrag] = useState(false);
  const [scanning, setScanning] = useState(false);

  async function handleAnalyze() {
    if (!file) {
      toast.error("Please select a file first", {
        style: { background: '#000', color: '#ff4d4d', border: '1px solid #ff4d4d33' }
      });
      return;
    }

    setLoading(true);
    setScanning(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("language", language);

      const res = await axios.post(`${API_URL}/analyze`, formData);

      if (res.data.error) {
        throw new Error(res.data.error);
      }

      onResult(res.data);
      toast.success("Analysis complete");

    } catch (err) {
      console.error("ANALYSIS_ERROR:", err);
      const errMsg = err.response?.data?.detail || err.message || "Analysis failed. Please try again.";
      toast.error(errMsg, {
        duration: 5000,
        style: { background: '#000', color: '#ff4d4d', border: '1px solid #ff4d4d33' }
      });
    } finally {
      setScanning(false);
      setLoading(false);
    }
  }

  const languages = [
    { code: "English", label: "EN" },
    { code: "Hindi", label: "HI" },
    { code: "Tamil", label: "TN" },
    { code: "Bengali", label: "BN" }
  ];

  return (
    <div className="relative group">
      {/* Deconstructed HUD elements */}
      <div className="absolute -top-10 -left-10 glitch-mono opacity-20 group-hover:opacity-40 transition-opacity">
        [ SYSTEM_READY ]
      </div>
      <div className="absolute -bottom-10 -right-10 glitch-mono opacity-20 group-hover:opacity-40 transition-opacity">
        SECURE_SCAN_v4
      </div>

      <div className="relative z-10 p-12 bg-black/40 backdrop-blur-3xl border border-emerald-500/10 rounded-[40px] transition-all duration-700 hover:border-emerald-500/30">

        {/* Animated Scan Ring */}
        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/10 overflow-hidden">
          <motion.div
            className="w-20 h-full bg-emerald-500 shadow-[0_0_15px_#00ff9f]"
            animate={{ x: ['-200%', '800%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">Upload Report</h2>
          <p className="glitch-mono mt-2">Awaiting your medical document</p>
        </div>

        {/* Neural Drop Zone */}
        <label
          className="relative block cursor-crosshair"
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDrag(false);
            setFile(e.dataTransfer.files[0]);
          }}
        >
          <div
            className={`
              relative p-20 border border-emerald-500/5 rounded-3xl transition-all duration-700
              flex flex-col items-center justify-center gap-8
              ${drag ? "bg-emerald-500/5 border-emerald-500/40" : "bg-white/[0.01]"}
              ${file ? "border-emerald-500/20" : ""}
            `}
          >
            {/* Holographic Visual */}
            <div className="relative">
              <motion.div
                className="w-32 h-32 bio-orb flex items-center justify-center"
                animate={file ? { scale: [1, 1.1, 1], rotate: 360 } : { rotate: 360 }}
                transition={file ? { duration: 2, repeat: Infinity } : { duration: 20, repeat: Infinity, ease: "linear" }}
              >
                {file ? (
                  <div className="w-16 h-16 bg-emerald-500 rounded-full blur-md animate-pulse" />
                ) : (
                  <div className="w-8 h-8 border border-emerald-500/40 rounded-full" />
                )}
              </motion.div>
              {/* Spinning Rings */}
              <div className="absolute inset-0 border border-emerald-500/10 rounded-full scale-125 animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-0 border border-emerald-500/5 rounded-full scale-150 animate-[spin_15s_linear_infinite_reverse]" />
            </div>

            <div className="text-center">
              <span className="glitch-mono text-[11px] block text-emerald-400 group-hover:animate-pulse">
                {file ? file.name : "Drop your file here"}
              </span>
              {!file && <span className="text-slate-600 text-[10px] mt-2 block tracking-widest uppercase">PDF / Image / Lab Report</span>}
            </div>

            <input
              type="file"
              accept=".pdf,image/*"
              hidden
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
        </label>

        {/* Dynamic Controls */}
        <div className="mt-12 flex flex-col md:flex-row items-end justify-between gap-10">
          <div className="space-y-4 w-full md:w-auto">
            <span className="glitch-mono text-[9px]">Select Language</span>
            <div className="flex gap-4">
              {languages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`
                    w-12 h-12 rounded-full border flex items-center justify-center text-[10px] font-bold transition-all
                    ${language === lang.code ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-white/10 text-slate-500 hover:border-emerald-500/40'}
                  `}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={scanning}
            className="kinetic-btn w-full md:w-auto"
          >
            {scanning ? "Analyzing..." : "Analyze Now"}
          </button>
        </div>
      </div>

      {/* Grid Accents */}
      <div className="absolute top-1/2 -right-4 w-8 h-px bg-emerald-500/20" />
      <div className="absolute top-1/2 -left-4 w-8 h-px bg-emerald-500/20" />
    </div>
  );
}
