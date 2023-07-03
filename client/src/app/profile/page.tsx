import { FC } from 'react';
import dynamic from 'next/dynamic';
// import UserProfile from '@/components/sections/UserProfile';

const DynamicUserProfile = dynamic(() => import('@/components/sections/UserProfile/UserProfile'), {
	ssr: false,
});

const Profile: FC = () => {
	return (
		<main className='main profile'>
			<DynamicUserProfile />
		</main>
	);
};

export default Profile;
