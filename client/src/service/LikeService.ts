import { API, API_URL } from '@/common/constant/api';
import { ILike } from '@/common/types/like';
import axios from 'axios';
import $api from '.';

const LikeService = {
	async getAllByItemId(id: string): Promise<ILike[]> {
		const response = await axios.get<ILike[]>(`${API_URL}${API.like}?itemId=${id}`);
		return response.data;
	},

	async addLike(data: ILike): Promise<ILike[]> {
		const response = await $api.post<ILike[]>(API_URL + API.like, data);
		return response.data;
	},

	async delete(userId: number): Promise<boolean> {
		const response = await $api.delete<boolean>(API_URL + API.like, { params: { userId } });
		return response.data;
	},
};

export default LikeService;
