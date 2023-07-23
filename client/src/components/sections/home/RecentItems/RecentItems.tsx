import { LIMIT, START_OFFSET } from '@/common/constant/item';
import ItemService from '@/service/ItemService';
import ItemsCarousel from './ItemsCarousel/ItemsCarousel';
import styles from './RecentItems.module.css';

const RecentItems = async () => {
	const items = await ItemService.getRecentItems(START_OFFSET, LIMIT);

	return (
		<section className={styles.recentItems}>
			<div className='recent-items__container'>
				<h1 className={styles.title}>Recently added items</h1>
				<ItemsCarousel items={items} />
			</div>
		</section>
	);
};

export default RecentItems;
