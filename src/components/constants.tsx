import { ReactComponent as Radiology } from '../assets/radiology_image.svg';
import { ReactComponent as SaltShield } from '../assets/salt_image.svg';
import { ReactComponent as LabTest } from '../assets/labs_image.svg';
import { ReactComponent as Medicine } from '../assets/medicine-image.svg';
import { ReactComponent as MedicalProcedure } from '../assets/procedure_image.svg';
import { ReactComponent as Diseases } from '../assets/diseases_image.svg';

export const TABS = [
    {
        id: "SYMPTOMS",
        name: "Treatment Plan"
    },
    {
        id: "MEDICINE",
        name: "Medicines"
    },
    {
        id: 'SALT',
        name: 'Salts'
    },
    // {
    //     id: "LAB",
    //     name: "Lab Tests"
    // },
    // {
    //     id: "RADIOLOGY",
    //     name: "Radiology"
    // },
    // {
    //     id: "MEDICAL_PROCEDURE",
    //     name: "Procedures"
    // },
    {
        id: "DISEASES",
        name: "Diseases"
    },
];

export const URL_PREFFIX = "api/v1/";
export const AUTH_URL_PREFIX = "api/auth/v1/";
export const IS_MOBILE = window.innerWidth <= 768
export const MOBILE_VIEW_TABS = [
    {
        id: "MEDICINE",
        name: "Medicines",
        desc: "Your health on a click",
        icon: <Medicine />,
    },
    {
        id: "SALT",
        name: "Salts",
        desc: "Your health on a click",
        icon: <SaltShield />,
    },
    {
        id: "LAB",
        name: "Labs",
        desc: "Your health on a click",
        icon: <LabTest />,
    },
    {
        id: "RADIOLOGY",
        name: "Radiology",
        desc: "Your health on a click",
        icon: <Radiology />,
    },
    {
        id: "MEDICAL_PROCEDURE",
        name: "Procedures",
        desc: "Your health on a click",
        icon: <MedicalProcedure />,
    },
    {
        id: "DISEASES",
        name: "Diseases",
        desc: "Your health on a click",
        icon: <Diseases />,
    },

]

export const IMAGE_URL = {
    GET_URL: "prod-treint-media.s3.ap-south-1.amazonaws.com",
    UPDATE_URL: "prod-media.treint.com",
};

export const ROUTES = {
    HOME: '/home',
    INFO: '/info',
    SETTING: '/setting',
    LOGIN: '/login',
    GET_STARTED: '/getstarted',
    PROFILE: '/profile',
    SUBSCRIPTION: '/subscription',
    TERMS_OF_SERVICES: '/terms-of-service',
    PRIVACY_POLICY: '/privacy-policy',
    ENTERPRISE: '/enterprise',
    MY_PLAN: "/my-plan"
}

export const NUMBERS = {
    TEN: 10,
    TWENTY: 20
}

export const PROFILE_ROLES = [
    {
        id: "DOCTOR",
        name: "Doctor"
    },
    {
        id: "STUDENT",
        name: "Student"
    },
    {
        id: "NURSE",
        name: "Nurse"
    },
    {
        id: "OTHERS",
        name: "Other medical practitioner"
    },
]

export const YES_NO = [
    {
        id: 'YES',
        name: "Yes"
    },
    {
        id: 'NO',
        name: "No"
    }
]

export const DEFAULT_VIEW = [
    {
        id: 'MEDICINE',
        name: "Instant Drug Search - All Details",
        icon: <Medicine />,
        pointers: [
            {
                title: "Deep Dive into Drugs",
                desc: "Doses, Interactions and More, Instantly."
            },
            {
                title: "Search Medicines Fast",
                desc: "Get Doses, Side Effects and Interactions."
            },
            {
                title: "All-in-One Drug Info",
                desc: "Find Uses, Warnings and Alternatives."
            },
        ]
    },
    {
        id: 'SALT',
        name: "Quick Salt Info – Uses & Interactions",
        icon: <SaltShield />,
        pointers: [
            {
                title: "Explore Salts in Detail",
                desc: "Compositions, Effects and Interactions."
            },
            {
                title: "Quick Salt Search",
                desc: "Uncover Benefits, Risks and Alternatives."
            },
            {
                title: "Your Salt Database",
                desc: "Find Uses, Combinations and Contraindications."
            },
        ]
    },
    {
        id: 'LAB',
        name: "Lab Test Finder – Results Simplified",
        icon: <LabTest />,
        pointers: [
            {
                title: "Lab Tests Simplified",
                desc: "Understand Procedures, Results and Implications."
            },
            {
                title: "Pathology Insights",
                desc: "Access Test Details, Normal Ranges and Interpretations."
            },
            {
                title: "Your Lab Test Guide",
                desc: "From Preparation to Accurate Results, Instantly."
            },
        ]
    },
    {
        id: 'RADIOLOGY',
        name: "Radiology Insights – Scans Explained Fast",
        icon: <Radiology />,
        pointers: [
            {
                title: "Radiology Search",
                desc: "Procedures, Readings, Results Simplified."
            },
            {
                title: "Quick Radiology Insights",
                desc: "Techniques, Findings, Interpretations."
            },
            {
                title: "Your Radiology Hub",
                desc: "Instant Access to Tests and Analysis."
            },
        ]
    },
    {
        id: 'MEDICAL_PROCEDURE',
        name: "Procedure Guide – Steps & Safety",
        icon: <MedicalProcedure />,
        pointers: [
            {
                title: "Procedure Search",
                desc: "Steps, Prep and Aftercare Simplified."
            },
            {
                title: "Quick Procedure Guide",
                desc: "Techniques, Risks, Recovery Explained."
            },
            {
                title: "Your Procedure Hub",
                desc: "Find Steps, Safety and Best Practices."
            },
        ]
    },
    {
        id: 'DISEASES',
        name: "Disease Lookup – Symptoms to Treatments",
        icon: <Diseases />,
        pointers: [
            {
                title: "Disease Guide",
                desc: "Symptoms, Diagnosis and Treatment Plans Simplified."
            },
            {
                title: "Quick Disease Search",
                desc: "Get Causes, Symptoms and Care Options."
            },
            {
                title: "Your Treatment Hub",
                desc: "Find Diagnoses, Plans and Best Practices."
            },
        ]
    },
]

export const handelCycle = (cycle: string) => {
    switch (cycle) {
        case 'MONTHLY':
            return 'monthly';
        case 'QUARTERLY':
            return 'quarterly';
        case 'HALF_YEARLY':
            return 'half yearly';
        case 'YEARLY':
            return 'yearly';
        default:
            return '';
    }
}