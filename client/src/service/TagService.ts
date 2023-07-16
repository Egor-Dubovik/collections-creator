import { API } from '@/common/constant/api';
import { ITag } from '@/common/types/tag';
import $api from '.';

const TagService = {
	async getAll(): Promise<ITag[]> {
		const response = await $api.get<ITag[]>(API.tag);
		return response.data;
	},
};

export default TagService;
