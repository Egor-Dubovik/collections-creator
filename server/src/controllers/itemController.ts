import itemService from '../services/itemService';
import { NextFunction, Request, Response } from 'express';
import { errorMessage } from '../common/constant/error';
import ApiError from '../exceptions/ApiError';
import { TypeOrder } from '../common/types/item';

class ItemController {
	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const { name, props, collectionId } = req.body;
			if (!name || !collectionId || !props.length)
				return next(ApiError.badRequest(errorMessage.notAllFields));
			const newItem = await itemService.create(name, props, collectionId);
			return res.json(newItem);
		} catch (err) {
			next(err);
		}
	}

	async createProp(req: Request, res: Response, next: NextFunction) {
		try {
			const { prop, itemId } = req.body;
			if (!prop || !itemId) return next(ApiError.badRequest(errorMessage.notAllFields));
			const newItem = await itemService.createOneItemProp(prop, itemId);
			return res.json(newItem);
		} catch (err) {
			next(err);
		}
	}

	async getRecentItems(req: Request, res: Response, next: NextFunction) {
		try {
			const { offset, limit } = req.query;
			if (!offset || !limit) return next(ApiError.badRequest(errorMessage.notAllFields));
			const newItem = await itemService.getRecentItems(Number(offset), Number(limit));
			return res.json(newItem);
		} catch (err) {
			next(err);
		}
	}

	async getItemsByCollectionId(req: Request, res: Response, next: NextFunction) {
		try {
			const { collectionId, offset, limit, sortOrder } = req.query;
			const order = sortOrder as TypeOrder;
			if (!collectionId || !offset || !limit || !sortOrder)
				return next(ApiError.badRequest(errorMessage.notAllFields));
			const items = await itemService.getItemsByCollectionId(+offset, +limit, +collectionId, order);
			return res.json(items);
		} catch (err) {
			next(err);
		}
	}

	async getByParams(req: Request, res: Response, next: NextFunction) {
		try {
			const { collectionId, offset, limit, order, isCommented, minLike, maxLike, tags } = req.query;
			if (!collectionId || !offset || !limit || !order)
				return next(ApiError.badRequest(errorMessage.notAllFields));
			const items = await itemService.getItems({
				collectionId: Number(collectionId),
				offset: Number(offset),
				limit: Number(limit),
				order: order as TypeOrder,
				isCommented: isCommented as unknown as boolean,
				minLike: Number(minLike),
				maxLike: Number(maxLike),
				tags: tags as string[],
			});
			return res.json(items);
		} catch (err) {
			next(err);
		}
	}
}

export default new ItemController();