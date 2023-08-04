import { NextFunction, Request, Response } from 'express';
import ApiError from '../exceptions/ApiError';
import tokenService from '../services/tokenService';

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
	try {
		const authorizationHeader: string | undefined = req.headers.authorization;
		if (!authorizationHeader) return next(ApiError.unauthorizedError());
		const accessToken: string = authorizationHeader.split(' ')[1];
		if (!accessToken) return next(ApiError.unauthorizedError());
		const userData = tokenService.validateAccessToken(accessToken);
		if (!userData) return next(ApiError.unauthorizedError());
		next();
	} catch (e) {
		return next(ApiError.unauthorizedError());
	}
};

export default authMiddleware;
