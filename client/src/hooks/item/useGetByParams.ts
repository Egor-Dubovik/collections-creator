import { IAxiosError } from '@/common/types/axios';
import { IItemQuery } from '@/common/types/item';
import { useQuery } from 'react-query';
import ItemService from '@/service/ItemService';

const useGetItemsByParams = (queryData: IItemQuery) => {
	const { data, refetch, isLoading, isSuccess, error } = useQuery({
		queryKey: ['item list'],
		queryFn: () => ItemService.getByParams(queryData),
		cacheTime: 0,
	});

	const err = error as IAxiosError<{ message: string }>;
	return { data, refetch, isLoading, isSuccess, err };
};

export default useGetItemsByParams;
