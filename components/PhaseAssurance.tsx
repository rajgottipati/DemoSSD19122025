
import React from 'react';
import { MOCK_AIAF_METRICS, MOCK_VENDOR_HEALTH, ACTIVE_RISKS, GENEALOGY, REGION_BIAS_DATA, MOCK_BLOCKED_ATTEMPTS } from '../constants';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, ComposedChart, CartesianGrid } from 'recharts';

const confidenceTrend = [
  { time: 'Mon', confidence: 98, drift: 0.01 },
  { time: 'Tue', confidence: 97, drift: 0.02 },
  { time: 'Wed', confidence: 95, drift: 0.05 },
  { time: 'Thu', confidence: 92, drift: 0.08 },
  { time: 'Fri', confidence: 88, drift: 0.12 },
  { time: 'Sat', confidence: 85, drift: 0.15 },
  { time: 'Sun', confidence: 82, drift: 0.18 },
];

const featureImportance = [
  { feature: 'Height (m)', importance: 88, errorRate: 12, clause: 'SEPP 2.7' },
  { feature: 'GFA (sqm)', importance: 94, errorRate: 25, clause: 'LEP 2012 Cl 4.3' },
  { feature: 'Flood Zone', importance: 72, errorRate: 35, clause: 'DCP Sec 5' },
  { feature: 'Heritage Buffer', importance: 65, errorRate: 8, clause: 'Heritage Act 1977' },
];

