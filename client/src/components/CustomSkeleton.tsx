import { Skeleton, Stack } from '@chakra-ui/react';

interface ICustomSkeletonProps {
	amount?: number;
	height?: string;
	borderRadius?: string;
	spacing?: string;
	mb?: string;
}

const CustomSkeleton = ({ amount, spacing, height, borderRadius, mb }: ICustomSkeletonProps) => {
	const skeletonArray = Array.from({ length: amount || 3 });

	return (
		<Stack spacing={spacing ? spacing : '8px'} mb={mb ? mb : '0'}>
			{skeletonArray.map((_, index) => (
				<Skeleton
					key={index}
					height={height ? height : '20px'}
					borderRadius={borderRadius ? borderRadius : '2px'}
				/>
			))}
		</Stack>
	);
};

export default CustomSkeleton;
