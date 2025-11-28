import React, { useState, useRef } from 'react';
import { MISSIONS, JOIN_FORM_URL } from '../constants';
import { ArrowRight } from 'lucide-react';

export const GetInvolved: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const errorTimeoutRef = useRef<number | null>(null);

  // Open mission form in a new tab
  const openForm = (url?: string) => {
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // show inline error message for a short time
  const showError = (msg: string) => {
    setError(msg);
    if (errorTimeoutRef.current) {
      window.clearTimeout(errorTimeoutRef.current);
    }
    errorTimeoutRef.current = window.setTimeout(() => setError(''), 3000);
  };

  // Handle bottom signup: open join form and prefill email (if form accepts query param "email")
  const handleJoinSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const trimmed = email.trim();
    if (!trimmed) {
      showError('Please enter your email before joining.');
      return;
    }

    const formUrl = JOIN_FORM_URL || "https://docs.google.com/forms/d/e/1FAIpQLSeCCs47aXlRZxBnP36LiU6ofhFxgQAeNFnyES_JDsj3DJCG2A/viewform?usp=header";
    const url = `${formUrl}${formUrl.includes('?') ? '&' : '?'}email=${encodeURIComponent(trimmed)}`;

    window.open(url, '_blank', 'noopener,noreferrer');
    setEmail('');
    setError('');
  };

  return (
    <section id="get-involved" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
            Choose Your Mission
          </h2>
          <p className="text-xl text-slate-600">
            Choose your mission — small entries welcome, big smiles guaranteed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MISSIONS.map((mission) => (
            <div 
              key={mission.id} 
              className="group relative overflow-hidden bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${mission.colorClass} opacity-10 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500`} />

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{mission.title}</h3>
                <p className="text-slate-600 mb-8 text-lg">{mission.instruction}</p>
                
                {/* CTA opens mission-specific form in new tab */}
                <button
                  onClick={() => openForm(mission.formUrl)}
                  className="inline-flex items-center font-bold text-primary group-hover:text-violet-700 focus:outline-none"
                  aria-label={`${mission.ctaText} — open form`}
                >
                  <span className={`bg-gradient-to-r ${mission.colorClass} bg-clip-text text-transparent`}>
                    {mission.ctaText}
                  </span>
                  <ArrowRight size={18} className="ml-2 text-slate-400 group-hover:text-primary transition-colors" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-8 md:p-12 bg-black rounded-3xl text-center relative overflow-hidden">
           {/* Decorative circles */}
           <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
           <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

           <div className="relative z-10">
             <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
               Ready to start your journey?
             </h3>
             <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
               Join 10,000+ explorers discovering the fun side of AI every week. No technical skills required.
             </p>

             {/* Email signup opens JOIN_FORM_URL in a new tab (prefills email if supported) */}
             <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto" onSubmit={handleJoinSubmit}>
               <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent flex-grow"
                aria-label="Your email address"
               />

               <button
                 type="submit"
                 className="px-8 py-4 rounded-full bg-white text-slate-900 font-bold hover:bg-slate-200 transition-colors"
               >
                 Join Now
               </button>
             </form>

             {/* Inline error message */}
             <div className="mt-4 min-h-[20px]">
               {error && (
                 <p role="alert" className="   mx-auto max-w-sm px-4 py-3 
      rounded-xl 
      bg-red-500/10 border border-red-500/30 
      text-red-300 text-sm font-medium 
      backdrop-blur 
      shadow-lg shadow-red-900/20 
      animate-slide-down">
                   {error}
                 </p>
               )}
             </div>

             <p className="text-slate-500 text-sm mt-4">Unsubscribe at any time.</p>
           </div>
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;
