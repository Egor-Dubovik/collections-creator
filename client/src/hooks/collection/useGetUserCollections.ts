import { IAxiosError } from '@/common/types/axios';
import { useQuery } from 'react-query';
import CollectionService from '@/service/CollectionService';

const useGetUserCollections = (id: number) => {
	const {
		data: userCollections,
		refetch,
		isLoading,
		isSuccess,
		error,
	} = useQuery({
		queryKey: ['user collections'],
		queryFn: () => CollectionService.getAllByUserId(id),
	});

	const err = error as IAxiosError<{ message: string }>;
	return { userCollections, refetch, isLoading, isSuccess, err };
};

export default useGetUserCollections;
