import { ICollectionProp } from './collection';

export type TypeOrder = 'asc' | 'desc';

export interface IItemRegisterData {
	name: string;
	props: IItemProp[];
	image: string;
}

export interface IItem {
	id: number;
	name: string;
	image: string;
	collectionId: number;
	updatedAt: string;
	createdAt: string;
}

export interface IItemData {
	item: IItem;
	props: IItemProp[];
}

export interface IItemResData extends IItemRegisterData {
	items: IItem[];
	hasNextItem: boolean;
}

export interface IItemProp extends ICollectionProp {
	value: string;
}

export interface IItemQuery {
	offset: number;
	limit: number;
	order: TypeOrder;
	tags: string;
	isCommented?: boolean;
	collectionId?: number;
}
