import { MouseEvent } from 'react';
import { BASE_URL } from '@/common/constant/api';
import { ICollectionResponse } from '@/common/types/collection';
import { getImagePath } from '@/utils/getImagePath';
import { getDateAndTimeFromString } from '@/utils/getDateFromString';
import { DeleteIcon } from '@chakra-ui/icons';
import { ROUTES } from '@/common/types/api';
import Image from 'next/image';
import styles from './CollectionItem.module.css';
import useDeleteCollection from '@/hooks/collection/useDelete';
import Link from 'next/link';
import useIsUserHaveRights from '@/hooks/user/useIsUserHaveRights';
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

interface ICollectionItemProps {
	collection: ICollectionResponse;
}

const CollectionItem = ({ collection }: ICollectionItemProps) => {
	const { deleteCollection, isLoading } = useDeleteCollection();
	const isUserHaveRights = useIsUserHaveRights(collection.userId);
	const isMobileResolution = useBreakpointValue({ base: true, sm: false });

	const handleDelete = (event: MouseEvent<HTMLButtonElement>): void => {
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
								src={BASE_URL + getImagePath(collection.image, 'collection.png')}
								alt='collection image'
								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
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
						<Text>{getDateAndTimeFromString(collection.createdAt as string)}</Text>
					</GridItem>
					{isUserHaveRights && (
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
					)}
				</Grid>
			</Link>
		</ListItem>
	);
};

export default CollectionItem;
