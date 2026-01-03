"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";
import UploadCard from "@/components/UploadCard";
import ResultCard from "@/components/ResultCard";
import DetailedResult from "@/components/DetailedResult";
import ECGWave from "@/components/ECGWave";
import Footer from "@/components/Footer";

import ParallaxScene from "@/components/ParallaxScene";
import PageTransition from "@/components/PageTransition";

export default function Home() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ A result is valid if backend returned ANY meaningful data
  const hasValidResult =
    result &&
    typeof result === "object" &&
    (
      result.overall_status ||
      result.issues_detected?.length > 0 ||
      result.modern_medical_insights?.length > 0
    );

  return (
    <PageTransition>
      <ParallaxScene>
        <div className="min-h-screen flex flex-col">

          {/* Top Navigation */}
          <Navbar />

          {/* Main Content */}
          <main className="container-hero flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

              {/* LEFT SECTION */}
              <div className="lg:col-span-2 space-y-10">

                {/* Upload Card */}
                <UploadCard
                  setLoading={setLoading}
                  onResult={(data) => {
                    console.log("PAGE RECEIVED RESULT:", data);
                    setResult(data);
                  }}
                />

                {/* ECG Wave */}
                {(loading || hasValidResult) && (
                  <ECGWave active={loading} />
                )}

                {/* ✅ FULL DETAILED ANALYSIS */}
                {hasValidResult && (
                  <DetailedResult result={result} />
                )}

              </div>

              {/* RIGHT SECTION */}
              <div className="sticky top-24">
                <ResultCard
                  loading={loading}
                  result={result}
                />
              </div>

            </div>
          </main>

          {/* Footer */}
          <Footer />

        </div>
      </ParallaxScene>
    </PageTransition>
  );
}
