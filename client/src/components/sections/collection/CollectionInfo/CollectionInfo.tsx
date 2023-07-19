import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { ICollectionResponse } from '@/common/types/collection';
import useUserPermissions from '@/hooks/permissions/useUserPermissions';
import useGetCollectionTopic from '@/hooks/topic/useGetCollectionTopic';

interface ICollectionIfoProps {
	collection: ICollectionResponse;
	openModel: () => void;
}

const CollectionInfo = ({ collection, openModel }: ICollectionIfoProps) => {
	const canChangeData = useUserPermissions(collection);
	const { topic } = useGetCollectionTopic(collection.topicId);

	return (
		<section>
			<div className='collection-info__container'>
				<Box display='flex' gap={5}>
					<Heading as='h1' size='xl' mb={{ base: 2, md: 3 }}>
						{collection?.title}
					</Heading>
					{canChangeData && (
						<Button colorScheme='teal' variant='outline' onClick={openModel}>
							+ add item
						</Button>
					)}
				</Box>
				<Box>
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
