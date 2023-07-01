import { FC } from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuItem, MenuList, Image, Box } from '@chakra-ui/react';
import { ROUTES } from '@/common/types/api';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import useUserStore from '../../store/UserStore';

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

	const getLinkDecoration = (route: string) => (route === pathname ? 'underline' : 'none');

	return (
		<Box margin='0 10px 0 15px'>
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
								<Link style={{ width: '100%' }} href={ROUTES.HOME}>
									logout
								</Link>
							</MenuItem>
						</>
					)}
				</MenuList>
			</Menu>
		</Box>
	);
};

export default UserMenu;
