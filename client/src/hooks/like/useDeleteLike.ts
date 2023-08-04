import { IAxiosError } from '@/common/types/axios';
import { useMutation, useQueryClient } from 'react-query';
import LikeService from '@/service/LikeService';

const useDeleteLike = () => {
	const client = useQueryClient();
	const {
		mutate: deleteLike,
		isSuccess,
		isLoading: isLoadingDeletion,
		error,
	} = useMutation({
		mutationKey: ['delete like'],
		mutationFn: (id: number) => LikeService.delete(id),
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ['likes'] });
		},
	});

	const err = error as IAxiosError<{ message: string }>;
	return { deleteLike, isSuccess, isLoadingDeletion, err };
};

export default useDeleteLike;
