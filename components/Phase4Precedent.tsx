
import React, { useState } from 'react';
import { MOCK_PRECEDENTS } from '../constants';
import { geminiService } from '../services/geminiService';

interface Phase4PrecedentProps {
  onSelectIssue: (precedent: any) => void;
}

const Phase4Precedent: React.FC<Phase4PrecedentProps> = ({ onSelectIssue }) => {
  const [searchQuery, setSearchQuery] = useState('Noise mitigation conditions for data centers in Western Sydney 2022-2024');
  const [suggestedDraft, setSuggestedDraft] = useState('');
  const [isDrafting, setIsDrafting] = useState(false);

  const handleDraft = async (precedentText: string) => {
    setIsDrafting(true);
    const suggestion = await geminiService.suggestCondition(precedentText, "Construction noise limit 50dB at 10m from boundary");
    setSuggestedDraft(suggestion || '');
    setIsDrafting(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Phase 4: Precedent Research & Drafting</h2>
        <p className="text-slate-500">Intelligent RAG search across past SSD determinations to find enforceable conditions of consent.</p>
      </div>

      <div className="mb-8">
        <div className="relative">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border-2 border-slate-200 rounded-xl px-12 py-4 text-slate-700 focus:border-blue-500 focus:outline-none transition-all shadow-sm"
          />
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-blue-700">
            SEARCH
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {MOCK_PRECEDENTS.map((p) => (
          <div key={p.id} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all group hover:border-blue-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{p.id}</span>
              <div className="flex items-center gap-1 text-green-600 font-bold text-xs">
                <i className="fa-solid fa-bullseye"></i>
                {p.relevance}% Match
              </div>
            </div>
            <h4 className="font-bold text-slate-800 mb-2">{p.title} ({p.year})</h4>
            <div className="bg-slate-50 p-3 rounded text-xs text-slate-600 italic leading-relaxed border-l-2 border-slate-300 mb-4 h-24 overflow-hidden relative">
              "{p.conditionText}"
              <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-slate-50 to-transparent"></div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => onSelectIssue({...p, source: p.id, sourcePage: 1})}
                className="flex-1 text-[10px] font-bold text-slate-500 border border-slate-200 py-2 rounded hover:bg-slate-50 transition-colors uppercase tracking-wider"
              >
                Inspect Original
              </button>
              <button 
                onClick={() => handleDraft(p.conditionText)}
                className="flex-1 text-[10px] font-bold text-white bg-blue-600 py-2 rounded hover:bg-blue-700 transition-colors uppercase tracking-wider shadow-sm"
              >
                Base Draft
              </button>
            </div>
          </div>
        ))}
      </div>

      {isDrafting && (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-slate-500 font-medium">AI is drafting personalized conditions...</p>
          </div>
        </div>
      )}

      {suggestedDraft && !isDrafting && (
        <div className="bg-white border-2 border-blue-100 rounded-xl overflow-hidden shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-blue-600 px-6 py-3 flex items-center justify-between text-white">
            <span className="text-xs font-bold uppercase tracking-widest">AI Drafted Condition</span>
            <div className="flex gap-2">
              <i className="fa-solid fa-sparkles"></i>
            </div>
          </div>
          <div className="p-8">
            <textarea 
              className="w-full h-48 bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm text-slate-700 font-serif leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
              value={suggestedDraft}
              onChange={(e) => setSuggestedDraft(e.target.value)}
            ></textarea>
            <div className="mt-6 flex gap-3 justify-end">
              <button 
                onClick={() => setSuggestedDraft('')}
                className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-700"
              >
                Discard
              </button>
              <button className="px-6 py-2 text-sm font-bold bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all">
                Add to Draft Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Phase4Precedent;
