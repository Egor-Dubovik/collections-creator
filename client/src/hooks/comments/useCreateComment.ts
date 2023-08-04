import { IAxiosError } from '@/common/types/axios';
import { useMutation, useQueryClient } from 'react-query';
import { IComment } from '@/common/types/comment';
import CommentService from '@/service/CommentService';

const useCreateComment = () => {
	const client = useQueryClient();
	const {
		mutate: create,
		isSuccess,
		isLoading,
		error,
	} = useMutation({
		mutationKey: ['new comment'],
		mutationFn: (data: IComment) => CommentService.create(data),
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ['comments list'] });
		},
	});

	const err = error as IAxiosError<{ message: string }>;
	return { create, isSuccess, isLoading, err };
};

export default useCreateComment;
