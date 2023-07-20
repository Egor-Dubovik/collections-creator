import { useEffect, useRef } from 'react';
import { MAIN_DELAY } from '@/common/constant/numbers';

const useDebounce = (changeableProps: any, callback: () => void, delay = MAIN_DELAY) => {
	const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		if (debounceTimer.current) clearTimeout(debounceTimer.current);
		debounceTimer.current = setTimeout(() => {
			callback();
		}, delay);
		return () => {
			if (debounceTimer.current) {
				clearTimeout(debounceTimer.current);
			}
		};
	}, [changeableProps, callback, delay]);
};

export default useDebounce;
