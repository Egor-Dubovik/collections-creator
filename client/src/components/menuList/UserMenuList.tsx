import { FC } from 'react';
import { MenuList, Skeleton, Stack } from '@chakra-ui/react';
import useUserStore from '../../store/UserStore';
import PublicItems from './PublicItems';
import PrivateItems from './PrivateItems';

const UserMenuList: FC = () => {
	const { user, isUserLoading } = useUserStore();

	return (
		<MenuList>
			{isUserLoading ? (
				<Stack padding={3}>
					<Skeleton height='20px' />
					<Skeleton height='20px' />
				</Stack>
			) : (
				<>{!user ? <PublicItems /> : <PrivateItems />}</>
			)}
		</MenuList>
	);
};

export default UserMenuList;
