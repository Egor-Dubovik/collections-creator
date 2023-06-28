import { NextFunction, Request, Response } from 'express';
import { errorMessage } from '../common/constant/error';
import ApiError from '../exceptions/ApiError';
import topicService from '../services/topicService';

class TopicController {
	async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const topics = await topicService.getAll();
			return res.json(topics);
		} catch (err) {
			next(err);
		}
	}

	async getOneById(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.query;
			if (!id) return next(ApiError.badRequest(errorMessage.notAllFields));
			const topic = await topicService.getOneById(Number(id));
			return res.json(topic);
		} catch (err) {
			next(err);
		}
	}
}

export default new TopicController();
