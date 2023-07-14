export type TypeProp = 'number' | 'time' | 'text' | 'date';

export interface ICollectionProp {
	id?: number;
	name: string;
	type: TypeProp;
	updatedAt?: string;
	createdAt?: string;
}

export interface ICollectionRegister {
	title: string;
	description: string;
	topicId: number;
}

export interface ICollectionResponse {
	id: number;
	title: string;
	image: string | null;
	collectionId: number;
	updatedAt?: string;
	createdAt?: string;
}

export interface ITopic {
	id: number;
	en: string;
	ru: string;
	updatedAt?: string;
	createdAt?: string;
}
