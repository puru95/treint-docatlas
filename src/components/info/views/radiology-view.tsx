import React, { useState } from 'react';

interface RadiologyViewProps {
    // Define the props for the RadiologyView component here
    data: {
        name: string;
        category: string;
        code: string;
        specialists?: { name: string }[];
        subTypes: {
            view: string;
            description: string;
            isChecked?: boolean;
        }[];
        staff: string[];
    };
    setSelectedOptions: (val: any) => any;
    isOtpVerified?: boolean;
}

const RadiologyView: React.FC<RadiologyViewProps> = ({ data, setSelectedOptions, isOtpVerified }) => {

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

    const specialists = data?.specialists?.map((d: any) => d)?.join(', ');
    return (
        <div>
            {/* Render the content of the RadiologyView component here */}
            <div className='border-b-[1px] border-[#4D4D4D]'>
                <div className="flex justify-between items-center gap-4">
                    <span className="text-base font-semibold">{data?.name}</span>
                    <div className="bg-[#FFF5DA] text-[#684E0D] py-[6px] px-2 text-xs font-semibold rounded-md">
                        <span>{data?.category}</span>
                    </div>
                </div>
                <div className="text-sm mt-1 mb-3">
                    Test Code : {data?.code}
                </div>
            </div>
            <div className="mt-5 border-b-[1px] border-[#4D4D4D]">
                <div className="mt-2 gap-5">
                    {data?.subTypes?.map((subType) => (
                        <div key={subType.view} className="flex items-start mb-3">
                            <div>
                                {'\u2022 '}
                            </div>
                            <label htmlFor={subType.view} className="text-sm font-semibold ml-1">
                                {subType.view}: <span className='text-[#B3B3B3] text-xs font-normal'>{subType?.description}</span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div className='mt-5 flex flex-wrap gap-5 '>
                <div className='border-r-[1px] border-[#4D4D4D] pr-5'>
                    <p className='text-sm font-medium'>Type</p>
                    <p className='mt-1 text-xs text-[#B3B3B3]'>{data?.category}</p>
                </div>
                <div className='border-r-[1px] border-[#4D4D4D] pr-5'>
                    <p className='text-sm font-medium '>Staff</p>
                    <p className='mt-1 text-xs text-[#B3B3B3]'>{data?.staff?.join(', ')}</p>
                </div>
                {specialists && <div className=''>
                    <p className='text-sm font-medium '>Specialists</p>
                    <p className='mt-1 text-xs text-[#B3B3B3]'>{specialists}</p>
                </div>}
            </div>
        </div>
    );
};

export default RadiologyView;
