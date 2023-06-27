'use client';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, useDisclosure } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import ColorModeSwitcher from '../ColorModeSwitcherProps';
import PageContainer from '../PageContainer';
import NavBar from './NavBar/NavBar';

interface IHeaderProps {
	logo: ReactNode;
}

const Header: FC<IHeaderProps> = ({ logo }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleSwitchMenu = (): void => (isOpen ? onClose() : onOpen());
	return (
		<Box py={4} as='header' className='header'>
			<PageContainer>
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
				/>
			</PageContainer>
		</Box>
	);
};

export default Header;
