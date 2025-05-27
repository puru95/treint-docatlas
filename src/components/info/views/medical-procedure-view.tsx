import React, { useState } from 'react';

interface MedicalProcedureViewProps {
    // Define the props for the RadiologyView component here
    data: {
        name: string;
        category: string;
        code: string;
        specialists?: { name: string }[];
        subTypes: {
            view: string;
            description: string;
            isChecked?: boolean
        }[];
        type: string;
        desc: string
    };
    setSelectedOptions: (val: any) => any;
    isOtpVerified?: boolean;
}

const MedicalProcedureView: React.FC<MedicalProcedureViewProps> = ({ data, setSelectedOptions, isOtpVerified }) => {

    const handleCheckboxChange = (view: string) => {
        const updatedSubTypes = data.subTypes.map((subType) =>
            subType.view === view
                ? { ...subType, isChecked: !subType.isChecked }
                : subType
        );
        setSelectedOptions((prevData: any) => ({
            ...prevData,
            subTypes: updatedSubTypes,
        }));
    };

    const specialists = data?.specialists?.map((d: any) => d).join(', ');
    return (
        <div>
            {/* Render the content of the RadiologyView component here */}
            <div className="flex justify-between items-center gap-4">
                <span className="text-base font-semibold">{data?.name}</span>
                <div className="bg-[#FFF5DA] text-[#684E0D] py-[6px] px-2 text-xs font-semibold rounded-md">
                    <span>{data?.category}</span>
                </div>
            </div>
            <div className="text-sm mt-1">
                Diagonostics code : {data?.code}
            </div>

            <div className="mt-5">
                <div className="mt-2 gap-5">
                    {data?.subTypes?.map((subType) => (
                        <div key={subType.view} className="flex items-center mb-3">
                            {'\u2022 '}
                            <label htmlFor={subType.view} className="ml-1 text-sm font-semibold">
                                {subType.view}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div className='mt-5 flex gap-5 divide-x-[1px] divide-[#808080]'>
                <div className=''>
                    <p className='text-sm font-medium'>Type</p>
                    <p className='mt-1 text-xs text-[#B3B3B3]'>{data?.type}</p>
                </div>
                {specialists && <div className=''>
                    <p className='text-sm font-medium ml-5'>Specialists</p>
                    <p className='mt-1 text-xs text-[#B3B3B3] ml-5'>{specialists}</p>
                </div>}
            </div>
            <div className='mt-5'>
                <p className='text-sm font-bold border-b-[1px] border-[#808080] pb-2'>Medical Procedures</p>
                <p className='mt-1 text-xs font-normal text-[#B3B3B3] leading-5'>{data?.desc}</p>
            </div>
        </div>
    );
};

export default MedicalProcedureView;
