import { IAxiosError } from '@/common/types/axios';
import { useMutation, useQueryClient } from 'react-query';
import CollectionService from '@/service/CollectionService';

const useCreate = () => {
	const client = useQueryClient();
	const {
		mutate: create,
		isSuccess,
		isLoading,
		error,
	} = useMutation({
		mutationKey: ['collection'],
		mutationFn: (data: FormData) => CollectionService.create(data),
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ['user collections'] });
		},
	});

	const err = error as IAxiosError<{ message: string }>;
	return { create, isSuccess, isLoading, err };
};

export default useCreate;
