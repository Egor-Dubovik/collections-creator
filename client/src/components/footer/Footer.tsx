import styles from './Footer.module.css';

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={`${styles.container} footer__container`}>
				<a className={styles.link} target='_blank' href='https://t.me/ego_dubovik'>
					developer
				</a>
				<p>2023</p>
			</div>
		</footer>
	);
};

export default Footer;
