import { Dispatch, SetStateAction } from 'react';
import { Box, Checkbox, useColorMode } from '@chakra-ui/react';
import { TypeOrder } from '@/common/types/item';
import OderSelect from '@/components/selects/OderSelect';
import TagList from '@/components/tags/TagList/TagList';
import useGetTags from '@/hooks/tag/useGetTags';
import styles from './CollectionToolbar.module.css';

interface IToolbarProps {
	order: TypeOrder;
	setOrder: Dispatch<SetStateAction<TypeOrder>>;
	isCommented: boolean;
	setIsCommented: Dispatch<SetStateAction<boolean>>;
	setTags: Dispatch<SetStateAction<string[]>>;
}

const CollectionToolbar = ({
	order,
	isCommented,
	setTags,
	setOrder,
	setIsCommented,
}: IToolbarProps) => {
	const { allTags, isLoading } = useGetTags();
	const { colorMode } = useColorMode();

	return (
		<section className={styles.collectionToolbar}>
			<div className='collection-toolbar__container'>
				<div className={styles.tools}>
					<Box className={styles.sortTools}>
						<Box
							className={styles.mainTools}
							borderColor={colorMode !== 'dark' ? 'gray.300' : 'gray.600'}
						>
							<OderSelect setOrder={setOrder} order={order} />
							<Checkbox checked={isCommented} onChange={() => setIsCommented(!isCommented)}>
								only commented
							</Checkbox>
						</Box>
						<Box className={styles.secondTools}>
							<TagList tags={allTags} setTags={setTags} loading={isLoading} />
						</Box>
					</Box>
				</div>
			</div>
		</section>
	);
};

export default CollectionToolbar;
