import { request } from "../../utils/axios.utils";
import { URL_PREFFIX } from "../constants";

export function getSubscriptionModuleData(productLine: any) {
    return request({
        url: URL_PREFFIX + `subscriptions-plan/${productLine}/search/active`,
        method: "get",
        data: JSON.stringify({}),
    });
}

export function postGetStarted(data: any) {
    return request({
        url: URL_PREFFIX + `subscriptions/payment`,
        method: "post",
        data: JSON.stringify(data),
    });
}

export function postVerifyPayment(data: any) {
    return request({
        url: URL_PREFFIX + `subscriptions/callback-json/RAZORPAY`,
        method: "post",
        data: JSON.stringify(data),
    });
}

export function getSubscriptionAuthorization(id: string) {
    return request({
        url: URL_PREFFIX + "subscriptions/entitytype/MEDIASSIST_USER/" + id,
        method: "get",
        data: JSON.stringify({}),
    });
}

export function postEnterprise(data: any) {
    return request({
        url: URL_PREFFIX + "qms/tickets",
        method: "post",
        data: JSON.stringify(data),
    });
}

export function postUpgradePlan(data: any, id: any) {
    return request({
        url: URL_PREFFIX + `subscriptions/upgrade-plan/MEDIASSIST_USER/` + id,
        method: "post",
        data: JSON.stringify(data),
    });
}