export interface ICollectionData {
	id?: number;
	title: string;
	description: string;
	userId: number;
	topicId: number;
	image?: string;
}

export interface ICollectionProp {
	id?: number;
	name: string;
	type: string;
}

export interface IItemProp extends ICollectionProp {
	value: string;
}

export interface IItemCollectionProp {
	id?: number;
	collectionId: number;
	collectionPropId: number;
}
