import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Button, FormControl, HStack, Input } from '@chakra-ui/react';
import { TypeProp } from '@/common/types/collection';
import { IItemProp } from '@/common/types/item';
import PropsContainer from '../PropsContainer/PropsContainer';
import ItemNameAndTypeSelect from '../selects/ItemNameAndTypeSelect';

interface IItemProps {
	collectionId: number;
	props: IItemProp[];
	setProps: Dispatch<SetStateAction<IItemProp[]>>;
}

const ItemProps = ({ collectionId, props, setProps }: IItemProps) => {
	const [type, setType] = useState<TypeProp>('text');
	const [name, setName] = useState<string>('dd');
	const [value, setValue] = useState<string>('');
	const inputValueRef = useRef<HTMLInputElement | null>(null);

	const handleDeleteProp = (propName: string) => {
		setProps(prevProps => prevProps.filter(prop => prop.name !== propName));
	};

	const onSubmit = (): void => {
		if (value.length) {
			setProps(prevProps => [...prevProps, { type, name, value }]);
			setValue('');
			return;
		}
		inputValueRef.current?.focus();
	};

	useEffect(() => {
		setValue('');
	}, [type]);

	return (
		<div className='item-props'>
			<PropsContainer props={props} handleDelete={handleDeleteProp} />
			<div>
				<HStack mb={3}>
					<ItemNameAndTypeSelect collectionId={collectionId} setType={setType} setName={setName} />
					<FormControl>
						<Input
							key={type}
							ref={inputValueRef}
							value={value}
							onChange={event => setValue(event.target.value)}
							type={type}
							placeholder='value'
						/>
					</FormControl>
				</HStack>
				<HStack>
					<Button colorScheme='teal' variant='outline' w='100%' type='button' onClick={onSubmit}>
						add
					</Button>
					<Button w='100%' colorScheme='red' variant='outline' onClick={() => setValue('')}>
						reset
					</Button>
				</HStack>
			</div>
		</div>
	);
};

export default ItemProps;
