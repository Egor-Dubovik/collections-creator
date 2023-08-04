import { IItemProp } from './collection';
import { ITag } from './tag';

export type TypeOrder = 'asc' | 'desc';

export interface IItemsData {
	isCommented?: boolean;
	tags?: string[];
	order: TypeOrder;
	collectionId: number;
	offset: number;
	limit: number;
}

export interface IItemCreationProps {
	name: string;
	props: IItemProp[];
	image: string | undefined;
	tags: string[];
	collectionId: string;
}
