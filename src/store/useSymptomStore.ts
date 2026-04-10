import { create } from 'zustand';

import type { Muscle } from 'react-body-highlighter';

export type BodyRegion = Muscle;

export type SymptomType = 
  | 'Pain' 
  | 'Burning' 
  | 'Stiffness' 
  | 'Numbness' 
  | 'Swelling' 
  | 'Itching' 
  | 'Tingling' 
  | 'Weakness' 
  | 'Other';

export interface Symptom {
  id: string;
  region: BodyRegion;
  type: SymptomType;
  severity: number;
  duration: string;
  notes?: string;
  createdAt: number;
}

interface SymptomState {
  symptoms: Symptom[];
  selectedRegion: BodyRegion | null;
  addSymptom: (symptom: Omit<Symptom, 'id' | 'createdAt'>) => void;
  removeSymptom: (id: string) => void;
  updateSymptom: (id: string, updates: Partial<Symptom>) => void;
  setSelectedRegion: (region: BodyRegion | null) => void;
  clearAll: () => void;
  loadDemoData: () => void;
}

const demoData: Omit<Symptom, 'id' | 'createdAt'>[] = [
  { region: 'lower-back', type: 'Stiffness', severity: 6, duration: '2 weeks', notes: 'Worse in the morning' },
  { region: 'quadriceps', type: 'Numbness', severity: 4, duration: '3 days', notes: 'Radiates down to the knee' },
  { region: 'head', type: 'Pain', severity: 8, duration: '5 hours', notes: 'Throbbing headache' }
];

export const useSymptomStore = create<SymptomState>((set) => ({
  symptoms: [],
  selectedRegion: null,
  addSymptom: (symptom) => set((state) => ({
    symptoms: [
      ...state.symptoms,
      {
        ...symptom,
        id: Math.random().toString(36).substring(2, 9),
        createdAt: Date.now()
      }
    ]
  })),
  removeSymptom: (id) => set((state) => ({
    symptoms: state.symptoms.filter((s) => s.id !== id)
  })),
  updateSymptom: (id, updates) => set((state) => ({
    symptoms: state.symptoms.map((s) => s.id === id ? { ...s, ...updates } : s)
  })),
  setSelectedRegion: (region) => set({ selectedRegion: region }),
  clearAll: () => set({ symptoms: [], selectedRegion: null }),
  loadDemoData: () => set({
    symptoms: demoData.map(s => ({
      ...s,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: Date.now()
    })),
    selectedRegion: null
  })
}));
