import React, { useState } from 'react';

const SaltView = ({ data, handleClick }: any) => {
    return (
        <div className=' gap-4'>
            <div className='md:grid grid-cols-2 gap-5 justify-between  w-full'>
                <div className=" md:bg-[#2A292D] md:mt-5 h-fit rounded-[10px] p-5 md:max-h-[450px] md:md:overflow-scroll">
                    <p className='text-sm font-bold border-b-[1px] border-[#808080] pb-2'>Information about {data?.salt_name}</p>
                    {data?.salt_uses && <div className='text-xs mt-2'>
                        <p className='mb-2'>{data?.salt_name} Uses</p>
                        <p className='text-[#B3B3B3]'>{data?.salt_uses}</p>
                    </div>}
                    {data?.salt_how_it_works && <div className='text-xs mt-4'>
                        <p className='mb-2'>How {data?.salt_name} Works</p>
                        <p className='text-[#B3B3B3]'>{data?.salt_how_it_works}</p>
                    </div>}
                    {data?.salt_side_effects && <div className='text-xs mt-4'>
                        <p className='mb-2'>Common side effects of {data?.salt_name}</p>
                        <p className='text-[#B3B3B3]'>{data?.salt_side_effects}</p>
                    </div>}
                </div>
                {data?.available_medicine_brands?.length > 0 && <div className="h-fit  md:bg-[#2A292D] md:mt-5 rounded-[10px] p-5 md:max-h-[450px] md:overflow-auto scrollbar-hide">
                    <p className='text-sm font-bold border-b-[1px] border-[#808080] pb-2'>Available Medicine for {data?.salt_name}</p>

                    {data?.available_medicine_brands?.map((d: any, index: number) => {
                        return (<div key={index} className='text-xs mt-2'>
                            <p className='mb-2 text-[#00A3FF] underline cursor-pointer' onClick={() => handleClick({ tab: "MEDICINE", id: d?.brand_name, searchFromName: true }, 'MEDICINE_LIST')}>{d?.brand_name}</p>
                            <p className='text-[#B3B3B3]'>{d?.brand_manufacturer}</p>
                            {index !== data?.available_medicine_brands?.length - 1 && <div className='border-dashed border-b-[1px] border-[#808080] mt-2'></div>}
                        </div>)
                    })}
                </div>
                }

                {data?.expert_advice?.length > 0 && <div className="h-fit md:bg-[#2A292D] md:mt-5 rounded-[10px] p-5 md:max-h-[450px] md:overflow-scroll">
                    <p className='text-sm font-bold border-b-[1px] border-[#808080] pb-2'>Expert advice for {data?.salt_name}</p>
                    <ul className='mt-2' style={{ listStyleType: 'disc', paddingLeft: '15px' }}>
                        {data?.expert_advice?.map((d: any, index: number) => {
                            return (
                                <li key={index} className='text-xs text-[#B3B3B3] mb-2'>
                                    {d}
                                </li>
                            )
                        })}
                    </ul>
                </div>
                }
                {data?.faqs?.length > 0 && <div className="h-fit md:bg-[#2A292D] md:mt-5 rounded-[10px] p-5 md:max-h-[450px] md:overflow-scroll">
                    <p className='text-sm font-bold border-b-[1px] border-[#808080] pb-2'>Frequently asked questions for {data?.salt_name}</p>
                    {data?.faqs?.map((d: any, index: number) => {
                        return (
                            <div key={index} className='text-xs mt-2'>
                                <p className='mb-2'>{d?.question}</p>
                                <p className='text-[#B3B3B3]'>{d?.answer}</p>
                            </div>
                        )
                    })}

                </div>}
            </div>
        </div >
    );
};

export default SaltView;
