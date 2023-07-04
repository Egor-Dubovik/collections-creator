import { FC, useEffect, useState } from 'react';
import FileInput from '../inputs/FileInput/FileInput';
import TopicSelect from '../selects/TopicSelect';
import CollectionProps from '../CollectionProps/CollectionProps';
import { ICollectionProp, ICollectionRegister } from '@/common/types/collection';
import { SubmitHandler, useForm } from 'react-hook-form';
import { appendForm } from '@/utils/appendForm';
import useCreate from '@/hooks/collection/useCreate';
import { FIRST_TOPIC_ID } from '@/common/constant/collections';
import useUserStore from '../../../store/UserStore';
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
	Text,
	Textarea,
} from '@chakra-ui/react';

interface ICollectionModelProps {
	isOpen: boolean;
	onClose: () => void;
}

const CollectionModel: FC<ICollectionModelProps> = ({ isOpen, onClose }) => {
	const user = useUserStore.use.user();
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [props, setProps] = useState<ICollectionProp[]>([]);
	const { create, isLoading, isSuccess, err } = useCreate();
	const { register, handleSubmit, control, reset } = useForm<ICollectionRegister>({
		defaultValues: { topicId: FIRST_TOPIC_ID },
	});

	const handleFileUpload = (file: File | null): void => setSelectedFile(file);
	const handleClose = () => {
		onClose();
		reset();
	};

	const appendCollectionForm = (formData: FormData, data: ICollectionRegister) => {
		appendForm(formData, data);
		formData.append('image', selectedFile as unknown as string);
		formData.append('props', JSON.stringify(props));
		formData.append('userId', String(user?.id as number));
	};

	const onSubmit: SubmitHandler<ICollectionRegister> = data => {
		const formData = new FormData();
		appendCollectionForm(formData, data);
		create(formData);
	};

	useEffect(() => {
		handleClose();
	}, [isSuccess]);

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay bg='black.150' />
			<ModalContent>
				<ModalHeader>Create new collection</ModalHeader>
				<ModalCloseButton />
				<form onSubmit={handleSubmit(onSubmit)}>
					<ModalBody pb={6}>
						{err && <Text color='tomato'>{err.message}</Text>}
						<FormControl>
							<Input
								{...register('title', { required: 'Name is required' })}
								type='text'
								placeholder='name'
							/>
						</FormControl>
						<TopicSelect control={control} />
						<FormControl mt={3}>
							<Textarea
								{...register('description', { required: 'Description is required' })}
								placeholder='description'
							/>
						</FormControl>
						<FileInput fileName='image' onFileUpload={handleFileUpload} />
						<CollectionProps props={props} setProps={setProps} />
					</ModalBody>
					<ModalFooter>
						<Button isLoading={isLoading} type='submit' colorScheme='blue' mr={3}>
							Save
						</Button>
						<Button onClick={handleClose}>Cancel</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
};

export default CollectionModel;
