import React, { useState } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';
import '../../../App.css';
import CustomAccordion from '../../common/accordion';
import { MedicineDetails, TreatmentEntry, selectedDis } from '../types/treatmentPlan';
import TreatmentPlanView from './treatment-plan-view';


export interface TreatmentPlanProps {

    data: any
}

const TreatmentPlan: React.FC<TreatmentPlanProps> = ({ data }) => {

    const [treatmentPlan, setTreatmentPlan] = useState<TreatmentEntry>({
        symptoms: [],
        lab_tests: [],
        procedures: [],
        medicines: [],
        salts: [],
        advice: [],
        follow_up: [],
    });

    const toggleFlatFieldValue = (field: 'symptoms' | 'lab_tests' | 'procedures' | 'medicines' | 'salts' | 'advice' | 'follow_up', value: string) => {
        setTreatmentPlan(prev => {
            const currentArray = prev[field];
            const updatedArray = currentArray.includes(value)
                ? currentArray.filter(item => item !== value) // remove if exists
                : [...currentArray, value]; // add if not exists

            return {
                ...prev,
                [field]: updatedArray,
            };
        });
    };

    const isValueInField = (field: keyof TreatmentEntry, value: string): boolean => {
        return treatmentPlan[field].includes(value);
    };

    const handleTreatment = (disease_id: number, field: 'symptoms' | 'lab_tests' | 'procedures' | 'medicines' | 'salts' | 'advice' | 'follow_up', value: string) => {

        toggleFlatFieldValue(field, value);

    }

    return (
        <div className="flex w-full border border-gray-400 p-2 divide-x divide-gray-500 rounded-md bg-[#1F222E]">
            <div className='flex flex-col gap-8 w-full rounded-md overflow-auto  '>

                {data.map((item: any, index: number) => (
                    <div className="flex flex-col gap-1 ">
                        <div className="flex text-sm font-semibold"> <span className='text-xl'> {item?.name} ({item?.match_percentage}%)</span> </div>
                        <div className="flex gap-1 text-xs font-semibold">Category: <span className='text-xs underline underline-offset-2 text-gray-200'>{item?.category}</span> </div>
                        <div className="flex flex-col gap-4">
                            <div className='flex flex-col w-full gap-1 mt-2 divide-y divide-gray-400'>
                                <span className='text-base font-semibold'>Description</span>
                                <span className='text-sm pt-2 text-gray-300'>{item?.description}</span>
                            </div>
                            {item?.key_symptoms.length > 0 && <div className="flex flex-col w-full gap-1 divide-y divide-gray-400">
                                <span className='text-base font-semibold '>Key Symptoms</span>
                                <div className="flex flex-col gap-1 pt-2 text-gray-300">
                                    {item?.key_symptoms.map((val: any, index: number) => (
                                        <div key={index} className="flex gap-2">
                                            <input type="checkbox" checked={isValueInField('symptoms', val.trim())} onChange={() => { handleTreatment(val, 'symptoms', val.trim()) }} />
                                            <span className="text-sm tracking-wider">{val.trim()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>}

                            {item?.recommended_lab_tests.length > 0 && <div className="flex flex-col w-full gap-1 divide-y divide-gray-400">
                                <span className='text-base font-semibold '>Recommended Lab Tests</span>
                                <div className="flex flex-col gap-1 pt-2 text-gray-300">
                                    {item?.recommended_lab_tests.map((val: any, index: number) => (
                                        <div key={index} className="flex gap-2">
                                            <input type="checkbox" checked={isValueInField('lab_tests', val.trim())} onChange={() => { handleTreatment(val, 'lab_tests', val.trim()) }} />
                                            <span className="text-sm tracking-wider">{val.trim()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>}

                            {item?.recommended_procedures.length > 0 && <div className="flex flex-col w-full gap-1 divide-y divide-gray-400">
                                <span className='text-base font-semibold '>Recommended Lab Tests</span>
                                <div className="flex flex-col gap-1 pt-2 text-gray-300">
                                    {item?.recommended_procedures.map((val: any, index: number) => (
                                        <div key={index} className="flex gap-2">
                                            <input type="checkbox" checked={isValueInField('procedures', val.trim())} onChange={() => { handleTreatment(val, 'procedures', val.trim()) }} />
                                            <span className="text-sm tracking-wider">{val.trim()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>}

                            {item?.recommended_medicines.length > 0 && <div className="flex flex-col w-full gap-1 divide-y divide-gray-400">
                                <span className='text-base font-semibold '>Recommended Medicines</span>
                                <div className="flex flex-col gap-1 pt-2 text-gray-300">
                                    {item?.recommended_medicines.map((val: any, index: number) => (
                                        <div key={index} className="flex gap-2">
                                            <input type="checkbox" checked={isValueInField('medicines', val.trim())} onChange={() => { handleTreatment(val, 'medicines', val.trim()) }} />
                                            <span className="text-sm tracking-wider">{val.trim()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>}

                            {item?.recommended_salts.length > 0 && <div className="flex flex-col w-full gap-1 divide-y divide-gray-400">
                                <span className='text-base font-semibold '>Recommended Salts</span>
                                <div className="flex flex-col gap-1 pt-2 text-gray-300">
                                    {item?.recommended_salts.map((val: any, index: number) => (
                                        <div key={index} className="flex gap-2">
                                            <input type="checkbox" checked={isValueInField('salts', val.trim())} onChange={() => { handleTreatment(val, 'salts', val.trim()) }} />
                                            <span className="text-sm tracking-wider">{val.trim()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>}

                            {item?.advice.length > 0 && <div className="flex flex-col w-full gap-1 divide-y divide-gray-400">
                                <span className='text-base font-semibold '>Advices</span>
                                <div className="flex flex-col gap-1 pt-2 text-gray-300">
                                    {item?.advice.map((val: any, index: number) => (
                                        <div key={index} className="flex gap-2">
                                            <input type="checkbox" checked={isValueInField('advice', val.trim())} onChange={() => { handleTreatment(val, 'advice', val.trim()) }} />
                                            <span className="text-sm tracking-wider">{val.trim()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>}

                            {item?.follow_up.length > 0 && <div className="flex flex-col w-full gap-1 divide-y divide-gray-400">
                                <span className='text-base font-semibold '>Follow up</span>
                                <div className="flex flex-col gap-1 pt-2 text-gray-300">
                                    {item?.follow_up.map((val: any, index: number) => (
                                        <div key={index} className="flex gap-2">
                                            <input type="checkbox" checked={isValueInField('follow_up', val.trim())} onChange={() => { handleTreatment(val, 'follow_up', val.trim()) }} />
                                            <span className="text-sm tracking-wider">{val.trim()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>}
                        </div>

                    </div>

                ))}



            </div>

            <div className="flex flex-col w-full px-2">
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        {/* <span className="text-xl font-semibold">Treatment Plan</span> */}
                        <span className="text-xl mt-1 font-semibold">Your final Treatment plan.</span>
                    </div>
                    
                </div>
                <TreatmentPlanView treatmentPlan={treatmentPlan} />
            </div>

        </div>

    );
};

export default TreatmentPlan;
