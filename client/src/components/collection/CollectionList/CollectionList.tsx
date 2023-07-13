'use client';
import { ICollectionResponse } from '@/common/types/collection';
import { List, Skeleton, Stack } from '@chakra-ui/react';
import CollectionItem from '../CollectionItem/CollectionItem';

interface ICollectionListProps {
	collections: ICollectionResponse[];
	isLoading?: boolean;
}

const CollectionList = ({ collections, isLoading }: ICollectionListProps) => {
	return (
		<>
			{!isLoading ? (
				<List spacing={4}>
					{collections?.map(collection => (
						<CollectionItem key={collection.id} collection={collection} />
					))}
				</List>
			) : (
				<Stack gap='20px'>
					<Skeleton height='155px' borderRadius='10px' />
					<Skeleton height='155px' borderRadius='10px' />
				</Stack>
			)}
		</>
	);
};

export default CollectionList;
