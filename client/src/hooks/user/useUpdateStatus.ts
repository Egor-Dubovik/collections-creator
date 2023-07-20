import { IAxiosError } from '@/common/types/axios';
import { useMutation, useQueryClient } from 'react-query';
import { IUpdateStatusData } from '@/common/types/user';
import UserService from '@/service/UserService';

const useUpdateStatus = () => {
	const client = useQueryClient();
	const {
		mutate: updateStatus,
		isLoading: isLoadingStatus,
		error,
	} = useMutation({
		mutationKey: ['updated status'],
		mutationFn: (data: IUpdateStatusData) => UserService.updateStatus(data),
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ['search users'] });
		},
	});

	const err = error as IAxiosError<{ message: string }>;
	return { updateStatus, isLoadingStatus, err };
};

export default useUpdateStatus;
