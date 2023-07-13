import { API, API_URL } from '@/common/constant/api';
import { ICollectionResponse } from '@/common/types/collection';
import axios from 'axios';
import $api from '.';

const CollectionService = {
	async create(data: FormData): Promise<ICollectionResponse> {
		const response = await $api.post<ICollectionResponse>(API.collection, data);
		return response.data;
	},

	async getAll(): Promise<ICollectionResponse[]> {
		const response = await axios.get<ICollectionResponse[]>(API_URL + API.collection);
		return response.data;
	},
	async getAllByUserId(id: number): Promise<ICollectionResponse[]> {
		const response = await $api.get<ICollectionResponse[]>(API_URL + API.userCollection, {
			params: { id },
		});
		return response.data;
	},

	async delete(id: number): Promise<ICollectionResponse[]> {
		const response = await $api.delete<ICollectionResponse[]>(API_URL + API.collection, {
			params: { id },
		});
		return response.data;
	},
};

export default CollectionService;
