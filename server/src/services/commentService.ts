import { errorMessage } from '../common/constant/error';
import ApiError from '../exceptions/ApiError';
import Comment from '../models/all/CommentModel';
import User from '../models/all/UserModel';

class CommentService {
	async create(value: string, itemId: number, userId: number) {
		const user = await User.findOne({ where: { id: userId } });
		if (!user) throw ApiError.badRequest(errorMessage.noUser);
		const userNickName = user.getDataValue('nickName');
		const newItem = await Comment.create({ value, itemId, userId, userNickName });
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
