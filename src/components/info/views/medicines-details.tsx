import React, { useState } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';
import '../../../App.css';
import CustomAccordion from '../../common/accordion';
import { MedicineDetails, TreatmentEntry, selectedDis } from '../types/treatmentPlan';


export interface MedicinesDetailsProps {

    data: MedicineDetails
}

const MedicinesDetails: React.FC<MedicinesDetailsProps> = ({ data }) => {

    const handleData = [
        // {
        //     id: 'Salt',
        //     value: data?.salt
        // },
        // {
        //     id: 'Category',
        //     value: data?.category
        // },
        {
            id: 'Uses',
            value: data?.uses
        },
        // {
        //     id: 'Dosage',
        //     value: data?.typical_dosage
        // },
        {
            id: 'Introduction',
            value: data?.introduction
        },
        {
            id: 'Benefits',
            value: data?.benefits
        },
        {
            id: 'Side Effects',
            value: data?.side_effects
        },
        {
            id: 'Substitutes',
            value: data?.substitutes
        }
    ]

    return (
        <div className='flex flex-col gap-4 w-full rounded-md p-4 border border-gray-500 bg-[#1F222E]'>
            
            <div className="flex justify-between">
                <div className="flex flex-col gap-0.5">
                    <span className='text-2xl font-semibold tracking-wide'>{data?.name}</span>
                    <span className='text-sm font-semibold text-gray-300'>Category: <span className='text-xs underline underline-offset-2 font-semibold'>{data?.category}</span> </span>
                    <span className='text-sm font-semibold text-gray-300'>Salt: <span className='text-xs underline underline-offset-2 font-semibold'>{data?.salt}</span> </span>
                    <span className='text-sm font-semibold text-gray-300'>Dosage: <span className='text-xs underline underline-offset-2 font-semibold'>{data?.typical_dosage}</span> </span>
                </div>
                <div className="flex rounded-md px-4 py-2 bg-red-200 h-fit text-sm font-semibold">
                    <span className='text-red-900'>Medicine</span>
                </div>
            </div>

            {handleData.map((value: any, index: number) => (
                <div className="flex w-full">
                    {(value?.id === 'Benefits' || value?.id === 'Side Effects') ? <div className="flex flex-col w-full gap-1 divide-y divide-gray-400">
                        <span className='text-lg font-semibold '>{value?.id}</span>
                        <ul className='list-disc pl-4 text-sm pt-2 text-gray-300'>
                            {value?.value.split('-').filter((item: any) => item !== '').map((item: any, index: number) => (
                                <li key={index} className='capitalize tracking-wider'>{item.trim()}</li>
                            ))}
                        </ul>
                    </div> : <div className='flex flex-col w-full gap-1 divide-y divide-gray-400'>
                        <span className='text-lg font-semibold'>{value?.id}</span>
                        <span className='text-sm pt-2 text-gray-300'>{value?.value}</span>
                    </div>}
                </div>
            ))}

        </div>
    );
};

export default MedicinesDetails;
