// Social Services Domain Types

export interface CaseStudy {
    id: string;
    beneficiaryId: string;
    beneficiaryName: string;
    beneficiaryAge: number;
    medicalDiagnosis: string;
    interviewDate: string;
    interviewLocation: string;
    interviewDuration: string;
    interviewParties: string;
    interviewResults: string;
    housingType: string;
    homeOwnership: string;
    professionalStatus: string;
    reasonForNotWorking: string;
    familyIncomeDetails: string;
    socialResearchSummary: string;
    recommendations: string;
}

export interface SocialResearch {
    id: string;
    beneficiaryId: string;
    beneficiaryName: string;
    researchDate: string;
    researcherName: string;
    guardianName: string;
    guardianGender: string;
    guardianAge: string;
    guardianRelation: string;
    guardianEducation: string;
    guardianProfession: string;
    isFatherAlive: 'yes' | 'no' | 'unknown';
    isMotherAlive: 'yes' | 'no' | 'unknown';
    guardianMobile: string;
    familyComposition: string;
    disabilityCause: string;
    hasChronicIllness: 'yes' | 'no';
    chronicIllnessDetails: string;
    familyAdaptation: string;
    socialResearchSummary: string;
}

export interface FamilyCaseStudy {
    id: string;
    beneficiaryId: string;
    studyDate: string;
    socialWorkerName: string;
    familyStructure: string; // Details about parents, siblings
    economicStatus: string;
    housingCondition: string;
    familyRelationships: string;
    attitudeTowardsBeneficiary: string;
    challenges: string;
    recommendations: string;
}

export interface SocialActivityPlan {
    id: string;
    year: string;
    centerName: string;
    activityType: string;
    supervisor: string;
    generalGoal: string;
    detailedGoals: string;
    targetGroup: 'employees' | 'external' | 'both';
    isLinkedToCoreGoals: boolean;
    isLinkedToOperationalPlan: boolean;
    supportSource: 'budget' | 'extra' | 'none';
    cost: string;
    expectedOutputs: string;
    executionTimeStart: string;
    executionTimeEnd: string;
}

export interface SocialActivityDocumentation {
    id: string;
    activityName: string;
    date: string;
    type: string;
    supervisor: string;
    internalParticipants: { name: string; job: string; task: string }[];
    externalParticipants: { name: string; job: string; task: string }[];
    approvalHead: boolean;
    approvalSupervisor: boolean;
    approvalDirector: boolean;
}

export interface SocialActivityFollowUp {
    id: string;
    month: string;
    activityName: string;
    type: string;
    date: string;
    responsiblePerson: string;
    status: 'achieved' | 'not_achieved';
    notes: string;
}

export interface VisitLog {
    id: string;
    beneficiaryId: string;
    type: 'internal' | 'external' | 'phone' | 'behavioral' | 'emergency';
    date: string;
    time: string;
    visitorName?: string;
    relation?: string;
    notes: string;
    employeeName: string;
}

export type LeaveRequestStatus =
    | 'PENDING_SOCIAL'
    | 'PENDING_MEDICAL'
    | 'PENDING_DIRECTOR'
    | 'APPROVED'
    | 'REJECTED'
    | 'ACTIVE'
    | 'COMPLETED'
    | 'OVERDUE';

export interface LeaveRequestAction {
    actionBy: string; // User ID
    actionByName: string;
    role: 'social_worker' | 'doctor' | 'director' | 'admin';
    actionDate: string; // ISO Timestamp
    action: 'approve' | 'reject' | 'request' | 'cancel';
    notes?: string;
}

export interface LeaveRequest {
    id: string;
    beneficiaryId: string;
    beneficiaryName: string;
    requestDate: string;
    type: 'home_visit' | 'hospital' | 'picnic' | 'other';
    startDate: string;
    endDate: string;
    durationDays: number;
    guardianName: string;
    guardianPhone: string;
    reason: string;

    // Workflow State
    status: LeaveRequestStatus;

    // Audit Trail
    history: LeaveRequestAction[];

    // Medical Context (Snapshot at time of approval)
    medicalClearance?: {
        clearedBy: string;
        clearedAt: string;
        isFit: boolean;
        precautions?: string;
        medicationsToTake?: string[];
    };

    actualReturnDate?: string;
}
