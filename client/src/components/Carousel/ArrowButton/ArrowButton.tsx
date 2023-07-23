import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Flex, IconButton, useColorMode } from '@chakra-ui/react';
import styles from './ArrowButton.module.css';

interface IArrowButtonProps {
	onSwitchLeft: () => void;
	onSwitchRight: () => void;
}

const ArrowButton = ({ onSwitchLeft, onSwitchRight }: IArrowButtonProps) => {
	const { colorMode } = useColorMode();

	return (
		<Flex className={styles.arrowBox}>
			<IconButton
				aria-label='Previous Slide'
				icon={<ChevronLeftIcon />}
				onClick={onSwitchLeft}
				className={styles.arrowButton}
				backgroundColor={colorMode !== 'dark' ? 'gray.200' : 'gray.700'}
				borderColor={colorMode !== 'dark' ? 'gray.400' : 'gray.300'}
				_hover={{ bgColor: `${colorMode !== 'dark' ? 'gray.300' : 'gray.800'}` }}
			/>
			<IconButton
				aria-label='Next Slide'
				icon={<ChevronRightIcon />}
				onClick={onSwitchRight}
				className={styles.arrowButton}
				backgroundColor={colorMode !== 'dark' ? 'gray.200' : 'gray.700'}
				borderColor={colorMode !== 'dark' ? 'gray.400' : 'gray.300'}
				_hover={{ bgColor: `${colorMode !== 'dark' ? 'gray.300' : 'gray.800'}` }}
			/>
		</Flex>
	);
};

export default ArrowButton;
