import Comment from '../models/all/CommentModel';

class CommentService {
	async create(value: string, itemId: number, userId: number) {
		const newItem = await Comment.create({ value, itemId, userId });
		return newItem;
	}

	async update(value: string, itemId: number, userId: number) {
		const newItem = await Comment.update({ value }, { where: { itemId, userId } });
		return newItem;
	}
	async getAll(itemId: number) {
		const newItem = await Comment.findAll({ where: { itemId } });
		return newItem;
	}
}

export default new CommentService();
