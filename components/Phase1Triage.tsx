
import React from 'react';
import { MOCK_DOCUMENTS } from '../constants';
import { DocumentStatus } from '../types';

interface Phase1TriageProps {
  onSelectIssue: (doc: DocumentStatus) => void;
}

const Phase1Triage: React.FC<Phase1TriageProps> = ({ onSelectIssue }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Phase 1: Intelligent Triage</h2>
        <p className="text-slate-500">Automated ingestion validation and data lineage mapping for application documents.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm group hover:border-blue-300 transition-colors cursor-help">
          <div className="text-slate-400 text-xs font-bold uppercase mb-1">Total Files</div>
          <div className="text-3xl font-bold text-slate-800">158</div>
          <div className="text-xs text-green-600 mt-2 font-medium">100% Processed</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm group hover:border-blue-300 transition-colors cursor-help">
          <div className="text-slate-400 text-xs font-bold uppercase mb-1">Data Confidence</div>
          <div className="text-3xl font-bold text-slate-800">92.4%</div>
          <div className="text-xs text-slate-500 mt-2 font-medium">Aggregate AI Score</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm group hover:border-red-300 transition-colors cursor-help">
          <div className="text-slate-400 text-xs font-bold uppercase mb-1">Attention Required</div>
          <div className="text-3xl font-bold text-red-600">2</div>
          <div className="text-xs text-slate-500 mt-2 font-medium">Critical validation flags</div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Document Name</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Type</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Confidence</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_DOCUMENTS.map((doc) => (
              <tr 
                key={doc.id} 
                className={`hover:bg-blue-50/50 transition-colors cursor-pointer ${doc.status === 'flagged' ? 'bg-red-50/30' : ''}`}
                onClick={() => onSelectIssue(doc)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <i className={`fa-solid ${doc.status === 'flagged' ? 'fa-file-circle-exclamation text-red-500' : 'fa-file-pdf text-slate-400'}`}></i>
                    <span className="text-sm font-medium text-slate-700">{doc.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">{doc.type}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-bold tracking-tight ${
                    doc.status === 'validated' 
                      ? 'bg-green-100 text-green-700' 
                      : doc.status === 'flagged' 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-slate-100 text-slate-500'
                  }`}>
                    {doc.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="inline-block w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${doc.confidence < 0.8 ? 'bg-red-500' : 'bg-green-500'}`}
                      style={{ width: `${doc.confidence * 100}%` }}
                    ></div>
                  </div>
                  <span className="block text-[10px] text-slate-400 mt-1 font-mono">{(doc.confidence * 100).toFixed(1)}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 text-center">
        <p className="text-xs text-slate-400">
          <i className="fa-solid fa-circle-info mr-1"></i>
          Select any document to view its transparency data lineage.
        </p>
      </div>
    </div>
  );
};

export default Phase1Triage;
