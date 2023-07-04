import { API } from '@/common/constant/api';
import { ITopic } from '@/common/types/collection';
import $api from '.';

const TopicService = {
	async getAll(): Promise<ITopic[]> {
		const response = await $api.get<ITopic[]>(API.topic);
		return response.data;
	},
};

export default TopicService;
