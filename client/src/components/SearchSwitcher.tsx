import { FC } from 'react';
import { IconButton } from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';

interface ISearchSwitcherProps {
	handleSwitch: () => void;
}
const SearchSwitcher: FC<ISearchSwitcherProps> = ({ handleSwitch }) => {
	return (
		<IconButton
			icon={<Search2Icon _hover={{ color: 'tealLight' }} transition='color 0.2s ease' />}
			size='md'
			variant='unstyled'
			onClick={handleSwitch}
			aria-label='search icon'
		/>
	);
};

export default SearchSwitcher;
