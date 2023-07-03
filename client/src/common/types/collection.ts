export type TypeProp = 'number' | 'time' | 'text' | 'date';

export interface ICollectionProp {
	name: string;
	type: TypeProp;
}

export interface IItemProp extends ICollectionProp {
	value: string;
}
