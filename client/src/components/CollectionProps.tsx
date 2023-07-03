import { FC, useEffect, useState } from 'react';
import { ICollectionProp, TypeProp } from '@/common/types/collection';
import {
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	Heading,
	HStack,
	Input,
	Select,
} from '@chakra-ui/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { PropTypes } from '@/common/constant/collectons';

const CollectionProps: FC = () => {
	const [props, setProps] = useState<ICollectionProp[]>([]);
	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<ICollectionProp>();

	const onSubmit: SubmitHandler<ICollectionProp> = data => {
		console.log(data);
		setProps([...props, data]);
		reset();
	};

	return (
		<div>
			<div>
				<Heading as='h6' size='md' mb={2}>
					Props:
				</Heading>
				<div>
					{props.map(prop => {
						return <p key={prop.name}>{prop.name}</p>;
					})}
				</div>
			</div>

			<form onSubmit={handleSubmit(onSubmit)}>
				<HStack>
					<Controller
						control={control}
						name='type'
						rules={{ required: 'Type is required' }}
						render={({ field: { onChange, value } }) => (
							<Select value={value} onChange={newValue => onChange(newValue)}>
								{PropTypes.map(type => (
									<option key={type.value} value={type.value}>
										{type.name}
									</option>
								))}
							</Select>
						)}
					/>
					<FormControl isInvalid={Boolean(errors.name)} mt={3}>
						<Input
							{...register('name', { required: 'Name is required' })}
							type='text'
							placeholder='name'
						/>
						{errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
					</FormControl>
				</HStack>
				<HStack>
					<Button type='submit'>add</Button>
					<Button onClick={() => reset()}>reset</Button>
				</HStack>
			</form>
		</div>
	);
};

export default CollectionProps;
