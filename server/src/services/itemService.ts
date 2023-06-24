import { errorMessage } from '../common/constant/error';
import { IItemProp } from '../common/types/collection';
import ApiError from '../exceptions/ApiError';
import { Item, ItemProp } from '../models/all/ItemModel';

class ItemService {
	async create(name: string, props: IItemProp[], collectionId: string) {
		const newItem = await Item.create({ name, collectionId });
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
}

export default new ItemService();
