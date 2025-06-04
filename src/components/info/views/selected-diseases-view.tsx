import { Button } from 'primereact/button';
import React, { useState } from 'react';
import '../../../App.css';
import CustomAccordion from '../../common/accordion';
import { selectedDis } from '../types/treatmentPlan';
import { InputText } from 'primereact/inputtext';

interface items {
    id: number;
    details: selectedDis
}

interface items {
    id: number;
    details: selectedDis
}

export interface SelectedDiseasesViewProps {
    // Define the props for the RadiologyView component here
    selectedDisData: items[];
    isValueInField: (feild: 'symptoms' | 'lab_tests' | 'procedures' | 'medicines' | 'salts' | 'advice' | 'follow_up', val: string) => boolean;
    toggleFlatFieldValue: (field: 'symptoms' | 'lab_tests' | 'procedures' | 'medicines' | 'salts' | 'advice' | 'follow_up', value: string) => void;
    handleGetDeatils: (tab: 'SYMPTOMS' | 'MEDICINE' | 'SALT' | 'DISEASES', searchVal: string, id: number) => void;
    handleManualAddData: (id: number, field: 'lab_tests' | 'procedures' | 'medicines' | 'salts' | 'advice' | 'follow_up', value: string) => void;
}

const SelectedDiseasesView: React.FC<SelectedDiseasesViewProps> = ({ selectedDisData, isValueInField, toggleFlatFieldValue, handleGetDeatils, handleManualAddData }) => {

    const handleTreatment = (disease_id: number, field: 'symptoms' | 'lab_tests' | 'procedures' | 'medicines' | 'salts' | 'advice' | 'follow_up', value: string) => {

        toggleFlatFieldValue(field, value);

    }

    const [manualUI, setManualUI] = useState<{
        [id: number]: { [field: string]: boolean };
    }>({});

    const toggleManualInput = (id: number, field: string) => {
        setManualUI((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: !prev[id]?.[field],
            },
        }));
    };

    const [manualInputValues, setManualInputValues] = useState<{
        [id: number]: { [field: string]: string };
    }>({});

    const handleManualInputChange = (id: number, field: string, value: string) => {
        setManualInputValues((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: value,
            },
        }));
    };

    const handleManualAdd = (id: number, field: 'lab_tests' | 'procedures' | 'medicines' | 'salts' | 'advice' | 'follow_up', value: string) => {
        if (!value.trim()) return; // skip empty input

        setManualUI((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: !prev[id]?.[field],
            },
        }));
        setManualInputValues((prev) => ({
            ...prev,
            [id]: {
              ...prev[id],
              [field]: '',
            },
          }));
        handleManualAddData(id, field, value);
    };
    
    return (
        <div className='flex w-full rounded-lg pr-2 py-4'>

            <CustomAccordion
                defaultActiveIndex={null}
                customBg="text-white w-full"
                items={selectedDisData.map((items: items, index: number) => (
                    {
                        title: items?.details?.dName,
                        children: <div className="flex flex-col gap-4 w-full max-h-80 overflow-auto">
                            <div className="flex flex-col gap-1">
                                <div className="flex gap-2">
                                    <span className='text-sm font-semibold'>{items?.details?.dName}</span>
                                    <Button tooltip="Get Details" onClick={() => { handleGetDeatils('DISEASES', items?.details?.dName, items?.details?.id) }}><i className="pi pi-info-circle abccc cursor-pointer text-xs" style={{ fontSize: '0.9rem', color: '#00A3FF' }}></i></Button>
                                </div>
                                <span className='text-xs font-semibold'>Category: {items?.details?.category}</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className='text-sm font-semibold underline underline-offset-4'>Description</span>
                                <span className='text-xs font-semibold'>{items?.details?.description}</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className='text-sm font-semibold underline underline-offset-4'>Symptoms of {items?.details?.dName}</span>
                                <ul className='list-disc pl-4 text-sm'>
                                    {items?.details?.symptoms.split(',').filter(item => item !== '').map((item, index) => (
                                        <li key={index} className='capitalize tracking-wider'>{item.trim()}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className='text-sm font-semibold underline underline-offset-4'>Recommended Lab Tests</span>
                                <div className="flex flex-col gap-1">
                                    {items?.details?.lab_tests.split(',').filter(item => item !== '').map((item, index) => (
                                        <div key={index} className="flex gap-2">
                                            <input type="checkbox" checked={isValueInField('lab_tests', item.trim())} onChange={() => { handleTreatment(items?.id, 'lab_tests', item.trim()) }} />
                                            <span className="text-sm tracking-wider">{item.trim()}</span>
                                        </div>
                                    ))}
                                    {!manualUI[items.id]?.lab_tests ? (<span className='text-xs pl-4 cursor-pointer text-gray-400' onClick={() => toggleManualInput(items.id, 'lab_tests')}>+ Add manully</span>) : (
                                        <div className="p-inputgroup flex-1 max-w-72 pl-4">
                                            <InputText placeholder="Add Lab test" className='text-xs font-semibold p-1 text-gray-700' value={manualInputValues[items.id]?.lab_tests || ''} onChange={(e) => handleManualInputChange(items.id, 'lab_tests', e.target.value)} />
                                            <Button icon="pi pi-check" className="p-button-success bg-green-600" onClick={() => handleManualAdd(items?.id, 'lab_tests', manualInputValues[items.id]?.lab_tests || '')} />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className='text-sm font-semibold underline underline-offset-4'>Recommended Procedures</span>
                                <div className="flex flex-col gap-1">
                                    {items?.details?.procedures.split(',').filter(item => item !== '').map((item, index) => (
                                        <div key={index} className="flex gap-2">
                                            <input type="checkbox" checked={isValueInField('procedures', item.trim())} onChange={() => { handleTreatment(items?.id, 'procedures', item.trim()) }} />
                                            <span className="text-sm tracking-wider">{item.trim()}</span>
                                        </div>
                                    ))}
                                    {!manualUI[items.id]?.procedures ? (<span className='text-xs pl-4 cursor-pointer text-gray-400' onClick={() => toggleManualInput(items.id, 'procedures')}>+ Add manully</span>) : (
                                        <div className="p-inputgroup flex-1 max-w-72 pl-4">
                                            <InputText placeholder="Add procedure" className='text-xs font-semibold p-1 text-gray-700' value={manualInputValues[items.id]?.procedures || ''} onChange={(e) => handleManualInputChange(items.id, 'procedures', e.target.value)} />
                                            <Button icon="pi pi-check" className="p-button-success bg-green-600" onClick={() => handleManualAdd(items?.id, 'procedures', manualInputValues[items.id]?.procedures || '')} />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className='text-sm font-semibold underline underline-offset-4'>Recommended Medicines</span>
                                <div className="flex flex-col gap-1">
                                    {items?.details?.medicines.split(',').filter(item => item !== '').map((item, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <input type="checkbox" checked={isValueInField('medicines', item.trim())} onChange={() => { handleTreatment(items?.id, 'medicines', item.trim()) }} />
                                            <span className="text-sm tracking-wider">{item.trim()}</span>
                                            <Button tooltip="Get Details" onClick={() => { handleGetDeatils('MEDICINE', item.trim(), items?.id) }}><i className="pi pi-info-circle abccc cursor-pointer" style={{ fontSize: '0.9rem', color: '#00A3FF' }}></i></Button>
                                        </div>
                                    ))}
                                    {!manualUI[items.id]?.medicines ? (<span className='text-xs pl-4 cursor-pointer text-gray-400' onClick={() => toggleManualInput(items.id, 'medicines')}>+ Add manully</span>) : (
                                        <div className="p-inputgroup flex-1 max-w-72 pl-4">
                                            <InputText placeholder="Add medicine" className='text-xs font-semibold p-1 text-gray-700' value={manualInputValues[items.id]?.medicines || ''} onChange={(e) => handleManualInputChange(items.id, 'medicines', e.target.value)} />
                                            <Button icon="pi pi-check" className="p-button-success bg-green-600" onClick={() => handleManualAdd(items?.id, 'medicines', manualInputValues[items.id]?.medicines || '')} />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className='text-sm font-semibold underline underline-offset-4'>Recommended Salts</span>
                                <div className="flex flex-col gap-1">
                                    {items?.details?.salts.split(',').filter(item => item !== '').map((item, index) => (
                                        <div key={index} className="flex gap-2">
                                            <input type="checkbox" checked={isValueInField('salts', item.trim())} onChange={() => { handleTreatment(items?.id, 'salts', item.trim()) }} />
                                            <span className="text-sm tracking-wider">{item.trim()}</span>
                                            <Button tooltip="Get Details" onClick={() => { handleGetDeatils('SALT', item.trim(), items?.id) }}><i className="pi pi-info-circle abccc cursor-pointer" style={{ fontSize: '0.9rem', color: '#00A3FF' }}></i></Button>
                                        </div>
                                    ))}
                                    {!manualUI[items.id]?.salts ? (<span className='text-xs pl-4 cursor-pointer text-gray-400' onClick={() => toggleManualInput(items.id, 'salts')}>+ Add manully</span>) : (
                                        <div className="p-inputgroup flex-1 max-w-72 pl-4">
                                            <InputText placeholder="Add salt" className='text-xs font-semibold p-1 text-gray-700' value={manualInputValues[items.id]?.salts || ''} onChange={(e) => handleManualInputChange(items.id, 'salts', e.target.value)} />
                                            <Button icon="pi pi-check" className="p-button-success bg-green-600" onClick={() => handleManualAdd(items?.id, 'salts', manualInputValues[items.id]?.salts || '')} />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className='text-sm font-semibold underline underline-offset-4'>Advice</span>
                                <div className="flex flex-col gap-1">
                                    {items?.details?.advice.split(',').filter(item => item !== '').map((item, index) => (
                                        <div key={index} className="flex gap-2">
                                            <input type="checkbox" checked={isValueInField('advice', item.trim())} onChange={() => { handleTreatment(items?.id, 'advice', item.trim()) }} />
                                            <span className="text-sm tracking-wider">{item.trim()}</span>
                                        </div>
                                    ))}
                                    {!manualUI[items.id]?.advice ? (<span className='text-xs pl-4 cursor-pointer text-gray-400' onClick={() => toggleManualInput(items.id, 'advice')}>+ Add manully</span>) : (
                                        <div className="p-inputgroup flex-1 max-w-72 pl-4">
                                            <InputText placeholder="Add advice" className='text-xs font-semibold p-1 text-gray-700' value={manualInputValues[items.id]?.advice || ''} onChange={(e) => handleManualInputChange(items.id, 'advice', e.target.value)} />
                                            <Button icon="pi pi-check" className="p-button-success bg-green-600" onClick={() => handleManualAdd(items?.id, 'advice', manualInputValues[items.id]?.advice || '')} />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className='text-sm font-semibold underline underline-offset-4'>Follow UP</span>
                                <div className="flex flex-col gap-1">
                                    {items?.details?.follow_up.split(',').filter(item => item !== '').map((item, index) => (
                                        <div key={index} className="flex gap-2">
                                            <input type="checkbox" checked={isValueInField('follow_up', item.trim())} onChange={() => { handleTreatment(items?.id, 'follow_up', item.trim()) }} />
                                            <span className="text-sm tracking-wider">{item.trim()}</span>
                                        </div>
                                    ))}
                                    {!manualUI[items.id]?.follow_up ? (<span className='text-xs pl-4 cursor-pointer text-gray-400' onClick={() => toggleManualInput(items.id, 'follow_up')}>+ Add manully</span>) : (
                                        <div className="p-inputgroup flex-1 max-w-72 pl-4">
                                            <InputText placeholder="Add follow up" className='text-xs font-semibold p-1 text-gray-700' value={manualInputValues[items.id]?.follow_up || ''} onChange={(e) => handleManualInputChange(items.id, 'follow_up', e.target.value)} />
                                            <Button icon="pi pi-check" className="p-button-success bg-green-600" onClick={() => handleManualAdd(items?.id, 'follow_up', manualInputValues[items.id]?.follow_up || '')} />
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>,
                    }

                ))}
            />




        </div>
    );
};

export default SelectedDiseasesView;
