import { IAxiosError } from '@/common/types/axios';
import { useQuery } from 'react-query';
import ItemService from '@/service/ItemService';

const useGetCollectionItems = (itemId: string) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['collection items'],
		queryFn: () => ItemService.getCollectionItems(itemId),
		staleTime: 300000,
	});

	const err = error as IAxiosError<{ message: string }>;
	return { data, isLoading, err };
};

export default useGetCollectionItems;
