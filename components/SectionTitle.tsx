import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, align = 'center' }) => {
  const alignClass = align === 'left' ? 'text-left items-start' : align === 'right' ? 'text-right items-end' : 'text-center items-center';
  
  return (
    <div className={`flex flex-col ${alignClass} mb-12 animate-fade-in`}>
      <div className="w-12 h-1 bg-gold-dark mb-4 opacity-70"></div>
      <h2 className="text-3xl md:text-4xl font-bold text-royal-red dark:text-red-700 mb-2 tracking-widest drop-shadow-sm transition-colors duration-1000">{title}</h2>
      {subtitle && <p className="text-stone-600 dark:text-stone-400 text-sm md:text-base italic font-bold font-serif transition-colors duration-1000">{subtitle}</p>}
      <div className="w-12 h-1 bg-gold-dark mt-4 opacity-70"></div>
    </div>
  );
};