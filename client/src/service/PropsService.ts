import { API, API_URL } from '@/common/constant/api';
import { IItemProp } from '@/common/types/item';
import $api from '.';

const PropsService = {
	async getCollectionProps(collectionId: number): Promise<IItemProp[]> {
		const response = await $api.get<IItemProp[]>(
			`${API_URL}${API.collectionProps}?collectionId=${collectionId}`
		);
		return response.data;
	},
};

export default PropsService;
