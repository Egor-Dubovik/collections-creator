import { Dispatch, SetStateAction, useEffect } from 'react';
import { Checkbox, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { IUser } from '@/common/types/user';
import useGetSearchUsers from '@/hooks/user/useGetSearchUsers';
import styles from './UsersTable.module.css';
import Loader from '@/components/Loader';

interface IUsersTableProps {
	query: string;
	selectedUsers: IUser[];
	setSelectedUsers: Dispatch<SetStateAction<IUser[]>>;
}

const UsersTable = ({ query, selectedUsers, setSelectedUsers }: IUsersTableProps) => {
	const { searchUsers, refetch, isLoading, err } = useGetSearchUsers(query);

	const getSelectStatus = (user: IUser): boolean => {
		return selectedUsers.map(selectedUse => selectedUse.id).includes(user.id);
	};

	const handleSelectUser = (currentUser: IUser): void => {
		setSelectedUsers(prevSelectedUser => {
			const prevSelectedUserIDs = prevSelectedUser.map(selectedUse => selectedUse.id);
			if (prevSelectedUserIDs.includes(currentUser.id)) {
				return prevSelectedUser.filter(user => user.id !== currentUser.id);
			}
			return [...prevSelectedUser, currentUser];
		});
	};

	const switchSelectAll = (): void => {
		if (searchUsers && !selectedUsers.length) {
			setSelectedUsers(searchUsers);
			return;
		}
		setSelectedUsers([]);
	};

	useEffect(() => {
		refetch();
	}, [query]);

	return (
		<section className={styles.userTable}>
			<div className='users-table__container'>
				{err && <Text color='tomato'>{err.message}</Text>}
				{!isLoading ? (
					<TableContainer className={styles.tableContainer}>
						<Table variant='unstyled' colorScheme='teal'>
							<Thead>
								<Tr className={styles.row}>
									<Th className={styles.cell}>
										<Checkbox isChecked={!!selectedUsers.length} onChange={switchSelectAll} />
									</Th>
									<Th className={styles.cell}>Nickname</Th>
									<Th className={styles.cell}>Email</Th>
									<Th className={styles.cell}>Role</Th>
								</Tr>
							</Thead>
							<Tbody>
								{searchUsers?.map(user => (
									<Tr
										key={user.id}
										className={styles.row}
										onClick={() => handleSelectUser(user)}
										borderColor={user.status === 'blocked' ? 'red' : 'teal'}
									>
										<Td className={styles.cell}>
											<Checkbox
												isChecked={getSelectStatus(user)}
												onChange={() => handleSelectUser(user)}
											/>
										</Td>
										<Td className={styles.cell}>{user.nickName}</Td>
										<Td className={styles.cell}>{user.email}</Td>
										<Td className={styles.cell}>{user.role?.join(',')}</Td>
									</Tr>
								))}
							</Tbody>
						</Table>
					</TableContainer>
				) : (
					<Loader />
				)}
			</div>
		</section>
	);
};

export default UsersTable;
