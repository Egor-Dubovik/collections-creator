import { useEffect, DependencyList, RefObject } from 'react';

type TypeEventCallback = (event: Event) => void;
type TypeTarget = HTMLElement | RefObject<HTMLElement> | null;

const useAddClickListener = (
	callback: TypeEventCallback,
	dependencies: DependencyList = [],
	target?: TypeTarget
) => {
	useEffect(() => {
		const targetElement = target instanceof HTMLElement ? target : target?.current || document;
		targetElement.addEventListener('click', callback);
		return () => {
			targetElement.removeEventListener('click', callback);
		};
	}, [callback, target, ...dependencies]);
};

export default useAddClickListener;
