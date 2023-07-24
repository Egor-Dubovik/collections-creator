import { IAxiosError } from '@/common/types/axios';
import { IAuthResponse, ILoginParams } from '@/common/types/user';
import { useMutation } from 'react-query';
import UserService from '@/service/UserService';
import useUserStore from '../../store/UserStore';

const useLogin = () => {
	const setUser = useUserStore.use.setUser();
	const {
		mutate: login,
		isSuccess,
		isLoading,
		error,
	} = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: ILoginParams) => UserService.login(data),
		onSuccess: (data: IAuthResponse) => {
			localStorage.setItem('token', data.accessToken);
			localStorage.setItem('refreshToken', data.refreshToken);
			setUser(data.user);
		},
	});

	const err = error as IAxiosError<{ message: string }>;
	return { login, isSuccess, isLoading, err };
};

export default useLogin;
