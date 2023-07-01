import { FC } from 'react';
import { IRegisterProps } from '@/common/types/user';
import { Button, Text } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import EmailInput from '../inputs/EmailInput';
import PasswordInput from '../inputs/PasswordInput';
import { ROUTES } from '@/common/types/api';
import Link from 'next/link';
import useLogin from '@/hooks/auth/useLogin';
import useAuthNotification from '@/hooks/auth/useAuthNotification';
import useAuthToast from '@/hooks/useAuthToast';

const LoginForm: FC = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IRegisterProps>();
	const { login, isLoading, isSuccess, err } = useLogin();
	const addToast = useAuthToast();

	const onSubmit: SubmitHandler<IRegisterProps> = data => {
		login(data);
	};

	useAuthNotification(isSuccess, err, 'LOGIN', addToast, reset);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='auth-form'>
			{err && <Text color='tomato'>{err.message}</Text>}
			<EmailInput register={register} error={errors.email} />
			<PasswordInput register={register} error={errors.password} />
			<Button w='100%' p='23px 10px' mt={3} colorScheme='teal' type='submit' isLoading={isLoading}>
				login
			</Button>
			<Text fontSize='lg' mt={2}>
				Don`t have an account?{' '}
				<Link style={{ color: 'teal' }} href={ROUTES.REGISTER}>
					Register
				</Link>{' '}
				now.
			</Text>
		</form>
	);
};

export default LoginForm;
