import { Op, WhereOptions } from 'sequelize';
import Like from '../models/all/LikeModule';
import Comment from '../models/all/CommentModel';
import { Tag } from '../models/all/TagModel';

class FilterService {
	createLike(minCount: number, maxCount: number) {
		return { model: Like, where: { count: { [Op.between]: [minCount, maxCount] } } };
	}

	createComment() {
		const filter: WhereOptions = {
			model: Comment,
			where: { [Op.not]: { id: null }, required: true },
		};
		return filter;
	}

	createTagInclude(tags: string[]) {
		return { model: Tag, attributes: tags };
	}
}

export default new FilterService();
