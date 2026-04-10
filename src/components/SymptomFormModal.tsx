import { useState, useEffect, type FC } from 'react';
import { useSymptomStore, type SymptomType } from '../store/useSymptomStore';
import { X } from 'lucide-react';
import { formatRegionName } from '../utils/colors';

const SYMPTOM_TYPES: SymptomType[] = [
  'Pain', 'Burning', 'Stiffness', 'Numbness', 'Swelling', 'Itching', 'Tingling', 'Weakness', 'Other'
];

export const SymptomFormModal: FC = () => {
  const { selectedRegion, setSelectedRegion, addSymptom } = useSymptomStore();
  
  const [type, setType] = useState<SymptomType>('Pain');
  const [severity, setSeverity] = useState<number>(5);
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (selectedRegion) {
      setType('Pain');
      setSeverity(5);
      setDuration('');
      setNotes('');
    }
  }, [selectedRegion]);

  if (!selectedRegion) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!duration) return;
    
    addSymptom({
      region: selectedRegion,
      type,
      severity,
      duration,
      notes
    });
    
    setSelectedRegion(null);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden transform transition-all scale-100 opacity-100">
        <div className="bg-slate-50 border-b border-slate-100 flex justify-between items-center p-4 relative">
          <h2 className="text-lg font-bold text-slate-800">
            Log Symptom: <span className="text-blue-600">{formatRegionName(selectedRegion as string)}</span>
          </h2>
          <button 
            onClick={() => setSelectedRegion(null)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Symptom Type</label>
            <select 
              value={type} 
              onChange={(e) => setType(e.target.value as SymptomType)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-sm"
            >
              {SYMPTOM_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-sm font-semibold text-slate-700">Severity Level</label>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${severity <= 3 ? 'bg-yellow-100 text-yellow-700 border-yellow-200' : severity <= 6 ? 'bg-orange-100 text-orange-700 border-orange-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
                {severity} / 10
              </span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={severity}
              onChange={(e) => setSeverity(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-2"
            />
            <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase mt-2 px-1">
              <span>Mild</span>
              <span>Moderate</span>
              <span>Severe</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Duration <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              required
              placeholder="e.g. 3 days, 2 weeks, intermittent"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-sm placeholder:text-slate-300"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Notes (Optional)</label>
            <textarea 
              rows={2}
              placeholder="Any additional details..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none shadow-sm placeholder:text-slate-300"
            />
          </div>

          <div className="flex justify-end gap-3 mt-4 pt-5 border-t border-slate-100">
            <button 
              type="button"
              onClick={() => setSelectedRegion(null)}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-800 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-6 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-md shadow-blue-500/20 transition-all transform hover:scale-[1.02]"
            >
              Save Symptom
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
