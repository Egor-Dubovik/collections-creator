import { FC } from 'react';
import { IRegisterProps } from '@/common/types/user';
import { Button } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import EmailInput from '../inputs/EmailInput';
import PasswordInput from '../inputs/PasswordInput';

const LoginForm: FC = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IRegisterProps>();

	const onSubmit: SubmitHandler<IRegisterProps> = data => {
		console.log(data);
		reset();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='auth-form'>
			<EmailInput register={register} error={errors.email} />
			<PasswordInput register={register} error={errors.password} />
			{/* isLoading={props.isSubmitting} */}
			<Button w='100%' p='25px 10px' mt={3} colorScheme='teal' type='submit'>
				login
			</Button>
		</form>
	);
};

export default LoginForm;
