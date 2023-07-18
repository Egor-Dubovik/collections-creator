'use client';
import { useEffect, useRef, useState } from 'react';
import { Button, Input, InputGroup, Text } from '@chakra-ui/react';
import { ERROR_MESSAGE } from '@/common/constant/message';
import useCreateComment from '@/hooks/comments/useCreateComment';
import useUserStore from '@/store/UserStore';

interface ICommentInputProps {
	itemId: string;
}

const CommentInput = ({ itemId }: ICommentInputProps) => {
	const [newComment, setNewComment] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const { create, isLoading, err } = useCreateComment();
	const user = useUserStore.use.user();
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const handleShowLengthError = (message?: string) => {
		const currentMessage = message ? message : ERROR_MESSAGE.COMMENT_LENGTH;
		setErrorMessage(currentMessage);
		if (timerRef.current) clearTimeout(timerRef.current);
		timerRef.current = setTimeout(() => {
			setErrorMessage('');
		}, 3000);
	};

	const handleCreateComment = (): void => {
		if (newComment && newComment.length >= 30) {
			create({ itemId: Number(itemId), userId: user?.id as number, value: newComment });
			setNewComment('');
			return;
		}
		handleShowLengthError();
	};

	useEffect(() => {
		if (err) handleShowLengthError(err.message);
	}, [err]);

	useEffect(() => {
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, []);

	return (
		<>
			{user ? (
				<>
					{!!errorMessage.length && <Text color='tomato'>{errorMessage}</Text>}
					<InputGroup>
						<Input
							value={newComment}
							onChange={event => setNewComment(event.target.value)}
							borderRadius='5px 0 0 5px'
							placeholder='leave comment'
						/>
						<Button
							colorScheme='teal'
							borderRadius='0 5px 5px 0'
							isLoading={isLoading}
							onClick={handleCreateComment}
						>
							send
						</Button>
					</InputGroup>
				</>
			) : (
				<div>
					<Text>Log in to leave a comment</Text>
					<Button variant='link'>authorization</Button>
				</div>
			)}
		</>
	);
};

export default CommentInput;
