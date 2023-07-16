import { FC } from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, Image, Box } from '@chakra-ui/react';
import { ROUTES } from '@/common/types/api';
import { usePathname } from 'next/navigation';
import UserMenuList from './menuList/UserMenuList';
import useUserStore from '../store/UserStore';
import { BASE_URL } from '@/common/constant/api';
import { getImagePath } from '@/utils/getImagePath';

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
					<Image
						w='36px'
						h='36px'
						padding={0.5}
						borderStyle='solid'
						borderWidth='2px'
						borderColor={getBorderColor()}
						boxSizing='content-box'
						borderRadius='full'
						src={BASE_URL + getImagePath(user?.avatar)}
						alt='avatar menu preview'
					/>
				</MenuButton>
				<UserMenuList />
			</Menu>
		</Box>
	);
};

export default UserMenu;
