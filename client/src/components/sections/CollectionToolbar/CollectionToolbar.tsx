import { useState } from 'react';
import { Button, Heading, useDisclosure } from '@chakra-ui/react';
import styles from './CollectionToolbar.module.css';
import ItemModel from '@/components/modals/ItemModel';

interface IToolbarProps {
	collectionId: number;
}

const CollectionToolbar = ({ collectionId }: IToolbarProps) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<section className={styles.collectionToolbar}>
			<div className='collection-toolbar__container'>
				<Heading as='h1' size='xl' mb={{ base: 2, md: 3 }}>
					Collection: Name
				</Heading>
				<div>
					<ItemModel collectionId={collectionId} isOpen={isOpen} onClose={onClose} />
					<Button onClick={() => onOpen()}>+ add item</Button>
				</div>
			</div>
		</section>
	);
};

export default CollectionToolbar;
