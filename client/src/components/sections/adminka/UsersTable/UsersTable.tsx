import { Dispatch, SetStateAction } from 'react';
import { Checkbox, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { IUser } from '@/common/types/user';
import useGetSearchUsers from '@/hooks/user/useGetSearchUsers';
import styles from './UsersTable.module.css';

interface IUsersTableProps {
	query: string;
	selectedUserIDs: number[];
	setSelectedUserIDs: Dispatch<SetStateAction<number[]>>;
}

// status using color

const UsersTable = ({ query, selectedUserIDs, setSelectedUserIDs }: IUsersTableProps) => {
	const { searchUsers, isLoading, err } = useGetSearchUsers(query);

	const getSelectStatus = (user: IUser): boolean => {
		return selectedUserIDs.includes(user.id);
	};

	const handleSelectUser = (userId: number): void => {
		setSelectedUserIDs(prevSelectedUserIDs => {
			if (prevSelectedUserIDs.includes(userId)) {
				return prevSelectedUserIDs.filter(id => id !== userId);
			}
			return [...prevSelectedUserIDs, userId];
		});
	};

	const switchSelectAll = (): void => {
		if (!selectedUserIDs.length) {
			setSelectedUserIDs(searchUsers?.map(user => user.id) as number[]);
			return;
		}
		setSelectedUserIDs([]);
	};

	return (
		<section className='users-table'>
			<div className='users-table__container'>
				{err && <Text color='tomato'>{err.message}</Text>}
				<TableContainer>
					<Table variant='unstyled' colorScheme='teal'>
						<Thead>
							<Tr className={styles.row}>
								<Th>
									<Checkbox isChecked={!!selectedUserIDs.length} onChange={switchSelectAll} />
								</Th>
								<Th>Nickname</Th>
								<Th>Email</Th>
								<Th>Role</Th>
							</Tr>
						</Thead>
						<Tbody>
							{searchUsers?.map(user => (
								<Tr
									key={user.id}
									className={styles.row}
									onClick={() => handleSelectUser(user.id)}
									borderColor={user.status === 'blocked' ? 'red' : 'teal'}
								>
									<Td>
										<Checkbox
											isChecked={getSelectStatus(user)}
											onChange={() => handleSelectUser(user.id)}
										/>
									</Td>
									<Td>{user.nickName}</Td>
									<Td>{user.email}</Td>
									<Td>{user.role?.join(',')}</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</TableContainer>
			</div>
		</section>
	);
};

export default UsersTable;
