'use client';
import Like from '@/components/Like/Like';
import useCheckActiveLike from '@/hooks/like/useCheckActiveLike';
import useCreateLike from '@/hooks/like/useCreateLike';
import useDeleteLike from '@/hooks/like/useDeleteLike';
import useGetLikes from '@/hooks/like/useGetLikes';
import useUserStore from '@/store/UserStore';

interface IItemLikesProps {
	itemId: string;
}

const ItemLikes = ({ itemId }: IItemLikesProps) => {
	const user = useUserStore.use.user();
	const { likes } = useGetLikes(itemId);
	const { create, isLoadingCreation } = useCreateLike();
	const { deleteLike, isLoadingDeletion } = useDeleteLike();
	const isActive = useCheckActiveLike(likes, user?.id);

	const handleSwitchLike = (isActive: boolean): void => {
		if (!isLoadingCreation && !isLoadingDeletion) {
			isActive
				? deleteLike(user?.id as number)
				: create({ itemId: Number(itemId), userId: user?.id as number });
		}
	};

	const handleClick = (): void => {
		handleSwitchLike(isActive);
	};

	return <>{user && <Like onClick={handleClick} likes={likes} isActive={isActive} />}</>;
};

export default ItemLikes;
