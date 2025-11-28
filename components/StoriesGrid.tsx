import React from 'react';
import { STORIES, STORIES_PLAYLIST } from '../constants';
import { ArrowRight } from 'lucide-react';

export const StoriesGrid: React.FC = () => {
  return (
    <section id="stories" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Stories from the Frontier
            </h2>
            <p className="text-lg text-slate-600">
              Discover how simple AI tools help people create easier, happier moments every day. And see how these small changes make everyday life feel a little more creative and empowering.
            </p>
          </div>

          {/* View all stories -> playlist */}
          <a
            href={STORIES_PLAYLIST}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center text-primary font-bold hover:underline mt-4 md:mt-0"
            aria-label="View all stories playlist"
          >
            View all stories <ArrowRight size={16} className="ml-1" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STORIES.map((story) => (
            <article
              key={story.id}
              className="group cursor-pointer bg-white rounded-2xl p-4 hover:shadow-lg transition-shadow"
              aria-labelledby={`story-title-${story.id}`}
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-4">
                <img 
                  src={story.imageUrl} 
                  alt={story.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
              </div>

              <h3 id={`story-title-${story.id}`} className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                {story.title}
              </h3>

              <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                {story.excerpt}
              </p>

              {/* Read story — opens YouTube (new tab) */}
              <a
                href={story.videoUrl ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-bold text-primary hover:underline"
                aria-label={`Read story: ${story.title} (opens video)`}
              >
                Read story
                <ArrowRight size={14} className="ml-1 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </article>
          ))}
        </div>
        
        {/* Mobile "View all" */}
        <div className="mt-8 text-center md:hidden">
          <a
            href={STORIES_PLAYLIST}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary font-bold hover:underline"
            aria-label="View all stories playlist"
          >
            View all stories <ArrowRight size={16} className="ml-1" />
          </a>
        </div>
      </div>
    </section>
  );
};
