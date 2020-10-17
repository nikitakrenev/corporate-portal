import axios, { AxiosError, AxiosInstance } from "axios";
import { AxiosRequestConfig } from "axios";
import { mapValues, isString } from "lodash";

export type TransportConfig = Pick<AxiosRequestConfig, "headers" | "baseURL" | "params">;

export class Transport {
    private headers = {};
    private token?: string;
    private instance: AxiosInstance = null;

    public static errorHandler: (err: AxiosError) => void;

    init(serverUrl: string) {
        this.instance = axios.create({
            baseURL: serverUrl,
        });
        this.instance.interceptors.response.use(null, function (error) {
            Transport.errorHandler(error);
            return Promise.reject(error);
        });
    }

    async get<Response>(url: string, params?: object): Promise<Response> {
        const response = await this.instance.get(url, this.config(params));
        return response.data;
    }

    async post<Request, Response>(url: string, data: Request, params?: object): Promise<Response> {
        const response = await this.instance.post(url, data, this.config(params));
        return response.data;
    }

    async put<Request, Response>(url: string, data: Request, params?: object): Promise<Response> {
        const response = await this.instance.put(url, data, this.config(params));
        return response.data;
    }

    async delete<Response = void>(url: string, params?: object): Promise<Response> {
        const response = await this.instance.delete(url, this.config(params));
        return response.data;
    }

    setToken(token: string): void {
        this.token = token;
        localStorage.setItem("token", JSON.stringify(token));
    }

    formatToFormData(params: {}): FormData {
        const formData = new FormData();
        mapValues(params, (value: string | File, key) => {
            const isFile = !isString(value) && (value as {}) instanceof File;
            if (!isFile && !isString(value)) {
                return formData.append(key, JSON.stringify(value));
            }
            formData.append(key, value);
        });
        return formData;
    }

    private config(params?: object): TransportConfig {
        return {
            headers: {
                ...this.headers,
                "Content-Type": "application/json",
            },
            params,
        };
    }
}

export const transport = new Transport();
