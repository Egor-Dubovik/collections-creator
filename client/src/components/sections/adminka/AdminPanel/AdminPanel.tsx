'use client';
import { useState } from 'react';
import { IUser } from '@/common/types/user';
import { SEARCH_DELAY } from '@/common/constant/numbers';
import AdminToolbar from '../AdminToolbar/AdminToolbar';
import UsersTable from '../UsersTable/UsersTable';
import AdminPanelInfo from '../AdminPanelInfo';
import useDebounce from '@/hooks/useDebounce';

const AdminPanel = () => {
	const [search, setSearch] = useState('');
	const [query, setQuery] = useState('');
	const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);

	const handleSetQuery = () => {
		setQuery(search);
	};

	useDebounce(search, handleSetQuery, SEARCH_DELAY);

	return (
		<div className='admin-panel'>
			<AdminPanelInfo />
			<AdminToolbar search={search} setSearch={setSearch} selectedUsers={selectedUsers} />
			<UsersTable query={query} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
		</div>
	);
};

export default AdminPanel;
