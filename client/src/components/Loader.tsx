import { FC } from 'react';
import { Box, Spinner } from '@chakra-ui/react';

interface ILoaderProps {
	width?: string;
	height?: string;
}

const Loader: FC<ILoaderProps> = ({ width, height }) => {
	return (
		<Box
			position='absolute'
			top='50%'
			left='50%'
			w={width}
			h={height}
			transform='translate(-50%,-50%)'
		>
			<Spinner />
		</Box>
	);
};

export default Loader;
