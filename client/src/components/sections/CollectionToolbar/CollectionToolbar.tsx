import { Dispatch, SetStateAction, useState } from 'react';
import { Button, Checkbox, Heading, useDisclosure } from '@chakra-ui/react';
import { TypeOrder } from '@/common/types/item';
import ItemModel from '@/components/modals/ItemModel';
import OderSelect from '@/components/selects/OderSelect';
import styles from './CollectionToolbar.module.css';

interface IToolbarProps {
	collectionId: number;
	order: TypeOrder;
	setOrder: Dispatch<SetStateAction<TypeOrder>>;
	isCommented: boolean;
	setIsCommented: Dispatch<SetStateAction<boolean>>;
}

const CollectionToolbar = ({
	collectionId,
	order,
	setOrder,
	isCommented,
	setIsCommented,
}: IToolbarProps) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<section className={styles.collectionToolbar}>
			<ItemModel collectionId={collectionId} isOpen={isOpen} onClose={onClose} />
			<div className='collection-toolbar__container'>
				<Heading as='h1' size='xl' mb={{ base: 2, md: 3 }}>
					Collection: Name
				</Heading>
				<div className={styles.content}>
					<Button onClick={() => onOpen()}>+ add item</Button>
					<OderSelect setOrder={setOrder} order={order} />
					<Checkbox checked={isCommented} onChange={() => setIsCommented(!isCommented)}>
						only commented
					</Checkbox>
				</div>
			</div>
		</section>
	);
};

export default CollectionToolbar;
