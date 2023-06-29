import { FC, useState } from 'react';
import {
	Button,
	FormControl,
	FormErrorMessage,
	Input,
	InputGroup,
	InputRightElement,
} from '@chakra-ui/react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { ISignUpProps } from '@/common/types/user';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

interface IPasswordProps {
	register: UseFormRegister<ISignUpProps>;
	error?: FieldError;
}

const PasswordInput: FC<IPasswordProps> = ({ register, error }) => {
	const [show, setShow] = useState(false);
	const handleClick = () => setShow(!show);

	const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;

	return (
		<InputGroup size='md' mt={3}>
			<FormControl isInvalid={!!error}>
				<Input
					{...register('password', {
						required: 'Password is required',
						pattern: {
							value: passwordRegex,
							message:
								'Password should contain at least 4 characters, including English letters and numbers',
						},
					})}
					pr='4.5rem'
					type={show ? 'text' : 'password'}
					placeholder='password'
				/>
				{error && <FormErrorMessage>{error.message}</FormErrorMessage>}
			</FormControl>

			<InputRightElement width='4.5rem'>
				<button type='button' onClick={handleClick}>
					{show ? <ViewOffIcon /> : <ViewIcon />}
				</button>
			</InputRightElement>
		</InputGroup>
	);
};

export default PasswordInput;
