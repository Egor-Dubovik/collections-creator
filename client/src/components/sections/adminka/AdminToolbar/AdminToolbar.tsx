import { ChangeEvent, FormEvent, useState } from 'react';
import { Box, Button, Input } from '@chakra-ui/react';
import styles from './AdminToolbar.module.css';

interface IAdminToolbarProps {
	search: string;
	handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}

const AdminToolbar = ({ search, handleSearch }: IAdminToolbarProps) => {
	return (
		<section className={styles.toolbar}>
			<div className='admin-toolbar__container'>
				<Box className={styles.tools}>
					<Input
						value={search}
						onChange={handleSearch}
						className={styles.input}
						size='lg'
						placeholder='search by name and email'
					/>
					<Box className={styles.buttons}>
						<Box className={styles.buttonBox}>
							<Button colorScheme='red' variant='solid'>
								block
							</Button>
							<Button colorScheme='green' variant='solid'>
								unlock
							</Button>
						</Box>
						<Box className={`${styles.buttonBox} ${styles.adminRight}`}>
							<Button colorScheme='blue' variant='solid'>
								make admin
							</Button>
							<Button colorScheme='pink' variant='solid'>
								revoke admin rights
							</Button>
						</Box>
					</Box>
				</Box>
			</div>
		</section>
	);
};

export default AdminToolbar;
