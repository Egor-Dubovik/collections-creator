import { Dispatch, FC, SetStateAction, useState } from 'react';
import { ICollectionProp, TypeProp } from '@/common/types/collection';
import { Button, FormControl, HStack, Input, Select } from '@chakra-ui/react';
import { PropTypes } from '@/common/constant/collections';
import PropsContainer from './PropsContainer/PropsContainer';

interface ICollectionProps {
	props: ICollectionProp[];
	setProps: Dispatch<SetStateAction<ICollectionProp[]>>;
}

const CollectionProps: FC<ICollectionProps> = ({ props, setProps }) => {
	const [type, setType] = useState<TypeProp>('text');
	const [name, setName] = useState<string>('');

	const handleDeleteProp = (propName: string) => {
		setProps(prevProps => prevProps.filter(prop => prop.name !== propName));
	};

	const onSubmit = (): void => {
		if (name.length) setProps([...props, { name, type }]);
		setName('');
	};

	return (
		<div className='collection-props'>
			<PropsContainer props={props} handleDelete={handleDeleteProp} />
			<div>
				<HStack mb={3}>
					<Select value={type} onChange={event => setType(event.target.value as TypeProp)}>
						{PropTypes.map(type => (
							<option key={type.value} value={type.value}>
								{type.name}
							</option>
						))}
					</Select>
					<FormControl>
						<Input
							value={name}
							onChange={event => setName(event.target.value)}
							type='text'
							placeholder='name'
						/>
					</FormControl>
				</HStack>
				<HStack>
					<Button colorScheme='teal' variant='outline' w='100%' type='button' onClick={onSubmit}>
						add
					</Button>
					<Button w='100%' colorScheme='red' variant='outline' onClick={() => setName('')}>
						reset
					</Button>
				</HStack>
			</div>
		</div>
	);
};

export default CollectionProps;
