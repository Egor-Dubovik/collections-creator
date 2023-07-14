import { IAxiosError } from '@/common/types/axios';
import { useQuery } from 'react-query';
import PropsService from '@/service/PropsService';

const useGetCollectionProps = (id: number) => {
	const { data, refetch, isLoading, isSuccess, error } = useQuery({
		queryKey: ['collection props'],
		queryFn: () => PropsService.getCollectionProps(id),
	});

	const err = error as IAxiosError<{ message: string }>;
	return { data, refetch, isLoading, isSuccess, err };
};

export default useGetCollectionProps;
