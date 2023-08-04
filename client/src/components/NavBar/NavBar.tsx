'use client';
import { Box, Flex, FlexProps, useColorMode } from '@chakra-ui/react';
import { FC, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/common/types/api';
import Link from 'next/link';
import useAddClickListener from '@/hooks/listeners/useAddClickListener';
import useBlockAppScroll from '@/hooks/useBlockAppScroll';
import styles from './NavBar.module.css';

type INavBarProps = FlexProps & {
	handleCloseMenu?: () => void;
	isOpen?: boolean;
};

const NavBar: FC<INavBarProps> = ({ handleCloseMenu, isOpen, ...flexProps }) => {
	const { colorMode } = useColorMode();
	const pathname = usePathname();
	const navBarRef = useRef<HTMLElement | null>(null);

	const getLinkStyles = (route: string): string =>
		pathname === route
			? `${styles.navbar__link_active} ${styles.navbar__link}`
			: styles.navbar__link;

	const handleClickOutsider = useCallback(
		(event: Event): void => {
			if (handleCloseMenu && !navBarRef.current?.contains(event.target as Node)) handleCloseMenu();
		},
		[handleCloseMenu]
	);

	useAddClickListener(handleClickOutsider, [handleClickOutsider]);
	useBlockAppScroll(isOpen as boolean);

	return (
		<Box
			as='nav'
			ref={navBarRef}
			className={isOpen ? `${styles.navbar} ${styles.navbar_active}` : styles.navbar}
			borderColor={colorMode !== 'dark' ? 'white' : 'black'}
		>
			<Flex as='ul' {...flexProps} className={styles.navbar__list}>
				<Box as='li' onClick={handleCloseMenu}>
					<Link className={getLinkStyles(ROUTES.HOME)} href={ROUTES.HOME}>
						Home
					</Link>
				</Box>
			</Flex>
		</Box>
	);
};

export default NavBar;
