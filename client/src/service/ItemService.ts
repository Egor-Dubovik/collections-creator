import { API, API_URL } from '@/common/constant/api';
import { ICollectionResponse } from '@/common/types/collection';
import { IItemQuery, IItemResData } from '@/common/types/item';
import axios from 'axios';
import $api from '.';

const ItemService = {
	async create(data: FormData): Promise<IItemResData> {
		const response = await $api.post<IItemResData>(API.item, data);
		return response.data;
	},

	async getByParams(data: IItemQuery): Promise<IItemResData[]> {
		const response = await $api.get<IItemResData[]>(API_URL + API.item, {
			params: data,
		});
		return response.data;
	},

	async delete(id: number): Promise<ICollectionResponse[]> {
		const response = await $api.delete<ICollectionResponse[]>(API_URL + API.item, {
			params: { id },
		});
		return response.data;
	},
};

export default ItemService;
