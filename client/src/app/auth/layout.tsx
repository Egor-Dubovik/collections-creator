import { FC, PropsWithChildren } from 'react';
import PageContainer from '@/components/PageContainer';
import styles from './layout.module.css';

const layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<main className={`main ${styles.authPage}`}>
			<PageContainer>{children}</PageContainer>
		</main>
	);
};

export default layout;
