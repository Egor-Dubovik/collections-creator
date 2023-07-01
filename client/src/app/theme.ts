import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
	initialColorMode: 'system',
	useSystemColorMode: false,
	breakpoints: {
		sm: '30em', // 480px
		md: '48em', // 768px
		lg: '62em', // 992px
		xl: '80em', // 1280px
	},
	colors: {
		transparent: 'transparent',
		white: '#fff',
		tealLight: '#3cc7bd',
		black: {
			100: '#00000070',
			900: '#000',
		},
		gr: {
			50: '#f7fafc',
			100: '#cbd5e066',
			900: '#17192304',
		},
	},
});

export default theme;
