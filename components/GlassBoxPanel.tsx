
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';

interface GlassBoxPanelProps {
  issue: any;
  onClose: () => void;
}

const GlassBoxPanel: React.FC<GlassBoxPanelProps> = ({ issue, onClose }) => {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const isDocument = 'confidence' in issue;
  const isCompliance = 'clause' in issue;
  const isPrecedent = 'relevance' in issue;

  const handleSummarize = async () => {
    setLoading(true);
    const longText = `Document: ${issue.name || issue.title}. Context: The proposed development at Western Sydney seeks a minor variation to the maximum height limit as prescribed under SEPP 2.7. While the limit is 18m, the hub's cooling towers require an additional 1.5m to achieve Net Zero operational standards. This environmental benefit outweighs the visual impact, which is mitigated by the 6m setback and rooftop greening...`;
    const result = await geminiService.summarizeJustification(longText);
    setSummary(result || '');
    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      <div className="h-16 border-b border-slate-200 flex items-center justify-between px-6 shrink-0 bg-slate-50">
        <div className="flex flex-col">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
            <i className="fa-solid fa-magnifying-glass-chart text-blue-600"></i>
            Evidentiary Transparency Log
          </h3>
          <span className="text-[10px] text-slate-400 font-mono tracking-tighter uppercase">Trace ID: {issue.id || 'SSD-GEN-01'}</span>
        </div>
        <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-slate-200 transition-colors flex items-center justify-center text-slate-400">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Evidentiary Viewport */}
        <div className="h-1/2 bg-slate-900 relative overflow-hidden flex items-center justify-center group">
          <img 
            src={`https://picsum.photos/seed/${issue.id || 'plan'}/1200/1600`} 
            alt="Source PDF" 
            className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay"></div>
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl border border-white/20 shadow-2xl flex flex-col items-center gap-1">
              <span className="text-[10px] font-bold text-white uppercase tracking-widest opacity-80">Primary Source Document</span>
              <span className="text-sm font-bold text-white">{issue.name || issue.title || 'SSD Determination'}</span>
              <span className="text-[10px] font-mono text-blue-300">Pg. {issue.sourcePage || 1} • Ref: {issue.source || 'EIS-TR-04'}</span>
            </div>
          </div>
          
          {/* Evidentiary Highlights */}
          <div className="absolute top-1/4 left-1/3 w-40 h-24 border-2 border-yellow-400 bg-yellow-400/10 shadow-[0_0_30px_rgba(250,204,21,0.3)] backdrop-blur-[2px]">
            <div className="absolute -top-6 left-0 bg-yellow-400 text-slate-900 text-[9px] font-bold px-2 py-0.5 rounded-t uppercase">Target Logic Area</div>
          </div>
        </div>

        {/* AI Glass Box Logic Section */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50">
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <i className="fa-solid fa-diagram-next"></i>
              System Logic Chain (Step-by-Step)
            </h4>
            <div className="space-y-2">
              {(issue.logicPath || ['Metadata Extraction', 'Contextual Analysis', 'Regulatory Cross-Check']).map((step: string, i: number) => (
                <div key={i} className="flex gap-3 animate-in slide-in-from-left duration-300" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full border-2 border-blue-500 bg-white flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    </div>
                    {i < 2 && <div className="w-0.5 h-full bg-blue-100 my-1"></div>}
                  </div>
                  <span className="text-xs text-slate-600 font-medium pb-4">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">AI Result</h4>
              {isDocument && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${issue.confidence > 0.8 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  Confidence: {(issue.confidence * 100).toFixed(1)}%
                </span>
              )}
            </div>
            
            <p className="text-sm text-slate-800 font-medium leading-relaxed">
              {isCompliance ? `Clause ${issue.clause}: ${issue.status.toUpperCase()} detected.` : 
               isPrecedent ? `Condition Match: ${issue.relevance}% relevance to project constraints.` :
               `Validation State: ${issue.status.toUpperCase()}. ${issue.issue || ''}`}
            </p>

            {!summary ? (
              <button 
                onClick={handleSummarize}
                disabled={loading}
                className="w-full bg-blue-600 text-white text-xs font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/10"
              >
                {loading ? <i className="fa-solid fa-spinner animate-spin"></i> : <i className="fa-solid fa-wand-magic-sparkles"></i>}
                {loading ? 'AI IS DECODING...' : 'SUMMARIZE EVIDENTIARY CONTEXT'}
              </button>
            ) : (
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-xs text-slate-700 leading-relaxed animate-in fade-in slide-in-from-bottom-2">
                <div className="font-bold text-blue-800 mb-2 flex items-center justify-between border-b border-blue-100 pb-2">
                  <span>Logic Breakdown</span>
                  <i className="fa-solid fa-brain"></i>
                </div>
                {summary}
              </div>
            )}
          </div>

          <div className="space-y-4 pb-8">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Human Decision Handshake</h4>
            <div className="grid grid-cols-2 gap-2">
              <button className="bg-white border border-slate-200 py-3 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50">REJECT AI LOGIC</button>
              <button className="bg-slate-900 text-white py-3 rounded-xl text-xs font-bold hover:bg-slate-800 shadow-lg">CONFIRM & VERIFY</button>
            </div>
            <p className="text-[10px] text-slate-400 text-center italic">
              Verification will be logged to the Department's AIAF transparency database.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlassBoxPanel;
