'use client';
import { ROUTES } from '@/common/types/api';
import UserCollections from '@/components/sections/UserCollections/UserCollections';
import UserProfile from '@/components/sections/UserProfile/UserProfile';
import useUserStore from '@/store/UserStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Profile = async () => {
	const { user, isUserLoading } = useUserStore();
	const router = useRouter();

	useEffect(() => {
		if (!user && !isUserLoading) router.push(ROUTES.HOME);
	}, []);

	return (
		<main className='main profile'>
			<UserProfile />
			<UserCollections />
		</main>
	);
};

export default Profile;
