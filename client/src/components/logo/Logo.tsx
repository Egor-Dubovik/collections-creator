import { FaConnectdevelop } from 'react-icons/fa';
import styles from './Logo.module.css';

const Logo = (): JSX.Element => {
	return (
		<div className={styles.logo}>
			<FaConnectdevelop />
		</div>
	);
};

export default Logo;
