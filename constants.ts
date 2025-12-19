
import { DocumentStatus, ComplianceIssue, Precedent, AuditLog, AIAFMetric, VendorHealth, SystemRisk, GenealogyStep, BlockedAttempt } from './types';

export const PROJECT_NAME = "Western Sydney Green Tech Hub";
export const PROJECT_ID = "SSD-2024-0892";
export const USER_NAME = "Sarah Senior Planner";

export const MOCK_DOCUMENTS: DocumentStatus[] = [
  { 
    id: '1', 
    name: 'Environmental Impact Statement', 
    type: 'EIS', 
    status: 'validated', 
    confidence: 0.98,
    logicPath: ['PDF Hash Verified', 'Text Layer Extracted', 'Keywords: SSD, Green Tech, Resilience detected']
  },
  { 
    id: '2', 
    name: 'Bushfire Management Plan', 
    type: 'Safety', 
    status: 'flagged', 
    confidence: 0.95, 
    issue: 'Missing signature on page 42', 
    sourcePage: 42,
    logicPath: ['Signature Block Found', 'Image segmentation (CV model) result: empty', 'Policy: Section 4.1 requires wet-ink/digital signature']
  },
  { 
    id: '3', 
    name: 'Architectural Plans (Set A)', 
    type: 'Plans', 
    status: 'flagged', 
    confidence: 0.65, 
    issue: 'GFA figure obstructed by CAD layer', 
    sourcePage: 12,
    logicPath: ['Geometry detected', 'Text extraction conflict', 'Bounding box overlap > 40%']
  },
  { 
    id: '4', 
    name: 'Biodiversity Assessment', 
    type: 'Env', 
    status: 'validated', 
    confidence: 0.99,
    logicPath: ['Species list cross-referenced with BAM 2020', 'Coordinates mapped to GIS']
  },
  { 
    id: '5', 
    name: 'Heritage Impact Statement', 
    type: 'Heritage', 
    status: 'validated', 
    confidence: 0.97,
    logicPath: ['Historical search performed', 'Buffer zones verified']
  }
];

export const MOCK_COMPLIANCE: ComplianceIssue[] = [
  {
    clause: 'SEPP 2.7',
    requirement: 'Maximum height 18m',
    extractedValue: '19.5m',
    source: 'EIS Chapter 4, Para 2',
    status: 'non-compliant',
    sourcePage: 214,
    logicVisualizerData: { limit: 18, actual: 19.5, unit: 'm' }
  },
  {
    clause: 'SEPP 3.1',
    requirement: 'Minimum setbacks 5m',
    extractedValue: '6.2m',
    source: 'Site Plan Sheet S-04',
    status: 'compliant',
    sourcePage: 4,
    logicVisualizerData: { limit: 5, actual: 6.2, unit: 'm' }
  }
];

export const MOCK_PRECEDENTS: Precedent[] = [
  {
    id: 'SSD-10345',
    title: 'Kemps Creek Data Centre',
    year: 2022,
    relevance: 94,
    conditionText: 'The applicant must implement acoustic shielding ensuring noise levels do not exceed 45dB(A) at the residential boundary.'
  },
  {
    id: 'SSD-22109',
    title: 'Eastern Creek Logistics Park',
    year: 2023,
    relevance: 88,
    conditionText: 'Construction noise management must include real-time monitoring and weekly reporting to the Department.'
  }
];

export const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    timestamp: '2024-05-15 09:12',
    action: 'GFA Verification',
    user: 'Sarah',
    aiSuggestion: 'GFA: 12,400sqm (Low Confidence)',
    outcome: 'overridden',
    reason: 'Manual check of Sheet A-01 confirmed 12,450sqm'
  },
  {
    timestamp: '2024-05-15 10:45',
    action: 'SEPP Clause 2.7',
    user: 'Sarah',
    aiSuggestion: 'Flag for 1.5m height breach',
    outcome: 'accepted'
  }
];

export const MOCK_AIAF_METRICS: AIAFMetric[] = [
  { category: 'Transparency', score: 98, status: 'stable', description: 'Source attribution and citation accuracy.' },
  { category: 'Accountability', score: 100, status: 'stable', description: 'Human override logging and trail verification.' },
  { category: 'Fairness/Bias', score: 92, status: 'stable', description: 'Model impartialness across geographic regions.' },
  { category: 'Privacy', score: 99, status: 'stable', description: 'PII scrubbing performance in EIS ingestion.' },
  { category: 'Policy Accuracy', score: 88, status: 'drift', description: 'Alignment with 2024 SEPP amendments.' }
];

export const MOCK_VENDOR_HEALTH: VendorHealth = {
  modelName: 'Buy.NSW SR00809 (SSD-GPT-4v)',
  latency: '1.2s',
  lastTrained: '2024-11-01',
  driftIndex: 0.12,
  complianceScore: 94.5
};

export const ACTIVE_RISKS: SystemRisk[] = [
  { id: 'R-04', title: 'Model Drift in Heritage Detection', severity: 'high', trend: 'up' },
  { id: 'R-09', title: 'Regional Bias: Flood Zone C', severity: 'medium', trend: 'up' },
  { id: 'R-12', title: 'PII Leakage risk in CAD parsing', severity: 'low', trend: 'stable' }
];

export const MOCK_BLOCKED_ATTEMPTS: BlockedAttempt[] = [
  { id: 'BLK-01', type: 'Prompt Injection', target: 'Policy Engine', timestamp: '14:22:05', status: 'Blocked' },
  { id: 'BLK-02', type: 'Invisible Text', target: 'PDF Ingester', timestamp: '12:15:42', status: 'Quarantined' },
  { id: 'BLK-03', type: 'Malicious Macro', target: 'EIS Doc Parser', timestamp: '09:30:11', status: 'Blocked' }
];

export const GENEALOGY: GenealogyStep[] = [
  { label: 'Document Ingest', status: 'complete', timestamp: '09:00:05' },
  { label: 'OCR Extraction', status: 'complete', timestamp: '09:00:12' },
  { label: 'Rule Mapping', status: 'active', timestamp: '09:00:45' },
  { label: 'Final Recommendation', status: 'pending', timestamp: '-' }
];

export const REGION_BIAS_DATA = [
  { name: 'Sydney Metro', approval: 85, variance: 0 },
  { name: 'Western Sydney', approval: 82, variance: -3 },
  { name: 'Central Coast', approval: 78, variance: -7 },
  { name: 'Hunter Region', approval: 89, variance: 4 },
  { name: 'Flood Zone C', approval: 68, variance: -17 }
];
