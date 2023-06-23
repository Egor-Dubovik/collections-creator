export interface ICollectionData {
	id?: number;
	title: string;
	description: string;
	topic: string;
	userId: number;
}

export interface ICollectionProp {
	id?: number;
	name: string;
	value: string;
	type: string;
}

export interface IItemCollectionProp {
	id?: number;
	collectionId: number;
	collectionPropId: number;
}
