'use client';
import { ChangeEvent, useState } from 'react';
import { Heading } from '@chakra-ui/react';
import { IUser } from '@/common/types/user';
import AdminToolbar from '../AdminToolbar/AdminToolbar';
import UsersTable from '../UsersTable/UsersTable';
import AdminPanelInfo from '../AdminPanelInfo';

const AdminPanel = () => {
	const [search, setSearch] = useState('');
	const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);

	const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};

	const onSelectUser = (selectedUser: IUser) => {
		const userIds = selectedUsers.map(user => user.id);
		if (userIds.includes(selectedUser.id)) {
			setSelectedUsers(selectedUsers.filter(user => user.id !== selectedUser.id));
			return;
		}
		setSelectedUsers([...selectedUsers, selectedUser]);
	};

	return (
		<div>
			<AdminPanelInfo />
			<AdminToolbar search={search} handleSearch={onSearch} />
			<UsersTable search={search} handleSelectUser={onSelectUser} />
		</div>
	);
};

export default AdminPanel;
