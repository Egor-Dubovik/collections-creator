import { IAxiosError } from '@/common/types/axios';
import { useMutation } from 'react-query';
import ItemService from '@/service/ItemService';

const useCreateItem = () => {
	const {
		mutate: create,
		isSuccess,
		isLoading,
		error,
	} = useMutation({
		mutationKey: ['item'],
		mutationFn: (data: FormData) => ItemService.create(data),
	});

	const err = error as IAxiosError<{ message: string }>;
	return { create, isSuccess, isLoading, err };
};

export default useCreateItem;
