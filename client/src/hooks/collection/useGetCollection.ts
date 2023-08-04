import { IAxiosError } from '@/common/types/axios';
import { useQuery } from 'react-query';
import CollectionService from '@/service/CollectionService';

const useGetCollection = (id: number) => {
	const {
		data: collection,
		isLoading,
		isSuccess,
		error,
	} = useQuery({
		queryKey: ['collection'],
		queryFn: () => CollectionService.getOne(id),
	});

	const err = error as IAxiosError<{ message: string }>;
	return { collection, isLoading, isSuccess, err };
};

export default useGetCollection;
