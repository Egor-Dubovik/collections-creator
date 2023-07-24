'use client';
import { MESSAGE } from '@/common/constant/message';
import { ICollectionResponse } from '@/common/types/collection';
import { List, Skeleton, Stack, Text } from '@chakra-ui/react';
import CollectionItem from '../CollectionItem/CollectionItem';

interface ICollectionListProps {
	collections: ICollectionResponse[];
	isLoading?: boolean;
}

const CollectionList = ({ collections, isLoading }: ICollectionListProps) => {
	return (
		<>
			{!isLoading ? (
				<>
					{collections?.length ? (
						<List spacing={4}>
							{collections?.map(collection => (
								<CollectionItem key={collection.id} collection={collection} />
							))}
						</List>
					) : (
						<Text>{MESSAGE.NO_COLLECTION}</Text>
					)}
				</>
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
