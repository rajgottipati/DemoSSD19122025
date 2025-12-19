
import React from 'react';
import { MOCK_AIAF_METRICS, MOCK_VENDOR_HEALTH, ACTIVE_RISKS, GENEALOGY, REGION_BIAS_DATA } from '../constants';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, ComposedChart, Bar, CartesianGrid } from 'recharts';

const telemetryData = [
  { time: '09:00', latency: 1.1, trust: 92, drift: 0.02 },
  { time: '10:00', latency: 1.4, trust: 88, drift: 0.05 },
  { time: '11:00', latency: 2.1, trust: 75, drift: 0.12 },
  { time: '12:00', latency: 1.2, trust: 82, drift: 0.15 },
  { time: '13:00', latency: 1.3, trust: 80, drift: 0.14 },
  { time: '14:00', latency: 1.5, trust: 78, drift: 0.18 },
];

const featureImportance = [
  { feature: 'Height (m)', importance: 88, errorRate: 12 },
  { feature: 'GFA (sqm)', importance: 94, errorRate: 25 },
  { feature: 'Flood Zone', importance: 72, errorRate: 35 },
  { feature: 'Heritage Buffer', importance: 65, errorRate: 8 },
];

const PhaseAssurance: React.FC = () => {
  return (
    <div className="min-h-full bg-[#030712] text-slate-400 p-8 font-sans selection:bg-blue-500/30">
      {/* Global System Telemetry Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-1">
              <div className="w-2 h-6 bg-blue-600 rounded-sm"></div>
              <div className="w-2 h-6 bg-blue-400 rounded-sm"></div>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tighter uppercase italic">Control Center <span className="text-blue-500 font-light not-italic">AIAF Monitor</span></h1>
          </div>
          <p className="text-[10px] font-mono text-slate-500 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            OWNER'S ENGINEER INTERFACE v4.9-STABLE // SYSTEM: SR00809-PROD
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {MOCK_AIAF_METRICS.map((metric, i) => (
            <div key={i} className="bg-slate-900/40 border border-slate-800 px-4 py-2 rounded-lg flex flex-col min-w-[120px]">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{metric.category}</span>
              <div className="flex items-center justify-between mt-1">
                <span className={`text-lg font-mono font-bold ${metric.status === 'drift' ? 'text-amber-500' : 'text-white'}`}>{metric.score}%</span>
                <i className={`fa-solid ${metric.status === 'drift' ? 'fa-arrow-trend-down text-amber-500' : 'fa-check text-green-500'} text-[10px]`}></i>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        
        {/* Panel 1: Real-Time Observability & Human Trust Index */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-slate-900/20 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <i className="fa-solid fa-wave-square text-6xl text-blue-500"></i>
              </div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center justify-between">
                System Telemetry: Latency vs. Human Trust
                <span className="text-[9px] font-mono text-slate-600">SAMPLE RATE: 100ms</span>
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={telemetryData}>
                    <defs>
                      <linearGradient id="trustGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                    <XAxis dataKey="time" hide />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', fontSize: '10px'}}
                      itemStyle={{padding: '2px 0'}}
                    />
                    <Area type="monotone" dataKey="trust" stroke="#3b82f6" strokeWidth={3} fill="url(#trustGradient)" />
                    <Line type="monotone" dataKey="latency" stroke="#f59e0b" strokeWidth={2} dot={{fill: '#f59e0b', r: 3}} strokeDasharray="5 5" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                  <span className="text-[10px] font-bold text-slate-300">Human Trust Score (HTS)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-1 border-t-2 border-dashed border-amber-500"></div>
                  <span className="text-[10px] font-bold text-slate-300">Avg. Response Latency (ms)</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/20 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Error Root Causes</h3>
              <div className="space-y-6">
                {featureImportance.map((f, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className="text-slate-300">{f.feature}</span>
                      <span className={f.errorRate > 20 ? 'text-red-400' : 'text-slate-500'}>{f.errorRate}% Drift</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden flex">
                      <div className="h-full bg-blue-500" style={{ width: `${f.importance}%` }}></div>
                      <div className="h-full bg-red-500/40" style={{ width: `${f.errorRate}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-3 bg-blue-500/5 rounded-lg border border-blue-500/10">
                <p className="text-[10px] text-blue-400 leading-tight">
                  <i className="fa-solid fa-lightbulb mr-2"></i>
                  High drift in **Flood Zone** parsing. Recommend manual verification for SSD-2024-0892 location data.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/20 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center justify-between">
              Geospatial Fairness & Policy Mapping
              <div className="flex gap-2">
                <button className="px-2 py-1 bg-slate-800 rounded text-[8px] font-bold text-slate-400 hover:text-white transition-colors">NSW OVERVIEW</button>
                <button className="px-2 py-1 bg-blue-600 rounded text-[8px] font-bold text-white">W. SYDNEY HUB</button>
              </div>
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-square bg-slate-800/40 rounded-xl relative overflow-hidden flex items-center justify-center border border-slate-700">
                <svg viewBox="0 0 500 500" className="w-full h-full opacity-30">
                  <path d="M50,50 Q250,20 450,50 T450,450 T50,450 Z" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="10 5" />
                  <circle cx="200" cy="200" r="120" fill="#22c55e" fillOpacity="0.1" stroke="#22c55e" strokeWidth="0.5" />
                  <circle cx="320" cy="350" r="80" fill="#ef4444" fillOpacity="0.1" stroke="#ef4444" strokeWidth="0.5" />
                </svg>
                {/* Simulated Radar Ping */}
                <div className="absolute top-1/2 left-1/2 w-32 h-32 border border-blue-500/20 rounded-full -translate-x-1/2 -translate-y-1/2 animate-[ping_3s_linear_infinite]"></div>
                
                <div className="absolute top-1/3 left-1/3 p-2 bg-slate-900/90 border border-red-500/30 rounded shadow-2xl animate-bounce">
                  <div className="text-[8px] font-bold text-red-500 mb-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> BIAS ANOMALY
                  </div>
                  <div className="text-[10px] text-white">Flood Zone C (SSD)</div>
                  <div className="text-[9px] text-slate-400 mt-1">Var: +12.4% vs Sydney Baseline</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-700">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Bias Mitigation Log</h4>
                  <div className="space-y-3">
                    {REGION_BIAS_DATA.map((r, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-xs text-slate-300">{r.name}</span>
                        <div className="flex items-center gap-3">
                          <div className={`text-[10px] font-mono ${r.variance < -5 ? 'text-red-400' : 'text-slate-500'}`}>{r.variance}% VAR</div>
                          <div className="w-24 h-1 bg-slate-800 rounded-full overflow-hidden">
                            <div className={`h-full ${r.variance < -10 ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${r.approval}%` }}></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <i className="fa-solid fa-triangle-exclamation text-amber-500"></i>
                    <h5 className="text-xs font-bold text-amber-500 uppercase tracking-tighter">System Alert: Imbalance</h5>
                  </div>
                  <p className="text-[10px] text-slate-300 leading-relaxed">
                    AI model is penalizing applications in Flood Zone C based on historical 2018 datasets. Current 2024 flood mitigation infrastructure not yet indexed by Vendor SR00809.
                  </p>
                  <button className="mt-3 w-full bg-amber-600 hover:bg-amber-700 text-white text-[9px] font-bold py-2 rounded transition-colors uppercase tracking-widest">
                    Force Bias Correction Factor
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel 2: The Handover Watchdog */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
             <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl"></div>
             <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-6 flex items-center gap-2">
               <i className="fa-solid fa-shield-halved"></i>
               Technical Risk Register
             </h3>
             <div className="space-y-4">
               {ACTIVE_RISKS.map((risk, i) => (
                 <div key={i} className="group p-4 bg-slate-800/20 border border-slate-700 hover:border-blue-500 rounded-xl transition-all cursor-pointer">
                   <div className="flex justify-between items-start mb-2">
                     <span className="text-[9px] font-mono text-slate-500 uppercase tracking-tighter">{risk.id} // ACTIVE</span>
                     <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-widest ${
                       risk.severity === 'high' ? 'bg-red-500 text-white' : 'bg-slate-700 text-slate-300'
                     }`}>
                       {risk.severity}
                     </span>
                   </div>
                   <h4 className="text-xs font-bold text-slate-200 group-hover:text-blue-400 transition-colors">{risk.title}</h4>
                   <div className="mt-3 flex items-center justify-between text-[10px]">
                     <div className="flex items-center gap-1 text-slate-500">
                       <i className="fa-solid fa-clock-rotate-left"></i>
                       Detected 4h ago
                     </div>
                     <span className={`font-bold ${risk.trend === 'up' ? 'text-red-400' : 'text-green-400'}`}>
                       {risk.trend === 'up' ? '↗ Increasing' : '↘ Stable'}
                     </span>
                   </div>
                 </div>
               ))}
             </div>
             <button className="mt-6 w-full border border-blue-500/50 text-blue-400 text-[10px] font-bold py-3 rounded-xl hover:bg-blue-500/10 transition-all uppercase tracking-widest">
               Execute AIAF Deep-Audit
             </button>
          </div>

          <div className="bg-slate-900/20 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Human Overrides</h3>
            <div className="space-y-4">
               {[
                 { user: 'Sarah P.', action: 'Rejected AI GFA finding (conf: 65%)', time: '12:45', status: 'verified' },
                 { user: 'James W.', action: 'Modified Acoustic Condition', time: '11:20', status: 'verified' },
                 { user: 'Sarah P.', action: 'Overrode Height Warning (Cl 4.6)', time: '09:30', status: 'alert' }
               ].map((log, i) => (
                 <div key={i} className="flex gap-4 items-start group">
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 ring-4 ring-blue-500/10"></div>
                   <div className="flex-1">
                     <div className="flex justify-between items-center mb-0.5">
                       <span className="text-[10px] font-bold text-slate-200">{log.user}</span>
                       <span className="text-[9px] font-mono text-slate-500">{log.time}</span>
                     </div>
                     <p className="text-[11px] text-slate-400 group-hover:text-slate-300 transition-colors">{log.action}</p>
                   </div>
                 </div>
               ))}
            </div>
            <div className="mt-8 pt-6 border-t border-slate-800">
               <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 mb-2">
                 <span>HUMAN-IN-THE-LOOP (HITL) RATE</span>
                 <span className="text-blue-400">4.2% (±0.4)</span>
               </div>
               <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                 <div className="h-full bg-blue-500 animate-[loading_2s_infinite]" style={{ width: '4.2%' }}></div>
               </div>
               <p className="text-[9px] text-slate-600 mt-3 italic leading-tight">
                 Planner engagement is high. AI reliance is stable but not absolute, indicating a healthy Glass Box implementation.
               </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decision Pipeline Archaeology */}
      <div className="mt-8 bg-slate-900/60 border border-slate-800 rounded-2xl p-8 relative">
        <div className="absolute inset-0 bg-grid-slate-800/[0.05] bg-[bottom_left] [mask-image:linear-gradient(0deg,transparent,black)]"></div>
        <div className="relative z-10">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-10 flex items-center gap-3">
            <i className="fa-solid fa-code-branch text-blue-500"></i>
            Traceability Genealogy // Decision #SSD-892-TRANS-01
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-4">
            {GENEALOGY.map((step, i) => (
              <React.Fragment key={i}>
                <div className="flex flex-col items-center gap-4 group">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 group-hover:scale-110 ${
                    step.status === 'complete' ? 'bg-blue-600/10 border-blue-500 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.2)]' :
                    step.status === 'active' ? 'bg-amber-600/10 border-amber-500 text-amber-400 animate-pulse' :
                    'bg-slate-900 border-slate-800 text-slate-700'
                  }`}>
                    <i className={`fa-solid text-sm ${
                      step.label === 'Document Ingest' ? 'fa-file-import' :
                      step.label === 'OCR Extraction' ? 'fa-magnifying-glass' :
                      step.label === 'Rule Mapping' ? 'fa-code-merge' :
                      'fa-file-signature'
                    }`}></i>
                  </div>
                  <div className="text-center">
                    <p className={`text-[10px] font-black uppercase tracking-widest ${step.status === 'pending' ? 'text-slate-600' : 'text-slate-300'}`}>{step.label}</p>
                    <p className="text-[9px] font-mono text-slate-500 mt-1">{step.timestamp}</p>
                  </div>
                </div>
                {i < GENEALOGY.length - 1 && (
                  <div className="hidden md:flex flex-1 items-center gap-1 opacity-20">
                    <div className="h-0.5 flex-1 bg-gradient-to-r from-blue-500 to-slate-500"></div>
                    <i className="fa-solid fa-chevron-right text-[8px]"></i>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <footer className="mt-8 flex justify-between items-center text-[10px] text-slate-500">
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
             <i className="fa-solid fa-link"></i>
             <span>SR00809-API-ENDPOINT: <span className="text-slate-400 font-mono">10.0.42.1</span></span>
          </div>
          <div className="flex items-center gap-2">
             <i className="fa-solid fa-fingerprint"></i>
             <span>ENCRYPTION: AES-256-GCM</span>
          </div>
        </div>
        <div className="font-mono text-[9px] text-blue-500/50 uppercase tracking-widest animate-pulse">
          Monitoring Active: 0 alerts unresolved
        </div>
      </footer>
    </div>
  );
};

export default PhaseAssurance;
