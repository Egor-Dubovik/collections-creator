'use client';
import { FC, useState } from 'react';
import PasswordInput from '@/components/inputs/PasswordInput';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IRegisterProps } from '@/common/types/user';
import NickNameInput from '@/components/inputs/NickNameInput';
import { Button } from '@chakra-ui/react';
import EmailInput from '@/components/inputs/EmailInput';
import FileInput from '@/components/inputs/FileInput/FileInput';

const SignUpForm: FC = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IRegisterProps>();
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const onSubmit: SubmitHandler<IRegisterProps> = data => {
		console.log(data);
		console.log('Uploaded file:', selectedFile);
		reset();
	};

	const handleFileUpload = (file: File | null) => {
		setSelectedFile(file);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='auth-form'>
			<NickNameInput register={register} error={errors.nickName} />
			<EmailInput register={register} error={errors.email} />
			<PasswordInput register={register} error={errors.password} />
			<FileInput onFileUpload={handleFileUpload} fileName='avatar' />
			{/* isLoading={props.isSubmitting} */}
			<Button mt={3} p='25px 10px' w='100%' colorScheme='teal' type='submit'>
				sign up
			</Button>
		</form>
	);
};

export default SignUpForm;
