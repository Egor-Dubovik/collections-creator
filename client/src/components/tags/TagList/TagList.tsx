import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { List, ListItem, Skeleton, Text, useColorMode } from '@chakra-ui/react';
import { ITag } from '@/common/types/tag';
import styles from './TagList.module.css';
import useDebounce from '@/hooks/useDebounce';

interface ITagsProps {
	setActiveTags: Dispatch<SetStateAction<string[]>>;
	tags: ITag[] | undefined;
	loading: boolean;
}

const TagList = ({ setActiveTags, tags, loading }: ITagsProps) => {
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const { colorMode } = useColorMode();

	const handleTagClick = (value: string) => {
		if (selectedTags.includes(value)) {
			setSelectedTags(prevTags => prevTags.filter(tag => tag !== value));
			return;
		}
		setSelectedTags(prevTags => [...prevTags, value]);
	};

	const handleSetTags = useCallback(() => {
		setActiveTags(selectedTags);
	}, [selectedTags, setActiveTags]);

	useDebounce(selectedTags, handleSetTags);

	return (
		<>
			{!loading ? (
				<List
					className={styles.tagList}
					borderColor={colorMode !== 'dark' ? 'gray.300' : 'gray.600'}
				>
					{tags?.length ? (
						tags.map(tag => (
							<ListItem
								key={tag.id}
								className={`${styles.tag} ${
									selectedTags.includes(tag.value) ? styles.tagActive : ''
								}`}
								onClick={() => handleTagClick(tag.value)}
								backgroundColor={colorMode !== 'dark' ? 'gray.200' : 'gray.700'}
							>
								{tag.value}
							</ListItem>
						))
					) : (
						<Text>No tag has been added yet</Text>
					)}
				</List>
			) : (
				<Skeleton height='124px' borderRadius='5px' />
			)}
		</>
	);
};

export default TagList;
