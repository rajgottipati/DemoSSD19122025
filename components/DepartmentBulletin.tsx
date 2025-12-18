
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { USER_NAME, MOCK_AUDIT_LOGS } from '../constants';

const DepartmentBulletin: React.FC = () => {
  const [isDrafting, setIsDrafting] = useState(false);
  const [draftedEOI, setDraftedEOI] = useState('');

  const eoiText = `Expressions of Interest - Use of Artificial Intelligence in State Significant Development
Seeking two experienced planners for a full-time, 6-month secondment.
What you’ll be doing:
- Identifying and shaping use cases for AI in SSD planning.
- Working closely with the Departments chosen vendor on solution validation.
- Acting as a champion for new technology within Planning teams.
Upload your CV and a one-page statement by 14 January 2026.`;

  const handleDraftEOI = async () => {
    setIsDrafting(true);
    const auditHighlights = MOCK_AUDIT_LOGS.map(l => `${l.action}: ${l.outcome}`).join(', ');
    const userProfile = `${USER_NAME}, Senior Planner, Deep experience with SSD-2024-0892 and "Glass Box" methodology.`;
    
    const statement = await geminiService.draftSecondmentStatement(userProfile, auditHighlights);
    setDraftedEOI(statement || '');
    setIsDrafting(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Innovation Hub & Bulletin</h2>
          <p className="text-slate-500">Departmental communications and innovation opportunities.</p>
        </div>
        <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-xs font-bold border border-blue-200 animate-pulse">
          1 New Opportunity
        </div>
      </div>

      {/* Main EOI Board */}
      <div className="bg-white border-2 border-slate-200 rounded-2xl overflow-hidden shadow-xl">
        <div className="bg-slate-900 p-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-xl shadow-lg">
              <i className="fa-solid fa-user-tie"></i>
            </div>
            <div>
              <h3 className="text-xl font-bold">Expressions of Interest</h3>
              <p className="text-slate-400 text-sm">From the Office of the Executive Director | Posted Dec 12, 2025</p>
            </div>
          </div>
          <h4 className="text-lg font-medium text-blue-400 mb-6 underline underline-offset-4 decoration-blue-500/50">
            Use of Artificial Intelligence in State Significant Development
          </h4>
          <div className="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed space-y-4">
            <p>We are seeking two experienced planners for a full-time, 6-month secondment to support the use of Artificial Intelligence (AI) in State Significant Planning (SSD).</p>
            <div>
              <p className="font-bold text-white mb-2 underline">What you’ll be doing:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Identifying and shaping use cases for AI in SSD planning.</li>
                <li>Working closely with the Department's chosen vendor on solution validation and outputs.</li>
                <li>Acting as a champion for new technology within Planning teams.</li>
              </ul>
            </div>
            <p className="bg-slate-800 p-4 rounded-lg border border-slate-700 italic">
              "This is an exciting opportunity to be at the forefront of innovation across the Department."
            </p>
            <p className="text-xs text-slate-500 font-mono">DEADLINE: 14 January 2026 • REFERENCE: SR00809</p>
          </div>
        </div>

        <div className="p-8 bg-slate-50 border-t border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500 overflow-hidden">
                <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="avatar" />
              </div>
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white">
              +12
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button 
              onClick={handleDraftEOI}
              className="flex-1 md:flex-none bg-blue-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-wand-magic-sparkles"></i>
              AI-DRAFT MY STATEMENT
            </button>
          </div>
        </div>
      </div>

      {isDrafting && (
        <div className="bg-white border border-slate-200 p-12 rounded-2xl flex flex-col items-center gap-6 animate-pulse">
          <div className="w-16 h-1 bg-blue-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 animate-[loading_1.5s_ease-in-out_infinite]" style={{ width: '40%' }}></div>
          </div>
          <p className="text-slate-400 font-medium">Analysing your Audit History and Success Rate to draft a winning EOI...</p>
        </div>
      )}

      {draftedEOI && !isDrafting && (
        <div className="bg-white border border-blue-200 rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500">
          <div className="bg-blue-50 px-8 py-4 border-b border-blue-100 flex items-center justify-between">
            <h5 className="font-bold text-blue-800">Drafted Secondment Statement</h5>
            <div className="flex gap-2">
              <button className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1">
                <i className="fa-solid fa-copy"></i> Copy
              </button>
              <button className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1">
                <i className="fa-solid fa-print"></i> Print
              </button>
            </div>
          </div>
          <div className="p-10">
            <div className="prose prose-sm max-w-none text-slate-700 font-serif leading-relaxed whitespace-pre-wrap">
              {draftedEOI}
            </div>
            <div className="mt-10 pt-8 border-t border-slate-100 flex justify-end gap-3">
              <button className="px-6 py-2 rounded-lg text-sm font-bold text-slate-400 hover:text-slate-600">Discard</button>
              <button className="px-10 py-3 rounded-lg text-sm font-bold bg-slate-900 text-white shadow-xl hover:bg-slate-800">
                UPLOAD TO NSW PLANNING PORTAL
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 group hover:border-blue-300 transition-all cursor-pointer">
          <div className="flex items-center gap-3 mb-4">
            <i className="fa-solid fa-graduation-cap text-amber-500"></i>
            <h4 className="font-bold text-slate-800">Training: Explainable AI</h4>
          </div>
          <p className="text-xs text-slate-500 mb-4">Master the "Glass Box" methodology for legal reporting. Available on MyLearning.</p>
          <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
            <div className="h-full bg-amber-400" style={{ width: '65%' }}></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 group hover:border-blue-300 transition-all cursor-pointer">
          <div className="flex items-center gap-3 mb-4">
            <i className="fa-solid fa-flask text-purple-500"></i>
            <h4 className="font-bold text-slate-800">Beta Testing: VEO Video RAG</h4>
          </div>
          <p className="text-xs text-slate-500 mb-4">Review site drone footage with AI object detection. Join the cohort.</p>
          <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded">Beta Testing Open</span>
        </div>
      </div>
    </div>
  );
};

export default DepartmentBulletin;
