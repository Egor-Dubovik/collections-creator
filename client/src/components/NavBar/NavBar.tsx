'use client';
import { ROUTES } from '@/common/types';
import { Box, Flex, FlexProps, useColorMode } from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';
import { usePathname } from 'next/navigation';
import styles from './NavBar.module.css';

type INavBarProps = FlexProps & {
	handleSwitch?: () => void;
	isOpen?: boolean;
};

const NavBar: FC<INavBarProps> = ({ handleSwitch, isOpen, ...flexProps }) => {
	const { colorMode } = useColorMode();
	const pathname = usePathname();

	const getLinkStyles = (route: string): string =>
		pathname === route
			? `${styles.navbar__link_active} ${styles.navbar__link}`
			: styles.navbar__link;

	return (
		<Box
			as='nav'
			borderColor={colorMode !== 'dark' ? 'white' : 'black'}
			className={isOpen ? styles.navbar_active : 'navbar'}
		>
			<Flex {...flexProps} className={styles.navbar__list}>
				<Box as='li' onClick={handleSwitch}>
					<Link className={getLinkStyles(ROUTES.HOME)} href={ROUTES.HOME}>
						Home
					</Link>
				</Box>
				<Box as='li' onClick={handleSwitch}>
					<Link className={getLinkStyles(ROUTES.COLLECTIONS)} href={ROUTES.COLLECTIONS}>
						Collections
					</Link>
				</Box>
			</Flex>
		</Box>
	);
};

export default NavBar;
