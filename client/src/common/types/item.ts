import { ICollectionProp } from './collection';

export interface IItemRegisterData {
	name: string;
	props: IItemProp[];
	image: string;
}

export interface IItemReqData extends IItemRegisterData {
	collectionId: number;
}

export interface IItemResData extends IItemReqData {
	id: number;
	updatedAt: string;
	createdAt: string;
}

export interface IItemProp extends ICollectionProp {
	value: string;
}

export interface IItemQuery {
	offset: number;
	limit: number;
	collectionId: number;
	order: 'desc' | 'asc';
	tags: string[];
	isCommented?: boolean;
}
