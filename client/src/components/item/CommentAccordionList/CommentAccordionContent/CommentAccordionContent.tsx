import { IComment } from '@/common/types/comment';
import { getDateAndTimeFromString } from '@/utils/getDateFromString';
import {
	AccordionButton,
	AccordionIcon,
	AccordionPanel,
	Box,
	Text,
	useColorMode,
} from '@chakra-ui/react';
import styles from './CommentAccordionContent.module.css';

interface ICommentAccordionContentProps {
	isExpanded: boolean;
	comment: IComment;
}

const CommentAccordionContent = ({ isExpanded, comment }: ICommentAccordionContentProps) => {
	const { colorMode } = useColorMode();

	return (
		<>
			<AccordionButton p='10px 5px' borderRadius='5px'>
				<Box display='flex' gap={3} flex='1' textAlign='left'>
					<Text className={styles.secondaryInfo}>
						{comment.userNickName}, {getDateAndTimeFromString(comment.updatedAt as string, false)}
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
	);
};

export default CommentAccordionContent;
