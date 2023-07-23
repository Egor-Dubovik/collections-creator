import { Box, Flex } from '@chakra-ui/react';
import styles from './Track.module.css';

interface ITrackProps {
	children: React.ReactNode[];
	moveWidth: number;
	carouselWidth: number;
	gap: number;
	totalGapWidth: number;
	visibleItemsAmount: number;
}

const Track = ({
	children,
	moveWidth,
	carouselWidth,
	gap,
	totalGapWidth,
	visibleItemsAmount,
}: ITrackProps) => {
	return (
		<Flex as='ul' className={styles.track} gap={gap} transform={`translateX(-${moveWidth}px)`}>
			{children.map((child, index) => (
				<Box
					as='li'
					key={index}
					className={styles.slide}
					flex={`0 0 ${Math.floor((carouselWidth - totalGapWidth) / visibleItemsAmount)}px`}
					w={Math.floor((carouselWidth - totalGapWidth) / visibleItemsAmount)}
				>
					{child}
				</Box>
			))}
		</Flex>
	);
};

export default Track;
