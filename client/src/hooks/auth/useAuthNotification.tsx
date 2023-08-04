import { ROUTES } from '@/common/types/api';
import { IAxiosError } from '@/common/types/axios';
import { IRegisterProps } from '@/common/types/user';
import { ToastId } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { UseFormReset } from 'react-hook-form';
import { TypeNotification } from './useAuthToast';

const useAuthNotification = (
	isSuccess: boolean,
	err: IAxiosError<{ message: string }>,
	authType: TypeNotification,
	addNotification: (isSuccess: boolean, toastType: TypeNotification) => ToastId,
	reset?: UseFormReset<IRegisterProps>
) => {
	const router = useRouter();
	const redirectPath = authType !== 'LOGOUT' ? ROUTES.PROFILE : ROUTES.HOME;

	useEffect(() => {
		if (isSuccess) {
			if (reset) reset();
			router.push(redirectPath);
		}
		if (isSuccess || err) addNotification(isSuccess, authType);
	}, [isSuccess, err]);
};

export default useAuthNotification;
