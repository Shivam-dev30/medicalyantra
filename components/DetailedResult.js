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
      {/* Issues */}
      {result.issues_detected && (
        <Section title="Detected Issues">
          {Array.isArray(result.issues_detected) && result.issues_detected.length > 0 ? (
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
          ) : (
            <p className="text-sm opacity-90">{typeof result.issues_detected === 'string' ? result.issues_detected : "No specific issues detected."}</p>
          )}
        </Section>
      )}

      {/* Modern Medical */}
      {/* Modern Medical */}
      {result.modern_medical_insights && (
        <Section title="Medical Insights">
          {Array.isArray(result.modern_medical_insights) ? (
            <ul className="list-disc list-inside space-y-1 text-sm">
              {result.modern_medical_insights.map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm opacity-90">{result.modern_medical_insights}</p>
          )}
        </Section>
      )}

      {/* Ayurveda */}
      {/* Ayurveda */}
      {result.ayurvedic_guidance && (
        <Section title="Ayurvedic Guidance">
          {Array.isArray(result.ayurvedic_guidance) ? (
            <ul className="list-disc list-inside space-y-1 text-sm">
              {result.ayurvedic_guidance.map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm opacity-90">{result.ayurvedic_guidance}</p>
          )}
        </Section>
      )}

      {/* Lifestyle */}
      {/* Lifestyle */}
      {result.lifestyle_recommendations && (
        <Section title="Lifestyle Recommendations">
          {Array.isArray(result.lifestyle_recommendations) ? (
            <ul className="list-disc list-inside space-y-1 text-sm">
              {result.lifestyle_recommendations.map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm opacity-90">{result.lifestyle_recommendations}</p>
          )}
        </Section>
      )}

      {/* Doctor */}
      {/* Doctor */}
      {result.when_to_see_doctor && (
        <Section title="When to Consult a Doctor">
          {Array.isArray(result.when_to_see_doctor) ? (
            <ul className="list-disc list-inside space-y-1 text-sm">
              {result.when_to_see_doctor.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm opacity-90">{result.when_to_see_doctor}</p>
          )}
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
