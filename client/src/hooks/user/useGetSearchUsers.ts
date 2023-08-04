import { useQuery } from 'react-query';
import UserService from '@/service/UserService';
import { IAxiosError } from '@/common/types/axios';

const useGetSearchUsers = (query: string) => {
	const {
		data: searchUsers,
		isLoading,
		refetch,
		error,
	} = useQuery({
		queryKey: ['search users'],
		queryFn: () => UserService.getSearchUsers(query),
	});
	const err = error as IAxiosError<{ message: string }>;
	return { searchUsers, refetch, isLoading, err };
};

export default useGetSearchUsers;
