"use client";
import { motion } from "framer-motion";
import { generateReportPDF } from "@/utils/pdfGenerator";

export default function DetailedResult({ result }) {
  if (!result) return null;

  return (
    <motion.section
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="card-glass p-8 neon-outline mt-10 relative"
    >
      <div className="holo-scan" aria-hidden />

      <h2 className="text-xl font-bold mb-6">
        Full Medical Analysis
      </h2>

      {/* Overall */}
      <Section title="Overall Health Status">
        {result.overall_status}
      </Section>

      {/* Issues */}
      {result.issues_detected?.length > 0 && (
        <Section title="Detected Issues">
          <ul className="list-disc list-inside space-y-1 text-sm">
            {result.issues_detected.map((i, idx) => (
              <li key={idx}>
                <strong>{i.parameter}</strong>: {i.issue}  
                <span className="opacity-70">
                  {" "}({i.risk_level})
                </span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Modern Medical */}
      {result.modern_medical_insights?.length > 0 && (
        <Section title="Medical Insights">
          <ul className="list-disc list-inside space-y-1 text-sm">
            {result.modern_medical_insights.map((i, idx) => (
              <li key={idx}>{i}</li>
            ))}
          </ul>
        </Section>
      )}

      {/* Ayurveda */}
      {result.ayurvedic_guidance?.length > 0 && (
        <Section title="Ayurvedic Guidance">
          <ul className="list-disc list-inside space-y-1 text-sm">
            {result.ayurvedic_guidance.map((i, idx) => (
              <li key={idx}>{i}</li>
            ))}
          </ul>
        </Section>
      )}

      {/* Lifestyle */}
      {result.lifestyle_recommendations?.length > 0 && (
        <Section title="Lifestyle Recommendations">
          <ul className="list-disc list-inside space-y-1 text-sm">
            {result.lifestyle_recommendations.map((i, idx) => (
              <li key={idx}>{i}</li>
            ))}
          </ul>
        </Section>
      )}

      {/* Doctor */}
      {result.when_to_see_doctor?.length > 0 && (
        <Section title="When to Consult a Doctor">
          <ul className="list-disc list-inside space-y-1 text-sm">
            {result.when_to_see_doctor.map((i, idx) => (
              <li key={idx}>{i}</li>
            ))}
          </ul>
        </Section>
      )}

      {/* Disclaimer */}
      <p className="text-xs opacity-60 mt-6">
        {result.disclaimer}
      </p>

      {/* Actions */}
      <div className="flex gap-4 mt-6 flex-wrap">
        <button
          className="btn-accent"
          onClick={() => generateReportPDF(result)}
        >
          Download Full Report
        </button>
      </div>
    </motion.section>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <h3 className="kicker mb-2">{title}</h3>
      <div className="text-sm leading-relaxed opacity-90">
        {children}
      </div>
    </div>
  );
}
