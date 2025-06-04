import React, { useEffect, useState } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';
import '../../../App.css';
import CustomAccordion from '../../common/accordion';
import { MedicineDetails, TreatmentEntry, selectedDis } from '../types/treatmentPlan';
import TreatmentPlanView from './treatment-plan-view';
import { Dialog } from 'primereact/dialog';


export interface TreatmentPlanProps {

    data: any;
    symptoms?: { id: number; name: string }[];
    handleExport: (val: string) => void;
}

const TreatmentPlan: React.FC<TreatmentPlanProps> = ({ data, symptoms, handleExport }) => {

    const updatedData = data.map((item: any) => ({
        ...item,
        isChecked: false,
    }));

    const [planData, setPlanData] = useState(updatedData);

    const [visible, setVisible] = useState(false);

    const [treatmentPlan, setTreatmentPlan] = useState<TreatmentEntry>({
        symptoms: [],
        lab_tests: [],
        procedures: [],
        medicines: [],
        salts: [],
        advice: [],
        follow_up: [],
    });

    const handleCheckboxChange = (name: string) => {
        const newData = planData.map((item: any) =>
            item.name === name ? { ...item, isChecked: !item.isChecked } : item
        );
        setPlanData(newData);
    };

    const toggleFlatFieldValue = (field: 'symptoms' | 'lab_tests' | 'procedures' | 'medicines' | 'salts' | 'advice' | 'follow_up', value: string) => {
        setTreatmentPlan(prev => {
            const currentArray = prev[field];
            const updatedArray = currentArray.includes(value)
                ? currentArray.filter(item => item !== value) // remove if exists
                : [...currentArray, value]; // add if not exists

            return {
                ...prev,
                [field]: updatedArray,
            };
        });
    };

    const isValueInField = (field: keyof TreatmentEntry, value: string): boolean => {
        return treatmentPlan[field].includes(value);
    };

    const handleTreatment = (disease_id: number, field: 'symptoms' | 'lab_tests' | 'procedures' | 'medicines' | 'salts' | 'advice' | 'follow_up', value: string) => {
        toggleFlatFieldValue(field, value);
    }

    const hasAnyValue = Object.values(treatmentPlan).some(
        (field) => Array.isArray(field) && field.length > 0
    );

    useEffect(() => {

        if (planData.filter((item: any) => item.isChecked == true).length == 0) {
            setTreatmentPlan({
                symptoms: [],
                lab_tests: [],
                procedures: [],
                medicines: [],
                salts: [],
                advice: [],
                follow_up: [],
            });
        }

    }, [planData])

    return (
        <div className="flex flex-col w-full border border-gray-400 p-2 rounded-md bg-[#1F222E]">

            {/* <div className="flex justify-between">
                <span className="text-xl font-semibold mb-4 underline underline-offset-4">Treatment Plan</span>
                <button type="button" className="text-sm font-semibold rounded-md px-4 h-8 border border-green-800 bg-green-600" onClick={() => { handleExport('Treatment Plan data has been exported') }}>Export</button>
            </div> */}

            <div className="flex w-full divide-x divide-gray-500">
                <div className="flex flex-col w-full p-4 ">
                    <div className={`flex gap-2 w-full `}>
                        <div className="flex flex-col w-full">
                            <span className="text-base font-semibold">Top Diseases</span>
                            <span className="text-xs mt-1 font-semibold text-gray-300">Please select the diseases for further process.</span>
                        </div>
                    </div>

                    <div className="flex flex-col mt-4 px-2 gap-4 max-h-[50vh] overflow-auto">
                        {planData.map((items: any, index: number) => (
                            <div key={index} className="flex flex-col gap-0">
                                <div className="flex gap-2">
                                    <input type="checkbox" checked={items?.isChecked} id={items?.name} onChange={() => { handleCheckboxChange(items?.name) }} />
                                    <span className="text-base">{items?.name} <span className="text font-semibold"> {items?.match_percentage} </span> </span>
                                </div>
                                <div className="flex pl-6">
                                    <span className="text-xs tracking-wide">{items?.description}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                {planData.filter((item: any) => item.isChecked == true).length > 0 && <div className='flex flex-col gap-6 w-full p-4 max-h-[50vh] overflow-auto  '>
                    <div className="flex flex-col">
                        <span className="text-base font-semibold">Selected Diseases</span>
                        <span className="text-xs mt-1 font-semibold text-gray-300">Please select the treatment from the selected disease data.</span>
                    </div>
                    <div className='flex w-full rounded-lg pr-2'>
                        <CustomAccordion
                            defaultActiveIndex={null}
                            customBg="text-white w-full"
                            items={planData.filter((item: any) => item.isChecked == true).map((item: any, index: number) => (
                                {
                                    title: item?.name,
                                    children: <div className="flex flex-col gap-1 ">
                                        <div className="flex text-sm font-semibold"> <span className='text-xl'> {item?.name} ({item?.match_percentage}%)</span> </div>
                                        <div className="flex gap-1 text-xs font-semibold">Category: <span className='text-xs underline underline-offset-2 text-gray-200'>{item?.category}</span> </div>
                                        <div className="flex flex-col gap-4">
                                            <div className='flex flex-col w-full gap-1 mt-2 divide-y divide-gray-400'>
                                                <span className='text-base font-semibold'>Description</span>
                                                <span className='text-sm pt-2 text-gray-300'>{item?.description}</span>
                                            </div>
                                            {item?.key_symptoms.length > 0 && <div className="flex flex-col w-full gap-1 divide-y divide-gray-400">
                                                <span className='text-base font-semibold '>Key Symptoms</span>
                                                <div className="flex flex-col gap-1 pt-2 text-gray-300">
                                                    {item?.key_symptoms.map((val: any, index: number) => (
                                                        <div key={index} className="flex gap-2">
                                                            {/* <input type="checkbox" checked={isValueInField('symptoms', val.trim())} onChange={() => { handleTreatment(val, 'symptoms', val.trim()) }} /> */}
                                                            <span className="text-sm tracking-wider">{val.trim()}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>}

                                            {item?.recommended_lab_tests.length > 0 && <div className="flex flex-col w-full gap-1 divide-y divide-gray-400">
                                                <span className='text-base font-semibold '>Recommended Lab Tests</span>
                                                <div className="flex flex-col gap-1 pt-2 text-gray-300">
                                                    {item?.recommended_lab_tests.map((val: any, index: number) => (
                                                        <div key={index} className="flex gap-2">
                                                            <input type="checkbox" checked={isValueInField('lab_tests', val.trim())} onChange={() => { handleTreatment(val, 'lab_tests', val.trim()) }} />
                                                            <span className="text-sm tracking-wider">{val.trim()}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>}

                                            {item?.recommended_procedures.length > 0 && <div className="flex flex-col w-full gap-1 divide-y divide-gray-400">
                                                <span className='text-base font-semibold '>Recommended Lab Tests</span>
                                                <div className="flex flex-col gap-1 pt-2 text-gray-300">
                                                    {item?.recommended_procedures.map((val: any, index: number) => (
                                                        <div key={index} className="flex gap-2">
                                                            <input type="checkbox" checked={isValueInField('procedures', val.trim())} onChange={() => { handleTreatment(val, 'procedures', val.trim()) }} />
                                                            <span className="text-sm tracking-wider">{val.trim()}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>}

                                            {item?.recommended_medicines.length > 0 && <div className="flex flex-col w-full gap-1 divide-y divide-gray-400">
                                                <span className='text-base font-semibold '>Recommended Medicines</span>
                                                <div className="flex flex-col gap-1 pt-2 text-gray-300">
                                                    {item?.recommended_medicines.map((val: any, index: number) => (
                                                        <div key={index} className="flex gap-2">
                                                            <input type="checkbox" checked={isValueInField('medicines', val.trim())} onChange={() => { handleTreatment(val, 'medicines', val.trim()) }} />
                                                            <span className="text-sm tracking-wider">{val.trim()}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>}

                                            {item?.recommended_salts.length > 0 && <div className="flex flex-col w-full gap-1 divide-y divide-gray-400">
                                                <span className='text-base font-semibold '>Recommended Salts</span>
                                                <div className="flex flex-col gap-1 pt-2 text-gray-300">
                                                    {item?.recommended_salts.map((val: any, index: number) => (
                                                        <div key={index} className="flex gap-2">
                                                            <input type="checkbox" checked={isValueInField('salts', val.trim())} onChange={() => { handleTreatment(val, 'salts', val.trim()) }} />
                                                            <span className="text-sm tracking-wider">{val.trim()}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>}

                                            {item?.advice.length > 0 && <div className="flex flex-col w-full gap-1 divide-y divide-gray-400">
                                                <span className='text-base font-semibold '>Advices</span>
                                                <div className="flex flex-col gap-1 pt-2 text-gray-300">
                                                    {item?.advice.map((val: any, index: number) => (
                                                        <div key={index} className="flex gap-2">
                                                            <input type="checkbox" checked={isValueInField('advice', val.trim())} onChange={() => { handleTreatment(val, 'advice', val.trim()) }} />
                                                            <span className="text-sm tracking-wider">{val.trim()}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>}

                                            {item?.follow_up.length > 0 && <div className="flex flex-col w-full gap-1 divide-y divide-gray-400">
                                                <span className='text-base font-semibold '>Follow up</span>
                                                <div className="flex flex-col gap-1 pt-2 text-gray-300">
                                                    {item?.follow_up.map((val: any, index: number) => (
                                                        <div key={index} className="flex gap-2">
                                                            <input type="checkbox" checked={isValueInField('follow_up', val.trim())} onChange={() => { handleTreatment(val, 'follow_up', val.trim()) }} />
                                                            <span className="text-sm tracking-wider">{val.trim()}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>}
                                        </div>

                                    </div>,
                                }

                            ))}
                        />
                    </div>
                </div>}

                {hasAnyValue && <div className="flex flex-col w-full p-4 max-h-[50vh] overflow-auto">
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <span className="text-base font-semibold">Treatment Plan</span>
                            <span className="text-xs mt-1 font-semibold text-gray-300">Your final Treatment plan.</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <Button label="View" className="text-sm font-semibold rounded-md px-4 h-8 border border-green-800 bg-blue-600" onClick={() => setVisible(true)} />
                            <button type="button" className="text-sm font-semibold rounded-md px-4 h-8 border border-green-800 bg-green-600" onClick={() => { handleExport('Treatment Plan data has been exported') }}>Export</button>
                        </div>
                    </div>
                    <TreatmentPlanView treatmentPlan={treatmentPlan} symptoms={symptoms} />
                </div>}
            </div>

            <Dialog header="Treatment Plan" visible={visible} style={{ width: '60vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                <div className="p-6 rounded-2xl shadow-xl bg-white border border-gray-200 space-y-6">
                    <h2 className="text-2xl font-bold text-blue-900">Diagnosis Overview</h2>

                    <div className="space-y-6">
                        {planData.filter((item: any) => item.isChecked == true).map((item: any, i: number) => (
                            <div key={i} className="flex flex-col gap-1 border-l-4 border-blue-500 pl-4 bg-blue-50 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-blue-900">{item?.name}</h3>
                                <p className="text-sm text-gray-700"><span className="font-medium underline underline-offset-2">Category:</span> {item?.category}</p>
                                <p className="text-sm text-gray-700">
                                    <span className="font-medium underline underline-offset-2">Common Symptoms of {item?.name}:</span> {item?.symptoms}
                                </p>
                                <p className="text-sm text-gray-700"><span className="font-medium underline underline-offset-2">Description:</span> {item?.description}</p>

                            </div>
                        ))}
                    </div>

                    {symptoms && symptoms.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-red-700 mb-2">Patient-Reported Symptoms</h3>
                            <ul className="list-disc ml-6 text-sm text-gray-800 space-y-1">
                                {symptoms?.map((item, i) => (
                                    <li key={i}>{item?.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {treatmentPlan.procedures.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-red-700 mb-2">Recommended Procedures</h3>
                            <ul className="list-disc ml-6 text-sm text-gray-800 space-y-1">
                                {treatmentPlan.procedures.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {treatmentPlan.medicines.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-red-700 mb-2">Recommended Medicines</h3>
                            <ul className="list-disc ml-6 text-sm text-gray-800 space-y-1">
                                {treatmentPlan.medicines.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {treatmentPlan.salts.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-red-700 mb-2">Recommended Salts</h3>
                            <ul className="list-disc ml-6 text-sm text-gray-800 space-y-1">
                                {treatmentPlan.salts.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {treatmentPlan.lab_tests.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-red-700 mb-2">Recommended Lab Tests</h3>
                            <ul className="list-disc ml-6 text-sm text-gray-800 space-y-1">
                                {treatmentPlan.lab_tests.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {treatmentPlan.follow_up.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-red-700 mb-2">Follow-Up Recommendations</h3>
                            <ul className="list-disc ml-6 text-sm text-gray-800 space-y-1">
                                {treatmentPlan.follow_up.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

            </Dialog >

        </div>

    );
};

export default TreatmentPlan;
