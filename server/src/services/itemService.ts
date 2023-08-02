import { OrderItem, Includeable } from 'sequelize';
import { errorMessage } from '../common/constant/error';
import { IItemProp } from '../common/types/collection';
import { IItemCreationProps, IItemsData, TypeOrder } from '../common/types/item';
import { Item, ItemProp } from '../models/all/ItemModel';
import ApiError from '../exceptions/ApiError';
import filterService from './filterService';
import tagService from './tagService';

class ItemService {
	async create(data: IItemCreationProps) {
		const { name, image, props, tags, collectionId } = data;
		const newItem = await Item.create({ name, collectionId, image });
		const itemId = newItem.getDataValue('id');
		await this.createItemProps(props, itemId);
		await tagService.createTags(tags, itemId);
		return newItem;
	}

	async createItemProps(props: IItemProp[], itemId: number) {
		props.forEach(async prop => await this.createOneItemProp(prop, itemId));
	}

	async createOneItemProp(prop: IItemProp, itemId: number) {
		const candidate = await ItemProp.findOne({ where: { name: prop.name, itemId } });
		if (candidate) throw ApiError.badRequest(errorMessage.itemPropExist);
		const newProp = await ItemProp.create({ ...prop, itemId });
		return newProp;
	}

	async getAll() {
		const items = await Item.findAll();
		return items;
	}

	async getItemsByCollectionId(collectionId: string) {
		const items = await Item.findAll({ where: { collectionId }, order: [['createdAt', 'DESC']] });
		return items;
	}

	async getItemsByTags(tags: string[]) {
		let filter = [] as Includeable[];
		filterService.buildTagFilter(tags, filter);
		const items = await Item.findAll({ include: filter });
		return items;
	}

	async getCollectionItemsByItemId(itemId: string) {
		const item = await Item.findOne({ where: { id: itemId } });
		const collectionItems = await this.getItemsByCollectionId(item?.getDataValue('collectionId'));
		return collectionItems;
	}

	async getOne(id: number) {
		const item = await Item.findOne({ where: { id } });
		if (!item) throw ApiError.badRequest(errorMessage.notFound);
		const itemProps = await ItemProp.findAll({ where: { itemId: id } });
		return { item, props: itemProps };
	}

	async getRecentItems(offset: number, initLimit: number) {
		const limit = initLimit + 1;
		const items = await Item.findAll({ limit, offset, order: [['createdAt', 'DESC']] });
		return items;
	}

	async getTotalItemsCount(collectionId: number, filters: Includeable[]) {
		const total = await Item.count({
			where: collectionId ? { collectionId } : undefined,
			include: [...filters],
		});
		return total;
	}

	async getFilteredItems(
		collectionId: number,
		filters: Includeable[],
		order: 'asc' | 'desc',
		offset: number,
		limit: number
	) {
		const items = await Item.findAll({
			where: collectionId ? { collectionId } : undefined,
			include: filters,
			order: [['createdAt', order === 'desc' ? 'DESC' : 'ASC']],
			offset,
			limit,
		});
		return items;
	}

	async getItemsByParams(data: IItemsData) {
		const { collectionId, order, offset, limit, isCommented, tags } = data;
		const filters = filterService.buildFilters(isCommented, tags);
		const items = await this.getFilteredItems(collectionId, filters, order, offset, limit);
		const totalItemsCount = await this.getTotalItemsCount(collectionId, filters);
		const hasNextItem = offset + limit < totalItemsCount && limit === items.length;
		return { items, hasNextItem };
	}
}

export default new ItemService();
