import { FC } from 'react';
import { useColorMode, useColorModeValue, IconButton, IconButtonProps } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

type ColorModeSwitcherProps = Omit<IconButtonProps, 'aria-label'>;

const ColorModeSwitcher: FC<ColorModeSwitcherProps> = props => {
	const { toggleColorMode } = useColorMode();
	const text = useColorModeValue('dark', 'light');
	const SwitchIcon = useColorModeValue(SunIcon, MoonIcon);

	return (
		<IconButton
			size='md'
			fontSize='lg'
			variant='ghost'
			_hover={{ color: 'tealLight' }}
			transition='color 0.2s ease'
			marginRight='2'
			onClick={toggleColorMode}
			icon={<SwitchIcon />}
			aria-label={`Switch to ${text} mode`}
			{...props}
		/>
	);
};

export default ColorModeSwitcher;
