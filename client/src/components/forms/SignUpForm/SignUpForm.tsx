'use client';
import { FC, useState } from 'react';
import PasswordInput from '@/components/inputs/PasswordInput';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ISignUpProps } from '@/common/types/user';
import NickNameInput from '@/components/inputs/NickNameInput';
import { Button } from '@chakra-ui/react';
import EmailInput from '@/components/inputs/EmailInput';
import FileInput from '@/components/inputs/FileInput/FileInput';
import styles from './signUpForm.module.css';

const SignUpForm: FC = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ISignUpProps>();
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const onSubmit: SubmitHandler<ISignUpProps> = data => {
		console.log(data);
		console.log('Uploaded file:', selectedFile);
		reset();
	};

	const handleFileUpload = (file: File | null) => {
		setSelectedFile(file);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.signUpForm}>
			<NickNameInput register={register} error={errors.nickName} />
			<EmailInput register={register} error={errors.email} />
			<PasswordInput register={register} error={errors.password} />
			<FileInput onFileUpload={handleFileUpload} fileName='avatar' />
			{/* isLoading={props.isSubmitting} */}
			<Button mt={3} colorScheme='teal' type='submit'>
				Submit
			</Button>
		</form>
	);
};

export default SignUpForm;
