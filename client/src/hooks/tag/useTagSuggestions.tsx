import { ITag } from '@/common/types/tag';
import { checkIsEmptyString } from '@/utils/string/checkEmptyString';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const filterTags = (tags: ITag[], inputValue: string) => {
	return tags
		.filter(tag => {
			if (tag.value.includes(inputValue) && tag.value !== inputValue) {
				return tag;
			}
		})
		.map(tag => tag.value);
};

const useTagSuggestions = (tags: ITag[] | undefined, inputValue: string) => {
	const [tagSuggestions, setTagSuggestions] = useState<string[]>([]);

	useEffect(() => {
		if (tags) {
			if (checkIsEmptyString(inputValue)) {
				setTagSuggestions([]);
				return;
			}

			const suggestions = filterTags(tags, inputValue);
			if (suggestions.length > 0 && !tagSuggestions.includes(inputValue)) {
				setTagSuggestions(suggestions);
				return;
			}
			setTagSuggestions([]);
		}
	}, [tags, inputValue]);

	return [tagSuggestions, setTagSuggestions] as [string[], Dispatch<SetStateAction<string[]>>];
};

export default useTagSuggestions;
