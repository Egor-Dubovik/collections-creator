import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { ICollectionResponse } from '@/common/types/collection';
import useUserPermissions from '@/hooks/permissions/useUserPermissions';
import useGetCollectionTopic from '@/hooks/topic/useGetCollectionTopic';
import AppBreadCrumb from '@/components/AppBreadCrumb/AppBreadCrumb';
import { usePathname, useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { ICrumbLink } from '@/common/types/app';
import { ROUTES } from '@/common/types/api';

interface ICollectionIfoProps {
	collection: ICollectionResponse;
	openModel: () => void;
}

const CollectionInfo = ({ collection, openModel }: ICollectionIfoProps) => {
	const canChangeData = useUserPermissions(collection);
	const { topic } = useGetCollectionTopic(collection.topicId);
	const crumbLinks: ICrumbLink[] = [
		{ path: ROUTES.HOME, value: 'Home' },
		{ path: `${ROUTES.COLLECTIONS}/${collection.id}`, value: 'Collection: ' + collection.title },
	];

	return (
		<section>
			<div className='collection-info__container'>
				<Box mb={2} display='flex' flexWrap='wrap' columnGap={5} rowGap={0}>
					<Heading as='h1' size='xl' mb={{ base: 2, md: 3 }}>
						{collection?.title}
					</Heading>
					{canChangeData && (
						<Button colorScheme='teal' variant='outline' onClick={openModel}>
							+ add item
						</Button>
					)}
				</Box>
				<AppBreadCrumb links={crumbLinks} />
				<Box display='flex' flexDirection='column-reverse' gap={2}>
					<Text fontSize='lg'>Topic: {topic?.en}</Text>
					<Text fontSize='lg' maxWidth='1180px'>
						Description: {collection?.description}
					</Text>
				</Box>
			</div>
		</section>
	);
};

export default CollectionInfo;
