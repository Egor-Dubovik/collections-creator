import { ROUTES } from '@/common/types/api';
import { IAxiosError } from '@/common/types/axios';
import { IRegisterProps } from '@/common/types/user';
import { useRouter } from 'next/navigation';
import { MutableRefObject, useEffect, useRef } from 'react';
import { UseFormReset } from 'react-hook-form';

const useAuthNotification = (
	isSuccess: boolean,
	err: IAxiosError<{ message: string }>,
	reset: UseFormReset<IRegisterProps>,
	addToast: (isSuccess: boolean, toastIdRef: MutableRefObject<string | null>) => void
) => {
	const toastIdRef = useRef<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		if (isSuccess) {
			reset();
			router.push(ROUTES.HOME);
		}
		if (isSuccess || err) addToast(isSuccess, toastIdRef);
	}, [isSuccess, err]);
};

export default useAuthNotification;
