import React from 'react';
import type { FeatureCardProps } from '../../types/HomeTypes';


export const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => (
  <div className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col cursor-pointer">
    <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{title}</h3>
    <p className="text-gray-600 leading-relaxed grow">{description}</p>
  </div>
);