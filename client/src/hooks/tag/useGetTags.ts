import { useQuery } from 'react-query';
import TagService from '@/service/TagService';

const useGetTags = () => {
	const { data: allTags, isLoading } = useQuery({
		queryKey: ['tags'],
		queryFn: () => TagService.getAll(),
		staleTime: 300000,
	});
	return { allTags, isLoading };
};

export default useGetTags;
