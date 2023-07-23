import { API, API_URL } from '@/common/constant/api';
import { IItemQuery, IItem, IItemData, IItemResData } from '@/common/types/item';
import axios from 'axios';
import $api from '.';

const ItemService = {
	async create(data: FormData): Promise<IItem> {
		const response = await $api.post<IItem>(API.item, data);
		return response.data;
	},

	async getAll(): Promise<IItem[]> {
		const response = await axios.get<IItem[]>(API_URL + API.allItems);
		return response.data;
	},

	async getOneById(id: string): Promise<IItemData> {
		const response = await axios.get<IItemData>(API_URL + API.oneItem, {
			params: { id },
		});
		return response.data;
	},

	async getByParams(data: IItemQuery): Promise<IItemResData> {
		const response = await axios.get<IItemResData>(API_URL + API.item, {
			params: data,
		});
		return response.data;
	},

	async getRecentItems(offset: number, limit: number): Promise<IItem[]> {
		const response = await axios.get<IItem[]>(API_URL + API.recentItems, {
			params: { offset, limit },
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
