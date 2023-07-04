export type TypeProp = 'number' | 'time' | 'text' | 'date';

export interface ICollectionProp {
	name: string;
	type: TypeProp;
}

export interface IItemProp extends ICollectionProp {
	value: string;
}

export interface ICollectionRegister {
	title: string;
	description: string;
	topicId: number;
}

interface ITime {
	updatedAt: string;
	createdAt: string;
}

export interface ICollectionResponse extends ITime {
	id: number;
	title: string;
	image: string | null;
	collectionId: number;
}

export interface ITopic extends ITime {
	id: number;
	en: string;
	ru: string;
}
