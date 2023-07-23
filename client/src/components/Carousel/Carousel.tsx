import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CAROUSEL_STEP, INIT_CAROUSEL_VALUE } from '@/common/constant/numbers';
import { Box } from '@chakra-ui/react';
import { getItemsAmountAndGap } from '@/utils/getItemsAmountAndGap';
import Track from './Track/Track';
import ArrowButton from './ArrowButton/ArrowButton';

interface ICarouselProps {
	children: React.ReactNode[];
}

const Carousel = ({ children }: ICarouselProps) => {
	const [carouselWidth, setCarouselWidth] = useState(INIT_CAROUSEL_VALUE);
	const [totalGapWidth, setTotalGapWidth] = useState(INIT_CAROUSEL_VALUE);
	const [visibleItemsAmount, setVisibleItemsAmount] = useState(INIT_CAROUSEL_VALUE);
	const [gap, setGap] = useState(INIT_CAROUSEL_VALUE);
	const [positionMove, setPositionMove] = useState(INIT_CAROUSEL_VALUE);
	const [moveWidth, setMoveWidth] = useState(INIT_CAROUSEL_VALUE);
	const [itemMoveAmount, setItemMoveAmount] = useState(INIT_CAROUSEL_VALUE);
	const carouselRef = useRef<HTMLDivElement | null>(null);

	const switchLeft = (): void => {
		if (moveWidth > 0) setPositionMove(positionMove - CAROUSEL_STEP);
	};

	const switchRight = (): void => {
		if (itemMoveAmount * positionMove < children.length - visibleItemsAmount) {
			setPositionMove(positionMove + CAROUSEL_STEP);
			return;
		}
		setPositionMove(0);
	};

	const handleSetNewWidth = (): void => {
		const newWidth = carouselRef.current?.clientWidth;
		setCarouselWidth(newWidth as number);
	};

	const handleSetAmount = (itemsOnSlide: number, moveAmount: number): void => {
		setVisibleItemsAmount(itemsOnSlide);
		setItemMoveAmount(moveAmount);
	};

	const handleSetGap = (newGap: number, itemsOnSlide: number): void => {
		setGap(newGap);
		setTotalGapWidth(newGap * (itemsOnSlide - CAROUSEL_STEP));
	};

	const handleResize = (): void => {
		if (carouselRef.current) {
			const screenWidth = window.innerWidth;
			const { itemsOnSlide, newGap, moveAmount } = getItemsAmountAndGap(screenWidth);
			handleSetAmount(itemsOnSlide, moveAmount);
			handleSetGap(newGap, itemsOnSlide);
			handleSetNewWidth();
		}
	};

	useEffect(() => {
		const itemWidth = Math.floor((carouselWidth - totalGapWidth) / visibleItemsAmount);
		let totalPosition = itemMoveAmount * positionMove;
		if (totalPosition >= children.length - visibleItemsAmount) {
			totalPosition = children.length - visibleItemsAmount;
		}
		const switchWidth = totalPosition * itemWidth + totalPosition * gap;
		if (!isNaN(switchWidth)) setMoveWidth(switchWidth);
	}, [positionMove, carouselWidth, totalGapWidth, visibleItemsAmount, gap, itemMoveAmount]);

	useLayoutEffect(() => {
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<Box className='carousel' ref={carouselRef} position='relative' w='100%' overflow='hidden'>
			<Track
				gap={gap}
				carouselWidth={carouselWidth}
				moveWidth={moveWidth}
				totalGapWidth={totalGapWidth}
				visibleItemsAmount={visibleItemsAmount}
			>
				{children}
			</Track>
			<ArrowButton onSwitchLeft={switchLeft} onSwitchRight={switchRight} />
		</Box>
	);
};

export default Carousel;
