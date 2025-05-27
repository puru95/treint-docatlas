import React, { useState, ReactNode } from 'react';

interface AccordionItemProps {
    title: string;
    children: ReactNode;
}

interface AccordionProps {
    items: AccordionItemProps[];
    defaultActiveIndex?: number | null;
    customBg?: string; // optional custom background class
}

const CustomAccordion: React.FC<AccordionProps> = ({ items, defaultActiveIndex = -1, customBg }) => {
    const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);

    const toggleIndex = (index: number) => {
        setActiveIndex(prev => (prev === index ? -1 : index));
    };

    return (
        <div className="flex flex-col gap-4 w-full ">
            {items.map((item, index) => (
                <div key={index} className='w-full border rounded-lg divide-y divide-gray-200'>
                    <div className={`flex focus:outline-none  ${activeIndex===index ? 'rounded-t-md' : 'rounded-md'}  ${customBg || 'bg-blue-100'} hover:bg-white hover:text-gray-700`}>
                        <button
                            className={`w-full text-left px-4 py-3 font-semibold text-sm`}
                            onClick={() => toggleIndex(index)}
                        >
                            {item.title}
                        </button>
                    </div>

                    {activeIndex === index && (
                        <div className="px-4 py-3 w-full bg-gray-800 rounded-b-md border-t border-gray-300">
                            {item.children}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CustomAccordion;
