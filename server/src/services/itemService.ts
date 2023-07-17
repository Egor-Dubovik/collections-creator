import { OrderItem, Includeable } from 'sequelize';
import { errorMessage } from '../common/constant/error';
import { IItemProp } from '../common/types/collection';
import { IItemsData, TypeOrder } from '../common/types/item';
import ApiError from '../exceptions/ApiError';
import { Item, ItemProp } from '../models/all/ItemModel';
import filterService from './filterService';

class ItemService {
	async create(name: string, props: IItemProp[], image: string | undefined, collectionId: string) {
		const newItem = await Item.create({ name, collectionId, image });
		await this.createItemProps(props, newItem.getDataValue('id'));
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

	async getOne(id: number) {
		const item = await Item.findOne({ where: { id } });
		return item;
	}

	async getRecentItems(offset: number, initLimit: number) {
		const limit = initLimit + 1;
		const items = await Item.findAll({ limit, offset, order: [['createdAt', 'DESC']] });
		const hasNextPage = items.length > initLimit;
		const currentItems = items.slice(0, initLimit);
		return { items: currentItems, hasNextPage };
	}

	async getItemsByCollectionId(id: number, offset: number, limit: number, sortOrder: TypeOrder) {
		const order: OrderItem[] = [['createdAt', sortOrder.toUpperCase()]];
		const where = { collectionId: id };
		const items = await Item.findAll({ where, order, limit, offset });
		return items;
	}

	async getTotalItemsCount(collectionId: number, filters: Includeable[], include: Includeable[]) {
		const total = await Item.count({
			where: collectionId ? { collectionId } : undefined,
			include: [...filters, ...include],
		});
		return total;
	}

	async getItems(data: IItemsData) {
		const { collectionId, order, offset, limit, isCommented, tags } = data;
		const filters = [] as Includeable[];
		const include = [] as Includeable[];

		if (isCommented) {
			const commentFilter = filterService.createComment();
			filters.push(commentFilter);
		}

		if (tags?.length) {
			const tagInclude = filterService.createTagInclude(tags);
			filters.push(tagInclude);
		}

		const totalItemsCount = await this.getTotalItemsCount(collectionId, filters, include);
		const hasNextItem = offset + limit < totalItemsCount;

		const items = await Item.findAll({
			where: collectionId ? { collectionId } : undefined,
			include: [...filters, ...include],
			order: [['createdAt', order === 'desc' ? 'DESC' : 'ASC']],
			offset,
			limit,
		});

		return { items, hasNextItem };
	}
}

export default new ItemService();
