import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
	initialColorMode: 'system',
	useSystemColorMode: false,
	colors: {
		transparent: 'transparent',
		white: '#fff',
		tealLight: '#3cc7bd',
		black: {
			100: '#00000070',
			150: '#0000008a',
			900: '#000',
		},
		gr: {
			50: '#f7fafc',
			100: '#cbd5e066',
			800: '#1A202C',
			900: '#17192304',
		},
	},
});

export default theme;
