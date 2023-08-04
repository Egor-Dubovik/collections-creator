import CollectionList from '@/components/collection/CollectionList/CollectionList';
import CollectionService from '@/service/CollectionService';
import styles from './TopCollections.module.css';

interface ITopCollectionsProps {}

const TopCollections = async ({}: ITopCollectionsProps) => {
	const collections = await CollectionService.getTop();
	return (
		<section className={styles.topCollections}>
			<div className='top-collections__container'>
				<h2 className={styles.title}>Top 3 greatest collections</h2>
				<CollectionList collections={collections} />
			</div>
		</section>
	);
};

export const revalidate = 3600;
export default TopCollections;
