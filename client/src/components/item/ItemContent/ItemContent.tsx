import { BASE_URL } from '@/common/constant/api';
import { getDateAndTimeFromString } from '@/utils/getDateFromString';
import { getImagePath } from '@/utils/getImagePath';
import { ROUTES } from '@/common/types/api';
import { ICrumbLink } from '@/common/types/app';
import { capitalizeFirstLetter } from '@/utils/string/capitalizeFirstLetter';
import ItemService from '@/service/ItemService';
import Image from 'next/image';
import ItemComments from '../ItemComments/ItemComments';
import ItemLikes from '../ItemLikes/ItemLikes';
import ItemPropsList from '../ItemPropsList/ItemPropsList';
import styles from './ItemContent.module.css';
import AppBreadCrumb from '@/components/AppBreadCrumb/AppBreadCrumb';

interface IItemContentProps {
	itemId: string;
}

const ItemContent = async ({ itemId }: IItemContentProps) => {
	const { item, props } = await ItemService.getOneById(itemId);
	const crumbLinks: ICrumbLink[] = [
		{ path: ROUTES.HOME, value: 'Home' },
		{ path: `${ROUTES.COLLECTIONS}/${item.collectionId}`, value: 'Collection' },
		{ path: `${ROUTES.ITEM}/${itemId}`, value: 'Item' },
	];

	return (
		<div className='content-wrapper'>
			<div>
				<h1 className={styles.title}>{capitalizeFirstLetter(item.name)}</h1>
				<AppBreadCrumb links={crumbLinks} />
			</div>
			<div className={styles.content}>
				<div className={styles.own}>
					<div className={styles.image}>
						<Image
							src={BASE_URL + getImagePath(item.image, 'item.jpg')}
							alt='item image'
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
							fill
						/>
					</div>
					<div className={styles.info}>
						<ItemLikes itemId={itemId} />
						<p className={styles.date}>{getDateAndTimeFromString(item.createdAt)}</p>
					</div>
				</div>
				<div className={styles.secondary}>
					<ItemPropsList props={props} />
					<ItemComments itemId={itemId} />
				</div>
			</div>
		</div>
	);
};

export default ItemContent;
