"use client";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: .6, ease: 'easeOut' }}
      className="w-full py-4 relative z-50"
    >
      <div className="container-hero flex items-center justify-between">

        {/* LEFT LOGO */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-primary to-accent shadow-lg">
            <span style={{ fontWeight: 700 }}>MI</span>
          </div>
          <div>
            <div className="kicker">Medi-Intel</div>
            <div className="title-lg">Holographic Medical Analyzer</div>
          </div>
        </div>

        {/* NAV BUTTONS */}
        <nav className="flex items-center gap-4">
          <a href="/" className="hud cursor-pointer">Home</a>
          <a href="/login" className="hud cursor-pointer">Login</a>
          <a href="/dashboard" className="hud cursor-pointer">Dashboard</a>

          {/* LinkedIn Redirect */}
          <a
            href="https://www.linkedin.com/in/shivammaurya01"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent inline-flex items-center"
          >
            LinkedIn
          </a>

          <a
            href="mailto:student18171@gmail.com"
            className="btn-accent inline-flex items-center"
          >
            Contact
          </a>
        </nav>

      </div>
    </motion.header>
  );
}
