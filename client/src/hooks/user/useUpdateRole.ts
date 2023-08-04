import { useMutation, useQueryClient } from 'react-query';
import { IUpdateRoleData } from '@/common/types/user';
import UserService from '@/service/UserService';

const useUpdateRole = () => {
	const client = useQueryClient();
	const { mutate: updateRole, isLoading: isLoadingRole } = useMutation({
		mutationKey: ['updated status'],
		mutationFn: (data: IUpdateRoleData) => UserService.updateRole(data),
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ['search users'] });
		},
	});

	return { updateRole, isLoadingRole };
};

export default useUpdateRole;
