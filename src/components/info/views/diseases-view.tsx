import React from 'react';

const DiseasesView = ({ data, handleClick }: any) => {

    const renderList = (items: any[], key: string) => (
        <ul className="list-none text-xs text-white w-[500px]">
            {items.map((item, i) => (
                typeof item === 'object' ? (
                    <li key={i} className="flex">
                        <span className="mr-2">{'\u2022'}</span>
                        {key === 'treatment' ? (
                            <>
                                {item.treatment_type && <span className="text-xs whitespace-nowrap">{item.treatment_type}:</span>}
                                {item.drugs && item.drugs.length > 0 ? (
                                    <span className="ml-2 text-xs">
                                        {item.drugs.map((drug: any, idx: number) => (
                                            <span key={idx}>
                                                <span
                                                    className={`text-xs inline ${drug.salt_composition_id ? "underline cursor-pointer" : ""}`}
                                                    onClick={() => drug.salt_composition_id && handleClick({ id: drug.salt_composition_id, tab: 'SALT', searchFromId: true })}
                                                >{drug.text}</span>
                                                {idx < item.drugs.length - 1 && ', '}
                                            </span>
                                        ))}
                                    </span>
                                ) : (
                                    <div className="ml-2 text-xs">No specific drugs</div>
                                )}
                            </>
                        ) : key === 'mimicking_conditions' ? (
                            <div className={`text-xs ${item?.condition_id ? "underline cursor-pointer" : ""}`}>{item.condition}</div>
                        ) : key === 'tests' && item.sub_tests ? (
                            <>
                                {item.text && <div className="text-xs whitespace-nowrap">{item.text}:</div>}
                                <div className="ml-3 inline text-xs text-white">
                                    {item.sub_tests.map((subTest: any, idx: number) => (
                                        // <p key={idx}>{subTest.text}</p>
                                        <span key={idx}>
                                            <span className="text-xs inline">{subTest.text}</span>
                                            {idx < item.sub_tests.length - 1 && ', '}
                                        </span>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="text-xs">{item.text}</div>
                        )}
                    </li>
                ) : (
                    <li key={i} className="text-xs flex items-start gap-2">
                        <span>{'\u2022'}</span> {/* Add gap-2 for space between bullet and item */}
                        <span>{item}</span>
                    </li>
                )
            ))}
        </ul>
    );

    function formatContent(input: string) {
        // Split the input string based on the pattern that starts with a digit followed by a period and space
        const parts = input?.split(/(\d+\.\s[^\n]+)/g);

        return parts?.map((part, index) => {
            if (/^\d+\.\s/.test(part)) {
                // This is a heading, so wrap it in a <h2> tag
                return `<h2 style="font-size: 12px; font-weight: bold; margin-top: 20px; color:white;">${part}</h2>`;
            } else {
                // This is a description, so wrap it in a <p> tag
                return `<p style="font-size: 12px; margin-bottom: 10px; color:#B3B3B3;">${part.trim()}</p>`;
            }
        }).join('');
    }

    return (
        <div>
            <div className="flex justify-between items-center gap-4">
                <span className="text-base font-semibold">{data?.disease_name}</span>
                <div className="bg-[#FFF5DA] text-[#684E0D] py-[6px] px-2 text-xs font-semibold rounded-md">
                    <span>Disease</span>
                </div>
            </div>

            <div className="text-sm font-bold mt-1 py-2 border-b-[1px] border-[#4D4D4D]">
                Overview
            </div>
            <p className='text-xs text-[#B3B3B3] mt-2'>
                {data?.overview}
            </p>

            <div className="text-sm font-bold mt-1 py-2 border-b-[1px] border-[#4D4D4D]">
                Key Facts
            </div>
            <div>
                {Object.entries(data?.key_facts || {}).map(([factKey, factValue], index) => {
                    return (
                        <div key={index} className="flex flex-col gap-3">
                            {factValue ?
                                <> <div className="flex gap-6 mt-4">
                                    <span className="capitalize text-xs w-[200px] text-[#00A3FF]">
                                        {factKey.replace(/_/g, ' ')}
                                    </span>
                                    {Array.isArray(factValue) ? (
                                        renderList(factValue, factKey)
                                    ) : (
                                        <span className="text-xs">{factValue as string}</span>
                                    )}
                                </div>
                                    <div className='border-dashed border-b-[1px] border-[#808080] mt-1'></div>
                                </>
                                : null}
                        </div>
                    )
                })}

            </div>

            {data?.symptoms &&
                <><div className="text-sm font-bold mt-1 py-2 border-b-[1px] border-[#4D4D4D]">
                    Symptoms Of {data?.disease_name}
                </div>
                    <div
                        className=" mt-2"
                        dangerouslySetInnerHTML={{
                            __html: formatContent(data?.symptoms), // Assuming `data?.symptoms` contains the HTML string you provided
                        }}
                    />
                </>
            }
            {data?.causes &&
                <><div className="text-sm font-bold mt-1 py-2 border-b-[1px] border-[#4D4D4D]">
                    Causes Of {data?.disease_name}
                </div>
                    <div
                        className=" mt-2"
                        dangerouslySetInnerHTML={{
                            __html: formatContent(data?.causes), // Assuming `data?.symptoms` contains the HTML string you provided
                        }}
                    />
                </>}

            {data?.alternative_therapies && <>  <div className="text-sm font-bold mt-1 py-2 border-b-[1px] border-[#4D4D4D]">
                Alternative Therapies Of {data?.disease_name}
            </div>
                <div
                    className=" mt-2"
                    dangerouslySetInnerHTML={{
                        __html: formatContent(data?.alternative_therapies), // Assuming `data?.symptoms` contains the HTML string you provided
                    }}
                />
            </>}
            {data?.complications && <> <div className="text-sm font-bold mt-1 py-2 border-b-[1px] border-[#4D4D4D]">
                Complications Of {data?.disease_name}
            </div>
                <div
                    className=" mt-2"
                    dangerouslySetInnerHTML={{
                        __html: formatContent(data?.complications), // Assuming `data?.symptoms` contains the HTML string you provided
                    }}
                />
            </>}

            {data?.diagnosis && <><div className="text-sm font-bold mt-1 py-2 border-b-[1px] border-[#4D4D4D]">
                Diagnosis Of {data?.disease_name}
            </div>
                <div
                    className="mt-2"
                    dangerouslySetInnerHTML={{
                        __html: formatContent(data?.diagnosis), // Assuming `data?.symptoms` contains the HTML string you provided
                    }}
                />
            </>}
            {data?.prevention &&
                <><div className="text-sm font-bold mt-1 py-2 border-b-[1px] border-[#4D4D4D]">
                    Prevention Of {data?.disease_name}
                </div>
                    <div
                        className="mt-2"
                        dangerouslySetInnerHTML={{
                            __html: formatContent(data?.prevention), // Assuming `data?.symptoms` contains the HTML string you provided
                        }}
                    />
                </>}

            {data?.risk_factors_modifiable &&
                <>
                    <div className="text-sm font-bold mt-1 py-2 border-b-[1px] border-[#4D4D4D]">
                        Risk Factors Of {data?.disease_name}
                    </div>

                    <div
                        className="mt-2"
                        dangerouslySetInnerHTML={{
                            __html: formatContent(data?.risk_factors_modifiable), // Assuming `data?.symptoms` contains the HTML string you provided
                        }}
                    />
                </>}

            {data?.treatment_details &&
                <>
                    <div className="text-sm font-bold mt-1 py-2 border-b-[1px] border-[#4D4D4D]">
                        Treatment Details Of {data?.disease_name}
                    </div>

                    <div
                        className="mt-2"
                        dangerouslySetInnerHTML={{
                            __html: formatContent(data?.treatment_details), // Assuming `data?.symptoms` contains the HTML string you provided
                        }}
                    />
                </>}
            {data?.frequently_asked_questions && data?.frequently_asked_questions?.length > 0 &&
                <>
                    <div className="text-sm font-bold mt-1 py-2 border-b-[1px] border-[#4D4D4D]">
                        FAQs Of {data?.disease_name}
                    </div>
                    <div className="  rounded-[10px]">
                        {/* <p className='text-sm font-bold border-b-[1px] border-[#808080] pb-2'>Frequently asked questions for {data?.salt_name}</p> */}
                        {data?.frequently_asked_questions?.map((d: any, index: number) => {
                            return (
                                <div key={index} className='text-xs mt-2'>
                                    <p className='mb-2 font-bold'>{d?.faq_question}</p>
                                    <p className='text-[#B3B3B3]'>{d?.faq_answer}</p>
                                </div>
                            )
                        })}

                    </div>
                </>}
        </div>
    );
};

export default DiseasesView;
