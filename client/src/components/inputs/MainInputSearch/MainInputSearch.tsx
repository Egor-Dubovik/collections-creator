import { FC, useState, useEffect, useCallback, useRef, MouseEvent } from 'react';
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
import useAddClickListener from '@/hooks/listeners/useAddClickListener';
import styles from './MainInputSearch.module.css';
import Loader from '@/components/Loader';

interface IMainInputSearchProps {
	isVisible: boolean;
	handleClose: () => void;
}

const MainInputSearch: FC<IMainInputSearchProps> = ({ isVisible, handleClose }) => {
	const [search, setSearch] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const setItemsToStore = useSearchStore.use.setItems();
	const { colorMode } = useColorMode();
	const searchRef = useRef<HTMLDivElement | null>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const resetButtonRef = useRef<HTMLDivElement | null>(null);
	const router = useRouter();
	const path = usePathname();

	const getQueryItems = useCallback(async () => {
		if (search.length) {
			setIsLoading(true);
			const items = await SearchService.findItems(search);
			setItemsToStore(items);
			setIsLoading(false);
			if (path !== ROUTES.SEARCH) router.push(ROUTES.SEARCH);
		}
	}, [search, setItemsToStore, router, path]);

	const handleClickOutside = useCallback(
		(event: Event) => {
			if (
				!inputRef.current?.contains(event.target as Node) &&
				!resetButtonRef.current?.contains(event.target as Node)
			) {
				handleClose();
				setSearch('');
			}
		},
		[handleClose]
	);

	useEffect(() => {
		if (inputRef.current && isVisible) inputRef.current.focus();
	}, [isVisible, inputRef]);

	useDebounce(search, getQueryItems, SEARCH_DELAY);
	useAddClickListener(handleClickOutside, [isVisible, handleClickOutside]);

	return (
		<Box
			ref={searchRef}
			className={
				isVisible ? `${styles.search} ${styles.active}` : `${styles.search} ${styles.hidden}`
			}
			bg={colorMode !== 'dark' ? 'white' : 'gr.800'}
		>
			<div className={`${styles.container} search__container`}>
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
						<SmallCloseIcon color='tomato' />
					</InputRightElement>
				</InputGroup>
				{isLoading && (
					<Box className={styles.indicator}>
						<Loader width='20px' height='20px' />
					</Box>
				)}
			</div>
		</Box>
	);
};

export default MainInputSearch;
