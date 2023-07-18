import { ILike } from '@/common/types/like';

export const checkIsLikeActive = (likes: ILike[], userId: number): boolean => {
	let isLikeActive = false;
	likes?.forEach(like => {
		if (like.userId === userId) isLikeActive = true;
	});
	return isLikeActive;
};
