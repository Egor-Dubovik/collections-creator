import { IAxiosError } from '@/common/types/axios';
import { useMutation } from 'react-query';
import CollectionService from '@/service/CollectionService';

const useCreate = () => {
	const {
		mutate: create,
		isSuccess,
		isLoading,
		error,
	} = useMutation({
		mutationKey: ['collection'],
		mutationFn: (data: FormData) => CollectionService.create(data),
	});

	const err = error as IAxiosError<{ message: string }>;
	return { create, isSuccess, isLoading, err };
};

export default useCreate;
