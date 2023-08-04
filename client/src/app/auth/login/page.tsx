'use client';
import { FC } from 'react';
import { Heading } from '@chakra-ui/react';
import LoginForm from '@/components/forms/LoginForm';
import styles from './Login.module.css';

const LogInPage: FC = () => {
	return (
		<section className={styles.login}>
			<Heading as='h2' mb={2}>
				Login
			</Heading>
			<LoginForm />
		</section>
	);
};

export default LogInPage;
