import React from 'react';

export const SeverityLegend: React.FC = () => {
  return (
    <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100/50 pointer-events-none z-10">
      <h3 className="text-xs rounded font-bold text-slate-500 uppercase tracking-widest mb-3">Severity Map</h3>
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-3">
          <div className="w-3.5 h-3.5 rounded-full bg-yellow-400 border border-yellow-500 shadow-sm"></div>
          <span className="text-sm font-medium text-slate-700">Mild (1-3)</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3.5 h-3.5 rounded-full bg-orange-500 border border-orange-600 shadow-sm"></div>
          <span className="text-sm font-medium text-slate-700">Moderate (4-6)</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3.5 h-3.5 rounded-full bg-red-500 border border-red-600 shadow-sm"></div>
          <span className="text-sm font-medium text-slate-700">Severe (7-10)</span>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-slate-100/80">
        <p className="text-xs text-slate-400 italic">Drag to rotate, click to log</p>
      </div>
    </div>
  );
};
