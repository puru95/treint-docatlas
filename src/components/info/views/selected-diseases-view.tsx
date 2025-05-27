import React, { useState } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';
import '../../../App.css';
import CustomAccordion from '../../common/accordion';
import { TreatmentEntry, selectedDis } from '../types/treatmentPlan';

interface items {
    id: number;
    details: selectedDis
}

interface items {
    id: number;
    details: selectedDis
}

export interface SelectedDiseasesViewProps {
    // Define the props for the RadiologyView component here
    selectedDisData: items[];
    isValueInField: (feild: 'symptoms' | 'lab_tests' | 'procedures' | 'medicines' | 'salts' | 'advice' | 'follow_up' ,val: string) => boolean;
    toggleFlatFieldValue: (field: 'symptoms' | 'lab_tests' | 'procedures' | 'medicines' | 'salts' | 'advice' | 'follow_up', value: string) => void;

}

const SelectedDiseasesView: React.FC<SelectedDiseasesViewProps> = ({ selectedDisData, isValueInField, toggleFlatFieldValue }) => {

    const handleTreatment = (disease_id: number, field: 'symptoms' | 'lab_tests' | 'procedures' | 'medicines' | 'salts' | 'advice' | 'follow_up', value: string) => {

        toggleFlatFieldValue(field, value);

    }

    return (
        <div className='flex w-full rounded-lg pr-2 py-4'>

            <CustomAccordion
                defaultActiveIndex={null}
                customBg="text-white w-full"
                items={selectedDisData.map((items: items, index: number) => (
                    {
                        title: items?.details?.dName,
                        children: <div className="flex flex-col gap-4 w-full max-h-80 overflow-auto">
                            <div className="flex flex-col gap-1">
                                <span className='text-sm font-semibold'>{items?.details?.dName}</span>
                                <span className='text-xs font-semibold'>Category: {items?.details?.category}</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className='text-sm font-semibold underline underline-offset-4'>Description</span>
                                <span className='text-xs font-semibold'>{items?.details?.description}</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className='text-sm font-semibold underline underline-offset-4'>Symptoms of {items?.details?.dName}</span>
                                <ul className='list-disc pl-4 text-sm'>
                                    {items?.details?.symptoms.split(',').map((item, index) => (
                                        <li key={index} className='capitalize tracking-wider'>{item.trim()}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className='text-sm font-semibold underline underline-offset-4'>Recommended Lab Tests</span>
                                <div className="flex flex-col gap-1">
                                    {items?.details?.lab_tests.split(',').map((item, index) => (
                                        <div key={index} className="flex gap-2">
                                            <input type="checkbox" checked={isValueInField('lab_tests', item.trim())} onChange={() => { handleTreatment(items?.id, 'lab_tests', item.trim()) }} />
                                            <span className="text-sm tracking-wider">{item.trim()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className='text-sm font-semibold underline underline-offset-4'>Recommended Procedures</span>
                                <div className="flex flex-col gap-1">
                                    {items?.details?.procedures.split(',').map((item, index) => (
                                        <div key={index} className="flex gap-2">
                                            <input type="checkbox" checked={isValueInField('procedures', item.trim())} onChange={() => { handleTreatment(items?.id, 'procedures', item.trim()) }} />
                                            <span className="text-sm tracking-wider">{item.trim()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className='text-sm font-semibold underline underline-offset-4'>Recommended Medicines</span>
                                <div className="flex flex-col gap-1">
                                    {items?.details?.medicines.split(',').map((item, index) => (
                                        <div key={index} className="flex gap-2">
                                            <input type="checkbox" checked={isValueInField('medicines', item.trim())} onChange={() => { handleTreatment(items?.id, 'medicines', item.trim()) }} />
                                            <span className="text-sm tracking-wider">{item.trim()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className='text-sm font-semibold underline underline-offset-4'>Recommended Salts</span>
                                <div className="flex flex-col gap-1">
                                    {items?.details?.salts.split(',').map((item, index) => (
                                        <div key={index} className="flex gap-2">
                                            <input type="checkbox" checked={isValueInField('salts', item.trim())} onChange={() => { handleTreatment(items?.id, 'salts', item.trim()) }} />
                                            <span className="text-sm tracking-wider">{item.trim()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className='text-sm font-semibold underline underline-offset-4'>Advice</span>
                                <div className="flex flex-col gap-1">
                                    {items?.details?.advice.split(',').map((item, index) => (
                                        <div key={index} className="flex gap-2">
                                            <input type="checkbox" checked={isValueInField('advice', item.trim())} onChange={() => { handleTreatment(items?.id, 'advice', item.trim()) }} />
                                            <span className="text-sm tracking-wider">{item.trim()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className='text-sm font-semibold underline underline-offset-4'>Follow UP</span>
                                <div className="flex flex-col gap-1">
                                    {items?.details?.follow_up.split(',').map((item, index) => (
                                        <div key={index} className="flex gap-2">
                                            <input type="checkbox" checked={isValueInField('follow_up', item.trim())} onChange={() => { handleTreatment(items?.id, 'follow_up', item.trim()) }} />
                                            <span className="text-sm tracking-wider">{item.trim()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>,
                    }

                ))}
            />




        </div>
    );
};

export default SelectedDiseasesView;
