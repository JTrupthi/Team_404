import type { FC } from 'react';
import { Trash2, AlertCircle } from 'lucide-react';
import { useSymptomStore, type Symptom } from '../store/useSymptomStore';
import { getSeverityColor, getSeverityLabel, formatRegionName } from '../utils/colors';

interface Props {
  symptom: Symptom;
}

export const SymptomCard: FC<Props> = ({ symptom }) => {
  const { removeSymptom } = useSymptomStore();
  const color = getSeverityColor(symptom.severity);
  const label = getSeverityLabel(symptom.severity);

  return (
    <div className="bg-white border text-left border-slate-200/60 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.15)] hover:border-slate-300 transition-all rounded-xl p-4 relative group">
      <button 
        onClick={() => removeSymptom(symptom.id)}
        className="absolute top-3 right-3 p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
        title="Remove symptom"
      >
        <Trash2 size={16} />
      </button>

      <div className="flex items-center gap-3 border-b border-slate-100 pb-3 mb-3 pr-8">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center bg-opacity-20 shadow-inner"
          style={{ backgroundColor: `${color}20`, color: color }}
        >
          <AlertCircle size={20} />
        </div>
        <div>
          <h4 className="font-bold text-slate-800 leading-tight">{formatRegionName(symptom.region)}</h4>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {symptom.type}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm mt-2">
        <div>
          <span className="block text-[11px] font-bold uppercase text-slate-400 mb-0.5">Severity</span>
          <span className="font-semibold" style={{ color }}>{label} ({symptom.severity}/10)</span>
        </div>
        <div>
          <span className="block text-[11px] font-bold uppercase text-slate-400 mb-0.5">Duration</span>
          <span className="font-semibold text-slate-700">{symptom.duration}</span>
        </div>
        {symptom.notes && (
          <div className="col-span-2 mt-1">
            <span className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Notes</span>
            <p className="text-slate-600 bg-slate-50 p-2.5 rounded-lg text-xs leading-relaxed border border-slate-100/80">{symptom.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};
