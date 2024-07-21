import axios, { AxiosError, AxiosResponse, RawAxiosRequestHeaders } from "axios";

export type NetworkCallConfig = {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    requestBodyType?: 'JSON' | 'SIMPLE_FORM' | 'FILE_FORM';
    body?: any;
    params?: { [index: string]: string | undefined };
};

export const networkCall = async <ResponseDataType>(endpoint: string, config?: NetworkCallConfig): Promise<AxiosResponse<ResponseDataType> | undefined> => {
    const defaultConfig: NetworkCallConfig = {
        method: 'GET',
        requestBodyType: 'JSON',
        body: {},
        params: {}
    };

    config = {...defaultConfig, ...config};

    const responseType = 'json';
    const headers: RawAxiosRequestHeaders = {};
    let body;

    switch (config.requestBodyType) {
        case 'JSON':
            headers['Content-Type'] = 'application/json';
            break;
        case 'SIMPLE_FORM':
            headers['Content-Type'] = 'application/x-www-form-urlencoded';
            break;
        case 'FILE_FORM':
            headers['Content-Type'] = 'multipart/form-data';
            break;
        default:
            headers['Content-Type'] = 'application/json';
    }

    const accessToken = localStorage.getItem('AccessToken');

    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    if (config.body !== undefined) {

        // Ha nem Form
        body = config.body;

        // Form body request
        if ((config.requestBodyType === 'SIMPLE_FORM' || config.requestBodyType === 'FILE_FORM') && typeof config.body === 'object') {

            let formData = new FormData();

            for (const key in config.body) {
                if (config.body.hasOwnProperty(key)) {

                    if (typeof config.body[key] === 'object' && typeof config.body[key][Symbol.iterator] === 'function') { //Fájl vagy tömb esetén

                        for (let index = 0; index < config.body[key].length; index++) {
                            formData.append(key, config.body[key][index]);
                        }

                    } else {
                        formData.append(key, config.body[key]);
                    }

                }
            }

            body = formData;

        }
    }

    try {

        return await axios({
            url: `${process.env.REACT_APP_BACKEND_URL}${endpoint}`,
            method: config.method,
            headers,
            data: body,
            responseType,
            params: config.params
        });

    } catch (error: unknown) {
        return (error as AxiosError<ResponseDataType>).response;
    }

}