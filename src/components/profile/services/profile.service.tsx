import { request } from "../../../utils/axios.utils";
import { AUTH_URL_PREFIX } from "../../constants";


export function saveProfile(data: any, id: string) {
    return request({
        url: AUTH_URL_PREFIX + "mediassist/users/" + id,
        method: "put",
        data: JSON.stringify(data),
    });
}

export function getProfileData(id: string) {
    return request({
        url: AUTH_URL_PREFIX + "mediassist/users/" + id,
        method: "get",
        data: JSON.stringify({}),
    });
}
