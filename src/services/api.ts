import axios, { AxiosRequestConfig } from 'axios';
import { message } from 'antd';

type InputMethodType = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT';

class Api {
    callApi = (endpoint: string, method: InputMethodType, body?: object): Promise<any> => {
        const options: AxiosRequestConfig = {
            headers: {},
            method: method,
            url: `https://environmental-monitoring-serve.herokuapp.com/${endpoint}`,
            ...(body ? { data: body } : null),
        };

        return new Promise((resolve, reject) => {
            return axios(options)
                .then((response: any) => {
                    const data: any = response.data;
                    if (data.err_code === 0) {
                        return resolve(data);
                    } else {
                        return reject(data);
                    }
                })
                .catch((err: any) => {
                    message.error(err);
                    return reject(err);
                });
        });
    };
}

export default new Api();
