'use client';
import { useEffect, useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/common/types/api';
import useGetTags from '@/hooks/tag/useGetTags';
import TagList from '@/components/tags/TagList/TagList';
import styles from './Tags.module.css';
import useSearchStore from '@/store/SearchStore';
import useGetItemsByTags from '@/hooks/item/useGetItemsByTags';

const Tags = () => {
	const [activeTags, setActiveTags] = useState<string[]>([]);
	const { allTags, isLoading } = useGetTags();
	const { items, isTagItemsLoading, refetch } = useGetItemsByTags(JSON.stringify(activeTags));
	const setItems = useSearchStore.use.setItems();
	const router = useRouter();

	const fetchItems = (): void => {
		refetch();
	};

	useEffect(() => {
		if (items?.length) {
			setItems(items);
			router.push(ROUTES.SEARCH);
		}
	}, [items, router, setItems]);

	return (
		<section className='tags'>
			<Box position='relative' className='tags__container'>
				<Box display='flex' gap='15px'>
					<h2 className={styles.title}>App tags</h2>
					{activeTags.length > 0 && (
						<Button isLoading={isTagItemsLoading} onClick={fetchItems}>
							show
						</Button>
					)}
				</Box>
				<TagList tags={allTags} setActiveTags={setActiveTags} loading={isLoading} />
			</Box>
		</section>
	);
};

export default Tags;
