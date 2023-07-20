import { Client } from '@elastic/elasticsearch';
import { SearchHit } from '@elastic/elasticsearch/lib/api/types';
import ApiError from '../exceptions/ApiError';

class ESClientManager {
	private client: Client;
	private defaultIndex: string;

	constructor(url: string, defaultIndex: string) {
		this.client = new Client({ node: url });
		this.defaultIndex = defaultIndex;
	}

	public async indexData(index: string, data: object) {
		try {
			await this.client.index({
				index,
				body: data,
			});
			console.log(`Data indexed successfully in index: ${index}`);
		} catch (error) {
			console.error('Error indexing data:', error);
		}
	}

	public async search(query: string, index?: string, fields?: string[]) {
		try {
			const targetIndex = index || this.defaultIndex;
			const targetFields = fields || [];

			const result = await this.client.search({
				index: targetIndex,
				body: {
					query: {
						multi_match: {
							query,
							fields: targetFields,
							type: 'best_fields',
							operator: 'OR',
							fuzziness: 'AUTO',
						},
					},
				},
			});

			const hits = result.hits.hits;
			const searchResults = hits.map((hit: SearchHit<unknown>) => hit._source);
			return searchResults;
		} catch (error) {
			throw ApiError.unknownError('Error performing Elasticsearch search:', [error]);
		}
	}
}

export default new ESClientManager(process.env.API_URL as string, 'items_search');
