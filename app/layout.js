import './globals.css';
import FloatingOrbs from "@/components/FloatingOrbs";

export const metadata = {
  title: "Medi-Intel — Holographic Medical Analyzer",
  description: "AI-powered medical report analyzer"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Floating 3D neon orbs background */}
        <FloatingOrbs />

        {/* Main content layer */}
        <div style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
          {children}
        </div>
      </body>
    </html>
  );
}

