'use client';
import { useEffect, useState } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { IItem } from '@/common/types/item';
import ItemsCarousel from '@/components/ItemsCarousel/ItemsCarousel';
import Loader from '@/components/Loader';
import useGetCollectionItems from '@/hooks/item/useGetCollectionItems';

interface ICollectionItemsCarouselProps {
	itemId: string;
}

const CollectionItemsCarousel = ({ itemId }: ICollectionItemsCarouselProps) => {
	const [items, setItems] = useState<IItem[]>([]);
	const [isItemLoading, setIsItemLoading] = useState(false);
	const { data, isLoading } = useGetCollectionItems(itemId);

	useEffect(() => {
		if (data) {
			setIsItemLoading(true);
			const itemsWithoutCurrent = data.filter(currentItem => currentItem.id !== Number(itemId));
			setItems(itemsWithoutCurrent);
			setIsItemLoading(false);
		}
	}, [itemId, data]);

	return (
		<Box as='section' p='15px 0'>
			<Box className='items-carousel__container'>
				<Heading as='h2' size='lg' mb={3}>
					Other collection items
				</Heading>
				{!isLoading && !isItemLoading ? (
					<>{data && <ItemsCarousel items={items} />}</>
				) : (
					<Box position='relative' h='150px'>
						<Loader />
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default CollectionItemsCarousel;
