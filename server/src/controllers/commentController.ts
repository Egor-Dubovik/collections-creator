import itemService from '../services/itemService';
import { NextFunction, Request, Response } from 'express';
import { errorMessage } from '../common/constant/error';
import ApiError from '../exceptions/ApiError';
import commentService from '../services/commentService';

class CommentController {
	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const { value, itemId, userId } = req.body;
			if (!value || !itemId || !userId) return next(ApiError.badRequest(errorMessage.notAllFields));
			const newComment = await commentService.create(value, itemId, userId);
			return res.json(newComment);
		} catch (err) {
			next(err);
		}
	}
	async update(req: Request, res: Response, next: NextFunction) {
		try {
			const { value, itemId, userId } = req.body;
			if (!value || !itemId || !userId) return next(ApiError.badRequest(errorMessage.notAllFields));
			const updatedComment = await commentService.update(value, itemId, userId);
			return res.json(updatedComment);
		} catch (err) {
			next(err);
		}
	}

	async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const { itemId } = req.query;
			if (!itemId) return next(ApiError.badRequest(errorMessage.notAllFields));
			const comments = await commentService.getAll(Number(itemId));
			return res.json(comments);
		} catch (err) {
			next(err);
		}
	}
}

export default new CommentController();
