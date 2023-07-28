import useUserStore from '@/store/UserStore';

const useIsUserHaveRights = (collectionUserId: number) => {
	const user = useUserStore.use.user();
	return Boolean(user && (user.id === collectionUserId || user.role?.includes('admin')));
};

export default useIsUserHaveRights;
