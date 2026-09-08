import { useState, useEffect } from 'react';

interface IntroSplashProps {
  onComplete: () => void;
}

export default function IntroSplash({ onComplete }: IntroSplashProps) {
  const [phase, setPhase] = useState<'enter' | 'glow' | 'reveal' | 'exit'>('enter');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Phase timeline
    const t1 = setTimeout(() => setPhase('glow'), 200);
    const t2 = setTimeout(() => setPhase('reveal'), 900);
    const t3 = setTimeout(() => setPhase('exit'), 2400);
    const t4 = setTimeout(() => onComplete(), 3000);

    // Progress bar counter
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const diff = Math.random() * 8 + 4;
        return Math.min(100, Math.floor(prev + diff));
      });
    }, 80);

    // Allow escape key to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div
      onClick={handleSkip}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none overflow-hidden cursor-pointer"
      style={{
        backgroundColor: '#05070A',
        opacity: phase === 'exit' ? 0 : 1,
        transform: phase === 'exit' ? 'scale(1.05)' : 'scale(1)',
        filter: phase === 'exit' ? 'blur(8px)' : 'none',
        transition: 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1), filter 0.6s ease',
      }}
    >
      {/* Background High-Tech Grid & Glows */}
      <div className="absolute inset-0 hero-grid opacity-25 pointer-events-none" />

      {/* Radial ambient glow orbs */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none transition-all duration-1000"
        style={{
          background: 'radial-gradient(circle, rgba(0, 163, 255, 0.18) 0%, transparent 70%)',
          transform: `scale(${phase === 'enter' ? 0.6 : 1.2}) translate(-30%, -20%)`,
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none transition-all duration-1000"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.16) 0%, transparent 70%)',
          transform: `scale(${phase === 'enter' ? 0.6 : 1.2}) translate(30%, 20%)`,
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute w-[350px] h-[350px] rounded-full pointer-events-none transition-all duration-700"
        style={{
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.25) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Decorative concentric energy rings */}
      <div
        className="absolute rounded-full border border-blue-500/20 pointer-events-none transition-all duration-1000"
        style={{
          width: '650px',
          height: '650px',
          transform: phase === 'enter' ? 'scale(0.5) rotate(0deg)' : 'scale(1) rotate(45deg)',
          opacity: phase === 'enter' ? 0 : 0.35,
          borderStyle: 'dashed',
        }}
      />
      <div
        className="absolute rounded-full border border-purple-500/20 pointer-events-none transition-all duration-1000"
        style={{
          width: '850px',
          height: '850px',
          transform: phase === 'enter' ? 'scale(0.4) rotate(0deg)' : 'scale(1) rotate(-45deg)',
          opacity: phase === 'enter' ? 0 : 0.2,
        }}
      />

      {/* Logo & Content Wrapper */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl">
        {/* Animated Emblem Container */}
        <div
          className="relative transition-all duration-1000 ease-out"
          style={{
            opacity: phase === 'enter' ? 0 : 1,
            transform:
              phase === 'enter'
                ? 'scale(0.7) translateY(20px)'
                : phase === 'exit'
                ? 'scale(1.08)'
                : 'scale(1) translateY(0)',
          }}
        >
          {/* Logo Back Glow */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-700"
            style={{
              background: 'radial-gradient(circle, rgba(37, 99, 235, 0.5) 0%, rgba(168, 85, 247, 0.3) 50%, transparent 75%)',
              filter: 'blur(45px)',
              transform: 'scale(1.5)',
              opacity: phase === 'glow' || phase === 'reveal' ? 1 : 0,
            }}
          />

          {/* Logo Image */}
          <img
            src="/image.png"
            alt="AK Solutions & Technologies Pvt Ltd."
            className="h-48 sm:h-64 md:h-72 lg:h-80 w-auto max-w-[90vw] object-contain relative z-10"
            style={{
              filter:
                phase === 'glow' || phase === 'reveal'
                  ? 'drop-shadow(0 0 45px rgba(37, 99, 235, 0.8)) drop-shadow(0 0 80px rgba(168, 85, 247, 0.5))'
                  : 'drop-shadow(0 0 15px rgba(37, 99, 235, 0.25))',
              transition: 'filter 0.8s ease',
            }}
          />

          {/* Shimmer / light beam sweep over the logo */}
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg z-20"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black, transparent)',
            }}
          >
            <div
              className="w-1/2 h-full absolute top-0 -left-full transition-transform duration-1000 ease-in-out"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), rgba(0,163,255,0.6), transparent)',
                transform: phase === 'reveal' || phase === 'exit' ? 'translateX(350%)' : 'translateX(0)',
              }}
            />
          </div>
        </div>

        {/* Company Title */}
        <div
          className="mt-8 transition-all duration-700 delay-100"
          style={{
            opacity: phase === 'reveal' || phase === 'exit' ? 1 : 0,
            transform: phase === 'reveal' || phase === 'exit' ? 'translateY(0)' : 'translateY(15px)',
          }}
        >
          <h1
            className="text-white font-light uppercase tracking-widest text-lg sm:text-xl md:text-2xl"
            style={{ letterSpacing: '0.18em' }}
          >
            AK Solutions & Technologies <span className="text-cyan-400 font-normal">Pvt Ltd.</span>
          </h1>

          {/* Motto */}
          <p
            className="mt-3.5 text-xs sm:text-sm font-medium uppercase text-slate-300 tracking-[0.28em] flex items-center justify-center gap-2.5"
          >
            <span>Innovate</span>
            <span className="w-1.5 h-1.5 rounded-full inline-block animate-pulse" style={{ background: '#00A3FF' }} />
            <span>Build</span>
            <span className="w-1.5 h-1.5 rounded-full inline-block animate-pulse" style={{ background: '#A855F7' }} />
            <span>Elevate</span>
          </p>
        </div>

        {/* High-tech Loading Beam */}
        <div
          className="w-56 sm:w-80 h-[2.5px] bg-slate-800/80 rounded-full mt-8 overflow-hidden relative transition-opacity duration-500"
          style={{ opacity: phase === 'reveal' ? 1 : 0 }}
        >
          <div
            className="h-full rounded-full transition-all duration-150 ease-out"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #00A3FF, #2563EB, #A855F7)',
              boxShadow: '0 0 12px rgba(0, 163, 255, 0.8)',
            }}
          />
        </div>

        {/* Status text */}
        <div
          className="mt-3 text-[10px] font-mono tracking-widest text-slate-500 uppercase transition-opacity duration-500"
          style={{ opacity: phase === 'reveal' ? 1 : 0 }}
        >
          {progress < 100 ? `SYSTEM INITIALIZING • ${progress}%` : 'WELCOME TO AK SOLUTIONS & TECHNOLOGIES'}
        </div>
      </div>

      {/* Skip Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleSkip();
        }}
        className="absolute bottom-8 text-xs font-mono tracking-wider text-slate-500 hover:text-slate-300 transition-colors px-4 py-1.5 rounded-full border border-slate-800 hover:border-slate-700 bg-slate-900/40 backdrop-blur-sm"
      >
        Click anywhere or press Esc to enter &rarr;
      </button>
    </div>
  );
}
