import { NextFunction, Request, Response } from 'express';
import { errorMessage } from '../common/constant/error';
import ApiError from '../exceptions/ApiError';
import likeService from '../services/likeService';

class LikeController {
	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const { userId, itemId } = req.body;
			if (!userId || !itemId) return next(ApiError.badRequest(errorMessage.notAllFields));
			const likeData = await likeService.create(Number(userId), Number(itemId));
			return res.json(likeData);
		} catch (err) {
			next(err);
		}
	}

	async getItemLikes(req: Request, res: Response, next: NextFunction) {
		try {
			const { itemId } = req.query;
			if (!itemId) return next(ApiError.badRequest(errorMessage.notAllFields));
			const likesData = await likeService.getItemLikes(Number(itemId));
			return res.json(likesData);
		} catch (err) {
			next(err);
		}
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const { userId } = req.query;
			if (!userId) return next(ApiError.badRequest(errorMessage.notAllFields));
			const likesData = await likeService.delete(userId as string);
			return res.json(likesData);
		} catch (err) {
			next(err);
		}
	}
}

export default new LikeController();
