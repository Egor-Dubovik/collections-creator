import { Dispatch, SetStateAction } from 'react';
import { Box, Button, Input } from '@chakra-ui/react';
import useUpdateStatus from '@/hooks/user/useUpdateStatus';
import useUpdateRole from '@/hooks/user/useUpdateRole';
import { IUser, TypeUserRole } from '@/common/types/user';
import styles from './AdminToolbar.module.css';

interface IAdminToolbarProps {
	selectedUsers: IUser[];
	search: string;
	setSearch: Dispatch<SetStateAction<string>>;
}

const AdminToolbar = ({ selectedUsers, search, setSearch }: IAdminToolbarProps) => {
	const { updateStatus, isLoadingStatus } = useUpdateStatus();
	const { updateRole, isLoadingRole } = useUpdateRole();

	const handleBlock = (): void => {
		selectedUsers.forEach(user => {
			updateStatus({ userId: user.id, status: 'blocked' });
		});
	};
	const handleActive = (): void => {
		selectedUsers.forEach(user => {
			updateStatus({ userId: user.id, status: 'active' });
		});
	};
	const handleMakeAdmin = (): void => {
		selectedUsers.forEach(user => {
			const role = [...(user.role as TypeUserRole[]), 'admin' as TypeUserRole];
			updateRole({ userId: user.id, role });
		});
	};
	const handleMakeUser = (): void => {
		selectedUsers.forEach(user => {
			const role = [...(user.role as TypeUserRole[])].filter(role => role !== 'admin');
			updateRole({ userId: user.id, role });
		});
	};

	return (
		<section className={styles.toolbar}>
			<div className='admin-toolbar__container'>
				<Box className={styles.tools}>
					<Input
						value={search}
						onChange={event => setSearch(event.target.value)}
						className={styles.input}
						size='lg'
						placeholder='search by name and email'
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
							<Button
								colorScheme='blue'
								variant='solid'
								isLoading={isLoadingRole}
								onClick={handleMakeAdmin}
							>
								make admin
							</Button>
							<Button
								colorScheme='pink'
								variant='solid'
								isLoading={isLoadingRole}
								onClick={handleMakeUser}
							>
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
