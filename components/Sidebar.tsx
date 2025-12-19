
import React from 'react';
import { Phase } from '../types';

interface SidebarProps {
  activePhase: Phase;
  setActivePhase: (phase: Phase) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePhase, setActivePhase }) => {
  const menuItems = [
    { id: Phase.TRIAGE, label: 'Intelligent Triage', icon: 'fa-file-shield' },
    { id: Phase.COMPLIANCE, label: 'Policy Alignment', icon: 'fa-scale-balanced' },
    { id: Phase.SPATIAL, label: 'Spatial Verification', icon: 'fa-map-location-dot' },
    { id: Phase.PRECEDENT, label: 'Precedents & RAG', icon: 'fa-magnifying-glass-chart' },
    { id: Phase.AUDIT, label: 'Transparency Log', icon: 'fa-clipboard-check' },
    { id: Phase.ASSURANCE, label: 'System Assurance', icon: 'fa-shield-halved' },
    { id: Phase.BULLETIN, label: 'Innovation Hub', icon: 'fa-bullhorn' },
  ];

  return (
    <aside className="w-64 bg-slate-900 flex flex-col shrink-0">
      <div className="p-6">
        <div className="flex items-center gap-3 text-white mb-8">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
            <i className="fa-solid fa-cube text-white"></i>
          </div>
          <span className="font-bold text-lg tracking-tight uppercase tracking-widest">Glass Box</span>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePhase(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                activePhase === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <i className={`fa-solid ${item.icon} w-5 text-center`}></i>
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6">
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-2">AIAF Handover Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
            <span className="text-[10px] text-slate-200">Owner's Engineer Audit Live</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
