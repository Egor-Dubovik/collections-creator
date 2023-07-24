import { API, API_URL } from '@/common/constant/api';
import {
	IAuthResponse,
	ILoginParams,
	IUpdateRoleData,
	IUpdateStatusData,
	IUser,
} from '@/common/types/user';
import axios from 'axios';
import $api from '.';

const UserService = {
	async registration(data: FormData): Promise<IAuthResponse> {
		const response = await $api.post<IAuthResponse>(API.registration, data);
		return response.data;
	},

	async login(data: ILoginParams): Promise<IAuthResponse> {
		const response = await $api.post<IAuthResponse>(API.login, data);
		return response.data;
	},

	async logout(): Promise<number> {
		const response = await $api.post<number>(API.logout);
		return response.data;
	},

	async getUser(id: number): Promise<IUser> {
		const response = await $api.get<IUser>(API.user, { params: { id } });
		return response.data;
	},

	async getSearchUsers(query: string): Promise<IUser[]> {
		const response = await $api.get<IUser[]>(API.userSearch, { params: { query } });
		return response.data;
	},

	async updateStatus(data: IUpdateStatusData): Promise<IUser> {
		const response = await $api.patch<IUser>(API.updateStatus, data);
		return response.data;
	},

	async updateRole(data: IUpdateRoleData): Promise<IUser> {
		const response = await $api.patch<IUser>(API.updateRole, data);
		return response.data;
	},

	async refreshToken(refreshToken: string | null) {
		// const response = await axios.get<IAuthResponse>(`${API_URL}${API.refresh}`, {
		// 	withCredentials: true,
		// });
		const response = await axios.get<IAuthResponse>(`${API_URL}${API.refresh}`, {
			params: { refreshToken },
		});
		return response.data;
	},
};

export default UserService;
