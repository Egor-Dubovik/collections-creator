import { useEffect, useState } from 'react';

const useTopScroll = (): number => {
	const [offset, setOffset] = useState(0);

	const getTopOffset = (): void => {
		setOffset(window.scrollY);
	};

	useEffect(() => {
		window.addEventListener('scroll', getTopOffset);
		return () => window.removeEventListener('scroll', getTopOffset);
	}, []);

	return offset;
};

export default useTopScroll;
