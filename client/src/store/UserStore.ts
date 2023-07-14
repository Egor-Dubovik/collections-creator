import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IUser } from '@/common/types/user';
import createSelectors from './selectors';

interface IState {
	user: IUser | null;
	isUserLoading: boolean;
	setUser: (user: IUser | null) => void;
	setLoading: (isUserLoading: boolean) => void;
}

const useUserStoreBase = create<IState>()(
	devtools(set => ({
		user: null,
		isUserLoading: false,
		setUser: user => set({ user }),
		setLoading: isUserLoading => set({ isUserLoading }),
	}))
);

const useUserStore = createSelectors(useUserStoreBase);
export default useUserStore;
