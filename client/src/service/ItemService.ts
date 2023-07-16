import { API, API_URL } from '@/common/constant/api';
import { IItemQuery, IItemResData, IItemData } from '@/common/types/item';
import axios from 'axios';
import $api from '.';

const ItemService = {
	async create(data: FormData): Promise<IItemData> {
		const response = await $api.post<IItemData>(API.item, data);
		return response.data;
	},

	async getByParams(data: IItemQuery): Promise<IItemResData> {
		const response = await axios.get<IItemResData>(API_URL + API.item, {
			params: data,
		});
		return response.data;
	},

	async delete(id: number): Promise<[]> {
		const response = await $api.delete<[]>(API_URL + API.item, {
			params: { id },
		});
		return response.data;
	},
};

export default ItemService;
