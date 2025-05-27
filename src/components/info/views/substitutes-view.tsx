import React, { useState } from 'react';

interface MedicalProcedureViewProps {
    // Define the props for the RadiologyView component here
    data: {
        substitutes: {
            substitutes: [{
                substitute_medicine: string,
                substitute_medicine_id: string,
                substitute_url: string,
                substitute_marketer_name: string
            }]
        }
    };
    handleClick: (val: any) => any;

}

const SubstitutesView: React.FC<MedicalProcedureViewProps> = ({ data, handleClick }) => {
    return (
        <div>
            {/* Render the content of the RadiologyView component here */}
            {/* {/* <div className="flex justify-between items-center gap-4"> */}
            <div className='text-sm font-semibold border-b-[1px] border-[#808080] pb-2 flex items-center justify-between'>
                <div>Name</div>
                <div>Marketer</div>
            </div>

            <div className='w-full'>
                {data?.substitutes?.substitutes?.map((d: any, index: number) => {
                    return (
                        <div className='w-full'>
                            <div key={index} className='text-xs font-normal mt-2 flex items-center justify-between'>
                                <p className='text-[#00A3FF] cursor-pointer' onClick={() => handleClick({ tab: 'MEDICINE', id: d?.substitute_medicine_id })}>{d?.substitute_medicine}</p>
                                <p className='mt-1 leading-5'>{d?.substitute_marketer_name}</p>
                            </div>
                            {index !== data?.substitutes?.substitutes?.length - 1 && <div className='border-dashed border-b-[1px] border-[#808080] mt-2'></div>}

                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default SubstitutesView;
