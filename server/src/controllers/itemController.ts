import itemService from '../services/itemService';
import { NextFunction, Request, Response } from 'express';
import { errorMessage } from '../common/constant/error';
import ApiError from '../exceptions/ApiError';

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
			console.log('createProp !!!!!!!!!!');

			const { prop, itemId } = req.body;
			if (!prop || !itemId) return next(ApiError.badRequest(errorMessage.notAllFields));
			const newItem = await itemService.createOneItemProp(prop, itemId);
			return res.json(newItem);
		} catch (err) {
			next(err);
		}
	}
}

export default new ItemController();
