import { create } from 'zustand';
import createSelectors from './selectors';

interface IState {
	isActive: boolean;
	setIsActive: (isActive: boolean) => void;
}

const useOverlayStoreBase = create<IState>()(set => ({
	isActive: false,
	setIsActive: isActive => set({ isActive }),
}));

const useOverlayStore = createSelectors(useOverlayStoreBase);
export default useOverlayStore;
