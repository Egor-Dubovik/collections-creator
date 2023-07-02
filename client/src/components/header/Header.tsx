'use client';
import { FC, ReactNode, useEffect } from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, useColorMode, useDisclosure } from '@chakra-ui/react';
import ColorModeSwitcher from '../ColorModeSwitcherProps';
import NavBar from '../NavBar/NavBar';
import UserMenu from '../UserMenu';
import useRefreshToken from '@/hooks/auth/useToken';

interface IHeaderProps {
	logo: ReactNode;
}

const Header: FC<IHeaderProps> = ({ logo }) => {
	const { refresh } = useRefreshToken();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { colorMode } = useColorMode();

	const handleSwitchMenu = (): void => (isOpen ? onClose() : onOpen());

	useEffect(() => {
		refresh();
	}, []);

	return (
		<Box py={4} as='header' bg={colorMode !== 'dark' ? 'gr.50' : 'gr.900'} className='header'>
			<div className='header__container'>
				<Flex align='center' justify='space-between' gap='15px'>
					<Box className='header__logo'>{logo}</Box>
					<Flex className='header__menu' align='center'>
						<NavBar
							as='ul'
							display={{ base: 'none', md: 'flex' }}
							align='center'
							flexWrap='wrap'
							gap='15px'
						/>
						<UserMenu />
						<ColorModeSwitcher />
						<IconButton
							display={{ base: 'flex', md: 'none' }}
							icon={<HamburgerIcon />}
							variant='outline'
							onClick={handleSwitchMenu}
							aria-label='burger icon'
						/>
					</Flex>
				</Flex>

				<NavBar
					as='ul'
					py={2}
					display={{ base: isOpen ? 'flex' : 'none', md: 'none' }}
					flexDir='column'
					gap='10px'
					handleSwitch={handleSwitchMenu}
					isOpen={isOpen}
				/>
			</div>
		</Box>
	);
};

export default Header;
