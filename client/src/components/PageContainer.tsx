'use client';
import { Container, useBreakpointValue } from '@chakra-ui/react';
import { ReactNode } from 'react';

const PageContainer = ({ children }: { children: ReactNode }) => {
	const maxContainerWidth = useBreakpointValue({
		base: 'container.sm',
		md: 'container.lg',
		xl: 'container.xl',
		'2xl': '102em',
	});

	return <Container maxW={maxContainerWidth}>{children}</Container>;
};

export default PageContainer;
