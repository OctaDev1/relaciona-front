import React from 'react';
import type { TestimonialCardProps } from '../../types/HomeTypes';


export const TestimonialCard: React.FC<TestimonialCardProps> = ({ company, quote, author, role }) => (
  <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-blue-400/50 transition-all duration-300 h-full flex flex-col">
    <div className="text-blue-400 font-extrabold text-xl mb-6 tracking-wide flex items-center gap-2">
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
      {company}
    </div>
    <p className="text-gray-300 italic mb-8 grow text-lg leading-relaxed">"{quote}"</p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center text-white font-bold">
        {author.charAt(0)}
      </div>
      <div>
        <p className="font-bold text-white">{author}</p>
        <p className="text-sm text-blue-300">{role}</p>
      </div>
    </div>
  </div>
);