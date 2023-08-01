import itemService from '../services/itemService';
import { NextFunction, Request, Response } from 'express';
import { errorMessage } from '../common/constant/error';
import ApiError from '../exceptions/ApiError';
import { TypeOrder } from '../common/types/item';

class ItemController {
	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const { name, props, collectionId, tags } = req.body;
			if (!name || !collectionId || !tags)
				return next(ApiError.badRequest(errorMessage.notAllFields));
			const newItem = await itemService.create({
				name,
				props: JSON.parse(props),
				image: req.file?.filename,
				tags: JSON.parse(tags),
				collectionId,
			});
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

	async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const newItem = await itemService.getAll();
			return res.json(newItem);
		} catch (err) {
			next(err);
		}
	}

	async getOne(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.query;
			if (!id) return next(ApiError.badRequest(errorMessage.notAllFields));
			const newItem = await itemService.getOne(Number(id));
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

	async getItemsByTags(req: Request, res: Response, next: NextFunction) {
		try {
			const { tags } = req.query;
			if (!tags) return next(ApiError.badRequest(errorMessage.notAllFields));
			const newItem = await itemService.getItemsByTags(JSON.parse(tags as string));
			return res.json(newItem);
		} catch (err) {
			next(err);
		}
	}

	async getByParams(req: Request, res: Response, next: NextFunction) {
		try {
			const { collectionId, offset, limit, order, isCommented, tags } = req.query;
			const tagsArray = tags ? JSON.parse(tags as string) : tags;
			if (!offset || !limit || !order) return next(ApiError.badRequest(errorMessage.notAllFields));
			const items = await itemService.getItemsByParams({
				collectionId: Number(collectionId),
				offset: Number(offset),
				limit: Number(limit),
				order: order as TypeOrder,
				isCommented: JSON.parse(isCommented as string) as boolean,
				tags: tagsArray,
			});
			return res.json(items);
		} catch (err) {
			next(err);
		}
	}
}

export default new ItemController();
