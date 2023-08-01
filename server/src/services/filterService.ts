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

	buildTagFilter(tags: string[] | undefined, filters: Includeable[]) {
		if (tags && tags.length) {
			const tagInclude = this.createTagInclude(tags);
			filters.push(tagInclude);
		}
	}

	buildCommentFilter(isCommented: boolean | undefined, filters: Includeable[]) {
		if (isCommented) {
			const commentFilter = this.createComment();
			filters.push(commentFilter);
		}
	}

	buildFilters(isCommented?: boolean, tags?: string[]): Includeable[] {
		const filters = [] as Includeable[];
		this.buildCommentFilter(isCommented, filters);
		this.buildTagFilter(tags, filters);
		return filters;
	}
}

export default new FilterService();
