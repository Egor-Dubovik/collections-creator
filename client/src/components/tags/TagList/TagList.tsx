import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { List, ListItem, Skeleton, Text, useColorMode } from '@chakra-ui/react';
import { ITag } from '@/common/types/tag';
import styles from './TagList.module.css';
import useDebounce from '@/hooks/useDebounce';

interface ITagsProps {
	setTags: Dispatch<SetStateAction<string[]>>;
	tags: ITag[] | undefined;
	loading: boolean;
}

const TagList = ({ setTags, tags, loading }: ITagsProps) => {
	const [activeTags, setActiveTags] = useState<string[]>([]);
	const { colorMode } = useColorMode();

	const handleTagClick = (value: string) => {
		if (activeTags.includes(value)) {
			setActiveTags(prevTags => prevTags.filter(tag => tag !== value));
			return;
		}
		setActiveTags(prevTags => [...prevTags, value]);
	};

	const handleSetTags = useCallback(() => {
		setTags(activeTags);
	}, [activeTags, setTags]);

	useDebounce(activeTags, handleSetTags);

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
									activeTags.includes(tag.value) ? styles.tagActive : ''
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
				<Skeleton height='100%' borderRadius='5px' />
			)}
		</>
	);
};

export default TagList;
