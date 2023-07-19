import { Topic } from '../models/all/TopicModel';

class TopicService {
	async getAll() {
		const topics = await Topic.findAll();
		return topics;
	}

	async getOneById(id: string) {
		const topic = await Topic.findOne({ where: { id } });
		return topic;
	}
}

export default new TopicService();
