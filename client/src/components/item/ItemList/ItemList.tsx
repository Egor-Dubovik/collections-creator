import { List, Text } from '@chakra-ui/react';
import { IItem } from '@/common/types/item';
import { MESSAGE } from '@/common/constant/message';
import styles from './ItemList.module.css';
import Item from '../Item/Item';

interface IItemListProps {
	items: IItem[];
}

const ItemList = ({ items }: IItemListProps) => {
	return (
		<>
			{items.length ? (
				<List className={styles.list}>
					{items?.map(item => (
						<Item key={item.id} item={item} />
					))}
				</List>
			) : (
				<Text>{MESSAGE.NO_ITEMS}</Text>
			)}
		</>
	);
};

export default ItemList;
