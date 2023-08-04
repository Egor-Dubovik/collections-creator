import { IAxiosError } from '@/common/types/axios';
import { useQuery } from 'react-query';
import LikeService from '@/service/LikeService';

const useGetLikes = (id: string) => {
	const {
		data: likes,
		refetch,
		isLoading,
		isSuccess,
		error,
	} = useQuery({
		queryKey: ['likes'],
		queryFn: () => LikeService.getAllByItemId(id),
	});

	const err = error as IAxiosError<{ message: string }>;
	return { likes, refetch, isLoading, isSuccess, err };
};

export default useGetLikes;
