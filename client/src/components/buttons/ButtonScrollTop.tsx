'use client';
import { IconButton } from '@chakra-ui/react';
import { TriangleUpIcon } from '@chakra-ui/icons';
import useTopScroll from '@/hooks/scroll/useTopScroll';

const ButtonScrollTop = () => {
	const topOffset = useTopScroll();

	const handleScrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<IconButton
			icon={<TriangleUpIcon />}
			onClick={handleScrollToTop}
			aria-label='scroll to top'
			position='fixed'
			bottom='20px'
			right='20px'
			display={topOffset > 300 ? 'flex' : 'none'}
		/>
	);
};

export default ButtonScrollTop;
