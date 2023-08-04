import { Dispatch, SetStateAction } from 'react';
import { List } from '@chakra-ui/react';
import TagItem from '@/components/tags/TagItem/TagItem';
import styles from './TagsContainer.module.css';

interface ITagsContainerProps {
	height?: string;
	tags: string[];
	setTags: Dispatch<SetStateAction<string[]>>;
}

const TagsContainer = ({ height, tags, setTags }: ITagsContainerProps) => {
	const handleRemoveTag = (tag: string): void => {
		setTags(prevTags => prevTags.filter(currentTag => currentTag !== tag));
	};

	return (
		<List h={height ? height : '100%'} className={styles.tagList}>
			{tags?.map(tag => (
				<TagItem key={tag} tag={tag} handleTagClick={handleRemoveTag} />
			))}
		</List>
	);
};

export default TagsContainer;
