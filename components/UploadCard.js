"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "@/lib/api";

/* 3D tilt hook */
function useTilt(active) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || !active) return;
    const el = ref.current;

    const handle = (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      el.style.transform = `rotateY(${(px - 0.5) * 12}deg) rotateX(${(py - 0.5) * -8}deg)`;
    };

    const reset = () => {
      el.style.transform = "rotateY(0deg) rotateX(0deg)";
    };

    el.addEventListener("mousemove", handle);
    el.addEventListener("mouseleave", reset);

    return () => {
      el.removeEventListener("mousemove", handle);
      el.removeEventListener("mouseleave", reset);
    };
  }, [active]);

  return ref;
}

export default function UploadCard({ onResult, setLoading }) {
  const [file, setFile] = useState(null);
  const [language, setLanguage] = useState("English");
  const [drag, setDrag] = useState(false);
  const [scanning, setScanning] = useState(false);

  const tiltRef = useTilt(true);

  async function handleAnalyze() {
    if (!file) {
      toast.error("Please select a medical report");
      return;
    }

    setLoading(true);
    setScanning(true);
    toast.loading("Analyzing medical report…", { id: "scan" });

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("language", language);

      const res = await axios.post(
        `${API_URL}/analyze`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("BACKEND RESPONSE:", res.data); // 🔍 debug

      onResult(res.data); // ✅ ONLY backend data
      toast.success("Analysis complete", { id: "scan" });

    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      toast.error("Failed to analyze report");
    } finally {
      setScanning(false);
      setLoading(false);
    }
  }

  return (
    <div className="scene">
      <motion.div
        ref={tiltRef}
        className="card-glass neon-outline p-6"
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="kicker">Upload Medical Report</div>
        <div className="text-lg font-semibold mb-3">
          PDF / Image • AI Medical Scan
        </div>

        {/* Upload Box */}
        <label
          className="block cursor-pointer"
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDrag(false);
            setFile(e.dataTransfer.files[0]);
          }}
        >
          <div
            className={`p-6 border-2 border-dashed rounded-lg ${
              drag ? "border-accent" : "border-slate-600"
            }`}
          >
            <input
              type="file"
              accept=".pdf,image/*"
              hidden
              onChange={(e) => setFile(e.target.files[0])}
            />
            <div className="subtle">
              {file ? file.name : "Drag & drop file or click to select"}
            </div>
          </div>
        </label>

        {/* Controls */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="p-2 rounded-md bg-transparent border"
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Tamil</option>
            <option>Bengali</option>
          </select>

          <button
            onClick={handleAnalyze}
            className="btn-accent"
          >
            Analyze
          </button>
        </div>

        <div className="mt-2 text-xs opacity-70">
          Scan status: {scanning ? "Scanning…" : "Idle"}
        </div>
      </motion.div>
    </div>
  );
}
