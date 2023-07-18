'use client';
import { getDateAndTimeFromString } from '@/utils/getDateFromString';
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Text,
	useColorMode,
} from '@chakra-ui/react';
import useGetItemComments from '@/hooks/comments/useGetItemComments';
import styles from './CommentAccordionList.module.css';

interface ICommentListProps {
	itemId: string;
}

const CommentAccordionList = ({ itemId }: ICommentListProps) => {
	const { comments, isLoading, err } = useGetItemComments(itemId);
	const { colorMode } = useColorMode();

	return (
		<>
			{err && <Text color='tomato'>{err.message}</Text>}
			<Accordion allowToggle className={styles.commentsList}>
				{comments?.map(comment => (
					<AccordionItem
						key={comment.id}
						className={styles.commentItem}
						backgroundColor={colorMode !== 'dark' ? 'gray.200' : 'gray.700'}
					>
						{({ isExpanded }) => (
							<>
								<AccordionButton p='10px 5px' borderRadius='5px'>
									<Box display='flex' gap={3} flex='1' textAlign='left'>
										<Text className={styles.secondaryInfo}>
											{comment.userNickName},{' '}
											{getDateAndTimeFromString(comment.updatedAt as string, false)}
										</Text>
										<Text
											className={`${styles.comment} ${!isExpanded && styles.active} ${
												colorMode === 'dark' ? styles.dark : ''
											}`}
										>
											{comment.value}
										</Text>
									</Box>
									<AccordionIcon />
								</AccordionButton>
								<AccordionPanel pb={4}>
									<Text>{comment.value}</Text>
								</AccordionPanel>
							</>
						)}
					</AccordionItem>
				))}
			</Accordion>
		</>
	);
};

export default CommentAccordionList;
