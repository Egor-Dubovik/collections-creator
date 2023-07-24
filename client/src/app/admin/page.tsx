'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/common/types/api';
import useUserStore from '@/store/UserStore';
import AdminPanel from '@/components/sections/adminka/AdminPanel/AdminPanel';

const AdminPage = (): JSX.Element => {
	const { user, isUserLoading } = useUserStore();
	const router = useRouter();

	useEffect(() => {
		if (!user?.role?.includes('admin') && !isUserLoading) {
			router.push(ROUTES.HOME);
		}
	}, []);

	return (
		<main className='main'>
			<AdminPanel />
		</main>
	);
};

export default AdminPage;
