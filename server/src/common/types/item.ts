export type TypeOrder = 'asc' | 'desc';

export interface IItemsData {
	isCommented?: boolean;
	tags?: string[];
	order: TypeOrder;
	collectionId: number;
	offset: number;
	limit: number;
}
