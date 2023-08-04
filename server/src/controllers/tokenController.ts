import { NextFunction, Request, Response } from 'express';
import { errorMessage } from '../common/constant/error';
import ApiError from '../exceptions/ApiError';
import tokenService from '../services/tokenService';

class TokenController {
	async refresh(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.query;
			if (!refreshToken) return next(ApiError.badRequest(errorMessage.notAuthorized));
			const userData = await tokenService.refresh(refreshToken as string);
			return res.json(userData);
		} catch (err) {
			next(err);
		}
	}
}

export default new TokenController();
