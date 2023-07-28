import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, useColorMode } from '@chakra-ui/react';
import styles from './ArrowButton.module.css';

interface IArrowButtonProps {
	onSwitchLeft: () => void;
	onSwitchRight: () => void;
}

const ArrowButton = ({ onSwitchLeft, onSwitchRight }: IArrowButtonProps) => {
	const { colorMode } = useColorMode();

	return (
		<>
			<Box
				as='button'
				aria-label='Previous Slide'
				onClick={onSwitchLeft}
				className={`${styles.arrowButton} ${styles.arrowLeft}`}
				backgroundColor={colorMode !== 'dark' ? 'gray.200' : 'gray.700'}
				borderColor={colorMode !== 'dark' ? 'gray.400' : 'gray.300'}
				_hover={{ bgColor: `${colorMode !== 'dark' ? 'gray.300' : 'gray.800'}` }}
			>
				<ChevronLeftIcon />
			</Box>
			<Box
				as='button'
				aria-label='Next Slide'
				onClick={onSwitchRight}
				className={`${styles.arrowButton} ${styles.arrowRight}`}
				backgroundColor={colorMode !== 'dark' ? 'gray.200' : 'gray.700'}
				borderColor={colorMode !== 'dark' ? 'gray.400' : 'gray.300'}
				_hover={{ bgColor: `${colorMode !== 'dark' ? 'gray.300' : 'gray.800'}` }}
			>
				<ChevronRightIcon />
			</Box>
		</>
	);
};

export default ArrowButton;
