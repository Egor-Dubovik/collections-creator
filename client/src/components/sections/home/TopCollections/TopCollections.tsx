import CollectionList from '@/components/collection/CollectionList/CollectionList';
import CollectionService from '@/service/CollectionService';
import styles from './TopCollections.module.css';

interface ITopCollectionsProps {}

const TopCollections = async ({}: ITopCollectionsProps) => {
	const collections = await CollectionService.getTop();
	return (
		<section className={styles.topCollections}>
			<div className='top-collections__container'>
				<h1 className={styles.title}>Top 3 greatest collections</h1>
				<CollectionList collections={collections} />
			</div>
		</section>
	);
};

export default TopCollections;
