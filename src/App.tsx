import { useState } from 'react';
import { AppLayout } from './components/AppLayout';
import { BodyViewer3D } from './components/BodyViewer3D';
import { SymptomList } from './components/SymptomList';
import { SymptomFormModal } from './components/SymptomFormModal';
import { ReportPanel } from './components/ReportPanel';

function App() {
  const [showReport, setShowReport] = useState(false);

  return (
    <>
      <AppLayout 
        viewerNode={<BodyViewer3D />} 
        panelNode={
          showReport ? (
            <ReportPanel onBack={() => setShowReport(false)} />
          ) : (
            <SymptomList onGenerateReport={() => setShowReport(true)} />
          )
        } 
      />
      <SymptomFormModal />
    </>
  );
}

export default App;
