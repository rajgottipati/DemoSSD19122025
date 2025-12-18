
import React from 'react';

const Phase3Spatial: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Phase 3: Spatial & Constraint Verification</h2>
        <p className="text-slate-500">Proposed footprint overlay on heritage and environmental GIS layers.</p>
      </div>

      <div className="flex-1 bg-white border border-slate-200 rounded-2xl overflow-hidden relative shadow-inner">
        {/* Mock Map View */}
        <div className="absolute inset-0 bg-[#e5e5f7] opacity-20" style={{ backgroundImage: 'radial-gradient(#444cf7 0.5px, transparent 0.5px), radial-gradient(#444cf7 0.5px, #e5e5f7 0.5px)', backgroundSize: '20px 20px', backgroundPosition: '0 0,10px 10px' }}></div>
        
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 600">
          {/* Protected Area */}
          <path d="M400,100 L600,150 L700,400 L500,500 L300,400 Z" fill="#fecaca" fillOpacity="0.4" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
          <text x="460" y="320" className="text-xs font-bold fill-red-800">Aboriginal Heritage Zone</text>
          
          {/* Buffer Zone */}
          <path d="M380,80 L620,130 L720,410 L510,520 L280,410 Z" fill="none" stroke="#ef4444" strokeWidth="1" strokeOpacity="0.3" />

          {/* Proposed Footprint */}
          <rect x="150" y="200" width="180" height="250" fill="#bfdbfe" fillOpacity="0.6" stroke="#3b82f6" strokeWidth="3" rx="4" transform="rotate(-15, 240, 325)" />
          <text x="180" y="330" className="text-sm font-bold fill-blue-800">Proposed Data Hub B1</text>
          
          {/* Measuring Line */}
          <line x1="322" y1="362" x2="368" y2="348" stroke="#334155" strokeWidth="2" strokeDasharray="3,2" />
          <circle cx="322" cy="362" r="4" fill="#334155" />
          <circle cx="368" cy="348" r="4" fill="#334155" />
          <rect x="330" y="325" width="40" height="20" rx="4" fill="white" stroke="#334155" />
          <text x="335" y="340" className="text-[10px] font-bold fill-slate-800">5.2m</text>
        </svg>

        {/* Map UI Controls */}
        <div className="absolute top-6 right-6 flex flex-col gap-2">
          <div className="bg-white p-2 rounded-lg shadow-lg border border-slate-200 flex flex-col gap-1">
            <button className="p-2 hover:bg-slate-100 rounded text-slate-600"><i className="fa-solid fa-plus"></i></button>
            <button className="p-2 hover:bg-slate-100 rounded text-slate-600 border-t border-slate-100"><i className="fa-solid fa-minus"></i></button>
          </div>
          <div className="bg-white p-2 rounded-lg shadow-lg border border-slate-200">
            <button className="p-2 hover:bg-slate-100 rounded text-slate-600"><i className="fa-solid fa-layer-group"></i></button>
          </div>
        </div>

        <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl border border-slate-200 shadow-xl max-w-xs">
          <div className="flex items-center gap-2 mb-2">
            <i className="fa-solid fa-circle-check text-green-500"></i>
            <h3 className="text-sm font-bold text-slate-800">Constraint Check Passed</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            The building footprint (extracted from <span className="text-blue-600 font-mono">Plan A-01</span>) is **5.2 meters** clear of the Heritage Protection Zone.
          </p>
          <div className="mt-4 flex gap-2">
            <button className="flex-1 bg-blue-600 text-white text-[10px] font-bold py-2 rounded uppercase tracking-wider">
              Verify & Log
            </button>
            <button className="flex-1 border border-slate-200 text-slate-600 text-[10px] font-bold py-2 rounded uppercase">
              Recalculate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Phase3Spatial;
