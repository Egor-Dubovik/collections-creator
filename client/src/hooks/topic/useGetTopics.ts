import { IAxiosError } from '@/common/types/axios';
import { useQuery } from 'react-query';
import TopicService from '@/service/TopicService';

const useGetTopics = () => {
	const {
		data: topics,
		isSuccess,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['topic'],
		queryFn: () => TopicService.getAll(),
	});

	const err = error as IAxiosError<{ message: string }>;
	return { topics, isSuccess, isLoading, err };
};

export default useGetTopics;
