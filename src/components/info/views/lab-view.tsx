import { useState } from "react";

export function LabView({ item, isReadMore }: { item: any, isReadMore: boolean }) {
    const abb = item?.abbreviation?.join(',');

    const [isExpanded, setIsExpanded] = useState(false);
    const toggleReadMore = () => setIsExpanded(!isExpanded);

    const maxLength = 280;
    const fullDescriptionToShow = (isExpanded || !isReadMore)
        ? item?.full_description
        : `${item?.full_description?.substring(0, maxLength)}${item?.full_description?.length > maxLength ? '...' : ''}`;

    return (
        <div className=" p-2">
            <div className="border-b-[1px] border-[#4D4D4D]">
                <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold max-w-[80%]">{item?.name}</span>
                    <div className="bg-[#FFD7D9] text-[#5E080C] py-[6px] px-2 text-xs font-semibold rounded-md">
                        <span>{item?.type_of_test}</span>
                    </div>
                </div>
                <div className="text-sm mt-1">
                    Test Code : {item?.code}
                </div>
                <div className="text-sm mt-1 mb-3">
                    Abbreviation : {item?.abbreviation?.length > 0 && abb}
                </div>
            </div>
            <div className="mt-3">
                <div className="mt-2 text-xs">
                    <span className="font-bold">Description: </span>
                    {/* <span className="text-[#B3B3B3]">{item?.full_description ? item?.full_description : '-'}</span> */}
                    <span className="text-[#B3B3B3]">{fullDescriptionToShow}</span>
                    {item?.full_description?.length > maxLength && isReadMore && (
                        <button onClick={toggleReadMore} className="text-blue-500 text-xs">
                            {isExpanded ? 'Read Less' : 'Read More'}
                        </button>
                    )}
                </div>
                {/* <p className="text-sm font-bold border-b-2 border-[#4D4D4D] pb-2">Description</p>
                <p className="text-xs text-[#B3B3B3] mt-2 leading-5">{item?.full_description}</p> */}
                <div className="mt-2 text-xs">
                    <span className="font-bold">How it is done: </span>
                    <span className="text-[#B3B3B3]">{item?.how_it_is_done ? item?.how_it_is_done : '-'}</span>
                </div>
                <div className="mt-2 text-xs ">
                    <span className="font-bold">Used for: </span>
                    <span className="text-[#B3B3B3]">{item?.used_for ? item?.used_for : '-'}</span>
                </div>
            </div>
            <div className="mt-5">
                <p className="text-sm font-bold border-b-[1px] border-[#4D4D4D] pb-2">Reference Values</p>
                {item?.reference_values && Object.keys(item?.reference_values).map((key: any, index: number) => (
                    <div key={index} className="mt-3 text-xs">
                        <span className="font-bold capitalize">{key} : </span>
                        <span className="text-[#B3B3B3]">{item?.reference_values[key]}</span>
                    </div>
                ))}
            </div>

            {/* The CBC measures the number of red blood cells (RBCs), white blood cells (WBCs), and platelets in the blood. It also provides information on hemoglobin and hematocrit levels, and various RBC indices such as mean corpuscular volume (MCV), mean corpuscular hemoglobin (MCH), and mean corpuscular hemoglobin concentration (MCHC). */}
        </div>
    )
}