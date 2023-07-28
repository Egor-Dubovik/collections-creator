import { BASE_URL } from '@/common/constant/api';
import { getDateAndTimeFromString } from '@/utils/getDateFromString';
import { getImagePath } from '@/utils/getImagePath';
import ItemService from '@/service/ItemService';
import Image from 'next/image';
import ItemComments from '../ItemComments/ItemComments';
import ItemLikes from '../ItemLikes/ItemLikes';
import ItemPropsList from '../ItemPropsList/ItemPropsList';
import styles from './ItemContent.module.css';

interface IItemContentProps {
	itemId: string;
}

const ItemContent = async ({ itemId }: IItemContentProps) => {
	const { item, props } = await ItemService.getOneById(itemId);

	return (
		<div className={styles.content}>
			<div className={styles.own}>
				<div className={styles.image}>
					<img src={BASE_URL + getImagePath(item.image, 'item.jpg')} alt='item image' />
				</div>
				<div className={styles.info}>
					<ItemLikes itemId={itemId} />
					<p className={styles.date}>{getDateAndTimeFromString(item.createdAt)}</p>
				</div>
			</div>
			<div className={styles.secondary}>
				<h1 className={styles.title}>{item.name}</h1>
				<ItemPropsList props={props} />
				<ItemComments itemId={itemId} />
			</div>
		</div>
	);
};

export default ItemContent;
