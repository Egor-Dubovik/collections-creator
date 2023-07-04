import CollectionList from '@/components/collection/CollectionList/CollectionList';
import Loader from '@/components/Loader';
import CollectionService from '@/service/CollectionService';
import { Suspense } from 'react';
import styles from './UserCollections.module.css';

const UserCollections = async () => {
	const collections = await CollectionService.getAll();

	return (
		<section className='user-collections'>
			<div className='user-collections__container'>
				<h1 className={styles.title}>Collections</h1>
				<Suspense fallback={<Loader />}>
					<CollectionList collections={collections} />
				</Suspense>
			</div>
		</section>
	);
};

export default UserCollections;
