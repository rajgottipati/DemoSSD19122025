
import React from 'react';
import { MOCK_COMPLIANCE } from '../constants';
import { ComplianceIssue } from '../types';

interface Phase2ComplianceProps {
  onSelectIssue: (issue: ComplianceIssue) => void;
}

const Phase2Compliance: React.FC<Phase2ComplianceProps> = ({ onSelectIssue }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Phase 2: Automated Policy Alignment</h2>
        <p className="text-slate-500">Comparing application metrics against legislative SEPP requirements with direct evidence linkage.</p>
      </div>

      <div className="space-y-6">
        {MOCK_COMPLIANCE.map((item, idx) => (
          <div 
            key={idx}
            className={`bg-white rounded-xl border shadow-sm overflow-hidden transition-all hover:border-blue-300 group ${item.status === 'non-compliant' ? 'border-red-200' : 'border-slate-200'}`}
          >
            <div className={`px-6 py-4 flex items-center justify-between border-b ${item.status === 'non-compliant' ? 'bg-red-50/50 border-red-100' : 'bg-slate-50 border-slate-100'}`}>
              <div className="flex items-center gap-3">
                <span className="font-bold text-slate-800">{item.clause}</span>
                <span className="text-slate-500 text-sm">| {item.requirement}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                item.status === 'compliant' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {item.status.toUpperCase()}
              </span>
            </div>
            
            <div className="p-6 flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-slate-500">Requirement Limit</div>
                  <div className="text-sm font-bold text-slate-800">{item.logicVisualizerData?.limit}{item.logicVisualizerData?.unit}</div>
                </div>
                <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`absolute left-0 top-0 h-full rounded-full transition-all duration-1000 ${item.status === 'non-compliant' ? 'bg-red-500' : 'bg-green-500'}`}
                    style={{ width: `${(item.logicVisualizerData?.actual || 0) / (item.logicVisualizerData?.limit || 1) * 60}%` }}
                  ></div>
                  {/* Threshold marker */}
                  <div className="absolute left-[60%] top-0 h-full w-0.5 bg-slate-900 z-10"></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-slate-500">Extracted Value</div>
                  <div className={`text-sm font-bold ${item.status === 'non-compliant' ? 'text-red-600' : 'text-slate-800'}`}>
                    {item.extractedValue}
                  </div>
                </div>
              </div>

              <div className="w-full md:w-64 flex flex-col gap-3">
                <button 
                  onClick={() => onSelectIssue(item)}
                  className="w-full bg-slate-900 text-white text-xs font-bold py-3 rounded-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-sm group-hover:shadow-md"
                >
                  <i className="fa-solid fa-link"></i>
                  VIEW EVIDENCE LOGIC
                </button>
                <div className="text-[11px] text-slate-400 italic text-center">
                  Source: {item.source}
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 flex gap-4 animate-in fade-in duration-700">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shrink-0">
            <i className="fa-solid fa-wand-magic-sparkles"></i>
          </div>
          <div>
            <h4 className="text-sm font-bold text-blue-800 mb-1">AI Insight: Variation Detected</h4>
            <p className="text-sm text-blue-700 leading-relaxed">
              The applicant has submitted a **Clause 4.6 Variation Request**. The AI has summarized the justification arguments for the 1.5m height breach on page 214 of the EIS.
            </p>
            <button 
              onClick={() => onSelectIssue(MOCK_COMPLIANCE[0])}
              className="mt-3 text-sm font-bold text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
            >
              Read Summarized Justification <i className="fa-solid fa-arrow-right text-[10px]"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Phase2Compliance;
