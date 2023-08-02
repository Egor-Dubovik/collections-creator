import { Box, Heading, Tooltip } from '@chakra-ui/react';
import { QuestionOutlineIcon } from '@chakra-ui/icons';
import { ADMIN_PANEL_INFO } from '@/common/constant/collections';
import { ROUTES } from '@/common/types/api';
import { ICrumbLink } from '@/common/types/app';
import AppBreadCrumb from '@/components/AppBreadCrumb/AppBreadCrumb';

const AdminPanelInfo = () => {
	const crumbLinks: ICrumbLink[] = [
		{ path: ROUTES.HOME, value: 'Home' },
		{ path: ROUTES.PROFILE, value: 'Profile' },
		{ path: ROUTES.ADMIN, value: 'Admin panel' },
	];

	return (
		<Box as='section' padding='15px 0 0' className='admin-panel__info admin-info'>
			<Box className='admin-info__container'>
				<Box display='flex' gap={5} mb={5}>
					<Heading as='h1' size='xl' lineHeight='1'>
						Admin panel
					</Heading>
					<Tooltip hasArrow label={ADMIN_PANEL_INFO} bg='gray.300' fontSize='18px' color='black'>
						<QuestionOutlineIcon />
					</Tooltip>
				</Box>
				<AppBreadCrumb links={crumbLinks} />
			</Box>
		</Box>
	);
};

export default AdminPanelInfo;
