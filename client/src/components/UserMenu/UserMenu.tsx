import { FC } from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, Box } from '@chakra-ui/react';
import { ROUTES } from '@/common/types/api';
import { usePathname } from 'next/navigation';
import UserMenuList from '../menuList/UserMenuList';
import useUserStore from '../../store/UserStore';
import { BASE_URL } from '@/common/constant/api';
import { getImagePath } from '@/utils/getImagePath';
import Image from 'next/image';
import styles from './UserMenu.module.css';

interface IUserMenuProps {
	handleSwitch?: () => void;
}

const UserMenu: FC<IUserMenuProps> = () => {
	const user = useUserStore.use.user();
	const pathname = usePathname();
	const getBorderColor = () => {
		return ROUTES.REGISTER === pathname || ROUTES.LOGIN === pathname || ROUTES.PROFILE === pathname
			? 'tealLight'
			: 'inherit';
	};

	return (
		<Box marginRight={2}>
			<Menu>
				<MenuButton
					as={Button}
					variant='unstyled'
					display='flex'
					_hover={{ color: 'tealLight' }}
					transition='color 0.2s ease'
					rightIcon={<ChevronDownIcon />}
				>
					<Box className={styles.imageBox} borderColor={getBorderColor()}>
						<Image
							src={BASE_URL + getImagePath(user?.avatar)}
							alt='avatar menu preview'
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
							fill
						/>
					</Box>
				</MenuButton>
				<UserMenuList />
			</Menu>
		</Box>
	);
};

export default UserMenu;
