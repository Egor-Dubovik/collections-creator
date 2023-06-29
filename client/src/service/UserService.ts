import { API } from '@/common/constant/api';
import { IRegisterProps, IAuthResponse } from '@/common/types/user';
import $api from '.';

const UserService = {
	async registration(data: FormData): Promise<IAuthResponse> {
		const response = await $api.post<IAuthResponse>(API.registration, data);
		return response.data;
	},
};

export default UserService;
