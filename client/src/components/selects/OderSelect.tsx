import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { TypeOrder } from '@/common/types/item';
import { Box, Select, Text } from '@chakra-ui/react';

interface IOderSelectProps {
	order: TypeOrder;
	setOrder: Dispatch<SetStateAction<TypeOrder>>;
}

const OderSelect = ({ order, setOrder }: IOderSelectProps) => {
	const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setOrder(event.target.value as TypeOrder);
	};

	return (
		<Box>
			<Text>Sorting by date creating</Text>
			<Select mt={1} value={order} onChange={event => handleChange(event)}>
				<option value={'desc'}>descending</option>
				<option value={'asc'}>ascending</option>
			</Select>
		</Box>
	);
};

export default OderSelect;
