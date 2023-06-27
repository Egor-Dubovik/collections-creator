import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import Logo from '@/components/logo/Logo';
import Providers from '@/components/Providers';
import { Roboto } from 'next/font/google';
import { ReactNode } from 'react';
import './globals.css';

const appFont = Roboto({ subsets: ['cyrillic'], weight: ['400', '500', '700'] });

export const metadata = {
	title: 'Home | Collections creator',
	description: 'Generated by create next app',
};

const RootLayout = ({ children }: { children: ReactNode }) => {
	return (
		<html lang='en'>
			<body className={appFont.className}>
				<Providers>
					<div className='root-layout'>
						<Header logo={<Logo />} />
						{children}
						<Footer />
					</div>
				</Providers>
			</body>
		</html>
	);
};

export default RootLayout;
