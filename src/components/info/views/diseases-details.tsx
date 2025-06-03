import React from 'react';
import '../../../App.css';
import { selectedDis } from '../types/treatmentPlan';

type Dis = { id: number; details: selectedDis };

export interface DiseasesDetailsProps {
    data: any
}

const DiseasesDetails: React.FC<DiseasesDetailsProps> = ({ data }) => {
console.log({data})
    const handleData = [
        // {
        //     id: 'Discription',
        //     value: data?.description
        // },
        {
            id: 'Common Symptoms',
            value: data?.symptoms
        },
        {
            id: 'Recommended Lab Tests',
            value: data?.lab_tests
        },
        {
            id: 'Recommended Procedures',
            value: data?.procedures
        },
        {
            id: 'Recommended Medicines',
            value: data?.medicines
        },
        {
            id: 'Advice',
            value: data?.advice
        },
        {
            id: 'Follow up',
            value: data?.follow_up
        },
    ]

    return (
        <div className='flex flex-col gap-4 w-full rounded-md max-h-[62vh] overflow-auto p-4 border border-gray-500 bg-[#1F222E]'>
            
            <div className="flex justify-between">
                <div className="flex flex-col gap-0.5">
                    <span className='text-2xl font-semibold tracking-wide'>{data?.dName}</span>
                    <span className='text-sm font-semibold text-gray-300'>Discription: <span className='text-xs underline underline-offset-2 font-semibold'>{data?.description}</span> </span>
                    <span className='text-sm font-semibold text-gray-300'>Category: <span className='text-xs underline underline-offset-2 font-semibold'>{data?.category}</span> </span>
                    
                    {/* <span className='text-sm font-semibold text-gray-300'>Dosage: <span className='text-xs underline underline-offset-2 font-semibold'>{data?.typical_dosage}</span> </span> */}
                </div>
                <div className="flex rounded-md px-4 py-2 bg-yellow-200 h-fit text-sm font-semibold">
                    <span className='text-yellow-700'>Disease</span>
                </div>
            </div>

            {handleData.map((value: any, index: number) => (
                <div className="flex w-full">
                    {(value?.id === 'Common Symptoms' || value?.id === 'Recommended Lab Tests' || value?.id === 'Recommended Procedures' || value?.id === 'Recommended Medicines' || value?.id === 'Advice') ? <div className="flex flex-col w-full gap-1 divide-y divide-gray-400">
                        <span className='text-lg font-semibold '>{value?.id}</span>
                        <ul className='list-disc pl-4 text-sm pt-2 text-gray-300'>
                            {value?.value.split(',').filter((item: any) => item !== '').filter((item: any) => item !== "'").map((item: any, index: number) => (
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

export default DiseasesDetails;
