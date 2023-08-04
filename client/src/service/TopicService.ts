import { API, API_URL } from '@/common/constant/api';
import { ITopic } from '@/common/types/collection';
import axios from 'axios';
import $api from '.';

const TopicService = {
	async getAll(): Promise<ITopic[]> {
		const response = await $api.get<ITopic[]>(API.topic);
		return response.data;
	},
	async getCollectionTopic(id: number): Promise<ITopic> {
		const response = await axios.get<ITopic>(API_URL + API.oneTopic, { params: { id } });
		return response.data;
	},
};

export default TopicService;
