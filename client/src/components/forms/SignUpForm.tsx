'use client';
import { FC, useEffect, useRef, useState } from 'react';
import PasswordInput from '@/components/inputs/PasswordInput';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IRegisterProps } from '@/common/types/user';
import NickNameInput from '@/components/inputs/NickNameInput';
import { Button, useToast, Text, FormErrorMessage } from '@chakra-ui/react';
import EmailInput from '@/components/inputs/EmailInput';
import FileInput from '@/components/inputs/FileInput/FileInput';
import useRegistration from '@/hooks/auth/useRegistration';
import { ROUTES } from '@/common/types/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AUTH_TOAST } from '@/common/constant/toast';

const SignUpForm: FC = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IRegisterProps>();
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const { registration, isLoading, isSuccess, err } = useRegistration();
	const toast = useToast();
	const toastIdRef = useRef<string | null>(null);
	const router = useRouter();

	const addToast = (isSuccess: boolean): void => {
		toastIdRef.current = toast({
			title: isSuccess ? AUTH_TOAST.SUCCESS.TITLE : AUTH_TOAST.ERR.TITLE,
			description: isSuccess ? AUTH_TOAST.SUCCESS.DESCRIPT : AUTH_TOAST.ERR.DESCRIPT,
			status: isSuccess ? AUTH_TOAST.SUCCESS.STATUS : AUTH_TOAST.ERR.STATUS,
			duration: AUTH_TOAST.DURATION,
			isClosable: AUTH_TOAST.IS_CLOSABLE,
		}) as string;
	};

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

	useEffect(() => {
		console.log(err);
		if (isSuccess || err) addToast(isSuccess);
		if (isSuccess) {
			reset();
			router.push(ROUTES.HOME);
		}
	}, [isSuccess, err]);

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
