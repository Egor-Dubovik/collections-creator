'use client';
import SignUpForm from '@/components/forms/SignUpForm/SignUpForm';
import { Heading } from '@chakra-ui/react';
import { FC } from 'react';
import styles from './SignUp.module.css';

const SignUpPage: FC = () => {
	return (
		<section className={styles.sigUp}>
			<Heading as='h2' mb={2}>
				SignUpPage
			</Heading>
			<SignUpForm />
		</section>
	);
};

export default SignUpPage;
