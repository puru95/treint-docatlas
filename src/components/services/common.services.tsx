import { request } from "../../utils/axios.utils";
import { URL_PREFFIX } from "../constants";

export function postFileUploadData(data: any, type: string = "docImage") {
    const url =
        type === "image"
            ? "image/upload"
            : type === "docImage"
                ? "documents/upload/image"
                : "documents/upload/pdf";
    const headers = {
        "Content-Type": "multipart/form-data",
    };
    return request({
        url: URL_PREFFIX + url,
        method: "post",
        headers: headers,
        data: data,
    });
}