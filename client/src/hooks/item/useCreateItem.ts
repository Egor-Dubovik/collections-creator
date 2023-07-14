import { IAxiosError } from '@/common/types/axios';
import { useMutation, useQueryClient } from 'react-query';
import ItemService from '@/service/ItemService';

const useCreateItem = () => {
	const client = useQueryClient();
	const {
		mutate: create,
		isSuccess,
		isLoading,
		error,
	} = useMutation({
		mutationKey: ['item'],
		mutationFn: (data: FormData) => ItemService.create(data),
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ['item list'] });
		},
	});

	const err = error as IAxiosError<{ message: string }>;
	return { create, isSuccess, isLoading, err };
};

export default useCreateItem;
