import { getDiaseaseBySymptoms, getDiaseaseDetails, getDiseasesLists, getGlobalSearch, getInteractionData, getLabLists, getMedicalProcedures, getMedicineLists, getQuestionsBySymptoms, getRadiologyLists, getSaltLists, getSelectedDiseaseData, getSelectedLabData, getSelectedMedicalProcedureData, getSelectedRadiologyData, getSelectedSaltData, getSubstituesData, getSymptomsLists, submitDiagnosisAnswers } from "../../services/info.services";

export const fetchLabList = async (searchInput: string) => {
    const data = {
        search_text: searchInput
    }
    try {
        const res = await getLabLists(data);
        const response = res?.data?.search_response
        const upd = response.map((lab: any) => ({
            id: lab?.test_name,
            name: lab?.test_name,
            desc: `${lab?.type_of_test} test | Code-${lab?.test_code[0]}`,
            isMandatory: false,
            isChecked: false,
            full_description: lab?.description,
            code: lab?.test_code[0],
            how_it_is_done: lab?.how_it_is_done,
            used_for: lab?.used_for,
            type_of_test: lab?.type_of_test,
            reference_values: lab?.reference_values,
            abbreviation: lab?.abbreviation
        }));
        return upd;
    } catch (err) {
        console.log(err);
        return null;  // or throw an error, depending on how you want to handle it
    }
}

export const fetchRadiologyList = async (searchInput: string) => {
    const data = {
        search_text: searchInput
    }
    try {
        const res = await getRadiologyLists(data);
        const response = res?.data?.search_response

        const upd = response.map((lab: any) => {
            const codes = lab?.cpt_codes?.join(', ');
            const views = lab?.views?.map((d: any) => {
                return d?.view;
            })?.join(', ');
            return ({
                id: lab?.subtype,
                name: lab?.subtype,
                desc: views,
                category: lab?.category,
                isMandatory: false,
                isChecked: false,
                code: codes,
                subTypes: lab?.views,
                specialists: lab?.specialists,
                staff: lab?.staff,
            })
        });
        return upd;
    } catch (err) {
        console.log(err);
        return null;  // or throw an error, depending on how you want to handle it
    }
}

export const fetchMedicalProcedureList = async (searchInput: string) => {
    const data = {
        search_text: searchInput
    }
    try {
        const res = await getMedicalProcedures(data);
        const response = res?.data?.search_response;
        const subtypes = response?.subtypes?.map((d: any) => ({
            view: d,
            isChecked: false
        }));
        const upd = response.map((lab: any) => {
            const subtypes = lab?.subtypes?.map((d: any) => ({
                view: d,
                isChecked: false
            }));
            return ({
                id: lab?.name,
                name: lab?.name,
                desc: lab?.procedure,
                category: lab?.type,
                isMandatory: false,
                isChecked: false,
                code: lab?.procedure_code,
                type: lab?.purpose,
                subTypes: subtypes,
                specialists: lab?.specialists,
                abbreviation: lab?.abbreviation
            })
        });
        console.log({ upd })
        return upd;
    } catch (err) {
        console.log(err);
        return null;  // or throw an error, depending on how you want to handle it
    }
}


export const fetchMedicineList = async (searchInput: string, isFromMarketer?: boolean, setMedicineListTotalCount?: any, pagination?: any) => {
    const data = !isFromMarketer ? {
        search_text: searchInput,
        pagination: pagination

    } : {
        marketer_name: searchInput,
        pagination: pagination
    }
    try {
        const res = await getMedicineLists(data);
        const response = res?.data?.data;
        // if (setMedicineListTotalCount && response?.total_count) {
        //     setMedicineListTotalCount(response.total_count);
        // }

        const upd = response?.search_response?.map((med: any) => {
            return ({
                id: med?.id,
                name: med?.name,
                details: med,
            })
        });
        return upd;
    } catch (err) {
        console.log(err);
        return null;  // or throw an error, depending on how you want to handle it
    }
}

