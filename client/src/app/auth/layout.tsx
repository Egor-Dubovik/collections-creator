import { FC, PropsWithChildren } from 'react';
import styles from './layout.module.css';

const layout: FC<PropsWithChildren> = ({ children }) => {
	return <main className={`main ${styles.authPage}`}>{children}</main>;
};

export default layout;
