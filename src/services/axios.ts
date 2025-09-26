import { BodyData, QueryParams } from "@/types";
import { message } from "antd";
import axios, { AxiosRequestConfig, Method } from "axios";
import config from "../config";
import { clearStorage, getLocalStorage, getLocalStorageToken, setLocalStorage } from "../utils/common";
import { useNavigate } from "react-router-dom";
interface APIRequestParams {
    method: Method,
    url: string,
    baseURL?: string,
    queryParams?: QueryParams,
    bodyData?: BodyData,
    token?: string,
    formHeaders?: QueryParams
}

const APIrequest = async ({
    method,
    url,
    baseURL,
    queryParams,
    bodyData,
    token,
    // formHeaders
}: APIRequestParams) => {

    try {
        const apiToken = (token === '' || !token) ? getLocalStorageToken() : token

        const axiosConfig: AxiosRequestConfig = {
            method: method || "GET",
            baseURL: config.API_BASE_URL,
            headers: {
                "content-type": "application/json"
            },
        };

        // if (formHeaders) {
        //     axiosConfig.headers = { ...formHeaders }
        // }

        if (baseURL) {
            axiosConfig.baseURL = baseURL;
        }

        if (url) {
            axiosConfig.url = url;
        }

        if (queryParams) {
            const queryParamsPayload: any = {};
            for (const key in queryParams) {
                if (Object.hasOwnProperty.call(queryParams, key)) {
                    let element: any = queryParams[key];
                    // if (typeof element === "string") {
                    //     element = element.trim();
                    // }
                    // if (!["", null, undefined, NaN].includes(element)) {
                        queryParamsPayload[key] = element;
                    // }
                }
            }
            axiosConfig.params = queryParamsPayload;
        }

        if (bodyData) {
            if (bodyData instanceof FormData) {
                axiosConfig.headers = {
                    ...axiosConfig.headers,
                    "Content-Type": "multipart/form-data"
                };
                axiosConfig.data = bodyData;
            }
            else {
                const bodyPayload: any = {};
                for (const key in bodyData) {
                    if (Object.hasOwnProperty.call(bodyData, key)) {
                        let element: any = bodyData[key];
                        if (typeof element === "string") {
                            element = element.trim();
                        }
                        if (![null, undefined, NaN].includes(element)) {
                            bodyPayload[key] = element;
                        }
                    }
                }
                axiosConfig.data = bodyPayload;
            }
        }

        if (apiToken) {
            axiosConfig.headers = {
                ...axiosConfig.headers,
                authorization: `Bearer ${apiToken}`,
            };
        }

        const res = await axios(axiosConfig);
        return res.data;
    }
    catch (error: any) {
        const refreshToken = getLocalStorage("refresh"); // Get refresh token from storage
        if (error?.response?.status === 401 && refreshToken) {
            try {
                clearStorage()
                window.location.href = 'http://localhost:5173/';
                // const refreshResponse = await axios.post(`${config.API_BASE_URL}/auth/refresh/`, {
                //     refreshToken,
                // });

                // const newAccessToken = refreshResponse?.data?.accessToken;
                // if (newAccessToken) {
                //     setLocalStorage("access", newAccessToken);

                //     const retryConfig = {
                //         ...error.config,
                //         headers: {
                //             ...error.config.headers,
                //             authorization: `Bearer ${newAccessToken}`,
                //         },
                //     };
                //     const retryResponse = await axios(retryConfig);
                //     return retryResponse.data;
                // } else {
                //     message.error("Failed to refresh token. Please log in again.");
                //     return null;
                // }
            } catch (refreshError) {
                clearStorage()
                message.error("Session expired. Please log in again.");
                return null;
            }
        }

        if (error?.response?.message)
            message.error(error?.response?.message)

        if (error?.response?.status === 400)
            message.error(error?.response?.message)

        if (error?.response?.status === 500)
            message.error("Internal server error")
        // else
        //     message.error("something went wrong")
        return null;
    }
}

export default APIrequest