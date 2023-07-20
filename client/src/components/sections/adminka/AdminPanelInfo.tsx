import { Box, Heading, Tooltip } from '@chakra-ui/react';
import { QuestionOutlineIcon } from '@chakra-ui/icons';
import { ADMIN_PANEL_INFO } from '@/common/constant/collections';

const AdminPanelInfo = () => {
	return (
		<Box as='section' padding='15px 0 0' className='admin-panel__info admin-info'>
			<Box className='admin-info__container' display='flex' gap={5}>
				<Heading as='h1' size='xl' lineHeight='1'>
					Admin panel
				</Heading>
				<Tooltip hasArrow label={ADMIN_PANEL_INFO} bg='gray.300' fontSize='18px' color='black'>
					<QuestionOutlineIcon />
				</Tooltip>
			</Box>
		</Box>
	);
};

export default AdminPanelInfo;
