import { useState, useEffect, useCallback } from 'react';
import { Box, Button, List, ListItem, Text, useColorMode } from '@chakra-ui/react';
import { BASE_URL } from '@/common/constant/api';
import { START_OFFSET, LIMIT } from '@/common/constant/item';
import { IItem, IItemResData, TypeOrder } from '@/common/types/item';
import { getDateAndTimeFromString } from '@/utils/getDateFromString';
import { getImagePath } from '@/utils/getImagePath';
import { ROUTES } from '@/common/types/api';
import ItemService from '@/service/ItemService';
import Image from 'next/image';
import Link from 'next/link';
import styles from './CollectionItems.module.css';

interface IItemsProps {
	collectionId: number;
	order: TypeOrder;
	isCommented: boolean;
	tags: string[];
}

const CollectionItems = ({ collectionId, order, isCommented, tags }: IItemsProps) => {
	const [items, setItems] = useState<IItem[]>([]);
	const [isHasNext, setIsHasNext] = useState(false);
	const [isAddingMore, setIsAddingMore] = useState(false);
	const [offset, setOffset] = useState<number>(START_OFFSET);
	const { colorMode } = useColorMode();

	const getItems = useCallback(async () => {
		const data = await ItemService.getByParams({
			order,
			offset,
			tags: JSON.stringify(tags),
			isCommented,
			limit: LIMIT,
			collectionId,
		});
		return data;
	}, [order, offset, tags, isCommented, collectionId]);

	const handleShowMore = async () => {
		setOffset(offset + LIMIT);
		setIsAddingMore(true);
	};

	const handleSetItems = (data: IItemResData) => {
		if (isAddingMore) {
			setItems(prevItems => [...prevItems, ...data.items]);
			setIsAddingMore(false);
			return;
		}
		setItems(data.items);
		setOffset(START_OFFSET);
	};

	const handleSorting = async () => {
		const data = await getItems();
		handleSetItems(data);
		setIsHasNext(data.hasNextItem);
	};

	useEffect(() => {
		handleSorting();
	}, [offset, order, isCommented, tags]);

	return (
		<section className={styles.collectionItems}>
			<div className='collection-items__container'>
				<List className={styles.list}>
					{items?.map(item => (
						<ListItem
							key={item.id}
							className={styles.item}
							backgroundColor={colorMode !== 'dark' ? 'gray.200' : 'gray.700'}
						>
							<Link href={`${ROUTES.ITEM}/${item.id}`} className={styles.link}>
								<Box className={styles.imageWrapper}>
									<Image
										src={BASE_URL + getImagePath(item.image, 'item.jpg')}
										className={styles.image}
										alt='item image'
										sizes='100vw'
										fill
									/>
								</Box>
								<h3 className={styles.title}>{item.name}</h3>
								<Text>{getDateAndTimeFromString(item.createdAt)}</Text>
							</Link>
						</ListItem>
					))}
				</List>
				{isHasNext && (
					<Button onClick={handleShowMore} mt={2}>
						show more
					</Button>
				)}
			</div>
		</section>
	);
};

export default CollectionItems;