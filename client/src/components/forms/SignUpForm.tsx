'use client';
import { FC, useState } from 'react';
import PasswordInput from '@/components/inputs/PasswordInput';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IRegisterProps } from '@/common/types/user';
import NickNameInput from '@/components/inputs/NickNameInput';
import { Button, Text } from '@chakra-ui/react';
import EmailInput from '@/components/inputs/EmailInput';
import FileInput from '@/components/inputs/FileInput/FileInput';
import useRegistration from '@/hooks/auth/useRegistration';
import { ROUTES } from '@/common/types/api';
import Link from 'next/link';
import useAuthNotification from '@/hooks/auth/useAuthNotification';
import useAuthToast from '@/hooks/useAuthToast';

const SignUpForm: FC = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IRegisterProps>();
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const { registration, isLoading, isSuccess, err } = useRegistration();
	const addToast = useAuthToast();

	const appendUserForm = (formData: FormData, data: IRegisterProps): void => {
		const dataEntries = Object.entries(data);
		dataEntries.forEach(field => formData.append(field[0], field[1]));
		formData.append('avatar', selectedFile as unknown as string);
	};

	const handleFileUpload = (file: File | null): void => {
		setSelectedFile(file);
	};

	const onSubmit: SubmitHandler<IRegisterProps> = data => {
		const userFormData = new FormData();
		appendUserForm(userFormData, data);
		registration(userFormData);
	};

	useAuthNotification(isSuccess, err, 'SIGN_UP', addToast, reset);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='auth-form'>
			{err && <Text color='tomato'>{err.message}</Text>}
			<NickNameInput register={register} error={errors.nickName} />
			<EmailInput register={register} error={errors.email} />
			<PasswordInput register={register} error={errors.password} />
			<FileInput onFileUpload={handleFileUpload} fileName='avatar' />
			<Button mt={2} p='25px 10px' w='100%' colorScheme='teal' type='submit' isLoading={isLoading}>
				sign up
			</Button>
			<Text fontSize='lg' mt={2}>
				Already have an account?{' '}
				<Link style={{ color: 'teal' }} href={ROUTES.LOGIN}>
					Login
				</Link>{' '}
				now.
			</Text>
		</form>
	);
};

export default SignUpForm;
