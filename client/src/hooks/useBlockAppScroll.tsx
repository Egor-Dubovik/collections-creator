import { useEffect } from 'react';

const useBlockAppScroll = (isBlockScroll: boolean) => {
	useEffect(() => {
		isBlockScroll
			? (document.body.style.overflow = 'hidden')
			: (document.body.style.overflow = 'visible');
	}, [isBlockScroll]);
};

export default useBlockAppScroll;
