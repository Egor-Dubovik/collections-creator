import { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface IAxiosError<T> extends Error {
	config: AxiosRequestConfig;
	code?: string;
	request?: unknown;
	response: AxiosResponse<T>;
	isAxiosError: boolean;
	toJSON: () => object;
}
