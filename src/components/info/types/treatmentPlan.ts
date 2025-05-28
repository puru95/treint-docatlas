export interface selectedDis {
    id: number;
    disease_id: number;
    dName: string;
    disease_name: string;
    category: string;
    description: string;
    symptoms: string;
    advice: string;
    follow_up: string;
    medicines: string;
    salts: string;
    procedures: string;
    lab_tests: string;
}

export interface TreatmentEntry {
    symptoms: string[];
    lab_tests: string[];
    procedures: string[];
    medicines: string[];
    salts: string[];
    advice: string[];
    follow_up: string[];
}


export interface selectedDis {
    id: number;
    disease_id: number;
    dName: string;
    disease_name: string;
    category: string;
    description: string;
    symptoms: string;
    advice: string;
    follow_up: string;
    medicines: string;
    salts: string;
    procedures: string;
    lab_tests: string;
}

export interface MedicineDetails {
    id: number;
    name: string;
    salt: string;
    category: string;
    uses: string;
    typical_dosage: string;
    disease_id: number | null;
    introduction: string;
    salt_introduction: string;
    benefits: string;
    side_effects: string;
    substitutes: string;
}

export interface Medicine {
    id: number;
    name: string;
    details: MedicineDetails;
}
