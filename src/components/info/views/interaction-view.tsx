import React, { useState } from 'react';

interface MedicalProcedureViewProps {
    // Define the props for the RadiologyView component here
    data: {
        section_content: [{
            interaction_title: string,
            interaction_content: string
        }]
    };

}

const InteractionView: React.FC<MedicalProcedureViewProps> = ({ data }) => {
    return (
        <div>
            {/* Render the content of the RadiologyView component here */}
            {/* {/* <div className="flex justify-between items-center gap-4"> */}
            <div className='border-b-[1px] border-[#808080] pb-2 flex items-center justify-between'>
                <div className="text-sm font-semibold ">Medical Interactions</div>
                <div className='text-xs text-[#00A3FF] font-medium'>Found {data?.section_content?.length} interactions</div>
            </div>

            <div>
                {data?.section_content?.map((d: any, index: number) => {
                    return (
                        <div key={index} className='mt-3'>
                            <p className='text-sm font-semibold'>{d?.interaction_title}</p>
                            <p className='mt-1 text-xs font-normal text-[#B3B3B3] leading-5'>{d?.interaction_content}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default InteractionView;
