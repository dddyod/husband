import React from 'react';
import { RelationshipStatus } from '../types';

interface RelationshipCardProps {
  status: RelationshipStatus;
  icon: string;
  title: string;
  description: string;
  color: string;
}

export const RelationshipCard: React.FC<RelationshipCardProps> = ({ status, icon, title, description, color }) => {
  // Mapping color names to specific darker shades for readability on parchment
  // And lighter shades for dark mode
  const getTextColor = (c: string) => {
    if (c.includes('stone')) return 'text-stone-600 dark:text-stone-400';
    if (c.includes('rose')) return 'text-rose-900 dark:text-rose-400';
    if (c.includes('gold')) return 'text-amber-700 dark:text-amber-400';
    return `text-${c}`;
  };

  const textColorClass = getTextColor(color);
  const borderColorClass = `hover:border-${color === 'gold-accent' ? 'amber-700' : color}`;

  return (
    <div className={`relative p-6 border border-stone-400/30 bg-white/40 dark:bg-black/40 dark:border-stone-700/50 shadow-sm backdrop-blur-[2px] rounded-lg ${borderColorClass} transition-all duration-500 group hover:shadow-md hover:bg-white/60 dark:hover:bg-black/60`}>
      <div className="flex items-center gap-4 mb-3">
        <span className="text-4xl filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300">{icon}</span>
        <h3 className={`text-xl font-bold ${textColorClass} uppercase tracking-wider transition-colors duration-500`}>{title}</h3>
      </div>
      <p className="text-stone-800 dark:text-stone-300 text-sm leading-relaxed font-serif font-medium whitespace-pre-line transition-colors duration-500">
        {description}
      </p>
      <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-stone-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
    </div>
  );
};