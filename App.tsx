import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Why } from './components/Why';
import { StoriesGrid } from './components/StoriesGrid';
import { LearningCarousel } from './components/LearningCarousel';
import { GetInvolved } from './components/GetInvolved';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="font-sans antialiased text-slate-900 bg-white selection:bg-purple-200 selection:text-purple-900">
      <Navbar />
      <main>
        <Hero />
        <Why />
        <StoriesGrid />
        <LearningCarousel />
        <GetInvolved />
      </main>
      <Footer />
    </div>
  );
}

export default App;