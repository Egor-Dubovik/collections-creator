import { FC } from 'react';
import { Box, Flex, Heading, List, Text, Tooltip, useColorMode } from '@chakra-ui/react';
import { ICollectionProp } from '@/common/types/collection';
import { QuestionOutlineIcon } from '@chakra-ui/icons';
import { PROPS_INFO } from '@/common/constant/collections';
import styles from './PropsContainer.module.css';

interface IPropsContainer {
	props: ICollectionProp[];
	handleDelete: (propName: string) => void;
}

const PropsContainer: FC<IPropsContainer> = ({ props, handleDelete }) => {
	const { colorMode } = useColorMode();

	return (
		<Box>
			<Flex justifyContent='space-between' alignItems='center'>
				<Heading as='h6' size='md' mb={2}>
					Props:
				</Heading>
				<Tooltip hasArrow label={PROPS_INFO} bg='gray.300' color='black'>
					<QuestionOutlineIcon />
				</Tooltip>
			</Flex>
			<List className={styles.propContainer}>
				{props.map(prop => (
					<Tooltip key={prop.name} label={prop.name} placement='top'>
						<Text
							className={styles.prop}
							bg={colorMode !== 'dark' ? 'gray.200' : 'gray.800'}
							onClick={() => handleDelete(prop.name)}
						>
							{prop.name}
						</Text>
					</Tooltip>
				))}
			</List>
		</Box>
	);
};

export default PropsContainer;
