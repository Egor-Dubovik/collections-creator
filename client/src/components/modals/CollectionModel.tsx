import { FC, useRef, useState } from 'react';
import FileInput from '../inputs/FileInput/FileInput';
import {
	Button,
	FormControl,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Textarea,
} from '@chakra-ui/react';
import TopicSelect from '../selects/TopicSelect';
import CollectionProps from '../CollectionProps';

interface ICollectionModelProps {
	isOpen: boolean;
	onClose: () => void;
}

const CollectionModel: FC<ICollectionModelProps> = ({ isOpen, onClose }) => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const initialRef = useRef<HTMLInputElement | null>(null);

	const handleFileUpload = (file: File | null): void => {
		setSelectedFile(file);
	};

	return (
		<Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
			<ModalOverlay bg='black.150' />
			<ModalContent>
				<ModalHeader>Create new collection</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<FormControl>
						<Input ref={initialRef} type='text' placeholder='name' />
					</FormControl>
					<TopicSelect />
					<FormControl mt={3}>
						<Textarea placeholder='description' />
					</FormControl>
					<FileInput fileName='image' onFileUpload={handleFileUpload} />
					<CollectionProps />
				</ModalBody>

				<ModalFooter>
					<Button colorScheme='blue' mr={3}>
						Save
					</Button>
					<Button onClick={onClose}>Cancel</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default CollectionModel;
