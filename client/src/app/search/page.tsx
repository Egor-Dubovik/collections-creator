'use client';
import { Heading, Text } from '@chakra-ui/react';
import { MESSAGE } from '@/common/constant/message';
import ItemList from '@/components/item/ItemList/ItemList';
import useSearchStore from '@/store/SearchStore';
import { useEffect } from 'react';

const SearchPage = () => {
	const { items, setItems } = useSearchStore();

	useEffect(() => {
		return () => {
			setItems(null);
		};
	}, [setItems]);

	return (
		<main className='main'>
			<section className='search-results'>
				<div className='search-results__container'>
					<Heading as='h1' size='lg' mb={3}>
						Search results:
					</Heading>
					{items ? <ItemList items={items} /> : <Text>{MESSAGE.TYPE_TO_SEARCH}</Text>}
				</div>
			</section>
		</main>
	);
};

export default SearchPage;
