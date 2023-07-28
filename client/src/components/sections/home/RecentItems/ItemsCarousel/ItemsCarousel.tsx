'use client';
import { Box, useColorMode } from '@chakra-ui/react';
import { BASE_URL } from '@/common/constant/api';
import { getImagePath } from '@/utils/getImagePath';
import { IItem } from '@/common/types/item';
import Image from 'next/image';
import Carousel from '@/components/Carousel/Carousel';
import styles from './ItemsCarousel.module.css';
import Link from 'next/link';
import { ROUTES } from '@/common/types/api';

interface IItemCarouselProps {
	items: IItem[];
}

const ItemsCarousel = ({ items }: IItemCarouselProps) => {
	const { colorMode } = useColorMode();

	return (
		<Carousel>
			{items?.map(item => (
				<Box
					key={item.id}
					className={styles.item}
					backgroundColor={colorMode !== 'dark' ? 'gray.200' : 'gray.700'}
				>
					<Link className={styles.link} href={`${ROUTES.ITEM}/${item.id}`}>
						<Box className={styles.image}>
							<img src={BASE_URL + getImagePath(item.image, 'item.jpg')} alt='item image' />
						</Box>
						<h2 className={styles.itemName}>{item.name}</h2>
					</Link>
				</Box>
			))}
		</Carousel>
	);
};

export default ItemsCarousel;
