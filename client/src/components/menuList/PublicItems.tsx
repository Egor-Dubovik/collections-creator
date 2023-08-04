import { FC } from 'react';
import { MenuItem } from '@chakra-ui/react';
import { ROUTES } from '@/common/types/api';
import { getLinkDecoration } from '@/utils/getLinkDecoration';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const PublicItems: FC = () => {
	const pathname = usePathname();

	return (
		<>
			<MenuItem>
				<Link
					style={{ width: '100%', textDecoration: getLinkDecoration(ROUTES.REGISTER, pathname) }}
					href={ROUTES.REGISTER}
				>
					signup
				</Link>
			</MenuItem>
			<MenuItem>
				<Link
					style={{ width: '100%', textDecoration: getLinkDecoration(ROUTES.LOGIN, pathname) }}
					href={ROUTES.LOGIN}
				>
					login
				</Link>
			</MenuItem>
		</>
	);
};

export default PublicItems;
