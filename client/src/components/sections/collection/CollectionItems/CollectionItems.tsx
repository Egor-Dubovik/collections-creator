import { useState, useEffect, useCallback } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { START_OFFSET, LIMIT } from '@/common/constant/item';
import { IItem, IItemResData, TypeOrder } from '@/common/types/item';
import ItemService from '@/service/ItemService';
import ItemList from '@/components/item/ItemList/ItemList';

interface IItemsProps {
	collectionId: number;
	order: TypeOrder;
	isCommented: boolean;
	activeTags: string[];
}

const CollectionItems = ({ collectionId, order, isCommented, activeTags }: IItemsProps) => {
	const [items, setItems] = useState<IItem[]>([]);
	const [isHasNext, setIsHasNext] = useState(false);
	const [isAddingMore, setIsAddingMore] = useState(false);
	const [offset, setOffset] = useState<number>(START_OFFSET);

	const getItems = useCallback(async () => {
		const data = await ItemService.getByParams({
			order,
			offset,
			tags: JSON.stringify(activeTags),
			isCommented,
			limit: LIMIT,
			collectionId,
		});
		return data;
	}, [order, offset, activeTags, isCommented, collectionId]);

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
	}, [offset, order, isCommented, activeTags]);

	return (
		<Box as='section' p='15px 0'>
			<Box
				display='flex'
				flexDirection='column'
				alignItems='center'
				className='collection-items__container'
			>
				<ItemList items={items} />
				{isHasNext && (
					<Button
						h='50px'
						p='0 45px'
						marginTop={5}
						alignSelf='center'
						borderRadius='50px'
						colorScheme='teal'
						letterSpacing='1px'
						onClick={handleShowMore}
					>
						show more
					</Button>
				)}
			</Box>
		</Box>
	);
};

export default CollectionItems;
