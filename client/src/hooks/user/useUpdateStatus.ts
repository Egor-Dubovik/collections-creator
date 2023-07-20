import { useMutation, useQueryClient } from 'react-query';
import { IUpdateStatusData } from '@/common/types/user';
import UserService from '@/service/UserService';

const useUpdateStatus = () => {
	const client = useQueryClient();
	const { mutate: updateStatus, isLoading: isLoadingStatus } = useMutation({
		mutationKey: ['updated status'],
		mutationFn: (data: IUpdateStatusData) => UserService.updateStatus(data),
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ['search users'] });
		},
	});

	return { updateStatus, isLoadingStatus };
};

export default useUpdateStatus;
