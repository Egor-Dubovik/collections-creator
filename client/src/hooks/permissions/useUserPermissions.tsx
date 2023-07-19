import { useEffect, useState } from 'react';
import { ICollectionResponse } from '@/common/types/collection';
import useUserStore from '@/store/UserStore';

const useUserPermissions = (collection: ICollectionResponse | undefined): boolean => {
	const [canChange, setCanChange] = useState(false);
	const user = useUserStore.use.user();
	useEffect(() => {
		if (user) {
			const canChangeData =
				user.id === collection?.userId || (user.role?.includes('admin') as boolean);
			setCanChange(canChangeData);
		}
	}, [user, collection]);
	return canChange;
};

export default useUserPermissions;
