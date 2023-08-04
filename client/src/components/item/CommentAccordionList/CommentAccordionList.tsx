'use client';
import { Accordion, AccordionItem, Text, useColorMode } from '@chakra-ui/react';
import { MESSAGE } from '@/common/constant/message';
import useGetItemComments from '@/hooks/comments/useGetItemComments';
import CommentAccordionContent from './CommentAccordionContent/CommentAccordionContent';
import styles from './CommentAccordionList.module.css';
import CustomSkeleton from '@/components/CustomSkeleton';

interface ICommentListProps {
	itemId: string;
}

const CommentAccordionList = ({ itemId }: ICommentListProps) => {
	const { comments, isLoading, err } = useGetItemComments(itemId);
	const { colorMode } = useColorMode();

	return (
		<>
			{err && <Text color='tomato'>{err.message}</Text>}
			{!isLoading ? (
				<>
					{comments && comments.length ? (
						<Accordion allowToggle className={styles.commentsList}>
							{comments.map(comment => (
								<AccordionItem
									key={comment.id}
									className={styles.commentItem}
									backgroundColor={colorMode !== 'dark' ? 'gray.200' : 'gray.700'}
								>
									{({ isExpanded }) => (
										<CommentAccordionContent isExpanded={isExpanded} comment={comment} />
									)}
								</AccordionItem>
							))}
						</Accordion>
					) : (
						<Text mb='15px'>{MESSAGE.NO_COMMENTS}</Text>
					)}
				</>
			) : (
				<CustomSkeleton mb='15px' spacing='10px' height='64px' borderRadius='5px' />
			)}
		</>
	);
};

export default CommentAccordionList;
