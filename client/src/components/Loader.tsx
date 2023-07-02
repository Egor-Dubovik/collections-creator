import { FC } from 'react';
import { Box, Spinner } from '@chakra-ui/react';

interface ILoaderProps {
	width?: string;
	height?: string;
}

const Loader: FC<ILoaderProps> = ({ width = '40px', height = '40px' }) => {
	return (
		<Box
			position='absolute'
			top='50%'
			left='50%'
			width={width}
			height={height}
			transform='translate(-50%,-50%)'
		>
			<Spinner position='absolute' width='100%' height='100%' />
		</Box>
	);
};

export default Loader;
