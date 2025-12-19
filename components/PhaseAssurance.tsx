
import React from 'react';
import { MOCK_AIAF_METRICS, MOCK_VENDOR_HEALTH, ACTIVE_RISKS, GENEALOGY, REGION_BIAS_DATA } from '../constants';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis } from 'recharts';

const confidenceData = [
  { time: '00:00', score: 98 }, { time: '04:00', score: 97 },
  { time: '08:00', score: 92 }, { time: '12:00', score: 88 },
  { time: '16:00', score: 84 }, { time: '20:00', score: 82 },
];

const overrideData = [
  { name: 'Override', value: 4.2 },
  { name: 'Auto-Accept', value: 95.8 },
];

const PhaseAssurance: React.FC = () => {
  return (
    <div className="min-h-full bg-[#0a0e14] text-slate-300 p-6 font-sans">
      {/* Top Header */}
      <header className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">NSW AIAF Assurance Monitor</h2>
          <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">SR00809 SSD Solution Delivery</p>
        </div>
        <div className="flex gap-4">
          {[
            { label: 'Privacy', color: 'bg-green-500' },
            { label: 'Fairness', color: 'bg-amber-500' },
            { label: 'Transparency', color: 'bg-green-500' },
            { label: 'Security', color: 'bg-green-500' },
          ].map((status, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded">
              <div className={`w-2 h-2 rounded-full ${status.color} shadow-[0_0_8px_rgba(34,197,94,0.3)]`}></div>
              <span className="text-[10px] font-bold uppercase text-slate-400">{status.label}</span>
            </div>
          ))}
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-4 mb-4">
        
        {/* Left Panel: The Watchdog */}
        <div className="col-span-3 space-y-4">
          <section className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 h-full flex flex-col">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center justify-between">
              Real-Time Risk Register
              <i className="fa-solid fa-eye text-blue-500"></i>
            </h3>
            
            <div className="space-y-3 flex-1">
              {ACTIVE_RISKS.map((risk) => (
                <div key={risk.id} className="p-3 bg-slate-800/40 border-l-2 border-slate-700 hover:border-blue-500 transition-all rounded-r">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-mono text-slate-500">{risk.id}</span>
                    <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded ${
                      risk.severity === 'high' ? 'bg-red-900/40 text-red-400' : 
                      risk.severity === 'medium' ? 'bg-amber-900/40 text-amber-400' : 'bg-blue-900/40 text-blue-400'
                    }`}>
                      {risk.severity}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-200">{risk.title}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <i className={`fa-solid fa-chart-line text-[10px] ${risk.trend === 'up' ? 'text-red-400' : 'text-green-400'}`}></i>
                    <span className="text-[8px] text-slate-500 uppercase">Trend: {risk.trend}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Model Confidence (24h)</span>
                <span className="text-xs font-bold text-red-400">-16%</span>
              </div>
              <div className="h-16 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={confidenceData}>
                    <Line type="monotone" dataKey="score" stroke="#f87171" strokeWidth={2} dot={false} />
                    <Tooltip contentStyle={{backgroundColor: '#0f172a', border: 'none', fontSize: '10px'}} itemStyle={{color: '#f87171'}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>
        </div>

        {/* Center Panel: The Fairness Map */}
        <div className="col-span-6">
          <section className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 relative overflow-hidden h-full">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center justify-between">
              Geospatial Bias Detection
              <i className="fa-solid fa-map-location text-amber-500"></i>
            </h3>

            {/* Mock NSW Map Overlay */}
            <div className="relative aspect-video bg-slate-900/80 rounded-lg flex items-center justify-center border border-slate-800 group cursor-crosshair">
              <svg viewBox="0 0 500 300" className="w-full h-full opacity-40">
                <path d="M100,50 L400,30 L450,250 L80,280 Z" fill="none" stroke="#334155" strokeWidth="1" />
                {/* Heatmap Blobs */}
                <circle cx="200" cy="150" r="40" fill="#22c55e" fillOpacity="0.3" />
                <circle cx="280" cy="180" r="30" fill="#22c55e" fillOpacity="0.2" />
                <circle cx="150" cy="210" r="25" fill="#f59e0b" fillOpacity="0.4" />
                <circle cx="350" cy="120" r="20" fill="#ef4444" fillOpacity="0.5" />
              </svg>
              
              {/* Region Data Nodes */}
              {REGION_BIAS_DATA.map((r, i) => (
                <div key={i} className="absolute flex items-center gap-1 group/node" style={{
                  top: `${20 + (i * 15)}%`,
                  left: `${15 + (i * 12)}%`
                }}>
                  <div className={`w-1.5 h-1.5 rounded-full ${r.variance < 0 ? (r.variance < -10 ? 'bg-red-500' : 'bg-amber-500') : 'bg-green-500'} animate-pulse`}></div>
                  <div className="hidden group-hover/node:block bg-slate-900 border border-slate-700 p-2 rounded text-[9px] shadow-2xl z-50">
                    <div className="font-bold text-white mb-1">{r.name}</div>
                    <div className="flex justify-between gap-4">
                      <span>Approval Rate:</span>
                      <span className="font-mono">{r.approval}%</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>Variance:</span>
                      <span className={`font-mono ${r.variance < 0 ? 'text-red-400' : 'text-green-400'}`}>{r.variance}%</span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="absolute inset-0 border border-blue-500/20 pointer-events-none group-hover:bg-blue-500/5 transition-colors"></div>
            </div>

            <div className="mt-4 p-4 bg-red-900/20 border border-red-900/50 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-700">
              <i className="fa-solid fa-circle-exclamation text-red-400 mt-1"></i>
              <div>
                <h4 className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-1">Anomaly Detected</h4>
                <p className="text-xs text-slate-200">
                  High Rejection Rate identified in **Flood Zone C** (Variance: <span className="text-red-400 font-bold">+12%</span> vs regional baseline).
                </p>
                <button className="mt-2 text-[10px] font-bold text-blue-400 hover:underline uppercase tracking-tighter">Initiate Bias Audit</button>
              </div>
            </div>
          </section>
        </div>

        {/* Right Panel: The Human Audit */}
        <div className="col-span-3 space-y-4">
          <section className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 h-full">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center justify-between">
              Human-in-the-Loop Metrics
              <i className="fa-solid fa-user-check text-green-500"></i>
            </h3>

            <div className="flex flex-col items-center mb-6">
              <div className="h-40 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={overrideData}
                      cx="50%"
                      cy="100%"
                      startAngle={180}
                      endAngle={0}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={0}
                      dataKey="value"
                    >
                      <Cell fill="#3b82f6" />
                      <Cell fill="#1e293b" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute bottom-0 left-0 w-full text-center">
                  <div className="text-2xl font-bold text-white">4.2%</div>
                  <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Planner Override Rate</div>
                  <div className="text-[9px] text-red-400 font-bold mt-1 uppercase">
                    <i className="fa-solid fa-arrow-trend-up mr-1"></i> Trending Up
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2">Recent Overrides</h4>
              {[
                { user: 'Sarah P.', action: 'Rejected Heritage finding', time: '10m ago' },
                { user: 'James W.', action: 'Modified GFA Extraction', time: '1h ago' },
                { user: 'Sarah P.', action: 'Overrode Height Breach alert', time: '3h ago' },
              ].map((over, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-slate-800/30 rounded border border-transparent hover:border-slate-700 transition-colors cursor-pointer">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-200">{over.user}</span>
                    <span className="text-[9px] text-slate-500">{over.action}</span>
                  </div>
                  <span className="text-[8px] font-mono text-slate-600">{over.time}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Bottom Strip: Traceability Genealogy */}
      <section className="bg-slate-900 border border-slate-800 rounded-lg p-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
          <i className="fa-solid fa-dna text-blue-500"></i>
          Active Decision Genealogy: SSD-2024-0892
        </h3>
        
        <div className="flex items-center justify-between relative px-10">
          {/* Progress Line */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-slate-800 -translate-y-1/2 z-0"></div>
          
          {GENEALOGY.map((step, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-1000 ${
                step.status === 'complete' ? 'bg-blue-900/40 border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]' :
                step.status === 'active' ? 'bg-amber-900/40 border-amber-500 text-amber-400 animate-pulse' :
                'bg-slate-900 border-slate-700 text-slate-700'
              }`}>
                <i className={`fa-solid text-xs ${
                  step.status === 'complete' ? 'fa-check' :
                  step.status === 'active' ? 'fa-spinner fa-spin' :
                  'fa-clock'
                }`}></i>
              </div>
              <div className="mt-3 text-center">
                <div className={`text-[10px] font-bold uppercase tracking-widest ${
                  step.status === 'pending' ? 'text-slate-600' : 'text-slate-300'
                }`}>{step.label}</div>
                <div className="text-[8px] font-mono text-slate-500 mt-1">{step.timestamp}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Narrative Legend */}
      <div className="mt-6 flex justify-between items-end">
        <div className="text-[10px] text-slate-600 italic max-w-xl leading-relaxed">
          "Buying AI is easy. Governing AI is the challenge. This dashboard provides the technical 'Drill-Down' necessary for NSW public service accountability. We bridge the gap between Vendor code and Policy intent."
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">System Version</span>
            <span className="text-xs font-mono text-blue-400">AIAF-LOGIC-v4.2.1-PROD</span>
          </div>
          <div className="flex flex-col items-end border-l border-slate-800 pl-4">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Technical Contact</span>
            <span className="text-xs font-medium text-slate-300">Owner's Engineer Hub</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhaseAssurance;
