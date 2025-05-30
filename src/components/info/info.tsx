import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { RiHomeFill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { debounce } from "../common/debounce";
import InputSearchDropdown from "../common/dropdown";
import FullScreenLoader from "../common/fullScreenLoader";
import { ROUTES, TABS } from "../constants";
import { Medicine, MedicineDetails, selectedDis } from "./types/treatmentPlan";
import { fetchDiaseaseBySymptoms, fetchDiaseaseDetails, fetchDiseasesList, fetchLabList, fetchMedicalProcedureList, fetchMedicineList, fetchQuestionsBySymptoms, fetchSaltList, fetchSymptomList, submitDiagnosisData } from "./utils/utils";
import DiseasesDetails from "./views/diseases-details";
import MedicalQuestionnaire from "./views/medicalQuestionnaire";
import MedicinesDetails from "./views/medicines-details";
import SaltsDetails from "./views/salts-details";
import SelectedDiseasesView from "./views/selected-diseases-view";
import TreatmentPlanView from "./views/treatment-plan-view";
import TreatmentPlan from './views/treatment-plan';

type Sym = { id: number; name: string };
type Dis = { id: number; details: selectedDis };

interface TreatmentEntry {
    symptoms: string[];
    lab_tests: string[];
    procedures: string[];
    medicines: string[];
    salts: string[];
    advice: string[];
    follow_up: string[];
}

interface Question {
    sequence_no: number;
    question: string;
    options: string[];
}

const Info = () => {
    const location = useLocation();
    const searchFromId = location?.state?.searchFromId;
    const searchLabOrRadiologyById = location?.state?.searchLabOrRadiologyById;
    const mobile_tab = location?.state?.mobile_tab;
    const passedId = location?.state?.passedId;

    const [selectedOptions, setSelectedOptions] = useState<any>('');
    const [selectedTabInDocMarine, setSelectedTabInDocMarine] = useState<any>(mobile_tab ? mobile_tab : 'SYMPTOMS');
    const [isLoading, setIsLoading] = useState(false);
    const [isDLoading, setIsDLoading] = useState(false);
    const [isSearchLoading, setIsSearchLoading] = useState(false);
    const [subCategory, setSubCategory] = useState<any>('');
    const [dropdownOptions, setDropdownOptions] = useState<any>([]);
    const [dropdownDesOptions, setDropdownDesOptions] = useState<any>([]);
    const [searchInput, setSearchInput] = useState<string>();
    const [searchDisInput, setSearchDisInput] = useState<string>();
    const navigate = useNavigate();
    const [medicineListTotalCount, setMedicineListTotalCount] = useState<any>();
    const [questionsData, setQuestionsData] = useState<Question[]>([]);
    const [diseasesData, setDiseasesData] = useState<any[]>([]);
    const [selectedSym, setSelectedSym] = useState<Sym[]>([]);
    const [selectedDis, setSelectedDis] = useState<Dis[]>([]);
    const [selectedMed, setSelectedMed] = useState<MedicineDetails>();
    const [selectedSalt, setSelectedSalt] = useState<MedicineDetails>();
    const [diseaseDetails, setDiseaseDetails] = useState<Dis>();
    const [error, setError] = useState<string>('');
    const [threadId, setThreadId] = useState<string>('');
    const [type, setType] = useState<'NORMAL' | 'AI'>('NORMAL');
    const [aiPlan, setAiPlan] = useState<any>();
    const toast = useRef<Toast | null>(null);

    const [treatmentPlan, setTreatmentPlan] = useState<TreatmentEntry>({
        symptoms: [],
        lab_tests: [],
        procedures: [],
        medicines: [],
        salts: [],
        advice: [],
        follow_up: [],
    });

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

    const handleClick = async (val: any, subCategory?: string, pagination?: any) => {

        if (val?.id) {
            const tab = val?.tab;
            switch (tab) {
                case "SYMPTOMS":
                    const sm = {
                        id: val?.id,
                        name: val?.name
                    }
                    setSelectedSym((prev) =>
                        prev.some((item) => item.id === val.id) ? prev : [...prev, sm]
                    );
                    break;

                case "MEDICINE":
                    setIsLoading(true);
                    const selectedMedicine = dropdownOptions.find((med: Medicine) => med?.id === val?.id);
                    setSelectedMed(selectedMedicine?.details);
                    setIsLoading(false);
                    break;
                case "SALT":
                    setIsLoading(true);
                    const selectedSalt = dropdownOptions.find((med: Medicine) => med?.id === val?.id);
                    setSelectedSalt(selectedSalt?.details);
                    setIsLoading(false);
                    break;
                case "DISEASES":
                    setIsLoading(true);
                    const disData = await fetchDiaseaseDetails(val?.id);
                    disData && setDiseaseDetails(disData?.details);
                    setIsLoading(false);
                    break;
                default:
                    break;
            }
        }
    }

    const handleTabClick = (tab: string, id: any, subCategory?: string, fromMarketer?: any) => {
        const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/i;
        const isUUid = uuidRegex.test(id);
        if (id) {
            if (tab === 'SALT') {
                handleClick({ tab: tab, id: id, searchFromId: isUUid }, subCategory);
            } else if (tab === 'LAB' || tab === 'RADIOLOGY' || tab === 'MEDICAL_PROCEDURE') {
                handleClick({ tab: tab, id: id, searchLabOrRadiologyById: searchLabOrRadiologyById ?? isUUid }, subCategory);
            } else {
                handleClick({ tab: tab, id: id, isFromMarketer: fromMarketer }, subCategory);
            }
        }
        // setOptionAssciatedWithTab(tab);
        setSelectedOptions(null);

        setSelectedTabInDocMarine(tab);
        setDropdownOptions([]);
    }

    const handlePlaceholder = () => {
        switch (selectedTabInDocMarine) {
            case "LAB":
                return "Search eg. CBC"
            case "SYMPTOMS":
                return "Search symptoms"
            case "MEDICAL_PROCEDURE":
                return "Search eg. Surgery"
            case "MEDICINE":
                return "Search eg. Dolo"
            case "SALT":
                return "Search eg. Paracetamol"
            case "DISEASES":
                return "Search eg. Cataract"
            default:
                return "Search here"
        }
    }

    const handleSelectedItem = (selectedItem: any) => {

        const { id, ...rest } = selectedItem;
        switch (selectedTabInDocMarine) {
            case "MEDICINE":
                handleClick({ tab: 'MEDICINE', id: selectedItem?.id });
                break;
            case "DISEASES":
                handleClick({ tab: 'DISEASES', id: selectedItem?.id });
                break;
            case "SYMPTOMS":
                handleClick({ tab: 'SYMPTOMS', id: selectedItem?.id, name: selectedItem?.name });
                setDropdownOptions([]);
                setSearchInput('');
                break;
            case "SALT":
                handleClick({ tab: 'SALT', id: selectedItem?.id });
                break;
            case "LAB":
                setSelectedOptions(rest);
                break;
            default:
                setSelectedOptions(rest);
                break
        }
    }
    const handleListItemClick = debounce(async (searchValue: any) => {

        if (!searchValue) {
            setDropdownOptions([]);
            return
        }
        try {
            let data;
            setError('');
            setIsSearchLoading(true);
            switch (selectedTabInDocMarine) {
                case "MEDICINE":
                    data = await fetchMedicineList(searchValue);
                    break;
                case "SALT":
                    data = await fetchSaltList(searchValue);
                    break;
                case "LAB":
                    data = await fetchLabList(searchValue);
                    break;
                case "SYMPTOMS":
                    data = await fetchSymptomList(searchValue);
                    break;
                case "MEDICAL_PROCEDURE":
                    data = await fetchMedicalProcedureList(searchValue);
                    break;
                case "DISEASES":
                    data = await fetchDiseasesList(searchValue);
                    break;
                default:
                    return;
            }
            // setOptionAssciatedWithTab(selectedTabInDocMarine);
            setSearchInput(searchValue);
            setDropdownOptions(data);
            setIsSearchLoading(false);

        } catch (error) {
            console.error(`Error fetching list :`, error);
        }
    }, 500)

    useEffect(() => {
        setDropdownOptions([]);
        setSearchInput('');
    }, [selectedTabInDocMarine])

    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab'); // 'SALT'
    const id = urlParams.get('id');
    const fromMarketer = urlParams.get('fromMarketer') === 'true';
    let subCategoryFromUrl = urlParams.get('subCategory');
    subCategoryFromUrl = subCategoryFromUrl === 'undefined' || subCategoryFromUrl === undefined ? null : subCategoryFromUrl;
    //subCategoryFromUrl comes as 'undefined' in string

    useEffect(() => {

        if (tab && id) {
            handleTabClick(tab, id, subCategoryFromUrl ?? undefined, fromMarketer);
        } else if (mobile_tab && passedId) {
            handleTabClick(mobile_tab, passedId);
        } else {
            handleTabClick(mobile_tab ? mobile_tab : 'SYMPTOMS', null);
        }
    }, [tab, id, subCategoryFromUrl, passedId])

    const handleBackNavigation = () => {
        navigate(-1)
    }

    const handleSelectedSym = (val: number) => {
        setSelectedSym((prev) => prev.filter((item) => item.id !== val));
    }

    const handleGetDiseases = async () => {

        if (selectedSym.length > 0) {
            setIsLoading(true);
            const symIds = selectedSym.map(sym => sym.id);
            const data = await fetchDiaseaseBySymptoms(symIds);

            if (data?.topDiseases) {
                setDiseasesData(data?.topDiseases);
                setIsLoading(false);
                setType('NORMAL');
            }

        } else {
            setError('Please select symptoms');
        }
    }

    const handleAiSearch = async () => {

        if (selectedSym.length > 0) {
            setIsLoading(true);
            const symIds = selectedSym.map(sym => sym.name);
            const data = await fetchQuestionsBySymptoms(symIds);

            if (data?.ques_data) {
                setQuestionsData(data?.ques_data);
                setThreadId(data?.thread_id);
                setIsLoading(false);
                setType('AI');
            }

        } else {
            setError('Please select symptoms');
        }
    }

    const handleGetDiseaseDetails = async (d_id: number) => {

        if (d_id) {
            setIsDLoading(true);
            const hasId = selectedDis.some(item => item.id === d_id)

            if (hasId) {
                setSelectedDis((prev) => prev.filter((item) => item.id !== d_id));
                setIsDLoading(false);
            } else {
                const data = await fetchDiaseaseDetails(d_id);

                data && setSelectedDis(prev => [...prev, data]);
                setIsDLoading(false);
            }

        } else {
            setError('Something went wrong');
            setIsDLoading(false);
        }
    }

    const hasAnyPlan = Object.values(treatmentPlan).some(arr => arr.length > 0);

    const isValueInMed = (idToCheck: number): boolean => {
        return selectedDis.some(item => item.id === idToCheck);
    };

    const handleSubmitAnswers = async (answers: any) => {

        setIsDLoading(true);

        const data = {
            thread_id: threadId,
            answers: answers
        }

        // const data = {"thread_id":threadId,"answers":{"1":"A couple of days","2":"7-9 (Severe)","3":"Fatigue","4":"No","5":"Yes","6":"No","7":"Yes"}}

        const response = await submitDiagnosisData(data);

        setAiPlan(response?.treatment_plan);
        setIsDLoading(false);

    }

    const formatTextToHTML = (text: any) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // bold
            .replace(/\n/g, '<br />'); // newlines
    };

    const handleExport = (text: any) => {

        if (toast.current) {
            toast.current.show({
                severity: 'success',
                summary: 'Success',
                detail: text,
                life: 3000
            });
        }
    };

    const handleGetDiseasesData = debounce(async (searchValue: any) => {

        if (!searchValue) {
            setDropdownDesOptions([]);
            return
        }
        try {
            let data;
            setError('');
            setIsSearchLoading(true);

            const dasda = await fetchDiseasesList(searchValue);

            // setOptionAssciatedWithTab(selectedTabInDocMarine);
            setSearchDisInput(searchValue);
            setDropdownDesOptions(dasda);
            setIsSearchLoading(false);

        } catch (error) {
            console.error(`Error fetching list :`, error);
        }
    }, 500)

    const handleSelectedDesItem = (selectedItem: any) => {

        const { id, ...rest } = selectedItem;
        const res = {
            disease_id: selectedItem?.id,
            name: selectedItem?.name,
            description: selectedItem?.description
        }
        setDiseasesData(prev => [...prev, res]);
        setSearchDisInput('');
    }

    return (
        <div className="relative bg-opacity-20 flex justify-center items-center z-0 pt-4">
            <Toast ref={toast} position="bottom-right" />
            <div className={`${selectedOptions ? "overflow-hidden" : ""} w-[1024px]  text-white px-2 pb-6 z-10 text-wrap`}>
                <div className=" sticky top-0 z-20">
                    <div className="hidden md:block ">
                        <div className="hidden md:flex md:justify-center lg:justify-between gap-3 md:flex-wrap mb-4 w-full">
                            {TABS.map((tab, index) => (
                                <div key={index} className={`${selectedTabInDocMarine === tab.id ? "bg-[#00A3FF] text-white" : "border border-white text-white"} whitespace-nowrap w-[230px] text-sm font-semibold text-center py-2 px-4 rounded-[5px] cursor-pointer `} onClick={() => { handleTabClick(tab?.id, null) }}>
                                    {tab.name}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-3 mr-3 md:mr-0 ">
                        <div className="md:hidden">
                            {(
                                <div className="">
                                    <span onClick={handleBackNavigation} className=" cursor-pointer">
                                        <IoChevronBack size={20} />
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col w-full gap-2">
                            <InputSearchDropdown
                                items={dropdownOptions}
                                placeholder={handlePlaceholder()}
                                onChange={(value) => handleListItemClick(value)}
                                onSelect={(selectedItem) => handleSelectedItem(selectedItem)}
                                subName="name" // or whatever property you want to display from the items
                                disabled={false} // or true if you want to disable the input
                                className={` text-white text-base md:text-sm font-semibold bg-[#1F222E] md:bg-[#10131f]  px-2  w-full`} // custom styles for the wrapper
                                inputClassName="bg-[#1F222E] md:bg-[#10131f] h-[45px] " // custom styles for the input
                                dropdownClassName="bg-gray-800 text-white" // custom styles for the dropdown
                                searchIconColor="white" // color of the search icon
                                setSearchInput={setSearchInput}
                                searchInput={searchInput}
                                isSearchLoading={isSearchLoading}
                            />
                            {selectedTabInDocMarine == 'SYMPTOMS' && <div className="flex flex-col gap-2">
                                <div className="flex gap-2">
                                    {selectedSym.map((val: Sym, index: number) => (
                                        <div key={val?.id} className="flex gap-2 text-xs p-2 rounded-md bg-gray-300 text-gray-700">
                                            <span>{val?.name}</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle cursor-pointer" viewBox="0 0 16 16" onClick={() => handleSelectedSym(val?.id)}>
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                            </svg>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex text-xs text-red-500">
                                    <span>{error}</span>
                                </div>
                                <div className="flex gap-2 self-end">
                                    <button type="button" className="flex gap-2 items-center px-4 py-2 bg-[#00A3FF] text-sm font-semibold text-white rounded-md hover:bg-blue-600" onClick={handleAiSearch}>
                                        <svg width="14" height="15" viewBox="0 0 14 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="i8gzK v2EZs"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 0.714966C6.57172 0.714966 6.19841 1.00644 6.09453 1.42193C5.64458 3.22175 5.11525 4.31311 4.3567 5.07167C3.59815 5.83022 2.50678 6.35955 0.706966 6.8095C0.291477 6.91337 -3.32794e-07 7.28669 -3.32794e-07 7.71497C-3.32794e-07 8.14324 0.291477 8.51656 0.706966 8.62043C2.50678 9.07039 3.59815 9.59971 4.3567 10.3583C5.11525 11.1168 5.64458 12.2082 6.09453 14.008C6.19841 14.4235 6.57172 14.715 7 14.715C7.42828 14.715 7.80159 14.4235 7.90547 14.008C8.35542 12.2082 8.88475 11.1168 9.6433 10.3583C10.4019 9.59971 11.4932 9.07039 13.293 8.62043C13.7085 8.51656 14 8.14324 14 7.71497C14 7.28669 13.7085 6.91337 13.293 6.8095C11.4932 6.35955 10.4019 5.83022 9.6433 5.07167C8.88475 4.31311 8.35542 3.22175 7.90547 1.42193C7.80159 1.00644 7.42828 0.714966 7 0.714966Z"></path></svg>
                                        <span>AI</span>
                                    </button>
                                    <button type="button" className="px-4 py-2 bg-[#00A3FF] text-sm font-semibold text-white rounded-md hover:bg-blue-600" onClick={handleGetDiseases}>
                                        Search
                                    </button>
                                </div>

                            </div>}
                        </div>

                        <div className="md:hidden bg-[#1F222E] w-[50px] h-[45px] rounded-[10px] flex flex-col justify-center items-center" onClick={() => navigate(ROUTES.HOME)}>
                            <RiHomeFill size={16} />
                            <p className="text-[10px] font-medium">Home</p>
                        </div>
                    </div>

                </div>

                <div className=" modal-content">
                    {isLoading ?
                        <div className="flex justify-center items-center h-[450px]">
                            {/* <LoaderIcon style={{ color: '#2D53EB' }} className="text-blue-500" /> */}
                            <FullScreenLoader />
                        </div> :
                        <div className="flex ">
                            {type === 'NORMAL' && selectedTabInDocMarine == 'SYMPTOMS' && diseasesData.length > 0 && <div className="flex w-full border mt-5 min-h-[55vh] h-full rounded-md border-gray-500">
                                <div className="flex flex-col w-full p-4 ">
                                    <div className={`flex ${selectedDis.length > 0 ? 'flex-col gap-4' : 'flex-row gap-2'} w-full `}>
                                        <div className="flex flex-col w-full">
                                            <span className="text-base font-semibold">Top Diseases</span>
                                            <span className="text-xs mt-1 font-semibold text-gray-300">Please select the diseases for further process.</span>
                                        </div>
                                        <div className="flex w-full">
                                            <InputSearchDropdown
                                                items={dropdownDesOptions}
                                                placeholder="Add Disease"
                                                onChange={(value) => handleGetDiseasesData(value)}
                                                onSelect={(selectedItem) => handleSelectedDesItem(selectedItem)}
                                                subName="name" // or whatever property you want to display from the items
                                                disabled={false} // or true if you want to disable the input
                                                className={` text-white text-base md:text-sm font-semibold bg-[#1F222E] md:bg-[#10131f]  px-2  w-full`} // custom styles for the wrapper
                                                inputClassName="bg-[#1F222E] md:bg-[#10131f] h-[45px] " // custom styles for the input
                                                dropdownClassName="bg-gray-800 text-white" // custom styles for the dropdown
                                                searchIconColor="white" // color of the search icon
                                                setSearchInput={setSearchDisInput}
                                                searchInput={searchDisInput}
                                                isSearchLoading={isSearchLoading}
                                            />
                                        </div>

                                    </div>

                                    <div className="flex flex-col mt-4 px-2 gap-4 overflow-auto">
                                        {diseasesData.map((items, index) => (
                                            <div className="flex flex-col gap-0">
                                                <div className="flex gap-2">
                                                    <input type="checkbox" checked={isValueInMed(items?.disease_id)} id={items?.disease_id} onChange={() => { handleGetDiseaseDetails(items?.disease_id) }} />
                                                    <span className="text-base">{items?.name} <span className="text font-semibold"> {items?.percentage && <span> - {items?.percentage * (1.5) > 95 ? 90 : items?.percentage * (1.5)}% Match</span>} </span> </span>
                                                </div>
                                                <div className="flex pl-6">
                                                    <span className="text-xs tracking-wide">{items?.description}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {selectedDis.length > 0 && <div className="flex flex-col w-full p-4 border-l border-gray-500">
                                    <div className="flex flex-col">
                                        <span className="text-base font-semibold">Selected Diseases</span>
                                        <span className="text-xs mt-1 font-semibold text-gray-300">Please select the treatment from the selected disease data.</span>
                                    </div>
                                    {isDLoading && <FullScreenLoader />}
                                    <SelectedDiseasesView selectedDisData={selectedDis} isValueInField={isValueInField} toggleFlatFieldValue={toggleFlatFieldValue} />
                                </div>}

                                {hasAnyPlan && <div className="flex flex-col w-full p-4 border-l border-gray-500">
                                    <div className="flex justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-base font-semibold">Treatment Plan</span>
                                            <span className="text-xs mt-1 font-semibold text-gray-300">Your final Treatment plan.</span>
                                        </div>
                                        <div className="flex">
                                            <button type="button" className="text-sm font-semibold rounded-md px-4 h-8 border border-green-800 bg-green-600" onClick={() => { handleExport('Treatment Plan data has been exported') }}>Export</button>
                                        </div>
                                    </div>

                                    <TreatmentPlanView treatmentPlan={treatmentPlan} symptoms={selectedSym} />
                                </div>}
                            </div>}

                            {type === 'AI' && selectedTabInDocMarine == 'SYMPTOMS' && !aiPlan && questionsData.length > 0 && <div className="flex mt-4 w-full">
                                {isDLoading && <FullScreenLoader />}
                                <MedicalQuestionnaire data={questionsData} handleSubmitAnswers={handleSubmitAnswers} />
                            </div>}

                            {type == 'AI' && aiPlan && selectedTabInDocMarine == 'SYMPTOMS' &&
                                <div className="flex w-full overflow-auto max-h-[55vh] mt-6">
                                    <TreatmentPlan data={aiPlan} handleExport={handleExport} />
                                </div>
                            }

                            {selectedTabInDocMarine == 'MEDICINE' && <div className="flex mt-8 w-full">
                                {selectedMed &&
                                    <MedicinesDetails data={selectedMed} />
                                }
                            </div>}
                            {selectedTabInDocMarine == 'SALT' && <div className="flex mt-8 w-full">
                                {selectedSalt &&
                                    <SaltsDetails data={selectedSalt} />
                                }
                            </div>}
                            {selectedTabInDocMarine == 'DISEASES' && <div className="flex mt-8 w-full">
                                {diseaseDetails &&
                                    <DiseasesDetails data={diseaseDetails} />
                                }
                            </div>}

                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Info;