export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[#303431] bg-[#0d0f0e]">
      <div className="container-fit flex min-h-30 items-center justify-between gap-6 py-8">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="FitLog logo"
            className="h-5 w-5 object-contain"
          />

          <span className="text-sm font-black tracking-[0.08em]">
            FITLOG
          </span>
        </div>

        {/* Copyright */}
        <p className="text-right text-sm text-[#777f79]">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}