'use client';
import { ICollectionResponse } from '@/common/types/collection';
import { List } from '@chakra-ui/react';
import CollectionItem from '../CollectionItem/CollectionItem';

interface ICollectionListProps {
	collections: ICollectionResponse[];
}

const CollectionList = ({ collections }: ICollectionListProps) => {
	return (
		<List spacing={4}>
			{collections.map(collection => (
				<CollectionItem key={collection.id} collection={collection} />
			))}
		</List>
	);
};

export default CollectionList;
