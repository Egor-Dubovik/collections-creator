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

	async delete(userId: string) {
		const number = await Like.destroy({ where: { userId } });
		return !!number;
	}
}

export default new LikeService();
