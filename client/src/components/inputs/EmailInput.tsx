import { FC } from 'react';
import { IRegisterProps } from '@/common/types/user';
import { FormControl, FormErrorMessage, Input } from '@chakra-ui/react';
import { FieldError, UseFormRegister } from 'react-hook-form';

interface IEmailProps {
	register: UseFormRegister<IRegisterProps>;
	error?: FieldError;
}

const EmailInput: FC<IEmailProps> = ({ register, error }) => {
	return (
		<FormControl isInvalid={!!error} mt={3}>
			<Input
				{...register('email', {
					required: 'Email is required',
					pattern: {
						value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
						message: 'Please enter valid email! Example: test@gmail.com',
					},
				})}
				type='email'
				placeholder='email'
			/>
			{error && <FormErrorMessage>{error.message}</FormErrorMessage>}
		</FormControl>
	);
};

export default EmailInput;
