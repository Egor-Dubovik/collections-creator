import { Box, List, ListItem, Text, useColorMode } from '@chakra-ui/react';
import { ROUTES } from '@/common/types/api';
import { IItem } from '@/common/types/item';
import { getImagePath } from '@/utils/getImagePath';
import { BASE_URL } from '@/common/constant/api';
import { getDateAndTimeFromString } from '@/utils/getDateFromString';
import { MESSAGE } from '@/common/constant/message';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ItemList.module.css';

interface IItemListProps {
	items: IItem[];
}

const ItemList = ({ items }: IItemListProps) => {
	const { colorMode } = useColorMode();

	return (
		<>
			{items.length ? (
				<List className={styles.list}>
					{items?.map(item => (
						<ListItem
							key={item.id}
							className={styles.item}
							backgroundColor={colorMode !== 'dark' ? 'gray.200' : 'gray.700'}
						>
							<Link href={`${ROUTES.ITEM}/${item.id}`} className={styles.link}>
								<Box className={styles.imageWrapper}>
									<img
										src={BASE_URL + getImagePath(item.image, 'item.jpg')}
										className={styles.image}
										alt='item image'
									/>
								</Box>
								<h3 className={styles.title}>{item.name}</h3>
								<Text>{getDateAndTimeFromString(item.createdAt)}</Text>
							</Link>
						</ListItem>
					))}
				</List>
			) : (
				<Text>{MESSAGE.NO_ITEMS}</Text>
			)}
		</>
	);
};

export default ItemList;
