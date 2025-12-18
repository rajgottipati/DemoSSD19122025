
import React from 'react';
import { MOCK_AUDIT_LOGS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Accepted', value: 14, color: '#22c55e' },
  { name: 'Modified', value: 4, color: '#eab308' },
  { name: 'Overridden', value: 2, color: '#ef4444' }
];

const Phase5Audit: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Phase 5: Audit & Submission</h2>
        <p className="text-slate-500">Final transparency review of all AI-assisted actions before submission to Team Leader.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h4 className="text-sm font-bold text-slate-800 mb-6">Decision Audit Summary</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex justify-between text-xs font-medium text-slate-500">
            <span>AI Efficiency: 82%</span>
            <span>Human Oversight: 100% Verified</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 p-4 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <i className="fa-solid fa-circle-check text-green-500"></i>
              <span className="text-sm font-bold text-green-800">AIAF Compliance Level: Gold</span>
            </div>
            <p className="text-xs text-green-700 leading-relaxed">
              Every value in this assessment report has a direct PDF source link and a verifiable human handshake log.
            </p>
          </div>
          <div className="bg-slate-900 p-6 rounded-xl text-white">
            <h4 className="text-sm font-bold mb-4">Ready for Submission</h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-[10px]">1</div>
                <span className="text-xs text-slate-300 underline">Generate Draft Assessment Report.pdf</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-[10px]">2</div>
                <span className="text-xs text-slate-300 underline">Generate Transparency Log.csv</span>
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30">
              SUBMIT TO TEAM LEADER
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 font-bold text-slate-800 text-sm">
          Recent Transparency Handshakes
        </div>
        <div className="divide-y divide-slate-100">
          {MOCK_AUDIT_LOGS.map((log, idx) => (
            <div key={idx} className="p-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h5 className="font-bold text-slate-800 text-sm">{log.action}</h5>
                  <p className="text-[10px] text-slate-400 font-mono uppercase">{log.timestamp} • USER: {log.user}</p>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight ${
                  log.outcome === 'accepted' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {log.outcome}
                </span>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded p-3 mt-2">
                <div className="text-[11px] text-slate-500 mb-1">AI PROPOSAL:</div>
                <div className="text-sm text-slate-700 font-medium">{log.aiSuggestion}</div>
              </div>
              {log.reason && (
                <div className="mt-3 text-[11px] text-slate-600">
                  <span className="font-bold text-slate-400 uppercase mr-2">Reason:</span>
                  {log.reason}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Phase5Audit;
