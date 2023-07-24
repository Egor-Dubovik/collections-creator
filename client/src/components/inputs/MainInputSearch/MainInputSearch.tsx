import { FC, useState, useEffect, useCallback, useRef } from 'react';
import { Search2Icon, SmallCloseIcon } from '@chakra-ui/icons';
import SearchService from '@/service/SearchService';
import useSearchStore from '@/store/SearchStore';
import useDebounce from '@/hooks/useDebounce';
import { SEARCH_DELAY } from '@/common/constant/numbers';
import { ROUTES } from '@/common/types/api';
import { usePathname, useRouter } from 'next/navigation';
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
	const setItemsToStore = useSearchStore.use.setItems();
	const { colorMode } = useColorMode();
	const inputRef = useRef<HTMLInputElement | null>(null);
	const resetButtonRef = useRef<HTMLDivElement | null>(null);
	const router = useRouter();
	const path = usePathname();

	const getQueryItems = useCallback(async () => {
		if (search.length) {
			const items = await SearchService.findItems(search);
			setItemsToStore(items);
			if (path !== ROUTES.SEARCH) router.push(ROUTES.SEARCH);
		}
	}, [search, setItemsToStore]);

	useDebounce(search, getQueryItems, SEARCH_DELAY);

	const handleClickOutside = useCallback(
		(event: Event) => {
			if (
				inputRef.current &&
				!inputRef.current.contains(event.target as Node) &&
				!resetButtonRef.current?.contains(event.target as Node)
			) {
				handleSwitch();
			}
		},
		[handleSwitch]
	);

	useEffect(() => {
		if (isVisible) document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [isVisible, handleClickOutside]);

	return (
		<Box
			className={isVisible ? `${styles.search} ${styles.searchActive}` : styles.search}
			bg={colorMode !== 'dark' ? 'white' : 'gr.800'}
		>
			<div className='search__container'>
				<InputGroup className={styles.inputSearch}>
					<InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em'>
						<Search2Icon />
					</InputLeftElement>
					<Input
						ref={inputRef}
						value={search}
						onChange={event => setSearch(event.target.value)}
						placeholder='Search...'
						borderColor='teal'
					/>
					<InputRightElement ref={resetButtonRef} onClick={() => setSearch('')}>
						{Boolean(search) && <SmallCloseIcon color='tomato' />}
					</InputRightElement>
				</InputGroup>
			</div>
		</Box>
	);
};

export default MainInputSearch;
