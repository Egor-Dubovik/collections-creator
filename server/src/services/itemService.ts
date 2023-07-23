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
