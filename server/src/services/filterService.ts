import { Includeable } from 'sequelize';
import Comment from '../models/all/CommentModel';
import { Tag } from '../models/all/TagModel';

class FilterService {
	createComment(): Includeable {
		return { model: Comment, required: true };
	}

	createTagInclude(tags: string[]) {
		return {
			model: Tag,
			where: { value: tags },
			attributes: ['id', 'value'],
			through: { attributes: [] },
		};
	}
}

export default new FilterService();
