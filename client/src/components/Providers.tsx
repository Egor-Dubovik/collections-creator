'use client';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { ColorModeScript } from '@chakra-ui/react';

const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<CacheProvider>
			<ColorModeScript />
			<ChakraProvider>{children}</ChakraProvider>
		</CacheProvider>
	);
};

export default Providers;
