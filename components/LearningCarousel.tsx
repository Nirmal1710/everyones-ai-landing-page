// src/components/LearningCarousel.tsx
import React, { useState, useEffect, useRef } from 'react';
import { TOOLS } from '../constants';
import { ChevronLeft, ChevronRight, Copy, ExternalLink } from 'lucide-react';

export const LearningCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Touch state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % TOOLS.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + TOOLS.length) % TOOLS.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Autoplay
  useEffect(() => {
    if (isPaused) return;
    
    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, 5000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [activeIndex, isPaused]);

  // Touch handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // Reset
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (touchStart == null || touchEnd == null) {
      // reset
      setTouchStart(null);
      setTouchEnd(null);
      return;
    }
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();

    // reset
    setTouchStart(null);
    setTouchEnd(null);
  };

  // safe clipboard copy with fallback
  const copyPrompt = (text: string) => {
    if (!text) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {
        // ignore
      });
      return;
    }
    // fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'absolute';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch {}
    ta.remove();
  };

  return (
    <section id="learn" className="py-24 bg-slate-900 text-white overflow-hidden relative">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
            Meet the Tools
          </h2>
          <p className="text-xl text-slate-300">
            These are the tools our explorers use on their journey. Tap one to begin your own.
          </p>
          <p className="text-sm text-slate-500 mt-2 hidden md:block">(Use arrow keys to navigate)</p>
        </div>

        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Main Card */}
          <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-3xl p-8 md:p-12 relative min-h-[400px] flex flex-col justify-center transition-all duration-10">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-2xl bg-slate-700 flex items-center justify-center shadow-lg">
                  {TOOLS[activeIndex].icon}
                </div>
              </div>
              <div className="flex-grow text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                   <h3 className="text-3xl font-bold">{TOOLS[activeIndex].name}</h3>
                   <span className="px-3 py-1 bg-slate-700 rounded-full text-xs font-semibold uppercase tracking-wider text-slate-300">
                     AI Tool
                   </span>
                </div>
                <p className="text-xl text-slate-300 mb-8">{TOOLS[activeIndex].description}</p>
                
                <div className="bg-slate-900/80 rounded-xl p-6 mb-8 border border-slate-700/50">
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-3">Try this prompt:</p>
                  <p className="font-mono text-cyan-300 text-lg">
                    "{TOOLS[activeIndex].samplePrompt}"
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                   {/* Open Tool: anchor uses tool.href and opens in new tab */}
                   <a
                     href={TOOLS[activeIndex].href}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-violet-600 text-white rounded-full font-bold transition-colors"
                     aria-label={`Open ${TOOLS[activeIndex].name} official site`}
                   >
                     Open Tool <ExternalLink size={18} />
                   </a>

                   <button 
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-full font-medium transition-colors"
                    onClick={() => copyPrompt(TOOLS[activeIndex].samplePrompt)}
                   >
                     Copy Prompt <Copy size={18} />
                   </button>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 p-3 rounded-full bg-slate-800 text-white hover:bg-primary transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-primary z-20"
            aria-label="Previous tool"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 p-3 rounded-full bg-slate-800 text-white hover:bg-primary transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-primary z-20"
            aria-label="Next tool"
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {TOOLS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? 'bg-primary w-8' : 'bg-slate-600 hover:bg-slate-500'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningCarousel;
