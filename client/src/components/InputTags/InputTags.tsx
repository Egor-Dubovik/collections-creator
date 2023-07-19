import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { Heading, Input, List, ListItem, Box, Button, useColorMode } from '@chakra-ui/react';
import { checkIsEmptyString } from '@/utils/string/checkEmptyString';
import useGetTags from '@/hooks/tag/useGetTags';
import useTagSuggestions from '@/hooks/tag/useTagSuggestions';
import styles from './InputTags.module.css';
import TagsContainer from './TagsContainer/TagsContainer';

interface IInputTagsProps {
	itemTags: string[];
	setItemTags: Dispatch<SetStateAction<string[]>>;
}

const InputTags = ({ itemTags, setItemTags }: IInputTagsProps) => {
	const [newTag, setNewTag] = useState('');
	const { allTags } = useGetTags();
	const [tagSuggestions, setTagSuggestions] = useTagSuggestions(allTags, newTag);
	const { colorMode } = useColorMode();
	const inputRef = useRef<HTMLInputElement | null>(null);

	const handleTagSelect = (tag: string): void => {
		setNewTag(tag);
		setTagSuggestions([]);
	};

	const addItemTag = (): void => {
		if (!itemTags.includes(newTag)) setItemTags(prevTags => [...prevTags, newTag]);
	};

	const handleAddTag = (): void => {
		if (checkIsEmptyString(newTag)) {
			inputRef.current?.focus();
			return;
		}
		setNewTag('');
		addItemTag();
	};

	return (
		<div>
			<Heading as='h6' size='md' mb={2}>
				Tags:
			</Heading>
			<TagsContainer tags={itemTags} setTags={setItemTags} />
			<Box className={styles.tagForm}>
				<Box className={styles.inputSelect}>
					<Input
						ref={inputRef}
						value={newTag}
						onChange={event => setNewTag(event.target.value)}
						placeholder='input tag'
					/>
					{tagSuggestions.length > 0 && (
						<List
							className={styles.suggestionsList}
							borderColor={colorMode !== 'dark' ? 'gray.300' : 'gray.500'}
						>
							{tagSuggestions.map((tag, index) => (
								<ListItem
									key={index}
									className={styles.listItem}
									_hover={{ bg: 'blue.200' }}
									onClick={() => handleTagSelect(tag)}
									color={colorMode !== 'dark' ? 'black' : 'white'}
									bg={colorMode !== 'dark' ? 'white' : 'gray.700'}
								>
									{tag}
								</ListItem>
							))}
						</List>
					)}
				</Box>
				<Button w='100%' colorScheme='teal' variant='outline' onClick={handleAddTag}>
					add
				</Button>
			</Box>
		</div>
	);
};

export default InputTags;
