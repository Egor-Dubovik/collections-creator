import { errorMessage } from '../common/constant/error';
import { ICollectionProp } from '../common/types/collection';
import ApiError from '../exceptions/ApiError';
import { CollectionProp, ItemCollectionProp } from '../models/all/CollectionModel';

class CollectionPropService {
	async createOneProp(prop: ICollectionProp, collectionId: number) {
		await this.checkPropExistsInCollection(prop.name, collectionId);
		const existProp = await CollectionProp.findOne({ where: { name: prop.name } });
		if (existProp) {
			await this.createItemCollectionProp(collectionId, existProp.getDataValue('id') as number);
			return existProp;
		}
		const newProp = await CollectionProp.create({ ...prop });
		await this.createItemCollectionProp(collectionId, newProp.getDataValue('id') as number);
		return newProp;
	}

	async checkPropExistsInCollection(name: string, collectionId: number) {
		const itemCollectionProp = await ItemCollectionProp.findOne({ where: { collectionId } });
		const collectionPropId = itemCollectionProp?.getDataValue('collectionPropId');
		if (!collectionPropId) return;
		const collectionProp = await CollectionProp.findOne({ where: { id: collectionPropId, name } });
		if (!!collectionProp) throw ApiError.badRequest(errorMessage.propExist);
	}

	async createItemCollectionProp(collectionId: number, collectionPropId: number) {
		const newProp = await ItemCollectionProp.create({ collectionId, collectionPropId });
		return newProp;
	}
}

export default new CollectionPropService();
