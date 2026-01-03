export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/5">
      <div className="container-hero py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-left">
            <div className="title-lg mb-1" style={{ fontSize: '1.2rem' }}>Medi-Intel</div>
            <p className="subtle text-xs max-w-xs">
              Advanced Holographic Medical Analysis. Bridging the gap between data and health.
            </p>
          </div>

          <div className="text-center md:text-right">
            <p className="kicker mb-2">Developed by</p>
            <div className="hud inline-block font-semibold text-white">
              Shivam Maurya
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 text-center">
          <p className="text-[10px] uppercase tracking-widest opacity-40 leading-relaxed max-w-2xl mx-auto">
            Disclaimer: This application is powered by AI and is intended for informational purposes only.
            It is not a substitute for professional medical advice, diagnosis, or treatment.
            Always seek the advice of your physician.
          </p>
          <div className="mt-4 text-[11px] subtle">
            © {new Date().getFullYear()} Medi-Intel. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
