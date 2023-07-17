import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { List, ListItem, useColorMode } from '@chakra-ui/react';
import { ITag } from '@/common/types/tag';
import TagService from '@/service/TagService';
import styles from './TagList.module.css';

interface ITagsProps {
	tags: string[];
	setTags: Dispatch<SetStateAction<string[]>>;
}

const TagList = ({ tags, setTags }: ITagsProps) => {
	const [allTags, setAllTags] = useState<ITag[]>([]);
	const [activeTags, setActiveTags] = useState<string[]>([]);
	const { colorMode } = useColorMode();
	let debounceTimer: ReturnType<typeof setTimeout> | null = null;

	const getTags = async () => {
		const tags = await TagService.getAll();
		setAllTags(tags);
	};

	const handleTagClick = (value: string) => {
		if (activeTags.includes(value)) {
			setActiveTags(prevTags => prevTags.filter(tag => tag !== value));
			return;
		}
		setActiveTags(prevTags => [...prevTags, value]);
	};

	const debounceSetTags = useCallback(() => {
		if (debounceTimer) clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			setTags(activeTags);
		}, 250);
	}, [activeTags]);

	useEffect(() => {
		debounceSetTags();
	}, [activeTags, debounceSetTags]);

	useEffect(() => {
		getTags();
	}, []);

	return (
		<List className={styles.tagList} borderColor={colorMode !== 'dark' ? 'gray.300' : 'gray.600'}>
			{allTags.map(tag => (
				<ListItem
					key={tag.id}
					className={`${styles.tag} ${activeTags.includes(tag.value) ? styles.tagActive : ''}`}
					onClick={() => handleTagClick(tag.value)}
					backgroundColor={colorMode !== 'dark' ? 'gray.200' : 'gray.700'}
				>
					{tag.value}
				</ListItem>
			))}
		</List>
	);
};

export default TagList;
