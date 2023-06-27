export type TypeOrder = 'asc' | 'desc';

export interface IItemsData {
	isCommented?: boolean;
	minLike?: number;
	maxLike?: number;
	tags?: string[];
	order: TypeOrder;
	collectionId: number;
	offset: number;
	limit: number;
}
