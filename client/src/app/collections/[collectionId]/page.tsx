'use client';
import CollectionItems from '@/components/sections/CollectionItems/CollectionItems';
import CollectionToolbar from '@/components/sections/CollectionToolbar/CollectionToolbar';
import { useParams } from 'next/navigation';

const CollectionPage = () => {
	const params = useParams();
	const id = Number(params.collectionId);

	return (
		<main className='main'>
			<CollectionToolbar collectionId={id} />
			<CollectionItems />
		</main>
	);
};

export default CollectionPage;
