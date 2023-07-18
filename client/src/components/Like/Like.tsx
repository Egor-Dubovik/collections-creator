import useCheckActiveLike from '@/hooks/like/useCheckActiveLike';
import styles from './Like.module.css';

interface ILikeProps {
	isActive: boolean;
	likes: any[] | undefined;
	onClick: () => void;
}

const Like = ({ likes, isActive, onClick }: ILikeProps) => {
	const handleActiveLikeClass = (): string => {
		const classes = isActive ? `${styles.heart} ${styles.active}` : styles.heart;
		return classes;
	};

	return (
		<div className={styles.like}>
			<div className={handleActiveLikeClass()} onClick={onClick}></div>
			<h3 className={styles.typography}>{likes?.length}</h3>
		</div>
	);
};

export default Like;
