import { IAxiosError } from '@/common/types/axios';
import { IAuthResponse } from '@/common/types/user';
import UserService from '@/service/UserService';
import { useMutation } from 'react-query';
import useUserStore from '../../../store/UserStore';

const useRegistration = () => {
	const setUser = useUserStore.use.setUser();
	const {
		mutate: registration,
		isSuccess,
		isLoading,
		error,
	} = useMutation(['registration'], {
		mutationFn: (data: FormData) => UserService.registration(data),
		onSuccess: (data: IAuthResponse) => {
			localStorage.setItem('token', data.accessToken);
			setUser(data.user);
		},
	});

	const err = error as IAxiosError<{ message: string }>;
	return { registration, isSuccess, isLoading, err };
};

export default useRegistration;
