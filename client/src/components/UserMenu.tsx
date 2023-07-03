import { FC } from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, Image, Box } from '@chakra-ui/react';
import { ROUTES } from '@/common/types/api';
import { usePathname } from 'next/navigation';
import UserMenuList from './menuList/UserMenuList';

interface IUserMenuProps {
	handleSwitch?: () => void;
}

const UserMenu: FC<IUserMenuProps> = () => {
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
						src='https://placekitten.com/100/100'
						alt='Fluffybuns the destroyer'
					/>
				</MenuButton>
				<UserMenuList />
			</Menu>
		</Box>
	);
};

export default UserMenu;
