import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getAccessTokenFromCookie, removeCookies } from './auth.utils';

interface RequestOptions extends AxiosRequestConfig {
    // Add any additional properties you need for RequestOptions
    //ContentType : string
    token?: string;
    calledFrom?: string;
}
// const client = axios.create({ baseURL: process.env.REACT_APP_API_URL });
const client = axios.create({ baseURL: 'http://127.0.0.1:8000/' });



export const request = async (options: RequestOptions, customHeaders?: any): Promise<AxiosResponse> => {

    client.defaults.headers.common['Content-Type'] = 'application/json';
    const accessToken = getAccessTokenFromCookie();
    // const groupId = getGroupIdFromCookie();
    // const hospitalId = gethospitalIdFromCookie();
    // const profileId = getProfileIdFromCookie();
    // const selectedBranchId = getSelectedBranchIdFromCookie();
    // let branchId = getBranchIdFromCookie();
    const URL = options.calledFrom;
    // if (selectedBranchId && URL !== ROUTES.BRANCH_LIST) {
    //     branchId = selectedBranchId;
    // }
    client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // if (customHeaders) {
    //     client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    //     //     client.defaults.headers.common['X-TREINT-BRANCH-ID'] = customHeaders && customHeaders.branchId ? customHeaders.branchId : branchId;
    //     //     client.defaults.headers.common['X-TREINT-GROUP-ID'] = customHeaders && customHeaders.groupId ? customHeaders.groupId : groupId;
    //     //     client.defaults.headers.common['X-TREINT-HOSPITAL-ID'] = customHeaders && customHeaders.hospitalId ? customHeaders.hospitalId : hospitalId;
    //     //     client.defaults.headers.common['X-TREINT-FROM-ID'] = profileId;
    //     // } else if (accessToken) {
    //     // client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    //     // client.defaults.headers.common['X-TREINT-BRANCH-ID'] = branchId;
    //     // client.defaults.headers.common['X-TREINT-GROUP-ID'] = groupId;
    //     // client.defaults.headers.common['X-TREINT-HOSPITAL-ID'] = hospitalId;
    //     // client.defaults.headers.common['X-TREINT-FROM-ID'] = profileId;
    // }

    const onSuccess = (response: AxiosResponse) => response;
    const onError = (error: any) => {
        // Optionally catch errors and add additional logging here
        // removeCookies();
        // window.location.href = '/';
        switch (error.response.status) {
            case 401:
                removeCookies();
                window.location.href = '/';
                break;
            default:
                break;
        }
        return Promise.reject(error);
    };

    try {
        const response = await client(options);
        return onSuccess(response);
    } catch (error) {
        return onError(error);
    }
};

export const logout = async () => {

}