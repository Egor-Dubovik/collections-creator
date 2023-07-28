import { Includeable } from 'sequelize';
import { Tag } from '../models/all/TagModel';
import Comment from '../models/all/CommentModel';

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

	buildFilters(isCommented?: boolean, tags?: string[]): Includeable[] {
		const filters = [] as Includeable[];
		if (isCommented) {
			const commentFilter = this.createComment();
			filters.push(commentFilter);
		}
		if (tags?.length) {
			const tagInclude = this.createTagInclude(tags);
			filters.push(tagInclude);
		}
		return filters;
	}
}

export default new FilterService();
