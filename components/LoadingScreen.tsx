import React from 'react';
import { Feather } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-[#f0e6d2] flex flex-col items-center justify-center overflow-hidden">
      {/* Texture overlays */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative mb-8">
          <Feather className="w-16 h-16 text-royal-red animate-pulse" />
          <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-royal-red rounded-full animate-ping opacity-75"></div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-script text-ink mb-4 opacity-0 animate-[fadeIn_2s_ease-out_forwards]">
          Étienne de Navarre-Valois
        </h1>
        
        <div className="w-0 h-[2px] bg-royal-red animate-[widthGrow_2s_ease-in-out_forwards] mb-4"></div>
        
        <p className="text-stone-600 font-serif italic text-sm tracking-widest animate-pulse">
          기록을 읽어오는 중...
        </p>
      </div>

      <style>{`
        @keyframes widthGrow {
          0% { width: 0; opacity: 0; }
          50% { opacity: 1; }
          100% { width: 200px; opacity: 0; }
        }
      `}</style>
    </div>
  );
};