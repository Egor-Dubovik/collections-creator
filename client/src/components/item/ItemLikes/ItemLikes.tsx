'use client';
import { WARNING_MESSAGE } from '@/common/constant/message';
import { LIKE_WARNING_DURATION } from '@/common/constant/numbers';
import Like from '@/components/Like/Like';
import useCheckActiveLike from '@/hooks/like/useCheckActiveLike';
import useCreateLike from '@/hooks/like/useCreateLike';
import useDeleteLike from '@/hooks/like/useDeleteLike';
import useGetLikes from '@/hooks/like/useGetLikes';
import useUserStore from '@/store/UserStore';
import { useToast } from '@chakra-ui/react';

interface IItemLikesProps {
	itemId: string;
}

const ItemLikes = ({ itemId }: IItemLikesProps) => {
	const user = useUserStore.use.user();
	const { likes } = useGetLikes(itemId);
	const { create, isLoadingCreation } = useCreateLike();
	const { deleteLike, isLoadingDeletion } = useDeleteLike();
	const isActive = useCheckActiveLike(likes, user?.id);
	const toast = useToast();
	const toastId = 'test-toast';

	const handleSwitchLike = (isActive: boolean): void => {
		if (!isLoadingCreation && !isLoadingDeletion) {
			isActive
				? deleteLike(user?.id as number)
				: create({ itemId: Number(itemId), userId: user?.id as number });
		}
	};

	const showWarningMessage = (): void => {
		if (!toast.isActive(toastId)) {
			toast({
				id: toastId,
				description: WARNING_MESSAGE.LIKE,
				duration: LIKE_WARNING_DURATION,
			});
		}
	};

	const handleClick = (): void => {
		user ? handleSwitchLike(isActive) : showWarningMessage();
	};

	return <Like onClick={handleClick} likes={likes} isActive={isActive} />;
};

export default ItemLikes;
