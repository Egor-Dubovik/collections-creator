import { ICollectionProp } from './collection';

export type TypeOrder = 'asc' | 'desc';

export interface IItemRegisterData {
	name: string;
	props: IItemProp[];
	image: string;
}

export interface IItemData extends IItemRegisterData {
	id: number;
	collectionId: number;
	updatedAt: string;
	createdAt: string;
}

export interface IItemResData extends IItemRegisterData {
	items: IItemData[];
	hasNextItem: boolean;
}

export interface IItemProp extends ICollectionProp {
	value: string;
}

export interface IItemQuery {
	offset: number;
	limit: number;
	order: TypeOrder;
	tags?: string[];
	isCommented?: boolean;
	collectionId?: number;
}
