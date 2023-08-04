import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IItem } from '@/common/types/item';
import createSelectors from './selectors';

interface IState {
	items: IItem[] | null;
	setItems: (items: IItem[] | null) => void;
}

const useSearchStoreBase = create<IState>()(
	devtools(set => ({
		items: null,
		setItems: items => set({ items }),
	}))
);

const useSearchStore = createSelectors(useSearchStoreBase);
export default useSearchStore;
