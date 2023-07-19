import { Model } from 'sequelize';
import { errorMessage } from '../common/constant/error';
import { ITag } from '../common/types/tag';
import ApiError from '../exceptions/ApiError';
import { ItemTag, Tag } from '../models/all/TagModel';

class TagService {
	async getAll() {
		const tags = await Tag.findAll();
		return tags;
	}

	async getAllByItemId(itemId: number) {
		const itemTags = await ItemTag.findAll({ where: { itemId } });
		const tagIds = itemTags.map(tag => tag.getDataValue('tagId'));
		const tags = await Tag.findAll({ where: { id: tagIds } });
		return tags;
	}

	async createTags(tagValues: string[], itemId: number) {
		console.log('------------------');
		console.log(tagValues);
		const existingTags = await this.findExistingTags(tagValues);
		const newTags = await this.createMissingTags(tagValues, existingTags);
		await this.createItemTags(itemId, [...existingTags, ...newTags]);
		return [...existingTags, ...newTags];
	}

	async findExistingTags(tagValues: string[]) {
		const tags = await Tag.findAll({ where: { value: tagValues } });
		return tags;
	}

	async createMissingTags(tagValues: string[], existingTags: Model<ITag>[]) {
		const existingValues = existingTags.map(tag => tag.getDataValue('value'));
		const missingValues = tagValues.filter(value => !existingValues.includes(value));
		const newTags = await Tag.bulkCreate(missingValues.map(value => ({ value })));
		return newTags;
	}

	async createItemTags(itemId: number, tags: Model<ITag>[]) {
		const tagIds = tags.map(tag => tag.getDataValue('id'));
		const existingItemTags = await ItemTag.findAll({ where: { tagId: tagIds, itemId } });
		if (existingItemTags.length) throw ApiError.badRequest(errorMessage.tagExist);
		const itemTags = tagIds.map(tagId => ({ tagId, itemId }));
		await ItemTag.bulkCreate(itemTags);
	}
}

export default new TagService();
