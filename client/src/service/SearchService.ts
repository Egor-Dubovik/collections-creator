import { API, API_URL } from '@/common/constant/api';
import { IItem } from '@/common/types/item';
import axios from 'axios';

const SearchService = {
	async findItems(query: string): Promise<IItem[]> {
		const response = await axios.get<IItem[]>(API_URL + API.searchItems, { params: { query } });
		return response.data;
	},
};

export default SearchService;
