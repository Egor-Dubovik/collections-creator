import { NextFunction, Request, Response } from 'express';
import { IUser } from '../common/types/user';
import ApiError from '../exceptions/ApiError';
import tokenService from '../services/tokenService';

interface AuthRequest extends Request {
	user?: IUser;
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
	try {
		const authorizationHeader = req.headers.authorization;
		if (!authorizationHeader) return next(ApiError.unauthorizedError());
		const accessToken = authorizationHeader.split(' ')[1];
		if (!accessToken) return next(ApiError.unauthorizedError());
		const userData = tokenService.validateAccessToken(accessToken);
		if (!userData) return next(ApiError.unauthorizedError());
		req.user = userData;
		next();
	} catch (e) {
		return next(ApiError.unauthorizedError());
	}
};

export default authMiddleware;
