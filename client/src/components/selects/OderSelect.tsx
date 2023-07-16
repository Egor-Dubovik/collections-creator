import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { TypeOrder } from '@/common/types/item';
import { Select } from '@chakra-ui/react';

interface IOderSelectProps {
	order: TypeOrder;
	setOrder: Dispatch<SetStateAction<TypeOrder>>;
}

const OderSelect = ({ order, setOrder }: IOderSelectProps) => {
	const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setOrder(event.target.value as TypeOrder);
	};

	return (
		<Select mt={3} value={order} onChange={event => handleChange(event)}>
			<option value={'desc'}>descending</option>
			<option value={'asc'}>ascending</option>
		</Select>
	);
};

export default OderSelect;
