import { ChangeEvent, Dispatch, SetStateAction, useState, useEffect } from 'react';
import { TypeProp } from '@/common/types/collection';
import { Select } from '@chakra-ui/react';
import useGetCollectionProps from '@/hooks/props/useGetCollectionProps';

interface IItemTypeSelectProps {
	collectionId: number;
	setType: Dispatch<SetStateAction<TypeProp>>;
	setName: Dispatch<SetStateAction<string>>;
}

const ItemNameAndTypeSelect = ({ setType, setName, collectionId }: IItemTypeSelectProps) => {
	const { data } = useGetCollectionProps(collectionId);

	const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const [name, type] = event.target.value.split('|');
		setType(type as TypeProp);
		setName(name);
	};

	useEffect(() => {
		if (data) {
			setType(data[0].type);
			setName(data[0].name);
		}
	}, [data]);

	return (
		<Select onChange={event => handleChange(event)}>
			{data?.map(prop => (
				<option key={prop.name} value={`${prop.name}|${prop.type}`}>
					{prop.name} ({prop.type})
				</option>
			))}
		</Select>
	);
};

export default ItemNameAndTypeSelect;
