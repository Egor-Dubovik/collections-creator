import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { IUser } from '@/common/types/user';
import styles from './UsersTable.module.css';

interface IUsersTableProps {
	search: string;
	handleSelectUser: (user: IUser) => void;
}

// status using color

const UsersTable = ({ search, handleSelectUser }: IUsersTableProps) => {
	return (
		<section className='users-table'>
			<div className='users-table__container'>
				<TableContainer>
					<Table variant='simple' colorScheme='teal'>
						<Thead>
							<Tr>
								<Th>Select</Th>
								<Th>Nickname</Th>
								<Th>Email</Th>
								<Th>Role</Th>
							</Tr>
						</Thead>
						<Tbody>
							<Tr className={styles.userRow}>
								<Td>inches</Td>
								<Td>hose</Td>
								<Td>25.4</Td>
								<Td>25.4</Td>
							</Tr>
						</Tbody>
					</Table>
				</TableContainer>
			</div>
		</section>
	);
};

export default UsersTable;
