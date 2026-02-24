"use client";
import { motion } from "framer-motion";
import { generateReportPDF } from "@/utils/pdfGenerator";

const renderContent = (content) => {
  if (!content) return null;

  if (Array.isArray(content)) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
        {content.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="p-8 bg-[#030303] group hover:bg-emerald-500/[0.02] transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="glitch-mono text-[8px] opacity-20 mt-1">0x{idx.toString(16).toUpperCase()}</div>
              <div className="flex-1">
                {typeof item === "object" ? (
                  <>
                    {item.parameter && <span className="text-emerald-400 font-bold block mb-2 text-lg uppercase tracking-tighter italic">{item.parameter}</span>}
                    <span className="text-slate-400 text-sm leading-relaxed block font-medium group-hover:text-slate-200 transition-colors">{item.issue}</span>
                    {item.risk_level && (
                      <div className={`mt-4 inline-block px-3 py-1 text-[9px] font-black tracking-[0.2em] border ${item.risk_level === 'High' ? 'border-red-500/30 text-red-500' : 'border-emerald-500/30 text-emerald-500'}`}>
                        {item.risk_level.toUpperCase()}_ALERT
                      </div>
                    )}
                  </>
                ) : (
                  <span className="text-slate-400 text-sm leading-relaxed font-medium">{item}</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="p-10 border border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/20" />
      <p className="text-xl text-slate-300 font-medium leading-relaxed italic pr-20">{String(content)}</p>
      <div className="absolute bottom-4 right-4 glitch-mono text-[8px] opacity-20 italic">ANALYTICS_v4</div>
    </div>
  );
};

export default function DetailedResult({ result }) {
  if (!result) return null;

  const sections = [
    { id: 'status', title: 'OVERALL_STATUS', data: result.overall_status },
    { id: 'issues', title: 'KEY_FINDINGS', data: result.issues_detected },
    { id: 'insights', title: 'MEDICAL_INSIGHTS', data: result.modern_medical_insights },
    { id: 'lifestyle', title: 'RECOMMENDATIONS', data: result.lifestyle_recommendations },
    { id: 'ayurveda', title: 'NATURAL_GUIDANCE', data: result.ayurvedic_guidance },
  ].filter(s => s.data);

  return (
    <div className="space-y-40">

      {/* Header HUD */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 border-b border-white/5 pb-20 relative">
        <div className="absolute -left-10 top-0 w-px h-full bg-emerald-500/20" />
        <div className="space-y-4">
          <div className="glitch-mono text-[10px] opacity-40">STEP_02 : ANALYSIS_REPORT</div>
          <h2 className="text-8xl font-black italic tracking-tighter uppercase leading-none">Diagnostic</h2>
        </div>
        <button
          onClick={() => generateReportPDF(result)}
          className="kinetic-btn"
        >
          DOWNLOAD_PDF_REPORT
        </button>
      </div>

      {/* Sections Data Stream */}
      <div className="space-y-32">
        {sections.map((section, idx) => (
          <div key={section.id} className="relative group">
            {/* Absolute Section Header */}
            <div className="flex items-center gap-6 mb-12">
              <div className="glitch-mono text-[11px] text-emerald-500 font-bold opacity-100 italic">SEC_0{idx + 1}</div>
              <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/40 via-white/5 to-transparent" />
              <h3 className="text-2xl font-black text-white italic tracking-widest uppercase">{section.title}</h3>
            </div>

            <div className="relative z-10">
              {renderContent(section.data)}
            </div>
          </div>
        ))}
      </div>

      {/* Warning Protocol */}
      {result.disclaimer && (
        <div className="pt-20 border-t border-red-500/40 space-y-6">
          <div className="flex items-center gap-4 text-red-500">
            <div className="w-10 h-10 border border-current flex items-center justify-center font-black animate-pulse">!</div>
            <div className="glitch-mono text-[11px] font-bold tracking-[0.3em]">MEDICAL_DISCLAIMER</div>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed max-w-4xl italic">{result.disclaimer}</p>
        </div>
      )}
    </div>
  );
}
