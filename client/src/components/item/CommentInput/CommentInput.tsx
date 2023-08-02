'use client';
import { useEffect, useRef, useState } from 'react';
import { Box, Button, Input, InputGroup, Text } from '@chakra-ui/react';
import { ERROR_MESSAGE } from '@/common/constant/message';
import useCreateComment from '@/hooks/comments/useCreateComment';
import useUserStore from '@/store/UserStore';
import { ROUTES } from '@/common/types/api';
import { useRouter } from 'next/navigation';

interface ICommentInputProps {
	itemId: string;
}

const CommentInput = ({ itemId }: ICommentInputProps) => {
	const [newComment, setNewComment] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const { create, isLoading, err } = useCreateComment();
	const user = useUserStore.use.user();
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const router = useRouter();

	const handleShowError = (message: string): void => {
		setErrorMessage(message);
		if (timerRef.current) clearTimeout(timerRef.current);
		timerRef.current = setTimeout(() => {
			setErrorMessage('');
		}, 3000);
	};

	const createComment = (): void => {
		create({ itemId: Number(itemId), userId: user?.id as number, value: newComment });
		setNewComment('');
	};

	const handleCreateComment = (): void => {
		newComment && newComment.length >= 30
			? createComment()
			: handleShowError(ERROR_MESSAGE.COMMENT_LENGTH);
	};

	useEffect(() => {
		if (err) handleShowError(err.message);
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
				<Box display='flex' flexDirection='column' gap={2}>
					<Text>Log in to leave a comment</Text>
					<Button
						variant='solid'
						colorScheme='teal'
						alignSelf='flex-start'
						onClick={() => router.push(ROUTES.LOGIN)}
					>
						authorization
					</Button>
				</Box>
			)}
		</>
	);
};

export default CommentInput;
