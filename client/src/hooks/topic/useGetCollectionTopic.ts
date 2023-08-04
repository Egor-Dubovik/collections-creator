import { IAxiosError } from '@/common/types/axios';
import { useQuery } from 'react-query';
import TopicService from '@/service/TopicService';

const useGetCollectionTopic = (topicId: number) => {
	const {
		data: topic,
		isSuccess,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['collection topic'],
		queryFn: () => TopicService.getCollectionTopic(topicId),
	});

	const err = error as IAxiosError<{ message: string }>;
	return { topic, isSuccess, isLoading, err };
};

export default useGetCollectionTopic;
