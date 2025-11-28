import React from 'react';
import { Pencil, Clock, Bot } from 'lucide-react';

export const Why: React.FC = () => {
  return (
    <section id="why" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
            Why explore AI?
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Exploring AI today prepares us for the world of tomorrow. AI helps us learn faster, imagine more, and solve simple problems beautifully.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Kids */}
          <div className="bg-white rounded-3xl p-8 shadow-xl shadow-purple-900/5 
    hover:-translate-y-2 transition-all duration-300 border border-slate-100 
    flex flex-col items-center text-center 
    hover:bg-green-200 hover:border-green-400 hover:shadow-green-300/40">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 text-purple-600">
              <Pencil size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">For Kids</h3>
            <p className="text-slate-600">
              A creative buddy that helps you write stories, draw imaginary worlds, and answer "why?" a million times a day.
            </p>
          </div>

          {/* Card 2: Parents & Teachers */}
          <div className="bg-white rounded-3xl p-8 shadow-xl shadow-cyan-900/5 hover:-translate-y-2 transition-transform duration-300 border border-slate-100 flex flex-col items-center text-center hover:bg-red-200 hover:border-red-400 hover:shadow-red-300/40">
             <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mb-6 text-cyan-600">
              <Clock size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">For Parents & Teachers</h3>
            <p className="text-slate-600">
              A time-saving assistant that helps plan lessons, brainstorm dinner ideas, and simplify complex topics.
            </p>
          </div>

          {/* Card 3: Elders */}
          <div className="bg-white rounded-3xl p-8 shadow-xl shadow-rose-900/5 hover:-translate-y-2 transition-transform duration-300 border border-slate-100 flex flex-col items-center text-center hover:bg-violet-200 hover:border-violet-400 hover:shadow-violet-300/40">
             <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-6 text-rose-600">
              <Bot size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">For Elders</h3>
            <p className="text-slate-600">
              A patient companion for revisiting memories, learning new hobbies, and composing beautiful letters to family.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};