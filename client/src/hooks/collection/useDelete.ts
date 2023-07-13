import { IAxiosError } from '@/common/types/axios';
import { useMutation, useQueryClient } from 'react-query';
import CollectionService from '@/service/CollectionService';

const useDeleteCollection = () => {
	const client = useQueryClient();
	const {
		mutate: deleteCollection,
		isSuccess,
		isLoading,
		error,
	} = useMutation({
		mutationKey: ['delete collection'],
		mutationFn: (id: number) => CollectionService.delete(id),
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ['user collections'] });
		},
	});

	const err = error as IAxiosError<{ message: string }>;
	return { deleteCollection, isSuccess, isLoading, err };
};

export default useDeleteCollection;
