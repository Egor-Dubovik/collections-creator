import { FC } from 'react';
import { Select } from '@chakra-ui/react';
import { Control, Controller } from 'react-hook-form';
import { ICollectionRegister } from '@/common/types/collection';
import useGetTopics from '@/hooks/topic/useGetTopics';

interface ITopicSelect {
	control: Control<ICollectionRegister>;
}

const TopicSelect: FC<ITopicSelect> = ({ control }) => {
	const { topics } = useGetTopics();

	return (
		<Controller
			control={control}
			name='topicId'
			rules={{ required: 'Topic is required' }}
			render={({ field: { onChange, value } }) => (
				<Select mt={3} value={value} onChange={newValue => onChange(newValue)}>
					{topics &&
						topics.map(topic => (
							<option key={topic.id} value={topic.id}>
								{topic.en}
							</option>
						))}
				</Select>
			)}
		/>
	);
};

export default TopicSelect;
