import { ICollectionResponse } from '@/common/types/collection';
import CollectionList from '@/components/collection/CollectionList/CollectionList';
import useGetUserCollections from '@/hooks/collection/useGetUserCollections';
import { Text } from '@chakra-ui/react';
import useUserStore from '../../../store/UserStore';
import styles from './UserCollections.module.css';

const UserCollections = () => {
	const user = useUserStore.use.user();
	const { userCollections, isLoading, err } = useGetUserCollections(user?.id as number);

	return (
		<section className={styles.userCollections}>
			<div className='user-collections__container'>
				<h1 className={styles.title}>Collections</h1>
				{err && <Text color='tomato'>{err.message}</Text>}
				<CollectionList
					collections={userCollections as ICollectionResponse[]}
					isLoading={isLoading}
				/>
			</div>
		</section>
	);
};

export default UserCollections;
