import { errorMessage } from '../common/constant/error';
import { ICollectionData, ICollectionProp } from '../common/types/collection';
import ApiError from '../exceptions/ApiError';
import { Collection } from '../models/all/CollectionModel';
import { deleteFile } from '../utils/deleteFile';
import collectionPropService from './collectionPropService';

class CollectionService {
	async create(data: ICollectionData, props: ICollectionProp[]) {
		const newCollection = await Collection.create({ ...data });
		const collectionId = newCollection.getDataValue('id') as number;
		await this.createProps(props, collectionId);
		return newCollection;
	}

	async createProps(props: ICollectionProp[], collectionId: number) {
		const propPromises = props.map(prop => collectionPropService.createOneProp(prop, collectionId));
		const newProps = await Promise.all(propPromises);
		return newProps;
	}

	async getAll() {
		const propPromises = await Collection.findAll();
		return propPromises;
	}

	async getAllByUserId(userId: number) {
		const propPromises = await Collection.findAll({ where: { userId } });
		return propPromises;
	}

	async delete(id: number) {
		const сollection = await Collection.findOne({ where: { id } });
		if (сollection) {
			const image = сollection?.get('image') as string;
			if (image) deleteFile(image);
			const number = await Collection.destroy({ where: { id } });
			return Boolean(number);
		}
		throw ApiError.badRequest(errorMessage.noCollection);
	}
}

export default new CollectionService();
