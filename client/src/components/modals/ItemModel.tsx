import { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IItemProp, IItemRegisterData } from '@/common/types/item';
import { MESSAGE } from '@/common/constant/message';
import useCreateItem from '@/hooks/item/useCreateItem';
import FileInput from '../inputs/FileInput/FileInput';
import ItemProps from '../ItemProps/ItemProps';
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
} from '@chakra-ui/react';

interface IItemModelProps {
	collectionId: number;
	isOpen: boolean;
	onClose: () => void;
}

const ItemModel = ({ collectionId, isOpen, onClose }: IItemModelProps) => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [props, setProps] = useState<IItemProp[]>([]);
	const [isShowSuccessMess, setIsShowSuccessMess] = useState(false);
	const { register, handleSubmit, control, reset } = useForm<IItemRegisterData>();
	const { create, isLoading, isSuccess, err } = useCreateItem();

	const handleFileUpload = (file: File | null): void => setSelectedFile(file);
	const handleClose = () => {
		onClose();
		reset();
	};

	const appendCollectionForm = (formData: FormData, data: IItemRegisterData) => {
		formData.append('name', data.name);
		formData.append('image', selectedFile as unknown as string);
		formData.append('props', JSON.stringify(props));
		formData.append('collectionId', String(collectionId));
	};

	const onSubmit: SubmitHandler<IItemRegisterData> = data => {
		const formData = new FormData();
		appendCollectionForm(formData, data);
		create(formData);
	};

	const resetForm = () => {
		setIsShowSuccessMess(true);
		setSelectedFile(null);
		setProps([]);
		reset();
	};

	useEffect(() => {
		if (isSuccess) {
			resetForm();
			const timer = setTimeout(() => {
				setIsShowSuccessMess(false);
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [isSuccess]);

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay bg='black.150' />
			<ModalContent>
				<ModalHeader>Create new item</ModalHeader>
				<ModalCloseButton />
				<form onSubmit={handleSubmit(onSubmit)}>
					<ModalBody pb={6}>
						{isShowSuccessMess && (
							<Text mb={1} color='green.400'>
								{MESSAGE.ITEM_ADDED}
							</Text>
						)}
						{err && <Text color='tomato'>{err.message}</Text>}
						<FormControl>
							<Input
								{...register('name', { required: 'Name is required' })}
								type='text'
								placeholder='name'
							/>
						</FormControl>
						<FileInput fileName='image' onFileUpload={handleFileUpload} />
						<ItemProps collectionId={collectionId} props={props} setProps={setProps} />
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

export default ItemModel;
