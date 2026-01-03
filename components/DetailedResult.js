"use client";
import { motion } from "framer-motion";
import { generateReportPDF } from "@/utils/pdfGenerator";

// Helper to safely render content (Array, Object, or String)
const renderContent = (content) => {
  if (!content) return null;

  // 1. Array: Render as list
  if (Array.isArray(content)) {
    return (
      <ul className="list-disc list-inside space-y-1 text-sm">
        {content.map((item, idx) => (
          <li key={idx}>
            {typeof item === "object" ? (
              // If item inside array is object (e.g. issues list sometimes), render it nicely
              <span>
                {item.parameter ? (
                  <>
                    <strong>{item.parameter}</strong>: {item.issue}
                    <span className="opacity-70"> ({item.risk_level})</span>
                  </>
                ) : (
                  JSON.stringify(item) // Fallback for unknown objects in array
                )}
              </span>
            ) : (
              item
            )}
          </li>
        ))}
      </ul>
    );
  }

  // 2. Object: Render key-value pairs
  if (typeof content === "object") {
    return (
      <div className="space-y-2 text-sm">
        {Object.entries(content).map(([key, value], idx) => (
          <div key={idx}>
            <strong className="capitalize text-accent">{key.replace(/_/g, " ")}:</strong>{" "}
            <span className="opacity-90">
              {typeof value === "object" ? JSON.stringify(value) : value}
            </span>
          </div>
        ))}
      </div>
    );
  }

  // 3. String/Other: Render as text
  return <p className="text-sm opacity-90">{String(content)}</p>;
};

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

      <h2 className="text-xl font-bold mb-6">Full Medical Analysis</h2>

      {/* Overall */}
      <Section title="Overall Health Status">
        {renderContent(result.overall_status)}
      </Section>

      {/* Issues */}
      {result.issues_detected && (
        <Section title="Detected Issues">
          {renderContent(result.issues_detected)}
        </Section>
      )}

      {/* Modern Medical */}
      {result.modern_medical_insights && (
        <Section title="Medical Insights">
          {renderContent(result.modern_medical_insights)}
        </Section>
      )}

      {/* Ayurveda */}
      {result.ayurvedic_guidance && (
        <Section title="Ayurvedic Guidance">
          {renderContent(result.ayurvedic_guidance)}
        </Section>
      )}

      {/* Lifestyle */}
      {result.lifestyle_recommendations && (
        <Section title="Lifestyle Recommendations">
          {renderContent(result.lifestyle_recommendations)}
        </Section>
      )}

      {/* Doctor */}
      {result.when_to_see_doctor && (
        <Section title="When to Consult a Doctor">
          {renderContent(result.when_to_see_doctor)}
        </Section>
      )}

      {/* Disclaimer */}
      {result.disclaimer && (
        <p className="text-xs opacity-60 mt-6">{result.disclaimer}</p>
      )}

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
      <div className="text-sm leading-relaxed opacity-90">{children}</div>
    </div>
  );
}
