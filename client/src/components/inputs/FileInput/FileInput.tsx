import React, { FC, useState, useEffect, DragEvent } from 'react';
import { Box, Highlight, Text, Heading, IconButton, useColorMode } from '@chakra-ui/react';
import styles from './FileInput.module.css';
import { DeleteIcon } from '@chakra-ui/icons';

interface FileInputProps {
	onFileUpload: (file: File | null) => void;
	fileName: string;
}

const FileInput: FC<FileInputProps> = ({ onFileUpload, fileName }) => {
	const [drag, setDrag] = useState<boolean>(false);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const { colorMode } = useColorMode();

	const dragStartHandler = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setDrag(true);
	};

	const dragLeaveHandler = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setDrag(false);
	};

	const onDropHandler = (event: DragEvent<HTMLDivElement>): void => {
		event.preventDefault();
		const file = event.dataTransfer.files[0];
		setSelectedFile(file);
		setDrag(false);
	};

	const onInputChange = (event: Event): void => {
		const file = (event.target as HTMLInputElement).files?.[0];
		if (file) setSelectedFile(file);
	};

	const addFileHandler = (): void => {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = '.jpg, .png, .webp';
		input.onchange = onInputChange;
		input.click();
	};

	useEffect(() => {
		onFileUpload(selectedFile);
	}, [selectedFile]);

	return (
		<Box className={styles.filePicker} mt={4}>
			<Box className={styles.fileUploader}>
				<Box
					className={`${styles.dropArea} ${drag ? styles.dragActive : ''}`}
					borderColor={colorMode !== 'dark' ? 'black.100' : 'gr.100'}
					onDragStart={event => dragStartHandler(event)}
					onDragLeave={event => dragLeaveHandler(event)}
					onDragOver={event => dragStartHandler(event)}
					onDrop={event => onDropHandler(event)}
					onClick={addFileHandler}
				>
					<Heading as='h3' size='md'>
						Click or drag <span className={styles.fileName}>{fileName}</span> to this area to upload
					</Heading>
					<Text>Single file upload supported</Text>
				</Box>
			</Box>
			<Box className={styles.fileInfo}>
				{selectedFile && (
					<>
						<Text>{selectedFile.name}</Text>
						<IconButton
							display='flex'
							icon={<DeleteIcon />}
							variant='outline'
							onClick={() => setSelectedFile(null)}
							aria-label='burger icon'
						/>
					</>
				)}
			</Box>
		</Box>
	);
};

export default FileInput;
