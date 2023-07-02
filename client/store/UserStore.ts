import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IUser } from '@/common/types/user';
import createSelectors from './selectors';

interface IState {
	user: IUser | null;
	setUser: (user: IUser | null) => void;
}

const useUserStoreBase = create<IState>()(
	devtools(set => ({
		user: null,
		setUser: user => set({ user }),
	}))
);

const useUserStore = createSelectors(useUserStoreBase);
export default useUserStore;
