import { useState } from 'react';
import { Box, ListItem, Skeleton, Text, useColorMode } from '@chakra-ui/react';
import { getDateAndTimeFromString } from '@/utils/getDateFromString';
import { getImagePath } from '@/utils/getImagePath';
import { BASE_URL } from '@/common/constant/api';
import { IItem } from '@/common/types/item';
import { ROUTES } from '@/common/types/api';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Item.module.css';

interface IItemProps {
	item: IItem;
}

const Item = ({ item }: IItemProps) => {
	const [isImageLoading, setIsImageLoading] = useState(true);
	const { colorMode } = useColorMode();

	return (
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
						onLoad={() => setIsImageLoading(false)}
						sizes='100%'
						priority={true}
						fill
					/>
					{isImageLoading && <Skeleton h='100%' w='100%' />}
				</Box>
				<h3 className={styles.title}>{item.name}</h3>
				<Text>{getDateAndTimeFromString(item.createdAt)}</Text>
			</Link>
		</ListItem>
	);
};

export default Item;
