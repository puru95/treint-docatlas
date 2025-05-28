import React from 'react';
import { TreatmentEntry } from '../types/treatmentPlan';

export interface TreatmentPlanViewProps {
    // Define the props for the RadiologyView component here
    treatmentPlan: TreatmentEntry;
    symptoms?: { id: number; name: string }[];
}

const TreatmentPlanView: React.FC<TreatmentPlanViewProps> = ({ treatmentPlan, symptoms }) => {

    return (
        <div className='flex w-full rounded-lg pr-2 py-4'>

            <div className="flex flex-col gap-4 w-full overflow-auto">
                {symptoms && symptoms.length > 0 && <div className="flex flex-col gap-2">
                    <span className='text-sm font-semibold underline underline-offset-4'>Symptoms </span>
                    <ul className='list-disc pl-4 text-sm'>
                        {symptoms.map((item, index) => (
                            <li key={item.id} className='capitalize text-gray-300 tracking-wider'>{item.name}</li>
                        ))}
                    </ul>
                </div>}
                {treatmentPlan?.symptoms && treatmentPlan?.symptoms.length > 0 && <div className="flex flex-col gap-2">
                    <span className='text-sm font-semibold underline underline-offset-4'>Symptoms </span>
                    <ul className='list-disc pl-4 text-sm'>
                        {treatmentPlan?.symptoms.map((item, index) => (
                            <li key={index} className='capitalize text-gray-300 tracking-wider'>{item.trim()}</li>
                        ))}
                    </ul>
                </div>}
                {treatmentPlan?.lab_tests.length > 0 && <div className="flex flex-col gap-2">
                    <span className='text-sm font-semibold underline underline-offset-4'>Recommended Lab Tests</span>
                    <div className="flex flex-col gap-1">
                        <ul className='list-disc pl-4 text-sm'>
                            {treatmentPlan?.lab_tests.map((item, index) => (
                                <li key={index} className='capitalize text-gray-300 tracking-wider'>{item.trim()}</li>
                            ))}
                        </ul>
                    </div>
                </div>}
                {treatmentPlan?.procedures.length > 0 && <div className="flex flex-col gap-2">
                    <span className='text-sm font-semibold underline underline-offset-4'>Recommended Procedures</span>
                    <div className="flex flex-col gap-1">
                        <ul className='list-disc pl-4 text-sm'>
                            {treatmentPlan?.procedures.map((item, index) => (
                                <li key={index} className='capitalize text-gray-300 tracking-wider'>{item.trim()}</li>
                            ))}
                        </ul>
                    </div>
                </div>}
                {treatmentPlan?.medicines.length > 0 && <div className="flex flex-col gap-2">
                    <span className='text-sm font-semibold underline underline-offset-4'>Recommended Medicines</span>
                    <div className="flex flex-col gap-1">
                        <ul className='list-disc pl-4 text-sm'>
                            {treatmentPlan?.medicines.map((item, index) => (
                                <li key={index} className='capitalize text-gray-300 tracking-wider'>{item.trim()}</li>
                            ))}
                        </ul>
                    </div>
                </div>}
                {treatmentPlan?.salts.length > 0 && <div className="flex flex-col gap-2">
                    <span className='text-sm font-semibold underline underline-offset-4'>Recommended Salts</span>
                    <div className="flex flex-col gap-1">
                        <ul className='list-disc pl-4 text-sm'>
                            {treatmentPlan?.salts.map((item, index) => (
                                <li key={index} className='capitalize text-gray-300 tracking-wider'>{item.trim()}</li>
                            ))}
                        </ul>
                    </div>
                </div>}
               {treatmentPlan?.advice.length > 0 && <div className="flex flex-col gap-2">
                    <span className='text-sm font-semibold underline underline-offset-4'>Advice</span>
                    <div className="flex flex-col gap-1">
                        <ul className='list-disc pl-4 text-sm'>
                            {treatmentPlan?.advice.map((item, index) => (
                                <li key={index} className='capitalize text-gray-300 tracking-wider'>{item.trim()}</li>
                            ))}
                        </ul>
                    </div>
                </div>}
                {treatmentPlan?.follow_up.length > 0 && <div className="flex flex-col gap-2">
                    <span className='text-sm font-semibold underline underline-offset-4'>Follow UP</span>
                    <div className="flex flex-col gap-1">
                        <ul className='list-disc pl-4 text-sm'>
                            {treatmentPlan?.follow_up.map((item, index) => (
                                <li key={index} className='capitalize text-gray-300 tracking-wider'>{item.trim()}</li>
                            ))}
                        </ul>
                    </div>
                </div>}

            </div>




        </div>
    );
};

export default TreatmentPlanView;
