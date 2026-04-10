import React, { useState } from 'react';
import Model from 'react-body-highlighter';
import { SeverityLegend } from './SeverityLegend';
import { useSymptomStore } from '../store/useSymptomStore';

export const BodyViewer2D: React.FC = () => {
  const [view, setView] = useState<'anterior' | 'posterior'>('anterior');
  const { symptoms, setSelectedRegion } = useSymptomStore();

  const data = symptoms.map(s => ({
    name: `Symptom-${s.id}`,
    muscles: [s.region],
    frequency: s.severity
  }));

  // Force minimum 1 and maximum 10 frequencies so the color scale is absolute
  const anchoredData = [
    ...data,
    { name: 'AnchorMin', muscles: [], frequency: 1 },
    { name: 'AnchorMax', muscles: [], frequency: 10 }
  ];

  return (
    <div className="w-full h-full relative flex flex-col items-center pt-8 bg-gradient-to-b from-slate-50 to-slate-200/50">
      <div className="absolute inset-0 pattern-dots pattern-slate-200 pattern-bg-transparent pattern-size-4 pattern-opacity-40 pointer-events-none"></div>
      
      <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-2 py-1.5 rounded-xl shadow-lg border border-slate-200/60 z-10 flex gap-1 transition-opacity">
        <button 
          onClick={() => setView('anterior')} 
          className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all ${view === 'anterior' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'}`}
        >
          Front
        </button>
        <button 
          onClick={() => setView('posterior')} 
          className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all ${view === 'posterior' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'}`}
        >
          Back
        </button>
      </div>

      <div className="flex-1 w-full max-w-md px-12 py-10 z-0">
        <Model
          data={anchoredData}
          style={{ width: '100%', height: '100%', cursor: 'pointer' }}
          highlightedColors={['#fbbf24', '#f97316', '#ef4444']}
          type={view}
          onClick={(stats) => {
            if (stats && 'muscle' in stats && stats.muscle) {
              setSelectedRegion(stats.muscle as any);
            }
          }}
        />
      </div>

      <SeverityLegend />
    </div>
  );
};
