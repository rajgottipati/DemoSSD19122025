
import React, { useState } from 'react';
import { Phase } from './types';
import { PROJECT_NAME, PROJECT_ID, USER_NAME } from './constants';
import Sidebar from './components/Sidebar';
import Phase1Triage from './components/Phase1Triage';
import Phase2Compliance from './components/Phase2Compliance';
import Phase3Spatial from './components/Phase3Spatial';
import Phase4Precedent from './components/Phase4Precedent';
import Phase5Audit from './components/Phase5Audit';
import DepartmentBulletin from './components/DepartmentBulletin';
import GlassBoxPanel from './components/GlassBoxPanel';

const App: React.FC = () => {
  const [activePhase, setActivePhase] = useState<Phase>(Phase.TRIAGE);
  const [selectedIssue, setSelectedIssue] = useState<any | null>(null);

  const renderPhase = () => {
    switch (activePhase) {
      case Phase.TRIAGE:
        return <Phase1Triage onSelectIssue={setSelectedIssue} />;
      case Phase.COMPLIANCE:
        return <Phase2Compliance onSelectIssue={setSelectedIssue} />;
      case Phase.SPATIAL:
        return <Phase3Spatial />;
      case Phase.PRECEDENT:
        return <Phase4Precedent onSelectIssue={setSelectedIssue} />;
      case Phase.AUDIT:
        return <Phase5Audit />;
      case Phase.BULLETIN:
        return <DepartmentBulletin />;
      default:
        return <Phase1Triage onSelectIssue={setSelectedIssue} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar activePhase={activePhase} setActivePhase={setActivePhase} />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold text-slate-800">{PROJECT_NAME}</h1>
            <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-xs font-mono uppercase">
              {PROJECT_ID}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActivePhase(Phase.BULLETIN)}
              className="relative p-2 text-slate-400 hover:text-blue-600 transition-colors"
              title="Department Bulletin"
            >
              <i className="fa-solid fa-bell text-xl"></i>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-700">{USER_NAME}</p>
                <p className="text-xs text-slate-400">Senior Planner | NSW Dept. Planning</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                SP
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          <div className={`flex-1 overflow-y-auto p-8 transition-all duration-300 ${selectedIssue ? 'w-1/2' : 'w-full'}`}>
            {renderPhase()}
          </div>
          
          {selectedIssue && (
            <div className="w-1/2 bg-white border-l border-slate-200 shadow-2xl z-10 animate-in slide-in-from-right duration-300">
              <GlassBoxPanel 
                issue={selectedIssue} 
                onClose={() => setSelectedIssue(null)} 
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
