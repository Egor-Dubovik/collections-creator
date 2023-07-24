import { NextFunction, Request, Response } from 'express';
import { errorMessage } from '../common/constant/error';
import ApiError from '../exceptions/ApiError';
import searchService from '../services/searchService';

class SearchController {
	async findItems(req: Request, res: Response, next: NextFunction) {
		try {
			const { query } = req.query;
			if (!query) return next(ApiError.badRequest(errorMessage.notAllFields));
			const tags = await searchService.findItems(query as string);
			return res.json(tags);
		} catch (err) {
			next(err);
		}
	}
}

export default new SearchController();
