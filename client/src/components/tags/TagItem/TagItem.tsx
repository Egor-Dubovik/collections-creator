import { ListItem, Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';

interface ITagProps {
	tag: string;
	handleTagClick: (tag: string) => void;
}

const TagItem = ({ tag, handleTagClick }: ITagProps) => {
	return (
		<ListItem onClick={() => handleTagClick(tag)}>
			<Tag size='lg' borderRadius='full' variant='solid' colorScheme='teal'>
				<TagLabel>{tag}</TagLabel>
				<TagCloseButton />
			</Tag>
		</ListItem>
	);
};

export default TagItem;
