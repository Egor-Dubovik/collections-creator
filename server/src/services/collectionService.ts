import { Model } from 'sequelize';
import { errorMessage } from '../common/constant/error';
import { ICollectionData, ICollectionProp } from '../common/types/collection';
import ApiError from '../exceptions/ApiError';
import { Collection } from '../models/all/CollectionModel';
import { Item } from '../models/all/ItemModel';
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

	async getOne(id: string) {
		const propPromises = await Collection.findOne({ where: { id } });
		return propPromises;
	}

	async getAllByUserId(userId: number) {
		const propPromises = await Collection.findAll({ where: { userId } });
		return propPromises;
	}

	async getSortedCollections(collections: Model<ICollectionData>[], itemCounts: {}) {
		const sortedCollections = collections.sort((a, b) => {
			const countA = itemCounts[a.getDataValue('id') as number] || 0;
			const countB = itemCounts[b.getDataValue('id') as number] || 0;
			return countB - countA;
		});
		return sortedCollections;
	}

	async getTop() {
		try {
			const collections = await Collection.findAll();
			const items = await Item.findAll();
			const itemCounts = {};

			items.forEach(item => {
				const collectionId = item.getDataValue('collectionId');
				itemCounts[collectionId] = (itemCounts[collectionId] || 0) + 1;
			});
			const sortedCollections = await this.getSortedCollections(collections, itemCounts);
			const topCollections = sortedCollections.slice(0, 3);
			return topCollections;
		} catch (error) {
			console.error(error);
			throw error;
		}
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
