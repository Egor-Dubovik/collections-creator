import { FC, useState, ChangeEvent } from 'react';
import { Search2Icon, SmallCloseIcon } from '@chakra-ui/icons';
import {
	Box,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	useColorMode,
} from '@chakra-ui/react';
import styles from './MainInputSearch.module.css';

interface IMainInputSearchProps {
	isVisible: boolean;
	handleSwitch: () => void;
}

const MainInputSearch: FC<IMainInputSearchProps> = ({ isVisible, handleSwitch }) => {
	const [search, setSearch] = useState('');
	const { colorMode } = useColorMode();

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};

	return (
		<Box
			className={isVisible ? styles.search : `${styles.search} ${styles.searchActive}`}
			bg={colorMode !== 'dark' ? 'white' : 'gr.800'}
		>
			<div className='search__container'>
				<InputGroup className={styles.inputSearch}>
					<InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em'>
						<Search2Icon />
					</InputLeftElement>
					<Input value={search} onChange={event => handleChange(event)} placeholder='Search...' />
					<InputRightElement onClick={() => setSearch('')}>
						{Boolean(search) && <SmallCloseIcon color='tomato' />}
					</InputRightElement>
				</InputGroup>
			</div>
		</Box>
	);
};

export default MainInputSearch;
