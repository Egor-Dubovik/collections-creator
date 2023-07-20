import { ChangeEvent } from 'react';
import { Box, Button, Input } from '@chakra-ui/react';
import styles from './AdminToolbar.module.css';
import useUpdateStatus from '@/hooks/user/useUpdateStatus';
import useUserStore from '@/store/UserStore';

interface IAdminToolbarProps {
	selectedUserIDs: number[];
	query: string;
	handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}

const AdminToolbar = ({ selectedUserIDs, query, handleSearch }: IAdminToolbarProps) => {
	const user = useUserStore.use.user();
	const { updateStatus, isLoadingStatus } = useUpdateStatus();

	const handleBlock = (): void => {
		if (user) updateStatus({ userId: user.id, status: 'blocked' });
	};

	const handleActive = () => {
		if (user) updateStatus({ userId: user.id, status: 'active' });
	};

	return (
		<section className={styles.toolbar}>
			<div className='admin-toolbar__container'>
				<Box className={styles.tools}>
					<Input
						value={query}
						onChange={handleSearch}
						className={styles.input}
						size='lg'
						placeholder='query by name and email'
					/>
					<Box className={styles.buttons}>
						<Box className={styles.buttonBox}>
							<Button
								colorScheme='red'
								variant='solid'
								isLoading={isLoadingStatus}
								onClick={handleBlock}
							>
								block
							</Button>
							<Button
								colorScheme='green'
								variant='solid'
								isLoading={isLoadingStatus}
								onClick={handleActive}
							>
								unblock
							</Button>
						</Box>
						<Box className={`${styles.buttonBox} ${styles.adminRight}`}>
							<Button colorScheme='blue' variant='solid'>
								make admin
							</Button>
							<Button colorScheme='pink' variant='solid'>
								revoke admin rights
							</Button>
						</Box>
					</Box>
				</Box>
			</div>
		</section>
	);
};

export default AdminToolbar;
