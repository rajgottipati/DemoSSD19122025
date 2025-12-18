
export enum Phase {
  TRIAGE = 'triage',
  COMPLIANCE = 'compliance',
  SPATIAL = 'spatial',
  PRECEDENT = 'precedent',
  AUDIT = 'audit',
  BULLETIN = 'bulletin'
}

export interface DocumentStatus {
  id: string;
  name: string;
  type: string;
  status: 'validated' | 'flagged' | 'missing';
  confidence: number;
  issue?: string;
  sourcePage?: number;
  logicPath?: string[]; // New for transparency: steps AI took to validate
}

export interface ComplianceIssue {
  clause: string;
  requirement: string;
  extractedValue: string;
  source: string;
  status: 'compliant' | 'non-compliant' | 'warning';
  justification?: string;
  sourcePage?: number;
  logicVisualizerData?: {
    limit: number;
    actual: number;
    unit: string;
  };
}

export interface Precedent {
  id: string;
  title: string;
  year: number;
  relevance: number;
  conditionText: string;
}

export interface AuditLog {
  timestamp: string;
  action: string;
  user: string;
  aiSuggestion: string;
  outcome: 'accepted' | 'overridden' | 'modified';
  reason?: string;
}
