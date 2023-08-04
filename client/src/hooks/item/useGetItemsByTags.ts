import { IAxiosError } from '@/common/types/axios';
import { useQuery } from 'react-query';
import ItemService from '@/service/ItemService';

const useGetItemsByTags = (tags: string) => {
	const {
		data: items,
		refetch,
		isLoading: isTagItemsLoading,
		error,
	} = useQuery({
		queryKey: ['items by tags'],
		queryFn: () => ItemService.getItemsByTags(tags),
		enabled: false,
		cacheTime: 0,
	});

	const err = error as IAxiosError<{ message: string }>;
	return { items, refetch, isTagItemsLoading, err };
};

export default useGetItemsByTags;
