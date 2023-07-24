import { Model, Op } from 'sequelize';
import { Collection } from '../models/all/CollectionModel';
import { Item } from '../models/all/ItemModel';

class SearchService {
	async findItems(query: string) {
		const items = await Item.findAll({ where: { name: { [Op.like]: `%${query}%` } } });
		if (items.length) return items;
		const collections = await this.searchCollections(query);
		const firstItemsFromCollections = await this.getFirstItemsFromCollections(collections);
		return firstItemsFromCollections;
	}

	async searchCollections(query: string) {
		const collections = await Collection.findAll({
			where: { title: { [Op.like]: `%${query}%` } },
			include: [{ model: Item, as: 'items' }],
		});
		return collections;
	}

	async getFirstItemsFromCollections(collections: Model<any>[]) {
		const firstItemsFromCollections = collections.map(collection => {
			if (collection.getDataValue('items').length > 0) {
				return collection.getDataValue('items')[0];
			}
			return [];
		});
		return firstItemsFromCollections;
	}
}

export default new SearchService();
