import React, { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, BookOpen, User } from 'lucide-react';
import { HERO_CONTENT, FORM_LINK } from '../constants';

export const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Smooth scroll helper for Read Stories button
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    // Pull header height from CSS variable set by Navbar
    const headerHeightStr = getComputedStyle(document.documentElement).getPropertyValue("--header-height");
    const headerHeight = headerHeightStr ? parseInt(headerHeightStr, 10) : 72;

    const top = window.scrollY + el.getBoundingClientRect().top - headerHeight - 8;

    window.scrollTo({
      top,
      behavior: "smooth",
    });

    // update hash without jump
    try {
      history.replaceState(null, "", `#${id}`);
    } catch {}
  };

  // Background canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    setSize();
    window.addEventListener('resize', setSize);

    const stars: { x: number; y: number; radius: number; vx: number; vy: number; alpha: number }[] = [];
    const numStars = 400;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.0,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        alpha: Math.random(),
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#020010');
      gradient.addColorStop(1, '#1a0b2e');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Stars
      stars.forEach((star) => {
        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
        ctx.fill();
      });

      // Nebula glows
      const time = Date.now() * 0.0005;
      const glow1X = width * 0.3 + Math.sin(time) * 100;
      const glow1Y = height * 0.4 + Math.cos(time * 0.8) * 100;

      const glow2X = width * 0.7 + Math.cos(time * 1.2) * 100;
      const glow2Y = height * 0.6 + Math.sin(time * 0.5) * 100;

      const g1 = ctx.createRadialGradient(glow1X, glow1Y, 0, glow1X, glow1Y, 500);
      g1.addColorStop(0, 'rgba(91, 33, 182, 0.45)');
      g1.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      const g2 = ctx.createRadialGradient(glow2X, glow2Y, 0, glow2X, glow2Y, 400);
      g2.addColorStop(0, 'rgba(6, 182, 212, 0.35)');
      g2.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', setSize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 max-w-4xl mx-auto text-center w-full mt-10">
        <div className="glass-card-dark rounded-3xl p-8 md:p-12 shadow-2xl animate-fade-in-up border-t border-white/10 relative">

          <div className="mt-8 md:mt-12">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur text-sm font-semibold text-accent border border-white/20">
              For explorers of all ages
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Making AI friendly — <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300">
                for everyone.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
              {HERO_CONTENT.subheading}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">

              {/* Primary CTA */}
              <a 
                href={FORM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-white font-bold text-lg hover:bg-violet-700 transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2"
              >
                {HERO_CONTENT.ctaPrimary}
                <ArrowRight size={20} />
              </a>

              {/* Secondary CTA — Scroll to Stories */}
              <a
                href="#stories"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("stories");
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 backdrop-blur text-white font-bold text-lg hover:bg-white/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                {HERO_CONTENT.ctaSecondary}
                <BookOpen size={20} />
              </a>
            </div>

            {/* Icon row */}
            <div className="pt-8 border-t border-white/10 flex flex-wrap justify-center gap-8 md:gap-16">

              <div className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="p-3 bg-white/10 rounded-full group-hover:bg-accent/20 transition-all duration-300 ring-1 ring-white/20 group-hover:ring-accent/50">
                  <User size={28} className="text-accent drop-shadow-sm" />
                </div>
                <span className="text-sm font-bold text-white tracking-wide group-hover:text-accent transition-colors">Friendly</span>
              </div>

              <div className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="p-3 bg-white/10 rounded-full group-hover:bg-purple-500/20 transition-all duration-300 ring-1 ring-white/20 group-hover:ring-purple-400/50">
                  <Sparkles size={28} className="text-purple-400 drop-shadow-sm" />
                </div>
                <span className="text-sm font-bold text-white tracking-wide group-hover:text-purple-300 transition-colors">Magic</span>
              </div>

              <div className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="p-3 bg-white/10 rounded-full group-hover:bg-rose-500/20 transition-all duration-300 ring-1 ring-white/20 group-hover:ring-rose-400/50">
                  <BookOpen size={28} className="text-rose-400 drop-shadow-sm" />
                </div>
                <span className="text-sm font-bold text-white tracking-wide group-hover:text-rose-300 transition-colors">Stories</span>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};
