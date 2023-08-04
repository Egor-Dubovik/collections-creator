'use client';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import theme from '@/app/theme';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<CacheProvider>
			<QueryClientProvider client={queryClient}>
				<ChakraProvider theme={theme}>{children}</ChakraProvider>
			</QueryClientProvider>
		</CacheProvider>
	);
};

export default Providers;
