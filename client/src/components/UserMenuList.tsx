import { FC } from 'react';
import { ROUTES } from '@/common/types/api';
import { MenuItem, MenuList } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import useUserStore from '../../store/UserStore';
import useLogout from '@/hooks/auth/useLogout';
import Loader from './Loader';
import useAuthNotification from '@/hooks/auth/useAuthNotification';
import useAuthToast from '@/hooks/useAuthToast';

const UserMenuList: FC = () => {
	const user = useUserStore.use.user();
	const pathname = usePathname();
	const { logout, isLoading, isSuccess, err } = useLogout();
	const addToast = useAuthToast();

	const getLinkDecoration = (route: string) => (route === pathname ? 'underline' : 'none');
	useAuthNotification(isSuccess, err, 'LOGOUT', addToast);

	return (
		<MenuList>
			{!user ? (
				<>
					<MenuItem>
						<Link
							style={{ width: '100%', textDecoration: getLinkDecoration(ROUTES.REGISTER) }}
							href={ROUTES.REGISTER}
						>
							signup
						</Link>
					</MenuItem>
					<MenuItem>
						<Link
							style={{ width: '100%', textDecoration: getLinkDecoration(ROUTES.LOGIN) }}
							href={ROUTES.LOGIN}
						>
							login
						</Link>
					</MenuItem>
				</>
			) : (
				<>
					<MenuItem>
						<Link
							style={{ width: '100%', textDecoration: getLinkDecoration(ROUTES.PROFILE) }}
							href={ROUTES.PROFILE}
						>
							profile
						</Link>
					</MenuItem>
					<MenuItem>
						<Link style={{ width: '100%' }} href={ROUTES.HOME} onClick={() => logout()}>
							logout
						</Link>
						{isLoading && <Loader width='15px' height='15px' />}
					</MenuItem>
				</>
			)}
		</MenuList>
	);
};

export default UserMenuList;
