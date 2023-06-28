export interface ICollectionData {
	id?: number;
	title: string;
	description: string;
	userId: number;
	topicId: number;
}

export interface ICollectionProp {
	id?: number;
	name: string;
	value: string;
	type: string;
}

export interface IItemProp extends ICollectionProp {}

export interface IItemCollectionProp {
	id?: number;
	collectionId: number;
	collectionPropId: number;
}
