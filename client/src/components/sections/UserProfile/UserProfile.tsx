import { useState } from 'react';
import { Box, Button, Heading, Skeleton, useDisclosure } from '@chakra-ui/react';
import { BASE_URL } from '@/common/constant/api';
import { getImagePath } from '@/utils/getImagePath';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/common/types/api';
import Image from 'next/image';
import useUserStore from '../../../store/UserStore';
import styles from './UserProfile.module.css';
import CollectionModel from '@/components/modals/CollectionModel';

const UserProfile = () => {
	const [isImageLoading, setIsImageLoading] = useState(true);
	const user = useUserStore.use.user();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const router = useRouter();

	return (
		<>
			<CollectionModel isOpen={isOpen} onClose={onClose} />
			<section className={styles.userInfo}>
				<div className='user-info__container'>
					<Heading as='h1' size='xl' mb={{ base: 2, md: 3 }}>
						Profile
					</Heading>
					<div className={styles.userInfoContent}>
						<div className={styles.image}>
							<Image
								src={BASE_URL + getImagePath(user?.avatar)}
								onLoad={() => setIsImageLoading(false)}
								alt='avatar'
								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
								fill
							/>
							{isImageLoading && <Skeleton className={styles.skeleton} />}
						</div>
						<div className={styles.contentInfo}>
							<Box className={styles.infoItem} borderColor={'gray.300'}>
								<p className={styles.text}>Nickname: {user?.nickName}</p>
							</Box>
							<Box className={styles.infoItem} borderColor={'gray.300'}>
								<p className={styles.text}>Email: {user?.email}</p>
							</Box>
							<Button className={styles.button} onClick={onOpen}>
								+ new collection
							</Button>
							{user?.role?.includes('admin') && (
								<Button className={styles.button} onClick={() => router.push(ROUTES.ADMIN)}>
									admin panel
								</Button>
							)}
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default UserProfile;
