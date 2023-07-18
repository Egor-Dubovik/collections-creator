import { IAxiosError } from '@/common/types/axios';
import CommentService from '@/service/CommentService';
import { useQuery } from 'react-query';

const useGetItemComments = (id: string) => {
	const {
		data: comments,
		refetch,
		isLoading,
		isSuccess,
		error,
	} = useQuery({
		queryKey: ['comments list'],
		queryFn: () => CommentService.getAllByItemId(id),
	});

	const err = error as IAxiosError<{ message: string }>;
	return { comments, refetch, isLoading, isSuccess, err };
};

export default useGetItemComments;
