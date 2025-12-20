"use client";
import { motion } from "framer-motion";

export default function Navbar(){
  return (
    <motion.header
      initial={{ y:-30, opacity:0 }}
      animate={{ y:0, opacity:1 }}
      transition={{ duration: .6, ease: 'easeOut' }}
      className="w-full py-4"
    >
      <div className="container-hero flex items-center justify-between">
        
        {/* LEFT LOGO */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-primary to-accent shadow-lg">
            <span style={{fontWeight:700}}>MI</span>
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
          <button
            className="btn-accent"
            onClick={() => window.open("www.linkedin.com/in/shivammaurya01", "_blank")}
          >
            LinkedIn
          </button>

          <button className="btn-accent">Contact</button>
        </nav>

      </div>
    </motion.header>
  );
}
