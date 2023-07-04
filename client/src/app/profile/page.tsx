import dynamic from 'next/dynamic';
import UserCollections from '@/components/sections/UserCollections/UserCollections';

const DynamicUserProfile = dynamic(() => import('@/components/sections/UserProfile/UserProfile'), {
	ssr: false,
});

const Profile = async () => {
	return (
		<main className='main profile'>
			<DynamicUserProfile />
			<UserCollections />
		</main>
	);
};

export default Profile;
