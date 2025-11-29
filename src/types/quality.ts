export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type IncidentType = 'injury_beneficiary' | 'injury_staff' | 'near_miss' | 'hazard' | 'property_damage';
export type AuditStatus = 'planned' | 'in_progress' | 'completed';
export type CAPAStatus = 'open' | 'in_progress' | 'verified' | 'closed';

export interface Risk {
    id: string;
    description: string;
    category: string; // e.g., 'Health & Safety', 'Operational', 'Financial'
    likelihood: number; // 1-5
    impact: number; // 1-5
    score: number; // Calculated
    level: RiskLevel;
    mitigationPlan: string;
    owner: string;
    lastReviewDate: string;
}

export interface Incident {
    id: string;
    type: IncidentType;
    date: string;
    time: string;
    location: string;
    description: string;
    reportedBy: string;
    involvedPersons: string; // Names
    immediateAction: string;
    status: 'open' | 'investigating' | 'closed';
}

export interface CorrectiveAction {
    id: string;
    auditId?: string; // Linked to an audit finding if applicable
    incidentId?: string; // Linked to an incident if applicable
    description: string;
    assignedTo: string;
    dueDate: string;
    status: CAPAStatus;
    rootCause?: string;
    actionTaken?: string;
    completionDate?: string;
}

export interface AuditFinding {
    id: string;
    auditId: string;
    area: string; // e.g., "Kitchen", "Clinic"
    criterion: string; // ISO 9001 Clause or Internal Standard
    isCompliant: boolean;
    evidence?: string;
    severity?: 'minor' | 'major' | 'observation';
}

export interface Audit {
    id: string;
    title: string;
    auditorName: string;
    date: string;
    scope: string;
    status: AuditStatus;
    findings: AuditFinding[];
}
