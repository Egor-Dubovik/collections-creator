import { IAxiosError } from '@/common/types/axios';
import { useMutation, useQueryClient } from 'react-query';
import LikeService from '@/service/LikeService';
import { ILike } from '@/common/types/like';

const useCreateLike = () => {
	const client = useQueryClient();
	const {
		mutate: create,
		isSuccess,
		isLoading: isLoadingCreation,
		error,
	} = useMutation({
		mutationKey: ['new like'],
		mutationFn: (data: ILike) => LikeService.addLike(data),
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ['likes'] });
		},
	});

	const err = error as IAxiosError<{ message: string }>;
	return { create, isSuccess, isLoadingCreation, err };
};

export default useCreateLike;
