'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { TypeOrder } from '@/common/types/item';
import CollectionItems from '@/components/sections/CollectionItems/CollectionItems';
import CollectionToolbar from '@/components/sections/CollectionToolbar/CollectionToolbar';

const CollectionPage = () => {
	const [order, setOrder] = useState<TypeOrder>('desc');
	const [isCommented, setIsCommented] = useState(false);
	const [tags, setTags] = useState<string[]>([]);
	const params = useParams();
	const id = Number(params.collectionId);

	return (
		<main className='main'>
			<CollectionToolbar
				collectionId={id}
				order={order}
				setOrder={setOrder}
				isCommented={isCommented}
				setIsCommented={setIsCommented}
				setTags={setTags}
			/>
			<CollectionItems order={order} isCommented={isCommented} tags={tags} collectionId={id} />
		</main>
	);
};

export default CollectionPage;
