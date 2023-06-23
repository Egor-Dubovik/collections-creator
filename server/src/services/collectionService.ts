import { ICollectionData, ICollectionProp } from '../common/types/collection';
import { Collection } from '../models/all/CollectionModel';
import collectionPropService from './collectionPropService';

class CollectionService {
	async create(data: ICollectionData, props: ICollectionProp[]) {
		const newCollection = await Collection.create({ ...data });
		const collectionId = newCollection.getDataValue('id') as number;
		await this.createProps(props, collectionId);
		return newCollection;
	}

	async createProps(props: ICollectionProp[], collectionId: number) {
		const propPromises = props.map(prop => collectionPropService.createOneProp(prop, collectionId));
		const newProps = await Promise.all(propPromises);
		return newProps;
	}
}

export default new CollectionService();
