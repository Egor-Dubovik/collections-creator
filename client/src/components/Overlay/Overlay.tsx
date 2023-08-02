'use client';
import { Box } from '@chakra-ui/react';
import useOverlayStore from '@/store/OverlayStore';
import styles from './Overlay.module.css';

const Overlay = () => {
	const isActive = useOverlayStore.use.isActive();
	return <>{isActive && <Box className={styles.overlay} backgroundColor='black.100'></Box>}</>;
};

export default Overlay;
