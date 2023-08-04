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
		mutationFn: () => {
			let refreshToken: string | null = null;
			if (typeof window !== 'undefined') refreshToken = localStorage.getItem('refreshToken');
			return UserService.refreshToken(refreshToken);
		},
		onSuccess: (data: IAuthResponse) => {
			if (typeof window !== 'undefined') {
				localStorage.setItem('token', data.accessToken);
				localStorage.setItem('refreshToken', data.refreshToken);
			}
			setUser(data.user);
		},
		onError: () => {
			localStorage.removeItem('token');
			localStorage.removeItem('refreshToken');
		},
	});

	const err = error as IAxiosError<{ message: string }>;
	return { refresh, isSuccess, isLoading, err };
};

export default useRefreshToken;
