import { IAxiosError } from '@/common/types/axios';
import { IRegisterProps, IAuthResponse } from '@/common/types/user';
import UserService from '@/service/UserService';
import { useMutation } from 'react-query';

const useRegistration = () => {
	// const { user } = useContext(Context);
	const {
		mutate: registration,
		isSuccess,
		isLoading,
		error,
	} = useMutation(['registration'], {
		mutationFn: (data: FormData) => UserService.registration(data),
		onSuccess: (data: IAuthResponse) => {
			localStorage.setItem('token', data.accessToken);
			console.log(data.user);

			// user.setUser(data.user);
			// user.setIsAuth(true);
		},
	});

	const err = error as IAxiosError<{ message: string }>;
	return { registration, isSuccess, isLoading, err };
};

export default useRegistration;
