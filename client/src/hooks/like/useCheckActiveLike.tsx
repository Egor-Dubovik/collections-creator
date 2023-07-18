import { useEffect, useState } from 'react';
import { ILike } from '@/common/types/like';

const useCheckActiveLike = (likes: ILike[] | undefined, userId: number | undefined) => {
	const [isActive, setIsActive] = useState(false);
	useEffect(() => {
		if (!likes || !userId) return;
		setIsActive(false);
		likes.forEach(like => {
			if (like.userId === userId) setIsActive(true);
		});
	}, [likes, userId]);
	return isActive;
};

export default useCheckActiveLike;
