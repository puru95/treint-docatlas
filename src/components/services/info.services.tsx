import { request } from "../../utils/axios.utils";
import { AUTH_URL_PREFIX, URL_PREFFIX } from "../constants";

export function getSelectedSaltData(data: any) {
    return request({
        url: URL_PREFFIX + "mediassist/mini/salts/" + data,
        method: "get",
        data: JSON.stringify({}),
    });
}

export function getSaltLists(data: any) {
    return request({
        url: URL_PREFFIX + "mediassist/mini/salts/search",
        method: "post",
        data: JSON.stringify(data),
    });
}

export function getInteractionData(data: any) {
    return request({
        url: URL_PREFFIX + "mediassist/mini/medicines/interactions/" + data,
        method: "get",
        data: JSON.stringify({}),
    });
}

export function getSubstituesData(data: any) {
    return request({
        url: URL_PREFFIX + "mediassist/mini/medicines/substitutes/" + data,
        method: "get",
        data: JSON.stringify({}),
    });
}

export function getDiseasesLists(data: any) {
    return request({
        url: URL_PREFFIX + "mediassist/mini/diseases/search",
        method: "post",
        data: JSON.stringify(data),
    });
}

export function getSelectedDiseaseData(data: any) {
    return request({
        url: URL_PREFFIX + "mediassist/mini/diseases/" + data,
        method: "get",
        data: JSON.stringify({}),
    });
}
export function getMedicalProcedures(data: any) {
    return request({
        url: URL_PREFFIX + "mediassist/mini/medicalprocedure/search",
        method: "post",
        data: JSON.stringify(data),
    });
}


export function getRadiologyLists(data: any) {
    return request({
        url: URL_PREFFIX + "mediassist/mini/radiologytest/search",
        method: "post",
        data: JSON.stringify(data),
    });
}


export function getMedicineLists(data: any) {
    return request({
        // url: URL_PREFFIX + "mediassist/mini/medicines/search",
        url: URL_PREFFIX + "medicines/search",
        method: "post",
        data: JSON.stringify(data),
    });
}

export function getSymptomsLists(data: any) {
    return request({
        // url: URL_PREFFIX + "mediassist/mini/medicines/search",
        url: URL_PREFFIX + "symptoms/search",
        method: "post",
        data: JSON.stringify(data),
    });
}

export function getDiaseaseBySymptoms(data: any) {
    return request({
        // url: URL_PREFFIX + "mediassist/mini/medicines/search",
        url: URL_PREFFIX + "getDiseaseBySymptoms",
        method: "post",
        data: JSON.stringify(data),
    });
}

export function getQuestionsBySymptoms(data: any) {
    return request({
        // url: URL_PREFFIX + "mediassist/mini/medicines/search",
        url: URL_PREFFIX + "getQuestionsByOpenAI",
        method: "post",
        data: JSON.stringify(data),
    });
}

export function submitDiagnosisAnswers(data: any) {
    return request({
        // url: URL_PREFFIX + "mediassist/mini/medicines/search",
        url: URL_PREFFIX + "submitDiagnosisAnswers",
        method: "post",
        data: JSON.stringify(data),
    });
}

export function getDiaseaseDetails(data: any) {
    return request({
        // url: URL_PREFFIX + "mediassist/mini/medicines/search",
        url: URL_PREFFIX + "getDiseaseDetails",
        method: "post",
        data: JSON.stringify(data),
    });
}

export function getLabLists(data: any) {
    return request({
        url: URL_PREFFIX + "mediassist/mini/labtest/search",
        method: "post",
        data: JSON.stringify(data),
    });
}
export function getSpecificMedicineData(data: any) {
    return request({
        url: URL_PREFFIX + "mediassist/mini/medicines/" + data,
        method: "get",
        data: JSON.stringify({}),
    });
}

export function sendOtp(data: any) {
    return request({
        url: AUTH_URL_PREFIX + "phone/send-otp",
        method: "post",
        data: JSON.stringify(data),
    });
}

export function sendInvitationCode(code: string, countryCode: string, mobile: string) {
    const url = URL_PREFFIX + `invitation/otp/${code}/countrycode/${countryCode}/mobile/${mobile}`;
    return request({ url: url, method: "post" });
}

export function validateOtp(data: any) {
    return request({
        url: AUTH_URL_PREFIX + "phone/validate-otp",
        method: "post",
        data: JSON.stringify(data),
    });
}

export const logout = () => {
    return request({ url: "auth/api/v1/session", method: "delete" });
};

export function getGlobalSearch(data: any) {
    return request({
        url: URL_PREFFIX + "mediassist/mini/search",
        method: "post",
        data: JSON.stringify(data),
    });
}
export function getUserData(data: any) {
    return request({
        url: URL_PREFFIX + "query/user/profile/" + data,
        method: "get",
        data: JSON.stringify({}),
    });
}

export function getSelectedLabData(data: any) {
    return request({
        url: URL_PREFFIX + "mediassist/mini/labtest/" + data,
        method: "get",
        data: JSON.stringify({}),
    });
}

export function getSelectedRadiologyData(data: any) {
    return request({
        url: URL_PREFFIX + "mediassist/mini/radiologytest/" + data,
        method: "get",
        data: JSON.stringify({}),
    });
}

export function getSelectedMedicalProcedureData(data: any) {
    return request({
        url: URL_PREFFIX + "mediassist/mini/medicalprocedure/" + data,
        method: "get",
        data: JSON.stringify({}),
    });
}

export function getLoggedIn(data: any) {
    return request({
        url: AUTH_URL_PREFIX + "login",
        method: "post",
        data: JSON.stringify(data),
    });
}


