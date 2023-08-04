import { API_URL } from '@/common/constant/api';
import axios from 'axios';
import UserService from './UserService';

const $api = axios.create({
	withCredentials: true,
	baseURL: API_URL,
});

$api.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
	return config;
});

$api.interceptors.response.use(
	config => {
		return config;
	},
	async error => {
		const originalRequest = error.config;
		if (error.response.status == 401 && error.config && !error.config._isRetry) {
			originalRequest._isRetry = true;
			try {
				if (typeof window !== 'undefined') {
					const refreshToken = localStorage.getItem('refreshToken');
					if (refreshToken) {
						const userData = await UserService.refreshToken(refreshToken);
						localStorage.setItem('token', userData.accessToken);
						localStorage.setItem('refreshToken', userData.refreshToken);
						return $api.request(originalRequest);
					}
				}
			} catch (e) {
				console.log('NOT AUTHORIZED');
			}
		}
		throw error;
	}
);

export default $api;
