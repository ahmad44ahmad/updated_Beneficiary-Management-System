export interface VitalSigns {
    temperature: number;
    bloodPressureSystolic: number;
    bloodPressureDiastolic: number;
    pulse: number;
    respiratoryRate: number;
    oxygenSaturation: number;
    weight: number;
    height: number;
    bmi: number;
    measuredAt: string; // ISO Date
}

export interface MedicalHistory {
    chronicDiseases: string[];
    surgeries: string[];
    allergies: string[];
    familyHistory: string[];
    seizureHistory?: {
        hasSeizures: boolean;
        lastSeizureDate?: string;
        frequency?: string;
        medication?: string;
    };
}

export interface MedicalProfile {
    id: string;
    beneficiaryId: string;
    admissionDate: string;

    // Diagnosis
    primaryDiagnosis: 'CP' | 'Downs' | 'Autism' | 'IntellectualDisability' | 'Other';
    secondaryDiagnoses: string[];
    isEpileptic: boolean;

    // Current State
    latestVitals: VitalSigns;

    // History
    history: MedicalHistory;

    // Medications
    currentMedications: {
        name: string;
        dosage: string;
        frequency: string;
        startDate: string;
        endDate?: string;
    }[];

    // Infection Control
    infectionStatus: {
        suspectedInfection: boolean;
        isolationRecommended: boolean;
        isolationReason?: string;
        vaccinationStatus: 'UpToDate' | 'Overdue' | 'Incomplete' | 'Pending';
        lastVaccinationDate?: string;
    };
}

export interface MedicalInventoryItem {
    id: string;
    name: string;
    category: 'Consumable' | 'Equipment' | 'Medication';
    size?: string;
    isSterile: boolean;
    quantity: number;
    minimumStockLevel: number;
    expiryDate?: string;
    batchNumber?: string;
    location: string;
}

export interface VaccinationRecord {
    id: string;
    beneficiaryId: string;
    vaccineName: string;
    dueDate: string;
    status: 'Pending' | 'Completed' | 'Overdue';
}

export interface MedicalExamination {
    id: string;
    beneficiaryId: string;
    beneficiaryName: string;
    date: string;
    doctorName: string;
    diagnosis: string;
    vitalSigns: {
        bloodPressure: string;
        pulse: string;
        temperature: string;
        respiration: string;
    };
    physicalExamNotes: string;
    recommendations: string;
}
