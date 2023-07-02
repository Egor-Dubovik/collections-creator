import { FC } from 'react';
import { ROUTES } from '@/common/types/api';
import { MenuItem } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { getLinkDecoration } from '@/utils/getLinkDecoration';
import useAuthNotification from '@/hooks/auth/useAuthNotification';
import useAuthToast from '@/hooks/auth/useAuthToast';
import useLogout from '@/hooks/auth/useLogout';
import Link from 'next/link';
import Loader from '../Loader';

const PrivateItems: FC = () => {
	const { logout, isLoading, isSuccess, err } = useLogout();
	const pathname = usePathname();
	const addToast = useAuthToast();

	useAuthNotification(isSuccess, err, 'LOGOUT', addToast);

	return (
		<>
			<MenuItem>
				<Link
					style={{ width: '100%', textDecoration: getLinkDecoration(ROUTES.PROFILE, pathname) }}
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
	);
};

export default PrivateItems;
