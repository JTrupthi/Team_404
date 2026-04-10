import type { ReactNode, FC } from 'react';
import { Header } from './Header';

interface AppLayoutProps {
  viewerNode: ReactNode;
  panelNode: ReactNode;
}

export const AppLayout: FC<AppLayoutProps> = ({ viewerNode, panelNode }) => {
  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden font-sans">
      <Header />
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* 3D Viewer Section (Left/Top) */}
        <section className="flex-[1.5] lg:flex-none lg:w-[65%] h-full relative bg-gradient-to-b from-slate-50 to-slate-200/50">
          <div className="absolute inset-0 pattern-dots pattern-slate-200 pattern-bg-transparent pattern-size-4 pattern-opacity-40"></div>
          {viewerNode}
        </section>
        
        {/* UI Panel Section (Right/Bottom) */}
        <section className="flex-1 lg:flex-none lg:w-[35%] h-full bg-white border-t lg:border-t-0 lg:border-l border-slate-200 overflow-hidden flex flex-col shadow-[rgba(0,0,0,0.05)_0px_0px_20px] z-20">
          {panelNode}
        </section>
      </main>
    </div>
  );
};
