'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { TypeOrder } from '@/common/types/item';
import { ICollectionResponse } from '@/common/types/collection';
import { Text, useDisclosure } from '@chakra-ui/react';
import ItemModel from '@/components/modals/ItemModel';
import CollectionInfo from '@/components/sections/collection/CollectionInfo/CollectionInfo';
import CollectionItems from '@/components/sections/collection/CollectionItems/CollectionItems';
import CollectionToolbar from '@/components/sections/collection/CollectionToolbar/CollectionToolbar';
import useGetCollection from '@/hooks/collection/useGetCollection';
import Loader from '@/components/Loader';

const CollectionPage = () => {
	const [order, setOrder] = useState<TypeOrder>('desc');
	const [isCommented, setIsCommented] = useState(false);
	const [activeTags, setActiveTags] = useState<string[]>([]);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const params = useParams();
	const id = Number(params.collectionId);
	const { collection, isLoading, err } = useGetCollection(id);

	return (
		<main className='main'>
			{err && <Text color='tomato'>{err.message}</Text>}
			{!isLoading ? (
				<>
					<ItemModel collectionId={id} isOpen={isOpen} onClose={onClose} />
					<CollectionInfo collection={collection as ICollectionResponse} openModel={onOpen} />
					<CollectionToolbar
						order={order}
						setOrder={setOrder}
						isCommented={isCommented}
						setIsCommented={setIsCommented}
						setActiveTags={setActiveTags}
					/>
					<CollectionItems
						order={order}
						isCommented={isCommented}
						activeTags={activeTags}
						collectionId={id}
					/>
				</>
			) : (
				<Loader />
			)}
		</main>
	);
};

export default CollectionPage;