const PhaseAssurance: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Assurance Report: ${MOCK_VENDOR_HEALTH.modelName}`);
    const body = encodeURIComponent(`System Health: ${MOCK_VENDOR_HEALTH.complianceScore}%\nActive Risks: ${ACTIVE_RISKS.length}\nDrift Index: ${MOCK_VENDOR_HEALTH.driftIndex}`);
    window.location.href = `mailto:vendor-support@nsw.gov.au?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-full bg-[#030712] text-slate-400 p-8 font-sans selection:bg-blue-500/30 print:bg-white print:text-black">
      {/* Control Center Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 border-b border-slate-800 pb-6 print:border-slate-200">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-1 print:hidden">
              <div className="w-2 h-6 bg-blue-600 rounded-sm"></div>
              <div className="w-2 h-6 bg-blue-400 rounded-sm"></div>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tighter uppercase italic print:text-black print:not-italic">
              NSW AIAF <span className="text-blue-500 font-light not-italic">Assurance Monitor</span>
            </h1>
          </div>
          <p className="text-[10px] font-mono text-slate-500 flex items-center gap-2 print:text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse print:hidden"></span>
            SYSTEM: SR00809-PROD // VERSION 4.9.2-STABLE
          </p>
        </div>

        <div className="flex items-center gap-4 print:hidden">
          <button 
            onClick={handleEmail}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-[11px] font-bold text-slate-300 hover:bg-slate-800 transition-all"
          >
            <i className="fa-solid fa-envelope"></i> EMAIL REPORT
          </button>
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-[11px] font-bold text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20"
          >
            <i className="fa-solid fa-print"></i> PRINT STATUS
          </button>
        </div>
      </div>

      {/* KPI Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
        {MOCK_AIAF_METRICS.map((metric, i) => (
          <div key={i} className="bg-slate-900/40 border border-slate-800 px-4 py-3 rounded-xl print:border-slate-200">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest print:text-slate-600">{metric.category}</span>
            <div className="flex items-center justify-between mt-1">
              <span className={`text-xl font-mono font-bold ${metric.status === 'drift' ? 'text-amber-500' : 'text-white print:text-black'}`}>{metric.score}%</span>
              <i className={`fa-solid ${metric.status === 'drift' ? 'fa-triangle-exclamation text-amber-500' : 'fa-check-circle text-green-500'} text-xs`}></i>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Observability Column */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Reliability / Drift Chart */}
            <div className="md:col-span-2 bg-slate-900/20 border border-slate-800 rounded-2xl p-6 relative overflow-hidden print:border-slate-200">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center justify-between">
                Reliability: Model Drift Analytics
                <span className="text-[9px] font-mono text-slate-600 print:text-slate-400">7-DAY WINDOW</span>
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={confidenceTrend}>
                    <defs>
                      <linearGradient id="confGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f87171" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#f87171" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                    <XAxis dataKey="time" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis domain={[70, 100]} hide />
                    <Tooltip 
                      contentStyle={{backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', fontSize: '10px'}}
                    />
                    <Area type="monotone" dataKey="confidence" stroke="#f87171" strokeWidth={3} fill="url(#confGradient)" />
                    <Line type="monotone" dataKey="drift" stroke="#3b82f6" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 p-4 bg-red-900/10 border border-red-500/20 rounded-xl print:bg-slate-100">
                 <p className="text-[10px] text-slate-300 print:text-slate-700">
                   <span className="font-bold text-red-400 uppercase mr-2 print:text-red-600">Observation:</span>
                   Confidence decline detected in Heritage Detection logic. Early-warning system engaged to prevent misclassification prior to public determination.
                 </p>
              </div>
            </div>

            {/* Legislative Traceability */}
            <div className="bg-slate-900/20 border border-slate-800 rounded-2xl p-6 print:border-slate-200">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Legislative Mapping</h3>
              <div className="space-y-6">
                {featureImportance.map((f, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className="text-slate-300 print:text-black">{f.feature}</span>
                      <span className="text-blue-500 font-mono text-[9px]">{f.clause}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden flex print:bg-slate-200">
                      <div className="h-full bg-blue-500" style={{ width: `${f.importance}%` }}></div>
                      <div className="h-full bg-red-500/40" style={{ width: `${f.errorRate}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-[9px] text-slate-500 italic leading-tight border-t border-slate-800 pt-4 print:text-slate-600">
                Determinations are cryptographically linked to Statutory Instruments. Updates to LEP/SEPP laws trigger automated model re-validation requirements.
              </p>
            </div>
          </div>

          {/* Regional Fairness */}
          <div className="bg-slate-900/20 border border-slate-800 rounded-2xl p-6 print:border-slate-200">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Regional Equity Analysis</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-square bg-slate-800/40 rounded-xl relative overflow-hidden flex items-center justify-center border border-slate-700 print:bg-slate-50">
                <svg viewBox="0 0 500 500" className="w-full h-full opacity-30">
                  <path d="M50,50 Q250,20 450,50 T450,450 T50,450 Z" fill="none" stroke="#64748b" strokeWidth="1" />
                  <circle cx="200" cy="200" r="120" fill="#22c55e" fillOpacity="0.1" />
                  <circle cx="320" cy="350" r="80" fill="#ef4444" fillOpacity="0.1" />
                </svg>
                <div className="absolute top-1/3 left-1/3 p-2 bg-slate-900/90 border border-red-500/30 rounded shadow-2xl print:bg-white print:border-red-500">
                  <div className="text-[8px] font-bold text-red-500 mb-1 uppercase">Bias Alert</div>
                  <div className="text-[10px] text-white print:text-black">Flood Zone C (SSD)</div>
                  <div className="text-[9px] text-slate-400 mt-1">Var: +12.4% vs Baseline</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-700 print:bg-slate-100">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Metric Variance</h4>
                  <div className="space-y-3">
                    {REGION_BIAS_DATA.map((r, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-xs text-slate-300 print:text-black">{r.name}</span>
                        <div className="flex items-center gap-3">
                          <div className={`text-[10px] font-mono ${r.variance < -5 ? 'text-red-400' : 'text-slate-500'}`}>{r.variance}%</div>
                          <div className="w-24 h-1 bg-slate-800 rounded-full overflow-hidden print:bg-slate-300">
                            <div className={`h-full ${r.variance < -10 ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${r.approval}%` }}></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl print:bg-blue-50">
                  <p className="text-[10px] text-slate-300 leading-relaxed print:text-slate-700">
                    <span className="font-bold text-blue-400 block mb-1 uppercase">Governance Strategy:</span>
                    Active monitoring ensures Western Sydney SSD applications are not unfairly penalized by legacy data patterns found in the base vendor models.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Column: Security & Audit */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Adversarial Monitor */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden print:border-slate-200">
             <div className="absolute -top-12 -right-12 w-32 h-32 bg-red-600/10 rounded-full blur-3xl print:hidden"></div>
             <h3 className="text-xs font-bold text-red-400 uppercase tracking-widest mb-6 flex items-center gap-2">
               <i className="fa-solid fa-shield-virus"></i>
               Adversarial Surveillance
             </h3>
             <div className="space-y-4">
               {MOCK_BLOCKED_ATTEMPTS.map((attempt, i) => (
                 <div key={i} className="p-4 bg-red-900/5 border border-red-900/20 rounded-xl print:border-slate-200">
                   <div className="flex justify-between items-start mb-2">
                     <span className="text-[9px] font-mono text-red-400 uppercase">{attempt.id} // BLOCKED</span>
                     <span className="text-[8px] font-bold px-1.5 py-0.5 bg-red-500 text-white rounded-sm uppercase tracking-widest">
                       {attempt.status}
                     </span>
                   </div>
                   <h4 className="text-xs font-bold text-slate-200 print:text-black">{attempt.type}</h4>
                   <p className="text-[9px] text-slate-500 mt-1">Target Path: {attempt.target}</p>
                 </div>
               ))}
             </div>
             <div className="mt-6 p-3 bg-red-500/5 rounded-lg border border-red-500/10 print:bg-red-50">
                <p className="text-[9px] text-red-300/80 leading-tight print:text-red-700">
                  System actively neutralizes prompt-injection and "poisoned" document attempts. Security telemetry shared with Cyber NSW.
                </p>
             </div>
          </div>

          {/* Human-in-the-Loop */}
          <div className="bg-slate-900/20 border border-slate-800 rounded-2xl p-6 print:border-slate-200">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center justify-between">
              Human Audit Index
              <span className="text-blue-400 text-[10px] font-bold">4.2% OVERRIDE RATE</span>
            </h3>
            <div className="space-y-4">
               {[
                 { user: 'Sarah P.', action: 'Rejected AI GFA finding (conf: 65%)', time: '12:45' },
                 { user: 'James W.', action: 'Modified Acoustic Condition', time: '11:20' },
                 { user: 'Sarah P.', action: 'Overrode Height Warning (Cl 4.6)', time: '09:30' }
               ].map((log, i) => (
                 <div key={i} className="flex gap-4 items-start group border-b border-slate-800 pb-3 last:border-0 print:border-slate-100">
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                   <div className="flex-1">
                     <div className="flex justify-between items-center mb-0.5">
                       <span className="text-[10px] font-bold text-slate-200 print:text-black">{log.user}</span>
                       <span className="text-[9px] font-mono text-slate-500">{log.time}</span>
                     </div>
                     <p className="text-[11px] text-slate-400 print:text-slate-600">{log.action}</p>
                   </div>
                 </div>
               ))}
            </div>
            <p className="text-[9px] text-slate-600 mt-6 italic leading-tight border-t border-slate-800 pt-4 print:text-slate-400 print:border-slate-100">
              High Planner engagement verified. Override trends indicate healthy professional judgment and system contestability as per AIAF requirement.
            </p>
          </div>
        </div>
      </div>

      {/* Decision Genealogy */}
      <div className="mt-8 bg-slate-900/60 border border-slate-800 rounded-2xl p-8 relative print:border-slate-200 print:bg-white">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-10 flex items-center gap-3">
          <i className="fa-solid fa-dna text-blue-500"></i>
          Traceability Genealogy // ID: SSD-892-TRANS-01
        </h3>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-4">
          {GENEALOGY.map((step, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center gap-4 group">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all ${
                  step.status === 'complete' ? 'bg-blue-600/10 border-blue-500 text-blue-400 print:bg-blue-50 print:text-blue-600' :
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
                  <p className={`text-[10px] font-black uppercase tracking-widest ${step.status === 'pending' ? 'text-slate-600' : 'text-slate-300 print:text-black'}`}>{step.label}</p>
                  <p className="text-[9px] font-mono text-slate-500 mt-1">{step.timestamp}</p>
                </div>
              </div>
              {i < GENEALOGY.length - 1 && (
                <div className="hidden md:flex flex-1 items-center gap-1 opacity-20 print:opacity-50">
                  <div className="h-0.5 flex-1 bg-slate-500"></div>
                  <i className="fa-solid fa-chevron-right text-[8px]"></i>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <footer className="mt-8 flex justify-between items-center text-[10px] text-slate-500 border-t border-slate-800 pt-6 print:border-slate-200">
        <div className="flex gap-6">
          <span>VEO-ENGINE: <span className="text-slate-400 font-mono">10.0.42.1</span></span>
          <span>AIAF-COMPLIANT: AES-256-GCM</span>
        </div>
        <div className="font-mono text-[9px] text-blue-500/50 uppercase tracking-widest print:text-slate-400">
          Independent Owner's Engineer Audit Verified
        </div>
      </footer>
    </div>
  );
};

export default PhaseAssurance;
