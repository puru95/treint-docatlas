import React, { useState } from 'react';

const MedicineView = ({ data, handleClick }: any) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    const maxLength = 280; // You can adjust this value as needed

    const contentToShow = isExpanded
        ? data?.medicine?.product_introduction_content
        : `${data?.medicine?.product_introduction_content?.substring(0, maxLength)}${data?.medicine?.product_introduction_content?.length > maxLength ? '...' : ''}`;

    const usesOfMedicine = data?.medicine?.use_cases_content?.map((d: any) => d?.use_case_title).join(', ');
    const isMobile = window.innerWidth < 768;
    return (
        <div>
            {/* Render the content of the RadiologyView component here */}
            <div className="flex justify-between items-center gap-4 overflow-scroll">
                <span className="text-base font-semibold">{data?.medicine?.medicine_name}</span>
                <div className="bg-[#FFF5DA] text-[#684E0D] py-[6px] px-2 text-xs font-semibold rounded-md">
                    <span>Medicine</span>
                </div>
            </div>
            <div className="text-xs mt-1 font-normal " >
                Marketer :<span className='underline cursor-pointer' onClick={() => handleClick({ tab: "MEDICINE", id: data?.medicine?.marketer_name, searchFromName: true, isFromMarketer: true }, 'MEDICINE_LIST')}>{data?.medicine?.marketer_name}</span>
            </div>
            <div className='text-xs mt-1 font-normal '>
                Salt composition : <span className='underline cursor-pointer' onClick={() => { handleClick({ tab: 'SALT', id: data?.medicine?.salt_composition_id, searchFromId: true }) }}>{data?.medicine?.salt_composition_name}</span>
            </div>

            <div className='mt-5'>
                <p className='text-sm font-bold border-b-[1px] border-[#808080] pb-2'>{data?.medicine?.product_introduction_title}</p>
                <span className="mt-1 text-xs font-normal text-[#B3B3B3] leading-5">
                    {contentToShow}
                </span>
                {data?.medicine?.product_introduction_content?.length > maxLength && (
                    <button
                        onClick={toggleReadMore}
                        className="text-blue-500 text-xs mt-2"
                    >
                        {isExpanded ? 'Read Less' : 'Read More'}
                    </button>
                )}
            </div>
            {data?.medicine?.use_cases_content?.length > 0 && <div className='mt-5'>
                <p className='text-sm font-bold border-b-[1px] border-[#808080] pb-2'>{data?.medicine?.use_cases_title}</p>
                {data?.medicine?.use_cases_content?.map((uses: any, idx: number) => {
                    return (<div key={idx}>
                        <span
                            className={`text-xs inline ${uses.use_case_id ? "underline cursor-pointer" : ""}`}
                            onClick={() => uses.use_case_id && handleClick({ id: uses.use_case_id, tab: 'DISEASES' })}
                        >{uses.use_case_title}</span>
                        {idx < data?.medicine?.use_cases_content - 1 && ', '}
                    </div>)
                })}
            </div>
            }
            <div className='mt-5'>
                <p className='text-sm font-bold border-b-[1px] border-[#808080] pb-2'>{data?.medicine?.benefits_title}</p>
                {data?.medicine?.benefits_content?.map((d: any, index: number) => {
                    return (<div key={index}>
                        <p className='mt-1 text-xs font-normal leading-5'>{d?.show_less_title}</p>
                        <p className='mt-1 text-xs font-normal leading-5 text-[#B3B3B3]'>{d?.show_less_content}</p>
                    </div>)
                })}
            </div>
            <div className='mt-5'>
                <p className='text-sm font-bold border-b-[1px] border-[#808080] pb-2'>{data?.medicine?.side_effects_title}</p>
                <p className='mt-1 text-xs font-normal text-[#B3B3B3] leading-5'>{data?.medicine?.side_effects_short_description}</p>
                <ul className="list-disc list-inside mt-2">
                    {data?.medicine?.side_effects_content?.map((effect: any, index: number) => (
                        <li key={index} className="text-xs font-normal leading-5 text-[#B3B3B3]">{effect.side_effect}</li>
                    ))}
                </ul>
            </div>

            {data?.substitutes?.substitutes?.length > 0 && <div className='mt-5'>
                <div className='flex items-center justify-between border-b-[1px] border-[#808080] pb-2'>
                    <p className='text-sm font-bold '>All substitues</p>
                    {data?.substitutes?.substitutes?.length > 4 && <p className='text-xs font-normal text-[#00A3FF] cursor-pointer'
                        onClick={() => handleClick({ tab: 'SUBSTITUTES', id: data?.substitutes?.medicine_id }, 'SUBSTITUTES')}
                    >View all</p>}
                </div>
                <p className='mt-1 text-xs font-normal leading-5'>For informational purposes only. Consult a doctor before taking any medicines.</p>
                <p className='text-xs font-normal text-[#B3B3B3] mt-2'>{data?.medicine?.medicine_name}</p>
                <div className='flex'>
                    {data?.substitutes?.substitutes?.slice(0, isMobile ? 2 : 4)?.map((substitute: any, index: number) => {
                        return (
                            <div key={index} className='flex items-center cursor-pointer'>
                                <div className='mt-1 text-xs font-normal leading-5'>
                                    <div className='text-[#00A3FF]' onClick={() => handleClick({ tab: "MEDICINE", id: substitute?.substitute_medicine_id })}>
                                        {substitute.substitute_medicine}
                                    </div>
                                    <div className='text-[#B3B3B3] text-xs font-normal'>{substitute.substitute_marketer_name}</div>
                                </div>

                                {/* Vertical line */}
                                {index < (isMobile ? 1 : 3) && (
                                    <div className="h-8 w-[1px] bg-[#4D4D4D] mx-8"></div>
                                )}
                            </div>
                        )
                    })}

                </div>
            </div>}
            <div className='mt-5'>
                <p className='text-sm font-bold border-b-[1px] border-[#808080] pb-2'>{data?.medicine?.safety_advices_title}</p>
                <div>
                    {data?.medicine?.safety_advices_content.map((safetyAdvice: any, index: number) => {
                        return (
                            <div key={index} className='mt-1 text-xs font-normal leading-5'>
                                <p className='font-semibold'>{safetyAdvice.safety_advice_title}</p>
                                <p className='font-normal text-[#B3B3B3]'>{safetyAdvice.safety_advice_content}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='mt-5'>
                <p className='text-sm font-bold border-b-[1px] border-[#808080] pb-2'>{data?.medicine?.facts_box_title}</p>
                <div>
                    {data?.medicine?.facts_box_content?.map((fact: any, index: number) => {
                        return (
                            <div
                                key={index}
                                className="mt-1 text-xs font-normal leading-5 w-full md:max-w-[500px] bg-[#3D4153] rounded-[3px] table"
                            >
                                <div className="grid grid-cols-5 ">
                                    <span className=" col-span-5 md:col-span-2 py-1 px-5 ">
                                        {fact.fact_title}
                                    </span>
                                    <span className=" col-span-3 font-bold pb-1 md:p-1 px-5">
                                        {fact.fact_content}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {data?.medicine?.drug_interactions_partial_content?.length > 0 && <div className='mt-5'>
                <p className='text-sm font-bold border-b-[1px] border-[#808080] pb-2'>{data?.medicine?.drug_interactions_title}</p>
                <p className='text-xs font-normal my-4'>Taking {data?.medicine?.medicine_name} with any of the following medicines can modify the effect of either of them and cause some undesirable side effects</p>
                <div>
                    {data?.medicine?.drug_interactions_partial_content?.map((d: any, index: number) => {
                        return (<div key={index} className='text-xs mt-2'>
                            <p className='mb-2 text-[#00A3FF] cursor-pointer' onClick={() => handleClick({ tab: "SALT", id: d?.drug_name, searchFromId: false })}>{d?.drug_name}</p>
                            {/* <p className='text-[#B3B3B3]'>{d?.brand_manufacturer}</p> */}
                            {index !== data?.medicine?.drug_interactions_partial_content?.length - 1 && <div className='border-dashed border-b-[1px] border-[#808080] mt-2'></div>}
                        </div>)
                    })}
                    {data?.medicine?.drugs_interaction_id &&
                        <div className='text-sm font-semibold text-white bg-[#2D53EB] px-5 py-2 w-[178px] rounded-[5px] mt-4 cursor-pointer'
                            onClick={() => handleClick({ tab: 'INTERACTIONS', id: data?.medicine?.drugs_interaction_id }, 'INTERACTIONS')}
                        >
                            View all Interactions
                        </div>
                    }
                </div>
            </div>}

        </div >
    );
};

export default MedicineView;
