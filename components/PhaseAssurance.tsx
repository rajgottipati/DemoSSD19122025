
import React from 'react';
import { MOCK_AIAF_METRICS, MOCK_VENDOR_HEALTH } from '../constants';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const driftData = [
  { month: 'Jan', drift: 0.05, acc: 98 },
  { month: 'Feb', drift: 0.07, acc: 97 },
  { month: 'Mar', drift: 0.06, acc: 98 },
  { month: 'Apr', drift: 0.12, acc: 94 },
  { month: 'May', drift: 0.15, acc: 92 },
];

const PhaseAssurance: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">System Assurance: AIAF Governance</h2>
          <p className="text-slate-500">Owner's Engineer portal for technical validation of vendor SR00809.</p>
        </div>
        <div className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-mono">
          MODEL: {MOCK_VENDOR_HEALTH.modelName}
        </div>
      </div>

      {/* AIAF Scorecard */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {MOCK_AIAF_METRICS.map((metric, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{metric.category}</div>
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl font-bold ${metric.status === 'drift' ? 'text-amber-500' : 'text-slate-800'}`}>{metric.score}%</span>
              {metric.status === 'drift' && <i className="fa-solid fa-triangle-exclamation text-amber-500 text-xs"></i>}
            </div>
            <p className="text-[10px] text-slate-500 mt-2 leading-tight">{metric.description}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Model Drift Chart */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-sm font-bold text-slate-800">Model Performance & Policy Drift</h4>
            <div className="flex gap-4 text-[10px] font-bold uppercase">
              <span className="flex items-center gap-1 text-blue-500"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Accuracy</span>
              <span className="flex items-center gap-1 text-red-400"><div className="w-2 h-2 rounded-full bg-red-400"></div> Drift Index</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={driftData}>
                <defs>
                  <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                <Tooltip />
                <Area type="monotone" dataKey="acc" stroke="#3b82f6" fillOpacity={1} fill="url(#colorAcc)" strokeWidth={2} />
                <Line type="monotone" dataKey="drift" stroke="#f87171" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Vendor Handshake / Risk Panel */}
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold mb-4 flex items-center gap-2">
              <i className="fa-solid fa-handshake-angle text-blue-400"></i>
              Technical Validation Log
            </h4>
            <div className="space-y-4">
              <div className="border-l-2 border-blue-500 pl-4 py-1">
                <div className="text-[10px] text-slate-400 font-mono">10:42 AM • SR00809-V04</div>
                <div className="text-xs font-medium">Model verification passed for GFA extraction logic.</div>
              </div>
              <div className="border-l-2 border-amber-500 pl-4 py-1">
                <div className="text-[10px] text-slate-400 font-mono">09:15 AM • SR00809-V04</div>
                <div className="text-xs font-medium text-amber-400">Warning: Drift detected in SEPP (Hazards) mapping.</div>
              </div>
              <div className="border-l-2 border-blue-500 pl-4 py-1">
                <div className="text-[10px] text-slate-400 font-mono">YESTERDAY • SR00809-V03</div>
                <div className="text-xs font-medium">Latency baseline (1.2s) validated against Department SLA.</div>
              </div>
            </div>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-xs font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-500/20 mt-8">
            DOWNLOAD AIAF AUDIT REPORT (JSON)
          </button>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 flex items-start gap-6">
        <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-600 text-2xl shrink-0">
          <i className="fa-solid fa-user-gear"></i>
        </div>
        <div>
          <h3 className="text-lg font-bold text-blue-900 mb-2">The "Owner's Engineer" Advantage</h3>
          <p className="text-sm text-blue-800/80 leading-relaxed mb-4">
            Our Glass Box solution doesn't just help Planners—it empowers the Department to **audit the Vendor**. By mapping code-level inference directly to legislative policy, we provide the technical assurance layer required by the NSW AIAF. We act as the bridge between black-box vendor tech and public policy compliance.
          </p>
          <div className="flex gap-4">
            <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full uppercase tracking-tighter">Governance Ready</span>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full uppercase tracking-tighter">Vendor Independent</span>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full uppercase tracking-tighter">Audit Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhaseAssurance;
