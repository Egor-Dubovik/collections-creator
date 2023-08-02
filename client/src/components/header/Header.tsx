'use client';
import { FC, ReactNode, useEffect, useState } from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, useColorMode, useDisclosure } from '@chakra-ui/react';
import ColorModeSwitcher from '../ColorModeSwitcherProps';
import NavBar from '../NavBar/NavBar';
import UserMenu from '../UserMenu';
import useRefreshToken from '@/hooks/auth/useToken';
import useUserStore from '../../store/UserStore';
import MainInputSearch from '../inputs/MainInputSearch/MainInputSearch';
import SearchSwitcher from '../SearchSwitcher';
import styles from './Header.module.css';
import useOverlayStore from '@/store/OverlayStore';

interface IHeaderProps {
	logo: ReactNode;
}

const Header: FC<IHeaderProps> = ({ logo }) => {
	const [isSearchVisible, setSearchVisible] = useState(false);
	const setUserLoading = useUserStore.use.setLoading();
	const setOverlayActive = useOverlayStore.use.setIsActive();
	const { refresh, isLoading } = useRefreshToken();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { colorMode } = useColorMode();

	const handleSwitchSearch = (): void => setSearchVisible(!isSearchVisible);
	const handleCloseSearch = (): void => setSearchVisible(false);
	const handleSwitchMenu = (): void => {
		if (isOpen) {
			setOverlayActive(false);
			onClose();
			return;
		}
		setOverlayActive(true);
		onOpen();
	};

	useEffect(() => {
		setUserLoading(isLoading);
	}, [isLoading, setUserLoading]);

	useEffect(() => {
		refresh();
	}, []);

	return (
		<Box
			as='header'
			className={styles.header}
			background={colorMode !== 'dark' ? 'gr.50' : 'gray.800'}
			py={4}
		>
			<MainInputSearch isVisible={isSearchVisible} handleClose={handleCloseSearch} />
			<div className='header__container'>
				<Flex align='center' justify='space-between' gap='15px'>
					<Box className='header__logo'>{logo}</Box>
					<Flex className='header__menu' align='center'>
						<NavBar
							display={{ base: 'none', md: 'flex' }}
							align='center'
							flexWrap='wrap'
							gap='15px'
						/>
						<SearchSwitcher handleSwitch={handleSwitchSearch} />
						<ColorModeSwitcher />
						<UserMenu />
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
