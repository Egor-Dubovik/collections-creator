import { API } from '@/common/constant/api';
import { IAuthResponse, ILoginParams } from '@/common/types/user';
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

	async logout() {
		const response = await $api.post<number>(API.logout);
		return response.data;
	},
};

export default UserService;
