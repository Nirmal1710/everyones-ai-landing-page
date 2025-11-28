// src/components/Footer.tsx
import React from 'react';
import { Rocket, Heart, Github, Mail, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  // Programmatic scroll handler (respects sticky header)
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    // Only handle internal anchors
    if (!id || !id.startsWith('#')) return;
    e.preventDefault();

    const targetId = id.replace('#', '');
    const target = document.getElementById(targetId);
    if (!target) {
      // still update hash so the URL reflects the click
      try {
        history.replaceState(null, '', `#${targetId}`);
      } catch {}
      return;
    }

    // Get header height from CSS variable (set by Navbar) or fallback
    const headerHeightStr = getComputedStyle(document.documentElement).getPropertyValue('--header-height');
    const headerHeight = headerHeightStr ? parseInt(headerHeightStr, 10) : (72);

    const top = window.scrollY + target.getBoundingClientRect().top - headerHeight - 8;
    window.scrollTo({ top, behavior: 'smooth' });

    // update hash safely
    try {
      history.replaceState(null, '', `#${targetId}`);
    } catch {}
  };

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <a href="#main" onClick={(e) => handleScrollTo(e, '#main')} className="flex items-center gap-2 text-white mb-4">
               <Rocket size={20} />
               <span className="font-extrabold text-xl tracking-tight">Everyone’s AI</span>
            </a>
            <p className="mb-6 max-w-sm">
              Making the future friendly, one story at a time. Designed for humans of all ages to explore artificial intelligence with curiosity.
            </p>
            <div className="flex gap-4">
              <a href="mailto:nirmalsamson1017@gmail.com" className="hover:text-white transition-colors" aria-label="Email">
                <Mail size={20} />
              </a>
              <a href="https://github.com/Nirmal1710" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/nirmal-s-samson-000231349/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#why"
                  onClick={(e) => handleScrollTo(e, '#why')}
                  className="hover:text-primary transition-colors"
                >
                  Why AI?
                </a>
              </li>
              <li>
                <a
                  href="#stories"
                  onClick={(e) => handleScrollTo(e, '#stories')}
                  className="hover:text-primary transition-colors"
                >
                  Stories
                </a>
              </li>
              <li>
                <a
                  href="#learn"
                  onClick={(e) => handleScrollTo(e, '#learn')}
                  className="hover:text-primary transition-colors"
                >
                  Tools
                </a>
              </li>
              <li>
                <a
                  href="#get-involved"
                  onClick={(e) => handleScrollTo(e, '#get-involved')}
                  className="hover:text-primary transition-colors"
                >
                  Get Involved
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Accessibility</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            © {new Date().getFullYear()} Nirmal S Samson. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm">
            <span>Built with <Heart size={14} className="inline text-rose-500 mx-1 fill-rose-500" /> and AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
