'use client';
import { Box, Flex, FlexProps, useColorMode } from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';
import { usePathname } from 'next/navigation';
import styles from './NavBar.module.css';
import { ROUTES } from '@/common/types/api';

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
			className={isOpen ? `${styles.navbar} ${styles.navbar_active}` : styles.navbar}
		>
			<Flex as='ul' {...flexProps} className={styles.navbar__list}>
				<Box as='li' onClick={handleSwitch}>
					<Link className={getLinkStyles(ROUTES.HOME)} href={ROUTES.HOME}>
						Home
					</Link>
				</Box>
			</Flex>
		</Box>
	);
};

export default NavBar;
