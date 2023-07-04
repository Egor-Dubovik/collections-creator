import { BASE_URL } from '@/common/constant/api';
import { ICollectionResponse } from '@/common/types/collection';
import { getAvatarPath } from '@/utils/getAvatarPath';
import { getDateFromString } from '@/utils/getDateFromString';
import { Box, Grid, GridItem, Heading, ListItem, Text } from '@chakra-ui/react';
import Image from 'next/image';
import styles from './CollectionItem.module.css';

interface ICollectionItemProps {
	collection: ICollectionResponse;
}

const CollectionItem = ({ collection }: ICollectionItemProps) => {
	return (
		<ListItem key={collection.id} className={styles.item} _hover={{ borderColor: 'tealLight' }}>
			<Grid templateColumns='100px auto 100px' alignItems='center' gap={4}>
				<GridItem colSpan={1}>
					<Box className={styles.image}>
						<Image
							src={BASE_URL + getAvatarPath(collection.image, 'collection.png')}
							alt='collection image'
							fill
						/>
					</Box>
				</GridItem>
				<GridItem colSpan={2}>
					<Heading as='h6' className={styles.title}>
						{collection.title}
					</Heading>
					<Text>{getDateFromString(collection.createdAt)}</Text>
				</GridItem>
			</Grid>
		</ListItem>
	);
};

export default CollectionItem;
