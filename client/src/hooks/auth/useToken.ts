import { IAxiosError } from '@/common/types/axios';
import { IAuthResponse } from '@/common/types/user';
import { useMutation } from 'react-query';
import UserService from '@/service/UserService';
import useUserStore from '../../store/UserStore';

const useRefreshToken = () => {
	const setUser = useUserStore.use.setUser();
	const {
		mutate: refresh,
		isSuccess,
		isLoading,
		error,
	} = useMutation({
		mutationKey: ['refresh token'],
		mutationFn: () => UserService.refreshToken(),
		onSuccess: (data: IAuthResponse) => {
			localStorage.setItem('token', data.accessToken);
			setUser(data.user);
		},
		onError: () => {
			localStorage.removeItem('token');
		},
	});

	const err = error as IAxiosError<{ message: string }>;
	return { refresh, isSuccess, isLoading, err };
};

export default useRefreshToken;
