import { FC } from 'react';
import { ISignUpProps } from '@/common/types/user';
import { FormControl, FormErrorMessage, Input } from '@chakra-ui/react';
import { FieldError, UseFormRegister } from 'react-hook-form';

interface INickNameProps {
	register: UseFormRegister<ISignUpProps>;
	error?: FieldError;
}

const NickNameInput: FC<INickNameProps> = ({ register, error }) => {
	return (
		<FormControl isInvalid={!!error} mt={3}>
			<Input
				{...register('nickName', {
					required: 'NickName is required',
					minLength: {
						value: 3,
						message: 'NickName should contain at least 3 characters',
					},
				})}
				placeholder='nickName'
				size='md'
			/>
			{error && <FormErrorMessage>{error.message}</FormErrorMessage>}
		</FormControl>
	);
};

export default NickNameInput;
