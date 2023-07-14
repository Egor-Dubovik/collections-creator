import styles from './CollectionItems.module.css';

const CollectionItems = () => {
	return (
		<section className={styles.collectionItems}>
			<div className='collection-items__container'>
				<ul>
					<li>item</li>
					<li>item</li>
				</ul>
			</div>
		</section>
	);
};

export default CollectionItems;
