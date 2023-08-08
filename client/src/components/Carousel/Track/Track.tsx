import { INIT_CAROUSEL_VALUE } from '@/common/constant/numbers';
import { Box, Flex, Skeleton } from '@chakra-ui/react';
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
		<>
			{carouselWidth !== INIT_CAROUSEL_VALUE ? (
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
			) : (
				<Skeleton className={styles.skeleton} />
			)}
		</>
	);
};

export default Track;
