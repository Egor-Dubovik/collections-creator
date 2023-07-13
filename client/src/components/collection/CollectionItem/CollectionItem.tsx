import { MouseEvent } from 'react';
import { BASE_URL } from '@/common/constant/api';
import { ICollectionResponse } from '@/common/types/collection';
import { getAvatarPath } from '@/utils/getAvatarPath';
import { getDateFromString } from '@/utils/getDateFromString';
import { DeleteIcon } from '@chakra-ui/icons';
import Image from 'next/image';
import styles from './CollectionItem.module.css';
import useDeleteCollection from '@/hooks/collection/useDelete';
import {
	Box,
	Grid,
	GridItem,
	Heading,
	ListItem,
	Text,
	IconButton,
	useBreakpointValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import { ROUTES } from '@/common/types/api';

interface ICollectionItemProps {
	collection: ICollectionResponse;
}

const CollectionItem = ({ collection }: ICollectionItemProps) => {
	const { deleteCollection, isLoading } = useDeleteCollection();
	const isMobileResolution = useBreakpointValue({ base: true, sm: false });

	const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		deleteCollection(collection.id);
	};

	return (
		<ListItem
			key={collection.id}
			className={styles.item}
			borderColor={'gray.300'}
			_hover={{ borderColor: 'tealLight' }}
		>
			<Link href={`${ROUTES.COLLECTIONS}/${collection.id}`} className={styles.link}>
				<Grid
					templateColumns={isMobileResolution ? '100px auto' : '100px auto 40px'}
					alignItems='center'
					width='100%'
					gap={3}
				>
					<GridItem>
						<Box className={styles.image}>
							<Image
								src={BASE_URL + getAvatarPath(collection.image, 'collection.png')}
								alt='collection image'
								fill
							/>
						</Box>
					</GridItem>
					<GridItem>
						<Grid templateColumns='1fr auto' alignItems='center' gap={2}>
							<Heading as='h6' className={styles.title}>
								{collection.title}
							</Heading>
						</Grid>
						<Text>{getDateFromString(collection.createdAt)}</Text>
					</GridItem>
					<GridItem colSpan={isMobileResolution ? 2 : 1}>
						<IconButton
							display='flex'
							width={isMobileResolution ? '100%' : '40px'}
							height={isMobileResolution ? '45px' : '40px'}
							icon={<DeleteIcon />}
							isLoading={isLoading}
							variant='outline'
							onClick={event => handleDelete(event)}
							aria-label='delete button'
						/>
					</GridItem>
				</Grid>
			</Link>
		</ListItem>
	);
};

export default CollectionItem;
