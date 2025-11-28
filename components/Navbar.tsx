// src/components/Navbar.tsx
import React, { useEffect, useRef, useState } from "react";
import { Menu, X, Rocket } from "lucide-react";
import { NAV_ITEMS } from "../constants";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  // compute and expose header height as CSS variable so anchors can offset automatically
  useEffect(() => {
    function setHeaderCssVar() {
      const el = navRef.current;
      const height = el ? Math.round(el.getBoundingClientRect().height) : 72;
      document.documentElement.style.setProperty("--header-height", `${height}px`);
    }
    setHeaderCssVar();
    window.addEventListener("resize", setHeaderCssVar);
    return () => window.removeEventListener("resize", setHeaderCssVar);
  }, []);

  // sticky background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // scroll spy to set activeSection
  useEffect(() => {
    const handleScrollSpy = () => {
      const offset = window.scrollY + 100; // small margin for detection
      for (const item of NAV_ITEMS) {
        const section = document.getElementById(item.id);
        if (!section) continue;
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        if (top <= offset && bottom > offset) {
          setActiveSection(item.id);
          return;
        }
      }
      setActiveSection("");
    };
    handleScrollSpy();
    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  const toggleMenu = () => setIsOpen((s) => !s);

  // Programmatic scroll handler that respects header offset and works with routers
  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();

    // close mobile menu if open
    setIsOpen(false);

    // find target
    const target = document.getElementById(id);
    if (!target) {
      // still update hash so URL reflects click
      history.replaceState(null, "", `#${id}`);
      return;
    }

    // compute header height (use CSS var or compute)
    const headerHeightStr = getComputedStyle(document.documentElement).getPropertyValue("--header-height");
    const headerHeight = headerHeightStr ? parseInt(headerHeightStr, 10) : (navRef.current ? Math.round(navRef.current.getBoundingClientRect().height) : 72);

    const targetTop = window.scrollY + target.getBoundingClientRect().top - headerHeight - 8; // small extra gap
    window.scrollTo({ top: targetTop, behavior: "smooth" });

    // update URL hash without jumping
    try {
      history.replaceState(null, "", `#${id}`);
    } catch {
      // ignore
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"}`}
    >
      <style>{`html{scroll-behavior:smooth; scroll-padding-top: var(--header-height, 72px);}`}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-10">
          {/* Logo */}
          <a href="#main" onClick={(e) => handleNavClick(e, "main")} className="flex-shrink-0 flex items-center group">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 transition-colors ${scrolled ? "bg-primary text-white" : "bg-white text-primary"}`}>
              <Rocket size={18} className="group-hover:animate-pulse" />
            </div>
            <span className={`font-extrabold text-xl tracking-tight transition-colors ${scrolled ? "text-slate-900" : "text-white"}`}>
              Everyone’s AI
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`text-sm font-medium transition-colors relative group ${scrolled ? "text-slate-600 hover:text-primary" : "text-white/80 hover:text-white"} ${activeSection === item.id ? (scrolled ? "text-primary" : "text-white") : ""}`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 w-full h-0.5 transform scale-x-0 transition-transform origin-left group-hover:scale-x-100 ${activeSection === item.id ? "scale-x-100" : ""} ${scrolled ? "bg-primary" : "bg-white"}`}
                />
              </a>
            ))}

            <a
              href="#get-involved"
              onClick={(e) => handleNavClick(e, "get-involved")}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${scrolled ? "bg-primary text-white hover:bg-primary/90" : "bg-white text-primary hover:bg-gray-100"}`}
            >
              Join Community
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white ${scrolled ? "text-slate-900" : "text-white"}`}
              aria-label="Open menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-xl absolute top-full left-0 w-full animate-fade-in-up origin-top">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  handleNavClick(e, item.id);
                  // give a tiny delay to let menu close visually
                  setTimeout(() => setIsOpen(false), 120);
                }}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-primary hover:bg-slate-50"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#get-involved"
              onClick={(e) => {
                handleNavClick(e, "get-involved");
                setTimeout(() => setIsOpen(false), 120);
              }}
              className="block w-full text-center mt-4 px-5 py-3 rounded-md font-bold bg-primary text-white hover:bg-primary/90"
            >
              Join the Challenge
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
