import { API } from '@/common/constant/api';
import { ICollectionResponse } from '@/common/types/collection';
import $api from '.';

const CollectionService = {
	async create(data: FormData): Promise<ICollectionResponse> {
		const response = await $api.post<ICollectionResponse>(API.collection, data);
		return response.data;
	},
};

export default CollectionService;
