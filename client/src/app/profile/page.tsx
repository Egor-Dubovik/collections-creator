'use client';
import UserCollections from '@/components/sections/UserCollections/UserCollections';
import UserProfile from '@/components/sections/UserProfile/UserProfile';

const Profile = async () => {
	return (
		<main className='main profile'>
			<UserProfile />
			<UserCollections />
		</main>
	);
};

export default Profile;
