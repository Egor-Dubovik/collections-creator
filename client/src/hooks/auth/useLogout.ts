import { IAxiosError } from '@/common/types/axios';
import { useMutation } from 'react-query';
import UserService from '@/service/UserService';
import useUserStore from '../../store/UserStore';

const useLogout = () => {
	const setUser = useUserStore.use.setUser();
	const {
		mutate: logout,
		isSuccess,
		isLoading,
		error,
	} = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => UserService.logout(),
		onSuccess: () => {
			if (typeof window !== 'undefined') localStorage.removeItem('token');
			setUser(null);
		},
	});

	const err = error as IAxiosError<{ message: string }>;
	return { logout, isSuccess, isLoading, err };
};

export default useLogout;
