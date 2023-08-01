import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ITag } from '@/common/types/tag';
import createSelectors from './selectors';

interface IState {
	activeTags: ITag[];
	setActiveTags: (tags: ITag[]) => void;
}

const useTagStoreBase = create<IState>()(
	devtools(set => ({
		activeTags: [],
		setActiveTags: tags => set({ activeTags: tags }),
	}))
);

const useTagStore = createSelectors(useTagStoreBase);
export default useTagStore;
