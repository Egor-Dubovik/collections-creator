import { useToast } from '@chakra-ui/react';
import { AUTH_TOAST } from '@/common/constant/toast';

export type TypeNotification = 'LOGIN' | 'SIGN_UP' | 'LOGOUT';

const useAuthToast = () => {
	const toast = useToast();

	const addToast = (isSuccess: boolean, toastType: TypeNotification) => {
		return toast({
			title: isSuccess ? AUTH_TOAST.SUCCESS.TITLE[toastType] : AUTH_TOAST.ERR.TITLE[toastType],
			description: isSuccess
				? AUTH_TOAST.SUCCESS.DESCRIPT[toastType]
				: AUTH_TOAST.ERR.DESCRIPT[toastType],
			status: isSuccess ? AUTH_TOAST.SUCCESS.STATUS : AUTH_TOAST.ERR.STATUS,
			duration: AUTH_TOAST.DURATION,
			isClosable: AUTH_TOAST.IS_CLOSABLE,
		});
	};

	return addToast;
};

export default useAuthToast;
