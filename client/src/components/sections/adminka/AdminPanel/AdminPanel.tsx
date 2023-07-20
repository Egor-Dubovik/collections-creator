'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import AdminToolbar from '../AdminToolbar/AdminToolbar';
import UsersTable from '../UsersTable/UsersTable';
import AdminPanelInfo from '../AdminPanelInfo';

const AdminPanel = () => {
	const [query, setQuery] = useState('');
	const [selectedUserIDs, setSelectedUserIDs] = useState<number[]>([]);

	const onSearch = (event: ChangeEvent<HTMLInputElement>): void => {
		setQuery(event.target.value);
	};

	useEffect(() => {
		console.log(selectedUserIDs);
	}, [selectedUserIDs]);

	return (
		<div>
			<AdminPanelInfo />
			<AdminToolbar query={query} handleSearch={onSearch} selectedUserIDs={selectedUserIDs} />
			<UsersTable
				query={query}
				selectedUserIDs={selectedUserIDs}
				setSelectedUserIDs={setSelectedUserIDs}
			/>
		</div>
	);
};

export default AdminPanel;
