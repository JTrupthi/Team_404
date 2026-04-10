import React from 'react';
import { useSymptomStore } from '../store/useSymptomStore';
import { SymptomCard } from './SymptomCard';
import { ClipboardList, FileText } from 'lucide-react';

interface Props {
  onGenerateReport: () => void;
}

export const SymptomList: React.FC<Props> = ({ onGenerateReport }) => {
  const symptoms = useSymptomStore(state => state.symptoms);

  return (
    <div className="flex flex-col h-full bg-slate-50/30">
      <div className="p-5 border-b border-slate-200 bg-white">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <ClipboardList className="text-blue-600" size={20} />
          Logged Symptoms
          <span className="ml-auto bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full border border-blue-100">
            {symptoms.length}
          </span>
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-5 scroll-smooth relative">
        {symptoms.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-6 animate-in fade-in duration-500">
            <div className="w-20 h-20 bg-slate-100 text-slate-300 rounded-full flex items-center justify-center mb-5 shadow-inner">
              <ClipboardList size={36} />
            </div>
            <h3 className="text-slate-700 font-bold mb-2 text-lg">No symptoms logged</h3>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Interact with the 3D mannequin and click on a body region to register a symptom.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 pb-4">
            {symptoms.map(symptom => (
              <SymptomCard key={symptom.id} symptom={symptom} />
            ))}
          </div>
        )}
      </div>

      <div className="p-5 bg-white border-t border-slate-200 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)]">
        <button
          onClick={onGenerateReport}
          disabled={symptoms.length === 0}
          className={`w-full py-3.5 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
            symptoms.length === 0 
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 hover:scale-[1.02] hover:shadow-blue-500/40 active:scale-[0.98]'
          }`}
        >
          <FileText size={18} />
          Generate Report
        </button>
      </div>
    </div>
  );
};