export const fetchSymptomList = async (searchInput: string, isFromMarketer?: boolean, setMedicineListTotalCount?: any, pagination?: any) => {
    const data = !isFromMarketer ? {
        search_text: searchInput,
        pagination: pagination

    } : {
        marketer_name: searchInput,
        pagination: pagination
    }
    try {
        const res = await getSymptomsLists(data);
        const response = res?.data?.data;
        if (setMedicineListTotalCount && response?.total_count) {
            setMedicineListTotalCount(response.total_count);
        }

        const upd = response?.search_response?.map((med: any) => {
            return ({
                id: med?.id,
                name: med?.name,
            })
        });
        return upd;
    } catch (err) {
        console.log(err);
        return null;  // or throw an error, depending on how you want to handle it
    }
}

export const fetchDiaseaseBySymptoms = async (symptoms?: any, pagination?: any) => {
    const data = {
        symptoms: symptoms,
        pagination: pagination
    }
    try {
        const res = await getDiaseaseBySymptoms(data);
        const response = res?.data?.data;

        const { high, medium, low } = response?.search_response;

        // Add level tags
        const taggedHigh = high.map((d: any) => ({ ...d, level: 'high' }));
        const taggedMedium = medium.map((d: any) => ({ ...d, level: 'medium' }));
        const taggedLow = low.map((d: any) => ({ ...d, level: 'low' }));

        // Merge in priority order
        const allDiseases = [...taggedHigh, ...taggedMedium, ...taggedLow];

        // Take top 5
        const top5Diseases = allDiseases.slice(0, 5);

        const upd = {
            total_count: response?.total_count,
            topDiseases: top5Diseases,
        }

        return upd;
    } catch (err) {
        console.log(err);
        return null;  // or throw an error, depending on how you want to handle it
    }
}

export const fetchQuestionsBySymptoms = async (symptoms?: any, pagination?: any) => {
    const data = {
        symptoms: symptoms,
        pagination: pagination
    }
    try {
        const res = await getQuestionsBySymptoms(data);
        const response = res?.data?.data;

        const upd = {
            total_count: response?.total_questions,
            thread_id: response?.thread_id,
            ques_data: response?.ques_data,
        }

        return upd;
    } catch (err) {
        console.log(err);
        return null;  // or throw an error, depending on how you want to handle it
    }
}

export const submitDiagnosisData = async (data: any) => {
    
    try {
        const res = await submitDiagnosisAnswers(data);
        const response = res?.data?.data;

        const upd = {
            thread_id: response?.thread_id,
            treatment_plan: response?.treatment_plan,
        }

        return upd;
    } catch (err) {
        console.log(err);
        return null;  // or throw an error, depending on how you want to handle it
    }
}

export const fetchDiaseaseDetails = async (disease_id?: number, pagination?: any) => {
    const data = {
        disease_id: disease_id,
        pagination: pagination
    }
    try {
        const res = await getDiaseaseDetails(data);
        const response = res?.data?.data;

        const upd = {
            id: response?.search_response[0]?.id,
            details: response?.search_response[0],
        }

        return upd;
    } catch (err) {
        console.log(err);
        return null;  // or throw an error, depending on how you want to handle it
    }
}

export const fetchSaltList = async (searchInput: string) => {
    const data = {
        search_text: searchInput
    }
    try {
        const res = await getSaltLists(data);
        const response = res?.data?.search_response

        const upd = response.map((med: any) => {
            return ({
                ...med,
                id: med?.id,
                name: med?.salt_name,
            })
        });
        return upd;
    } catch (err) {
        console.log(err);
        return null;  // or throw an error, depending on how you want to handle it
    }
}

export const handleSaltClick = async (selectedSalt: string) => {
    try {
        const res = await getSelectedSaltData(selectedSalt);
        const response = res?.data
        return response;
    } catch (err) {
        console.log(err);
        return null;  // or throw an error, depending on how you want to handle it
    }
}

