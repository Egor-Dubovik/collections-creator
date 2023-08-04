import CommentAccordionList from '../CommentAccordionList/CommentAccordionList';
import CommentInput from '../CommentInput/CommentInput';
import styles from './ItemComments.module.css';

interface IItemCommentsProps {
	itemId: string;
}

const ItemComments = ({ itemId }: IItemCommentsProps) => {
	return (
		<div className={styles.comments}>
			<h2 className={styles.title}>Comments</h2>
			<CommentAccordionList itemId={itemId} />
			<CommentInput itemId={itemId} />
		</div>
	);
};

export default ItemComments;
