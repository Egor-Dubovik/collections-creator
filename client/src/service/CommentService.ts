import { API, API_URL } from '@/common/constant/api';
import { IComment } from '@/common/types/comment';
import axios from 'axios';
import $api from '.';

const CommentService = {
	async getAllByItemId(itemId: string): Promise<IComment[]> {
		const response = await axios.get<IComment[]>(API_URL + API.comment, {
			params: { itemId },
		});
		return response.data;
	},

	async create(data: IComment): Promise<IComment> {
		const response = await $api.post<IComment>(API_URL + API.comment, data);
		return response.data;
	},
};

export default CommentService;
