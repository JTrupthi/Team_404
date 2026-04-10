import React from 'react';
import { Activity } from 'lucide-react';
import { useSymptomStore } from '../store/useSymptomStore';

export const Header: React.FC = () => {
  const { loadDemoData, clearAll, symptoms } = useSymptomStore();

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row justify-between items-center z-10 relative shadow-sm">
      <div className="flex items-center gap-3 mb-4 sm:mb-0">
        <div className="bg-blue-600 p-2 rounded-lg shadow-inner">
          <Activity className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800 leading-tight">SymptomMapper 3D</h1>
          <p className="text-xs text-slate-500 font-medium tracking-wide text-blue-600 uppercase mt-0.5">Teleconsultation Tool</p>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={loadDemoData}
          className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-100 rounded-lg shadow-sm hover:bg-blue-100 active:bg-blue-200 transition-all"
        >
          Load Demo
        </button>
        <button
          onClick={() => {
            if (symptoms.length === 0 || confirm('Are you sure you want to clear all symptoms?')) {
              clearAll();
            }
          }}
          className={`px-4 py-2 text-sm font-medium rounded-lg border shadow-sm transition-all ${
            symptoms.length === 0 
            ? 'text-slate-400 bg-slate-50 border-slate-100 cursor-not-allowed opacity-70' 
            : 'text-red-700 bg-red-50 border-red-100 hover:bg-red-100 active:bg-red-200'
          }`}
          disabled={symptoms.length === 0}
        >
          Clear All
        </button>
      </div>
    </header>
  );
};
