import React, { useState } from 'react';
import { useSymptomStore } from '../store/useSymptomStore';
import { jsPDF } from 'jspdf';
import { FileDown, Download, Copy, ArrowLeft, Check, Share2 } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export const ReportPanel: React.FC<Props> = ({ onBack }) => {
  const symptoms = useSymptomStore(state => state.symptoms);
  const [copied, setCopied] = useState(false);

  const totalRegions = new Set(symptoms.map(s => s.region)).size;
  const highestSeverity = symptoms.reduce((max, s) => Math.max(max, s.severity), 0);

  const generateReportText = () => {
    let text = `PATIENT SYMPTOM REPORT\n`;
    text += `Generated on: ${new Date().toLocaleDateString()}\n\n`;
    text += `Summary:\n`;
    text += `- Total affected regions: ${totalRegions}\n`;
    text += `- Highest severity: ${highestSeverity}/10\n\n`;
    text += `Symptoms Logged (${symptoms.length}):\n`;
    
    symptoms.forEach((s, index) => {
      text += `\n${index + 1}. ${s.region} - ${s.type}\n`;
      text += `   Severity: ${s.severity}/10 | Duration: ${s.duration}\n`;
      if (s.notes) text += `   Notes: ${s.notes}\n`;
    });

    return text;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateReportText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([generateReportText()], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "symptom-report.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    const reportText = generateReportText();
    
    doc.setFontSize(16);
    doc.setTextColor(15, 23, 42); // slate-900
    doc.text("Patient Symptom Report", 20, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139); // slate-500
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 27);
    
    doc.setFontSize(12);
    doc.setTextColor(30, 41, 59); // slate-800
    const splitText = doc.splitTextToSize(reportText.replace(`PATIENT SYMPTOM REPORT\nGenerated on: ${new Date().toLocaleDateString()}\n\n`, ''), 170);
    doc.text(splitText, 20, 40);
    
    doc.save("symptom-report.pdf");
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(generateReportText());
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/30 animate-in slide-in-from-right-4 duration-300">
      <div className="p-5 border-b border-slate-200 bg-white flex items-center gap-3">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-slate-100 text-slate-500 hover:text-slate-800 rounded-lg transition-colors border border-transparent hover:border-slate-200"
        >
          <ArrowLeft size={18} />
        </button>
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <FileDown className="text-blue-600" size={20} />
          Report Preview
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-5 scroll-smooth relative">
        <div className="bg-white border text-sm border-slate-200 rounded-xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] font-mono whitespace-pre-wrap text-slate-700 leading-relaxed max-w-full overflow-x-hidden">
          {generateReportText()}
        </div>
      </div>

      <div className="p-5 bg-white border-t border-slate-200 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)] flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-sm font-bold transition-colors"
          >
            {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} className="text-slate-500" />}
            {copied ? 'Copied!' : 'Copy Text'}
          </button>
          
          <button
            onClick={handleDownloadTxt}
            className="flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-sm font-bold transition-colors"
          >
            <Download size={16} className="text-slate-500" />
            Save TXT
          </button>
        </div>

        <button
          onClick={handleDownloadPdf}
          className="w-full py-3.5 px-4 rounded-xl font-bold flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/40 transition-all hover:scale-[1.01] active:scale-[0.99]"
        >
          <FileDown size={18} />
          Download PDF
        </button>
        
        <button
          onClick={handleShareWhatsApp}
          className="w-full py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 bg-[#25D366] text-white shadow-md shadow-[#25D366]/20 hover:shadow-[#25D366]/30 transition-all hover:scale-[1.01] active:scale-[0.99] mt-1"
        >
          <Share2 size={18} />
          Share via WhatsApp
        </button>
      </div>
    </div>
  );
};
