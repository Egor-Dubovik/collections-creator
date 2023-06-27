import { Model } from 'sequelize';
import { errorMessage } from '../common/constant/error';
import ApiError from '../exceptions/ApiError';
import Like from '../models/all/LikeModule';

class LikeService {
	async create(userId: number, itemId: number) {
		const like = await Like.create({ userId, itemId });
		return like;
	}

	async getItemLikes(itemId: number) {
		const likes = await Like.findAll({ where: { itemId } });
		return likes;
	}
}

export default new LikeService();