export const fetchInteractionList = async (id: string) => {
    try {
        const res = await getInteractionData(id);
        const response = res?.data
        return response;
    } catch (err) {
        console.log(err);
        return null;  // or throw an error, depending on how you want to handle it
    }
}

export const fetchSubstitutesList = async (id: string) => {
    try {
        const res = await getSubstituesData(id);
        const response = res?.data
        return response;
    } catch (err) {
        console.log(err);
        return null;  // or throw an error, depending on how you want to handle it
    }
}

export const fetchDiseasesList = async (searchInput: string) => {
    const data = {
        search_text: searchInput
    }
    try {
        const res = await getDiseasesLists(data);
        const response = res?.data?.search_response

        const upd = response.map((med: any) => {
            return ({
                ...med,
                id: med?.id,
                name: med?.disease_name,
            })
        });
        return upd;
    } catch (err) {
        console.log(err);
        return null;  // or throw an error, depending on how you want to handle it
    }
}


export const handleDiseaseClick = async (selectedDisease: string) => {
    try {
        const res = await getSelectedDiseaseData(selectedDisease);
        const response = res?.data
        return response;
    } catch (err) {
        console.log(err);
        return null;  // or throw an error, depending on how you want to handle it
    }
}


export const fetchGlobalSearch = async (searchInput: string) => {
    const data = {
        search_text: searchInput,
    }
    try {
        const res = await getGlobalSearch(data);
        console.log({ res })
        const response = res?.data;

        const upd = response?.search_response?.map((med: any) => {
            return ({
                id: med?.indexId,
                name: med?.name,
                type: med?.index,
            })
        });
        return upd;
    } catch (err) {
        console.log(err);
        return null;  // or throw an error, depending on how you want to handle it
    }
}

export const handleLabClick = async (selectedLab: string) => {
    try {
        const res = await getSelectedLabData(selectedLab);
        console.log({ res })

        const response = res?.data
        const upd = {
            id: response?.test_name,
            name: response?.test_name,
            desc: `${response?.type_of_test} test | Code-${response?.test_code[0]}`,
            isMandatory: false,
            isChecked: false,
            full_description: response?.description,
            code: response?.test_code[0],
            how_it_is_done: response?.how_it_is_done,
            used_for: response?.used_for,
            type_of_test: response?.type_of_test,
            reference_values: response?.reference_values,
            abbreviation: response?.abbreviation
        };
        return upd;
    } catch (err) {
        console.log(err);
        return null;  // or throw an error, depending on how you want to handle it
    }
}

export const handleRadiologyClick = async (selectedLab: string) => {
    try {
        const res = await getSelectedRadiologyData(selectedLab);
        console.log({ res })

        const response = res?.data
        const codes = response?.cpt_codes?.join(', ');
        const views = response?.views?.map((d: any) => {
            return d?.view;
        })?.join(', ');
        const upd = {
            id: response?.subtype,
            name: response?.subtype,
            desc: views,
            category: response?.category,
            isMandatory: false,
            isChecked: false,
            code: codes,
            subTypes: response?.views,
            specialists: response?.specialists,
            staff: response?.staff,
        }

        return upd;
    } catch (err) {
        console.log(err);
        return null;  // or throw an error, depending on how you want to handle it
    }
}

export const handleMedicalProcedureClick = async (selectedLab: string) => {
    try {
        const res = await getSelectedMedicalProcedureData(selectedLab);
        console.log({ res })

        const response = res?.data
        const subtypes = response?.subtypes?.map((d: any) => ({
            view: d,
            isChecked: false
        }));

        const upd = {
            id: response?.name,
            name: response?.name,
            desc: response?.procedure,
            category: response?.type,
            isMandatory: false,
            isChecked: false,
            code: response?.procedure_code,
            type: response?.purpose,
            subTypes: subtypes,
            specialists: response?.specialists,
            abbreviation: response?.abbreviation
        };

        return upd;
    } catch (err) {
        console.log(err);
        return null;  // or throw an error, depending on how you want to handle it
    }
}