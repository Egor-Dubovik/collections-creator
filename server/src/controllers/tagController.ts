import { NextFunction, Request, Response } from 'express';
import { errorMessage } from '../common/constant/error';
import ApiError from '../exceptions/ApiError';
import tagService from '../services/tagService';

class TagController {
	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const { valueArray, itemId } = req.body;
			if (!valueArray.length || !itemId)
				return next(ApiError.badRequest(errorMessage.notAllFields));
			const tags = await tagService.createTags(valueArray, itemId);
			return res.json(tags);
		} catch (err) {
			next(err);
		}
	}

	async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const tags = await tagService.getAll();
			return res.json(tags);
		} catch (err) {
			next(err);
		}
	}

	async getAllByItemId(req: Request, res: Response, next: NextFunction) {
		try {
			const { itemId } = req.query;
			if (!itemId) return next(ApiError.badRequest(errorMessage.notAllFields));
			const tags = await tagService.getAllByItemId(Number(itemId));
			return res.json(tags);
		} catch (err) {
			next(err);
		}
	}
}

export default new TagController();
