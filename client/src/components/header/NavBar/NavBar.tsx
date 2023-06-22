import { ROUTES } from '@/common/types';
import { Box, Flex, FlexProps } from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';

type INavBarProps = FlexProps & {
	handleSwitch?: () => void;
};

const NavBar: FC<INavBarProps> = ({ handleSwitch, ...flexProps }) => {
	return (
		<Box as='nav'>
			<Flex {...flexProps}>
				<Box as='li'>
					<Link onClick={handleSwitch} href={ROUTES.HOME}>
						Home
					</Link>
				</Box>
				<Box as='li' onClick={handleSwitch}>
					<Link href={ROUTES.COLLECTIONS}>Collections</Link>
				</Box>
			</Flex>
		</Box>
	);
};

export default NavBar;
